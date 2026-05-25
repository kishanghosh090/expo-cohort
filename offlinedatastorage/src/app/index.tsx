import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// import * as FileSystem from "expo-file-system/legacy"; // legecy

import { Directory, File, Paths } from "expo-file-system";

const HomeScreen = () => {
  const [output, setOutput] = useState("");
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [image, setImage] = useState<any>();

  const demoFile = new File(Paths.document, "demo.txt");
  const copiedFile = new File(Paths.document, "copied-demo.txt");
  const movedFile = new File(Paths.cache, "demo-moved.txt");

  const runAction = async (label: string, action: () => Promise<unknown>) => {
    setBusyAction(label);

    try {
      await action();
    } finally {
      setBusyAction(null);
    }
  };

  const writeFile = async () => {
    await demoFile.write("hello from kishan rana ghosh");
    setOutput(`Wrote ${demoFile.name}`);
  };

  const readFile = async () => {
    const data = await demoFile.text();
    console.log(data);
    setOutput(data);
    return data;
  };

  const appendFile = async () => {
    const oldData = await readFile();
    await demoFile.write(`${oldData} this is kishan from chai code`);
    setOutput("Appended to demo.txt");
  };

  const copy = async () => {
    if (copiedFile.exists) {
      copiedFile.delete();
    }

    await demoFile.copy(copiedFile);
    setOutput(`Copied to ${copiedFile.name}`);
  };

  const moveFile = async () => {
    if (movedFile.exists) {
      movedFile.delete();
    }

    await demoFile.move(movedFile);
    setOutput(`Moved to ${movedFile.uri}`);
  };

  const prepareFile = async () => {
    if (!demoFile.exists) {
      demoFile.create();
      await demoFile.write("hello from kishan rana ghosh");
    }

    setOutput(`Ready: ${demoFile.uri}`);
  };

  const deleteAll = async () => {
    await demoFile.delete();
  };

  const getFileInfo = () => {
    const info = {
      exist: demoFile.exists,
      size: demoFile.size,
      uri: demoFile.uri,
      name: demoFile.name,
    };
    setOutput(JSON.stringify(info));
    return info;
  };

  const statusLines = [
    {
      label: "Demo file",
      value: demoFile.exists ? demoFile.name : "Not created yet",
      tone: demoFile.exists ? "success" : "muted",
    },
    {
      label: "Copied file",
      value: copiedFile.exists ? copiedFile.name : "Not copied yet",
      tone: copiedFile.exists ? "success" : "muted",
    },
    {
      label: "Moved file",
      value: movedFile.exists ? movedFile.name : "Not moved yet",
      tone: movedFile.exists ? "success" : "muted",
    },
  ];

  const actions = [
    {
      label: "Prepare",
      hint: "Create demo.txt if needed",
      onPress: prepareFile,
    },
    { label: "Write", hint: "Replace with sample content", onPress: writeFile },
    { label: "Read", hint: "Show current file contents", onPress: readFile },
    { label: "Append", hint: "Add more text to the file", onPress: appendFile },
    { label: "Copy", hint: "Duplicate into copied-demo.txt", onPress: copy },
    { label: "Move", hint: "Relocate to cache storage", onPress: moveFile },
  ];

  const notesDirectory = new Directory(Paths.document, "notes");
  const createFolder = () => {
    notesDirectory.create();
  };
  // createFolder();

  const readDir = async () => {
    const files = await notesDirectory.list()[0];
    console.log(files);
    setImage(files.uri)

  };
  readDir();


  const download = async () => {
    const download = await File.downloadFileAsync(
      "https://avatars.githubusercontent.com/u/129781766?v=4",
      notesDirectory,
    );

    setImage(download.uri);
  };
  // download();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: image ? image : "" }} height={300} width={300} />
        <View style={styles.heroCard}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Offline storage</Text>
            </View>
            <View style={styles.badgeAlt}>
              <Text style={styles.badgeAltText}>expo-file-system</Text>
            </View>
          </View>

          <Text style={styles.title}>File storage playground</Text>
          <Text style={styles.subtitle}>
            Create, read, append, copy, and move local files with a cleaner
            interface.
          </Text>

          <View style={styles.outputCard}>
            <Text style={styles.outputLabel}>Latest result</Text>
            <Text style={styles.outputText} numberOfLines={3}>
              {output || "Tap an action to see the result here."}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Storage overview</Text>
          <Text style={styles.sectionCaption}>
            Current file state at a glance
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {statusLines.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text
                style={[
                  styles.statValue,
                  item.tone === "success"
                    ? styles.statValueSuccess
                    : styles.statValueMuted,
                ]}
                numberOfLines={2}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <Text style={styles.sectionCaption}>
            Each button updates the file and status panel
          </Text>
        </View>

        <View style={styles.actionsGrid}>
          {actions.map((action) => {
            const isActive = busyAction === action.label;

            return (
              <Pressable
                key={action.label}
                onPress={() => runAction(action.label, action.onPress)}
                style={({ pressed }) => [
                  styles.actionCard,
                  pressed && styles.actionCardPressed,
                  isActive && styles.actionCardBusy,
                ]}
              >
                <Text style={styles.actionLabel}>{action.label}</Text>
                <Text style={styles.actionHint}>{action.hint}</Text>
                <Text style={styles.actionStatus}>
                  {isActive ? "Working..." : "Tap to run"}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#07111f",
  },
  container: {
    padding: 20,
    gap: 18,
    backgroundColor: "#07111f",
  },
  heroCard: {
    borderRadius: 28,
    padding: 20,
    backgroundColor: "#0f1d33",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 6,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#d7f8c7",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: "#16321c",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  badgeAlt: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeAltText: {
    color: "#d8e2f1",
    fontWeight: "600",
    fontSize: 12,
  },
  title: {
    color: "#f4f7fb",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginBottom: 10,
  },
  subtitle: {
    color: "#a9b9d2",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  outputCard: {
    borderRadius: 22,
    padding: 16,
    backgroundColor: "rgba(7,17,31,0.7)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  outputLabel: {
    color: "#7f93b3",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 8,
  },
  outputText: {
    color: "#f7fbff",
    fontSize: 15,
    lineHeight: 22,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    color: "#f4f7fb",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  sectionCaption: {
    color: "#8fa3c1",
    fontSize: 13,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: "30%",
    minWidth: 160,
    borderRadius: 22,
    padding: 16,
    backgroundColor: "#101b2d",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statLabel: {
    color: "#8091ae",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  statValueSuccess: {
    color: "#d8f4d3",
  },
  statValueMuted: {
    color: "#f4f7fb",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    flexGrow: 1,
    flexBasis: "45%",
    minWidth: 160,
    borderRadius: 22,
    padding: 16,
    backgroundColor: "#132238",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 3,
  },
  actionCardPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: "#17304c",
  },
  actionCardBusy: {
    borderColor: "#d7f8c7",
  },
  actionLabel: {
    color: "#f4f7fb",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
  },
  actionHint: {
    color: "#9eb0cb",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  actionStatus: {
    color: "#d7f8c7",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
});
