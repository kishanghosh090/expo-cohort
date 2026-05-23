import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Pressable,
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

type DetailState = {
  loading: boolean;
  error: string | null;
  user: ApiUser | null;
};

type EditorMode = "patch" | "put";

export default function UserDetailScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const resolvedId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [state, setState] = useState<DetailState>({
    loading: true,
    error: null,
    user: null,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<EditorMode>("patch");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!resolvedId) {
      setState({
        loading: false,
        error: "Missing user id.",
        user: null,
      });
      return;
    }

    void loadUser(resolvedId);
  }, [resolvedId]);

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

  async function loadUser(userId: string) {
    setState((current) => ({ ...current, loading: true, error: null }));

    try {
      const userData = await fetchJson<ApiUser>(`/api/users/${userId}`);
      const nextUser = {
        ...userData,
        id: String(userData.id ?? userId),
        name: String(userData.name ?? "Untitled task"),
        email: String(userData.email ?? "No details returned"),
      };

      setState({
        loading: false,
        error: null,
        user: nextUser,
      });
      setName(nextUser.name);
      setEmail(nextUser.email);
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load user",
        user: null,
      });
    }
  }

  async function saveUser() {
    if (!resolvedId) {
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setState((current) => ({
        ...current,
        error: "Both title and details are required.",
      }));
      return;
    }

    setSaving(true);
    setState((current) => ({ ...current, error: null }));

    try {
      await fetchJson(`/api/users/${resolvedId}`, {
        method: mode === "patch" ? "PATCH" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
        }),
      });

      await loadUser(resolvedId);
    } catch (error) {
      setState((current) => ({
        ...current,
        error: error instanceof Error ? error.message : "Failed to save user",
      }));
    } finally {
      setSaving(false);
    }
  }

  async function deleteUser() {
    if (!resolvedId) {
      return;
    }

    Alert.alert("Delete task", "This removes the task from the board.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          void runDelete();
        },
      },
    ]);
  }

  async function runDelete() {
    if (!resolvedId) {
      return;
    }

    setDeleting(true);
    setState((current) => ({ ...current, error: null }));

    try {
      await fetchJson(`/api/users/${resolvedId}`, {
        method: "DELETE",
      });
      router.back();
    } catch (error) {
      setState((current) => ({
        ...current,
        error: error instanceof Error ? error.message : "Failed to delete user",
      }));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <StatusBar barStyle="light-content" />
      <View style={styles.backgroundGlowPrimary} />
      <View style={styles.backgroundGlowSecondary} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <View style={styles.pillRow}>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.livePillText}>Task detail</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>Users API</Text>
            </View>
          </View>

          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to board</Text>
          </Pressable>

          <Text style={styles.kicker}>User card</Text>
          <Text style={styles.heroTitle}>
            {state.user?.name ??
              (state.loading ? "Loading task..." : "Task not found")}
          </Text>
          <Text style={styles.heroCopy}>
            This detail screen is opened by tapping a card on the board. You can
            update it with PATCH or PUT, then delete it if the task is finished.
          </Text>
        </View>

        {state.loading ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator color="#f8d67a" />
            <Text style={styles.loadingText}>Loading the selected task.</Text>
          </View>
        ) : state.error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Couldn’t load task</Text>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        ) : state.user ? (
          <View style={styles.detailStack}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Task title</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Task title"
                placeholderTextColor="#61728c"
                style={styles.input}
              />
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Task details</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Task details"
                placeholderTextColor="#61728c"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Edit mode</Text>
              <View style={styles.modeRow}>
                <Pressable
                  onPress={() => setMode("patch")}
                  style={({ pressed }) => [
                    styles.modeButton,
                    mode === "patch" && styles.modeButtonActive,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.modeButtonText,
                      mode === "patch" && styles.modeButtonTextActive,
                    ]}
                  >
                    PATCH
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setMode("put")}
                  style={({ pressed }) => [
                    styles.modeButton,
                    mode === "put" && styles.modeButtonActive,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.modeButtonText,
                      mode === "put" && styles.modeButtonTextActive,
                    ]}
                  >
                    PUT
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Actions</Text>
              <View style={styles.actionRow}>
                <Pressable
                  onPress={() => {
                    void saveUser();
                  }}
                  disabled={saving}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    saving && styles.disabledButton,
                    pressed && !saving && styles.buttonPressed,
                  ]}
                >
                  {saving ? (
                    <ActivityIndicator color="#08111f" />
                  ) : (
                    <Text style={styles.primaryButtonText}>Save</Text>
                  )}
                </Pressable>
                <Pressable
                  onPress={() => {
                    void deleteUser();
                  }}
                  disabled={deleting}
                  style={({ pressed }) => [
                    styles.dangerButton,
                    deleting && styles.disabledButton,
                    pressed && !deleting && styles.buttonPressed,
                  ]}
                >
                  {deleting ? (
                    <ActivityIndicator color="#ffe1e1" />
                  ) : (
                    <Text style={styles.dangerButtonText}>Delete</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function getApiError(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const typedPayload = payload as ApiError;
  return typedPayload.err ?? typedPayload.message ?? null;
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
    top: -110,
    right: -100,
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: "rgba(248, 214, 122, 0.18)",
  },
  backgroundGlowSecondary: {
    position: "absolute",
    top: 180,
    left: -120,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: "rgba(86, 168, 255, 0.16)",
  },
  headerCard: {
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
  backButton: {
    alignSelf: "flex-start",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  backButtonText: {
    color: "#d8e4f3",
    fontSize: 13,
    fontWeight: "700",
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
  detailStack: {
    gap: 14,
  },
  detailCard: {
    borderRadius: 28,
    padding: 18,
    gap: 10,
    backgroundColor: "rgba(10, 19, 34, 0.86)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  detailLabel: {
    color: "#93a7c3",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
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
  modeRow: {
    flexDirection: "row",
    gap: 10,
  },
  modeButton: {
    minHeight: 42,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    justifyContent: "center",
  },
  modeButtonActive: {
    backgroundColor: "rgba(248, 214, 122, 0.2)",
  },
  modeButtonText: {
    color: "#d0dbe9",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  modeButtonTextActive: {
    color: "#f8d67a",
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
  dangerButton: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: "rgba(248, 113, 113, 0.18)",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  dangerButtonText: {
    color: "#ffe1e1",
    fontSize: 15,
    fontWeight: "800",
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  disabledButton: {
    opacity: 0.65,
  },
});
