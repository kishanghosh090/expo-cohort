import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNotes } from "@/contexts/notes-context";

export default function NoteEditorScreen() {
  const systemScheme = useColorScheme();
  const { height, width } = useWindowDimensions();
  const isDark = systemScheme === "dark";
  const isTablet = width >= 900;
  const {
    notes,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();
  const activeNote = notes.find((note) => note.id === activeNoteId) ?? null;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(activeNote?.title ?? "");
    setContent(activeNote?.content ?? "");
  }, [activeNoteId, activeNote?.title, activeNote?.content]);

  const colors = isDark
    ? {
        background: "#0E0F12",
        surface: "#171A1F",
        text: "#F3F6FA",
        textSecondary: "#A9B3C1",
        accent: "#81C7F5",
        border: "#2B313A",
      }
    : {
        background: "#F6F4F0",
        surface: "#FFFFFF",
        text: "#1B1E23",
        textSecondary: "#5B6572",
        accent: "#1C6EA4",
        border: "#E5DED3",
      };

  const headerHeight = Math.max(160, Math.min(240, height * 0.28));
  const contentPadding = isTablet ? 48 : 24;

  const overlayStyle = StyleSheet.flatten([
    styles.headerOverlay,
    {
      backgroundColor: isDark
        ? "rgba(11, 13, 16, 0.55)"
        : "rgba(255, 255, 255, 0.65)",
    },
  ]);

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 }]}
          keyboardShouldPersistTaps="handled"
        >
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
            }}
            resizeMode="cover"
            style={[styles.header, { height: headerHeight }]}
            imageStyle={styles.headerImage}
          >
            <View style={overlayStyle}>
              <View
                style={[
                  styles.headerBar,
                  { paddingHorizontal: contentPadding },
                ]}
              >
                <Pressable
                  style={({ pressed }) => [
                    styles.ghostButton,
                    { borderColor: colors.border },
                    pressed && styles.pressed,
                  ]}
                  onPress={() => setActiveNoteId(null)}
                >
                  <Text
                    style={[styles.ghostButtonText, { color: colors.text }]}
                  >
                    Back
                  </Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    { backgroundColor: colors.accent },
                    pressed && styles.pressed,
                  ]}
                  onPress={() => {
                    if (activeNoteId) {
                      updateNote(activeNoteId, title, content);
                      return;
                    }
                    createNote(title, content);
                  }}
                >
                  <Text style={styles.primaryButtonText}>Save</Text>
                </Pressable>
              </View>
              <View
                style={[
                  styles.headerText,
                  { paddingHorizontal: contentPadding },
                ]}
              >
                <Text
                  style={[
                    styles.headerEyebrow,
                    { color: colors.textSecondary },
                  ]}
                >
                  Note Editor
                </Text>
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                  Write something worth keeping.
                </Text>
              </View>
            </View>
          </ImageBackground>

          <View
            style={[
              styles.editorCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              { marginHorizontal: contentPadding },
            ]}
          >
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
              Title
            </Text>
            <TextInput
              placeholder="Add a strong title"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
              style={[styles.titleInput, { color: colors.text }]}
            />

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
              Note
            </Text>
            <TextInput
              placeholder="Start typing your note..."
              placeholderTextColor={colors.textSecondary}
              multiline
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
              style={[styles.bodyInput, { color: colors.text }]}
            />
            <View style={styles.editorActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  { borderColor: colors.border },
                  pressed && styles.pressed,
                ]}
                onPress={() => {
                  setTitle("");
                  setContent("");
                  setActiveNoteId(null);
                }}
              >
                <Text
                  style={[styles.secondaryButtonText, { color: colors.text }]}
                >
                  New Draft
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  { borderColor: colors.border },
                  pressed && styles.pressed,
                ]}
                onPress={() => {
                  if (!activeNoteId) {
                    return;
                  }
                  deleteNote(activeNoteId);
                  setTitle("");
                  setContent("");
                }}
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    justifyContent: "flex-end",
  },
  headerImage: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerOverlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 8,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ghostButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  ghostButtonText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  primaryButton: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  pressed: {
    opacity: 0.85,
  },
  headerText: {
    gap: 6,
  },
  headerEyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    maxWidth: 320,
  },
  editorCard: {
    marginTop: -24,
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    gap: 14,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  editorActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  inputLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 4,
  },
  bodyInput: {
    minHeight: 220,
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 12,
  },
});
