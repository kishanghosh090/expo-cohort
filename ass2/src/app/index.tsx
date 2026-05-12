import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useColorScheme,
  useWindowDimensions,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNotes } from "@/contexts/notes-context";

type ThemeMode = "auto" | "light" | "dark";

export default function NotesListScreen() {
  const systemScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [focusMode, setFocusMode] = useState(false);
  const { notes, activeNoteId, setActiveNoteId, createNote, deleteNote } =
    useNotes();

  const effectiveScheme = mode === "auto" ? systemScheme : mode;
  const isDark = effectiveScheme === "dark";

  const colors = useMemo(
    () =>
      isDark
        ? {
            background: "#0E0F12",
            surface: "#1A1D22",
            surfaceElevated: "#20242B",
            text: "#F2F5F9",
            textSecondary: "#A9B3C1",
            accent: "#81C7F5",
            border: "#2B313A",
            shadow: "#000000",
          }
        : {
            background: "#F6F4F0",
            surface: "#FFFFFF",
            surfaceElevated: "#F1ECE4",
            text: "#1B1E23",
            textSecondary: "#5B6572",
            accent: "#1C6EA4",
            border: "#E5DED3",
            shadow: "#2D1F0A",
          },
    [isDark],
  );

  const filteredNotes = notes.filter((note) => {
    const target = `${note.title} ${note.content}`.toLowerCase();
    return target.includes(query.trim().toLowerCase());
  });

  const isTablet = width >= 900;
  const numColumns = isTablet ? 2 : 1;
  const listPadding = width >= 1200 ? 48 : 24;
  const cardGap = width >= 900 ? 20 : 14;
  const cardWidth =
    (width - listPadding * 2 - cardGap * (numColumns - 1)) / numColumns;

  const baseCardStyle = StyleSheet.flatten([
    styles.noteCard,
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      width: cardWidth,
    },
  ]) as ViewStyle;

  const focusCardStyle = StyleSheet.flatten([
    baseCardStyle,
    focusMode && styles.noteCardFocus,
  ]) as ViewStyle;

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { paddingHorizontal: listPadding }]}>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.text }]}>Notes</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {filteredNotes.length} notes total
          </Text>
        </View>
        <View style={[styles.searchWrapper, { borderColor: colors.border }]}>
          <Text style={[styles.searchLabel, { color: colors.textSecondary }]}>
            Search
          </Text>
          <TextInput
            placeholder="Find a note"
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.primaryAction,
            { backgroundColor: colors.accent },
            pressed && styles.cardPressed,
          ]}
          onPress={() => createNote("", "")}
        >
          <Text style={styles.primaryActionText}>New Note</Text>
        </Pressable>
      </View>

      <View style={[styles.togglesRow, { paddingHorizontal: listPadding }]}>
        <View style={styles.toggleItem}>
          <Text style={[styles.toggleLabel, { color: colors.text }]}>
            Dark mode
          </Text>
          <Switch
            value={mode === "dark"}
            onValueChange={(value) => setMode(value ? "dark" : "auto")}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.surface}
          />
        </View>
        <View style={styles.toggleItem}>
          <Text style={[styles.toggleLabel, { color: colors.text }]}>
            Light mode
          </Text>
          <Switch
            value={mode === "light"}
            onValueChange={(value) => setMode(value ? "light" : "auto")}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.surface}
          />
        </View>
        <View style={styles.toggleItem}>
          <Text style={[styles.toggleLabel, { color: colors.text }]}>
            Focus
          </Text>
          <Switch
            value={focusMode}
            onValueChange={setFocusMode}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.surface}
          />
        </View>
      </View>

      <FlatList
        data={filteredNotes}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: listPadding, paddingBottom: 32 },
        ]}
        columnWrapperStyle={numColumns > 1 ? { gap: cardGap } : undefined}
        ItemSeparatorComponent={() => <View style={{ height: cardGap }} />}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              focusCardStyle,
              pressed && styles.cardPressed,
            ]}
            onPress={() => setActiveNoteId(item.id)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                {activeNoteId === item.id && (
                  <View
                    style={[styles.activeBadge, { borderColor: colors.accent }]}
                  >
                    <Text
                      style={[styles.activeBadgeText, { color: colors.accent }]}
                    >
                      Active
                    </Text>
                  </View>
                )}
              </View>
              <Text style={[styles.cardDate, { color: colors.textSecondary }]}>
                {item.updatedAt}
              </Text>
            </View>
            <Text
              style={[
                styles.cardPreview,
                { color: colors.textSecondary },
                focusMode && styles.cardPreviewFocus,
              ]}
              numberOfLines={focusMode ? 5 : 3}
            >
              {item.content}
            </Text>
            <View style={styles.cardActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.cardActionButton,
                  { borderColor: colors.border },
                  pressed && styles.cardPressed,
                ]}
                onPress={() => setActiveNoteId(item.id)}
              >
                <Text style={[styles.cardActionText, { color: colors.text }]}>
                  Edit
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.cardActionButton,
                  { borderColor: colors.border },
                  pressed && styles.cardPressed,
                ]}
                onPress={() => deleteNote(item.id)}
              >
                <Text
                  style={[
                    styles.cardActionText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={[styles.emptyState, { borderColor: colors.border }]}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No notes found
            </Text>
            <Text style={[styles.emptyBody, { color: colors.textSecondary }]}>
              Try a different search or create a fresh note.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 18,
    gap: 16,
  },
  headerText: {
    gap: 6,
  },
  primaryAction: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 0.2,
  },
  searchWrapper: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  searchInput: {
    fontSize: 16,
    paddingVertical: 4,
  },
  togglesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    gap: 16,
    flexWrap: "wrap",
  },
  toggleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    paddingTop: 8,
  },
  noteCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    minHeight: 150,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  noteCardFocus: {
    padding: 22,
    minHeight: 180,
  },
  cardHeader: {
    gap: 6,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  activeBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  cardDate: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  cardPreview: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  cardPreviewFocus: {
    fontSize: 15,
    lineHeight: 22,
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  cardActionButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  cardActionText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  emptyState: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 24,
    marginTop: 24,
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyBody: {
    fontSize: 13,
    textAlign: "center",
  },
});
