import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ApiUser = {
  id?: number | string;
  name?: string;
  email?: string;
};

type ApiError = {
  err?: string;
  message?: string;
};

type DashboardState = {
  hello: string;
  users: ApiUser[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  statusMessage: string | null;
  lastLoadedAt: string | null;
};

type EditorState = {
  id: string;
  title: string;
  note: string;
  mode: "patch" | "put";
};

type BoardUser = {
  id: string;
  title: string;
  note: string;
};

type ColumnAccent = "mint" | "sky" | "gold";

const routeCards = [
  { label: "GET /api/hello", value: "Board heartbeat", tone: "mint" },
  { label: "GET /api/users", value: "Load todos", tone: "gold" },
  { label: "POST /api/users", value: "Create card", tone: "sky" },
  { label: "PATCH /api/users/[id]", value: "Quick edit", tone: "violet" },
  { label: "PUT /api/users/[id]", value: "Replace card", tone: "rose" },
  { label: "DELETE /api/users/[id]", value: "Remove card", tone: "crimson" },
] as const;

export default function Index() {
  const router = useRouter();
  const [state, setState] = useState<DashboardState>({
    hello: "Loading board...",
    users: [],
    loading: true,
    refreshing: false,
    error: null,
    statusMessage: null,
    lastLoadedAt: null,
  });
  const [taskTitle, setTaskTitle] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [createBusy, setCreateBusy] = useState(false);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [saveBusy, setSaveBusy] = useState(false);
  const [deleteBusyId, setDeleteBusyId] = useState<string | null>(null);

  useEffect(() => {
    void loadBoard();
  }, []);

  const boardUsers = useMemo<BoardUser[]>(() => {
    return state.users
      .filter((user) => user.id != null)
      .map((user) => ({
        id: String(user.id),
        title: String(user.name ?? "Untitled task"),
        note: String(user.email ?? "No details returned"),
      }));
  }, [state.users]);

  const columns = useMemo(() => {
    const buckets: Record<ColumnAccent, BoardUser[]> = {
      mint: [],
      sky: [],
      gold: [],
    };

    boardUsers.forEach((user, index) => {
      const bucket =
        index % 3 === 0 ? "mint" : index % 3 === 1 ? "sky" : "gold";
      buckets[bucket].push(user);
    });

    return buckets;
  }, [boardUsers]);

  async function fetchJson<T>(url: string, init?: RequestInit) {
    const response = await fetch(url, init);
    const payload = (await response.json()) as T & ApiError;

    if (!response.ok) {
      throw new Error(
        getApiError(payload) ?? `Request failed with status ${response.status}`,
      );
    }

    const apiError = getApiError(payload);
    if (apiError) {
      throw new Error(apiError);
    }

    return payload as T;
  }

  async function loadBoard(isRefresh = false) {
    setState((current) => ({
      ...current,
      error: null,
      statusMessage: null,
      loading: current.loading && !isRefresh,
      refreshing: isRefresh,
    }));

    try {
      const [helloData, usersData] = await Promise.all([
        fetchJson<{ msg?: string }>("/api/hello"),
        fetchJson<ApiUser[]>("/api/users"),
      ]);

      setState({
        hello: helloData.msg ?? "Board ready",
        users: Array.isArray(usersData) ? usersData : [],
        loading: false,
        refreshing: false,
        error: null,
        statusMessage: isRefresh ? "Board refreshed." : "Board loaded.",
        lastLoadedAt: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: false,
        refreshing: false,
        error: error instanceof Error ? error.message : "Failed to load board",
        statusMessage: null,
      }));
    }
  }

  async function createTask() {
    if (!taskTitle.trim() || !taskNote.trim()) {
      setState((current) => ({
        ...current,
        error: "Title and note are required to create a task.",
      }));
      return;
    }

    setCreateBusy(true);
    setState((current) => ({ ...current, error: null, statusMessage: null }));

    try {
      await fetchJson("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: taskTitle.trim(),
          email: taskNote.trim(),
        }),
      });

      setTaskTitle("");
      setTaskNote("");
      setState((current) => ({
        ...current,
        statusMessage: "Task created.",
      }));
      await loadBoard(true);
    } catch (error) {
      setState((current) => ({
        ...current,
        error: error instanceof Error ? error.message : "Failed to create task",
      }));
    } finally {
      setCreateBusy(false);
    }
  }

  async function saveTask() {
    if (!editor) {
      return;
    }

    if (!editor.title.trim() || !editor.note.trim()) {
      setState((current) => ({
        ...current,
        error: "Both title and note are required to save changes.",
      }));
      return;
    }

    setSaveBusy(true);
    setState((current) => ({ ...current, error: null, statusMessage: null }));

    try {
      await fetchJson(`/api/users/${editor.id}`, {
        method: editor.mode === "patch" ? "PATCH" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editor.title.trim(),
          email: editor.note.trim(),
        }),
      });

      setEditor(null);
      setState((current) => ({
        ...current,
        statusMessage:
          editor.mode === "patch" ? "Task patched." : "Task replaced.",
      }));
      await loadBoard(true);
    } catch (error) {
      setState((current) => ({
        ...current,
        error: error instanceof Error ? error.message : "Failed to save task",
      }));
    } finally {
      setSaveBusy(false);
    }
  }

  function openDetail(userId: string) {
    router.push({ pathname: "/users/[id]", params: { id: userId } });
  }

  function beginEdit(user: BoardUser, mode: EditorState["mode"]) {
    setEditor({
      id: user.id,
      title: user.title,
      note: user.note,
      mode,
    });
    setState((current) => ({ ...current, error: null, statusMessage: null }));
  }

  async function deleteTask(id: string) {
    Alert.alert("Delete task", "This will remove the card from the board.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          void runDelete(id);
        },
      },
    ]);
  }

  async function runDelete(id: string) {
    setDeleteBusyId(id);
    setState((current) => ({ ...current, error: null, statusMessage: null }));

    try {
      await fetchJson(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (editor?.id === id) {
        setEditor(null);
      }

      setState((current) => ({
        ...current,
        statusMessage: "Task deleted.",
      }));
      await loadBoard(true);
    } catch (error) {
      setState((current) => ({
        ...current,
        error: error instanceof Error ? error.message : "Failed to delete task",
      }));
    } finally {
      setDeleteBusyId(null);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <StatusBar barStyle="light-content" />
      <View style={styles.backgroundGlowPrimary} />
      <View style={styles.backgroundGlowSecondary} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={() => {
              void loadBoard(true);
            }}
            tintColor="#f8d67a"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.pillRow}>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.livePillText}>Board online</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>Todo studio</Text>
            </View>
          </View>

          <Text style={styles.kicker}>Todo board</Text>
          <Text style={styles.heroTitle}>
            A fancy task board for your users API.
          </Text>
          <Text style={styles.heroCopy}>
            Create new cards with POST, keep them tidy with PATCH or PUT, and
            remove them with DELETE. Tap any card to open a focused detail
            screen.
          </Text>

          <View style={styles.actionRow}>
            <Pressable
              onPress={() => {
                void loadBoard(true);
              }}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Refresh board</Text>
            </Pressable>
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>
                {state.lastLoadedAt
                  ? `Synced ${state.lastLoadedAt}`
                  : "Waiting for first sync"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Hello payload</Text>
            <Text style={styles.statValue}>{state.hello}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Tasks</Text>
            <Text style={styles.statValue}>{boardUsers.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Status</Text>
            <Text style={styles.statValue}>
              {state.error ? "Attention" : (state.statusMessage ?? "Ready")}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Create task</Text>
          <Text style={styles.sectionCaption}>
            Use the POST route to add a new card to the board.
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Task title</Text>
            <TextInput
              value={taskTitle}
              onChangeText={setTaskTitle}
              placeholder="Write a task title"
              placeholderTextColor="#61728c"
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Task note</Text>
            <TextInput
              value={taskNote}
              onChangeText={setTaskNote}
              placeholder="Add a short note"
              placeholderTextColor="#61728c"
              style={styles.input}
            />
          </View>

          <View style={styles.formActionRow}>
            <Pressable
              onPress={() => {
                void createTask();
              }}
              disabled={createBusy}
              style={({ pressed }) => [
                styles.primaryButton,
                createBusy && styles.disabledButton,
                pressed && !createBusy && styles.buttonPressed,
              ]}
            >
              {createBusy ? (
                <ActivityIndicator color="#08111f" />
              ) : (
                <Text style={styles.primaryButtonText}>Create task</Text>
              )}
            </Pressable>
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>POST /api/users</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Route board</Text>
          <Text style={styles.sectionCaption}>
            The cards below map to your local CRUD routes.
          </Text>
        </View>

        <View style={styles.routeStack}>
          {routeCards.map((card) => {
            const toneStyle =
              card.tone === "mint"
                ? styles.mintTone
                : card.tone === "gold"
                  ? styles.goldTone
                  : card.tone === "sky"
                    ? styles.skyTone
                    : card.tone === "violet"
                      ? styles.violetTone
                      : card.tone === "rose"
                        ? styles.roseTone
                        : styles.crimsonTone;

            return (
              <View key={card.label} style={styles.routeCard}>
                <View style={styles.routeTopRow}>
                  <Text style={styles.routeLabel}>{card.label}</Text>
                  <View style={[styles.toneBadge, toneStyle]}>
                    <Text style={styles.toneBadgeText}>
                      {card.tone.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.routeValue}>{card.value}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Columns</Text>
          <Text style={styles.sectionCaption}>
            Tap a card to open the detail screen for that task.
          </Text>
        </View>

        {state.loading ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator color="#f8d67a" />
            <Text style={styles.loadingText}>
              Loading the board from your API.
            </Text>
          </View>
        ) : state.error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Couldn’t load the board</Text>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        ) : boardUsers.length > 0 ? (
          <View style={styles.boardGrid}>
            <BoardColumn
              title="Todo"
              subtitle={`${columns.mint.length} waiting`}
              accent="mint"
              users={columns.mint}
              onOpen={openDetail}
              onEdit={(user) => beginEdit(user, "patch")}
              onDelete={deleteTask}
              deleteBusyId={deleteBusyId}
            />
            <BoardColumn
              title="Doing"
              subtitle={`${columns.sky.length} in progress`}
              accent="sky"
              users={columns.sky}
              onOpen={openDetail}
              onEdit={(user) => beginEdit(user, "put")}
              onDelete={deleteTask}
              deleteBusyId={deleteBusyId}
            />
            <BoardColumn
              title="Done"
              subtitle={`${columns.gold.length} finished`}
              accent="gold"
              users={columns.gold}
              onOpen={openDetail}
              onEdit={(user) => beginEdit(user, "patch")}
              onDelete={deleteTask}
              deleteBusyId={deleteBusyId}
            />
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptyText}>
              Create the first task above and it will appear on the board.
            </Text>
          </View>
        )}

        {editor ? (
          <View style={styles.editorCard}>
            <View style={styles.editorTopRow}>
              <Text style={styles.editorTitle}>Editing task #{editor.id}</Text>
              <Pressable
                onPress={() => setEditor(null)}
                style={styles.editorCloseButton}
              >
                <Text style={styles.editorCloseText}>Close</Text>
              </Pressable>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Task title</Text>
              <TextInput
                value={editor.title}
                onChangeText={(value) =>
                  setEditor((current) =>
                    current ? { ...current, title: value } : current,
                  )
                }
                placeholderTextColor="#61728c"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Task note</Text>
              <TextInput
                value={editor.note}
                onChangeText={(value) =>
                  setEditor((current) =>
                    current ? { ...current, note: value } : current,
                  )
                }
                placeholderTextColor="#61728c"
                style={styles.input}
              />
            </View>

            <View style={styles.editorActionRow}>
              <Pressable
                onPress={() =>
                  setEditor((current) =>
                    current ? { ...current, mode: "patch" } : current,
                  )
                }
                style={({ pressed }) => [
                  styles.toggleButton,
                  editor.mode === "patch" && styles.toggleButtonActive,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    editor.mode === "patch" && styles.toggleButtonTextActive,
                  ]}
                >
                  PATCH
                </Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  setEditor((current) =>
                    current ? { ...current, mode: "put" } : current,
                  )
                }
                style={({ pressed }) => [
                  styles.toggleButton,
                  editor.mode === "put" && styles.toggleButtonActive,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    editor.mode === "put" && styles.toggleButtonTextActive,
                  ]}
                >
                  PUT
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  void saveTask();
                }}
                disabled={saveBusy}
                style={({ pressed }) => [
                  styles.primaryButton,
                  saveBusy && styles.disabledButton,
                  pressed && !saveBusy && styles.buttonPressed,
                ]}
              >
                {saveBusy ? (
                  <ActivityIndicator color="#08111f" />
                ) : (
                  <Text style={styles.primaryButtonText}>Save task</Text>
                )}
              </Pressable>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function BoardColumn({
  title,
  subtitle,
  accent,
  users,
  onOpen,
  onEdit,
  onDelete,
  deleteBusyId,
}: {
  title: string;
  subtitle: string;
  accent: ColumnAccent;
  users: BoardUser[];
  onOpen: (id: string) => void;
  onEdit: (user: BoardUser) => void;
  onDelete: (id: string) => void;
  deleteBusyId: string | null;
}) {
  return (
    <View style={styles.columnCard}>
      <View style={styles.columnHeader}>
        <View>
          <Text style={styles.columnTitle}>{title}</Text>
          <Text style={styles.columnSubtitle}>{subtitle}</Text>
        </View>
        <View
          style={[
            styles.columnAccent,
            accent === "mint"
              ? styles.mintTone
              : accent === "sky"
                ? styles.skyTone
                : styles.goldTone,
          ]}
        />
      </View>

      <View style={styles.columnList}>
        {users.length > 0 ? (
          users.map((user, index) => {
            const initials = getInitials(user.title);

            return (
              <Pressable
                key={user.id}
                onPress={() => onOpen(user.id)}
                style={({ pressed }) => [
                  styles.taskCard,
                  pressed && styles.cardPressed,
                ]}
              >
                <View style={styles.taskTopRow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials}</Text>
                  </View>
                  <View style={styles.taskBody}>
                    <Text style={styles.taskTitle}>{user.title}</Text>
                    <Text style={styles.taskNote}>{user.note}</Text>
                  </View>
                  <View style={styles.indexBadge}>
                    <Text style={styles.indexBadgeText}>{index + 1}</Text>
                  </View>
                </View>

                <View style={styles.cardActionRow}>
                  <Pressable
                    onPress={() => onOpen(user.id)}
                    style={({ pressed }) => [
                      styles.smallActionButton,
                      styles.smallActionButtonSecondary,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.smallActionButtonText}>Open</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => onEdit(user)}
                    style={({ pressed }) => [
                      styles.smallActionButton,
                      styles.smallActionButtonSecondary,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.smallActionButtonText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => onDelete(user.id)}
                    disabled={deleteBusyId === user.id}
                    style={({ pressed }) => [
                      styles.smallActionButton,
                      styles.smallActionButtonDanger,
                      (deleteBusyId === user.id || pressed) &&
                        styles.buttonPressed,
                      deleteBusyId === user.id && styles.disabledButton,
                    ]}
                  >
                    {deleteBusyId === user.id ? (
                      <ActivityIndicator color="#ffd8d8" size="small" />
                    ) : (
                      <Text style={styles.smallActionButtonText}>Delete</Text>
                    )}
                  </Pressable>
                </View>
              </Pressable>
            );
          })
        ) : (
          <View style={styles.emptyLaneCard}>
            <Text style={styles.emptyLaneTitle}>Empty lane</Text>
            <Text style={styles.emptyLaneText}>
              Add a new task or refresh the board to populate this column.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function getApiError(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const typedPayload = payload as ApiError;
  return typedPayload.err ?? typedPayload.message ?? null;
}

function getInitials(text: string) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "?")
    .join("");
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#07111f",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 40,
    gap: 18,
  },
  backgroundGlowPrimary: {
    position: "absolute",
    top: -120,
    right: -100,
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: "rgba(248, 214, 122, 0.18)",
  },
  backgroundGlowSecondary: {
    position: "absolute",
    top: 160,
    left: -120,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: "rgba(86, 168, 255, 0.16)",
  },
  heroCard: {
    borderRadius: 32,
    padding: 24,
    backgroundColor: "rgba(9, 19, 34, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    gap: 14,
  },
  pillRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(34, 197, 94, 0.16)",
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#7cf29a",
  },
  livePillText: {
    color: "#d7ffe1",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  metaPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  metaPillText: {
    color: "#c7d5ea",
    fontSize: 12,
    fontWeight: "600",
  },
  kicker: {
    color: "#f8d67a",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  heroTitle: {
    color: "#f7fbff",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
  },
  heroCopy: {
    color: "#a8b7cc",
    fontSize: 15,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: "#f8d67a",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#0a1220",
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    minHeight: 50,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  secondaryButtonText: {
    color: "#d7e1ef",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  disabledButton: {
    opacity: 0.65,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: 104,
    borderRadius: 24,
    padding: 18,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    gap: 10,
  },
  statLabel: {
    color: "#93a7c3",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  statValue: {
    color: "#f7fbff",
    fontSize: 17,
    fontWeight: "800",
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    color: "#f7fbff",
    fontSize: 21,
    fontWeight: "800",
  },
  sectionCaption: {
    color: "#8fa2bf",
    fontSize: 13,
    lineHeight: 19,
  },
  formCard: {
    borderRadius: 28,
    padding: 18,
    gap: 14,
    backgroundColor: "rgba(10, 19, 34, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: "#c8d4e4",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  input: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#f7fbff",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    fontSize: 15,
  },
  formActionRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
  },
  routeStack: {
    gap: 12,
  },
  routeCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: "rgba(10, 19, 34, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    gap: 10,
  },
  routeTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  routeLabel: {
    color: "#edf4ff",
    fontSize: 15,
    fontWeight: "700",
  },
  routeValue: {
    color: "#9fb0c9",
    fontSize: 13,
  },
  toneBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  toneBadgeText: {
    color: "#06101d",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  mintTone: {
    backgroundColor: "#9cf5c0",
  },
  goldTone: {
    backgroundColor: "#f8d67a",
  },
  skyTone: {
    backgroundColor: "#8bc7ff",
  },
  violetTone: {
    backgroundColor: "#c9b3ff",
  },
  roseTone: {
    backgroundColor: "#ffb8d1",
  },
  crimsonTone: {
    backgroundColor: "#ff9e9e",
  },
  loadingCard: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  loadingText: {
    color: "#c7d5ea",
    fontSize: 14,
  },
  errorCard: {
    borderRadius: 28,
    padding: 18,
    gap: 10,
    backgroundColor: "rgba(239, 68, 68, 0.16)",
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.25)",
  },
  errorTitle: {
    color: "#ffe7e7",
    fontSize: 16,
    fontWeight: "800",
  },
  errorText: {
    color: "#ffd0d0",
    fontSize: 13,
    lineHeight: 19,
  },
  boardGrid: {
    gap: 14,
  },
  columnCard: {
    borderRadius: 30,
    padding: 18,
    gap: 14,
    backgroundColor: "rgba(10, 19, 34, 0.86)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  columnHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  columnTitle: {
    color: "#f7fbff",
    fontSize: 18,
    fontWeight: "800",
  },
  columnSubtitle: {
    color: "#91a3bc",
    fontSize: 13,
    marginTop: 3,
  },
  columnAccent: {
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  columnList: {
    gap: 12,
  },
  taskCard: {
    borderRadius: 24,
    padding: 16,
    gap: 14,
    backgroundColor: "rgba(7, 17, 31, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  taskTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(248, 214, 122, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(248, 214, 122, 0.35)",
  },
  avatarText: {
    color: "#f8d67a",
    fontSize: 15,
    fontWeight: "900",
  },
  taskBody: {
    flex: 1,
    gap: 6,
  },
  taskTitle: {
    color: "#f7fbff",
    fontSize: 16,
    fontWeight: "700",
  },
  taskNote: {
    color: "#97a9c4",
    fontSize: 13,
  },
  indexBadge: {
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  indexBadgeText: {
    color: "#d8e4f3",
    fontSize: 12,
    fontWeight: "700",
  },
  cardActionRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  smallActionButton: {
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  smallActionButtonSecondary: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  smallActionButtonDanger: {
    backgroundColor: "rgba(248, 113, 113, 0.16)",
  },
  smallActionButtonText: {
    color: "#f7fbff",
    fontSize: 13,
    fontWeight: "700",
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.992 }],
  },
  emptyCard: {
    borderRadius: 28,
    padding: 20,
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  emptyTitle: {
    color: "#f7fbff",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    color: "#95a6c0",
    fontSize: 13,
    lineHeight: 19,
  },
  emptyLaneCard: {
    borderRadius: 22,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  emptyLaneTitle: {
    color: "#f7fbff",
    fontSize: 14,
    fontWeight: "700",
  },
  emptyLaneText: {
    color: "#91a3bc",
    fontSize: 12,
    marginTop: 6,
  },
  editorCard: {
    borderRadius: 28,
    padding: 18,
    gap: 14,
    backgroundColor: "rgba(10, 19, 34, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  editorTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  editorTitle: {
    color: "#f7fbff",
    fontSize: 14,
    fontWeight: "800",
  },
  editorCloseButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  editorCloseText: {
    color: "#c9d8eb",
    fontSize: 12,
    fontWeight: "700",
  },
  editorActionRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  toggleButton: {
    minHeight: 42,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    justifyContent: "center",
  },
  toggleButtonActive: {
    backgroundColor: "rgba(248, 214, 122, 0.2)",
  },
  toggleButtonText: {
    color: "#d0dbe9",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  toggleButtonTextActive: {
    color: "#f8d67a",
  },
});
