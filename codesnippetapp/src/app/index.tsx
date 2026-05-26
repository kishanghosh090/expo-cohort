import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import CodeCard from "@/components/CodeCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorPalettes } from "@/theme/colorPalettes";


const demoSnippets = [
  {
    id: 1,
    title: "Array shuffle helper",
    lang: "javascript",
    code: "const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);",
    isFav: true,
    createdAt: "May 26, 2026",
    updatedAt: "May 26, 2026",
  },
  {
    id: 2,
    title: "Fetch with timeout",
    lang: "typescript",
    code: "const withTimeout = (p, ms) => Promise.race([p, new Promise((_, r) => setTimeout(r, ms))]);",
    isFav: false,
    createdAt: "May 24, 2026",
    updatedAt: "May 25, 2026",
  },
  {
    id: 3,
    title: "React state toggle",
    lang: "javascript",
    code: "const toggle = () => setOpen((prev) => !prev);",
    isFav: false,
    createdAt: "May 21, 2026",
    updatedAt: "May 22, 2026",
  },
  {
    id: 4,
    title: "Debounce utility",
    lang: "javascript",
    code: "const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };",
    isFav: true,
    createdAt: "May 18, 2026",
    updatedAt: "May 20, 2026",
  },
  {
    id: 5,
    title: "Pick random item",
    lang: "javascript",
    code: "const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];",
    isFav: false,
    createdAt: "May 16, 2026",
    updatedAt: "May 17, 2026",
  },
];

export default function App() {
  const [selectedPaletteId, setSelectedPaletteId] = useState(
    colorPalettes[0].id,
  );
  const selectedPalette =
    colorPalettes.find((palette) => palette.id === selectedPaletteId) ??
    colorPalettes[0];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.paletteBar}>
        <Text style={styles.paletteTitle}>Card colors</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.paletteList}
        >
          {colorPalettes.map((palette) => {
            const isActive = palette.id === selectedPaletteId;
            return (
              <Pressable
                key={palette.id}
                onPress={() => setSelectedPaletteId(palette.id)}
                style={({ pressed }) => [
                  styles.paletteButton,
                  {
                    backgroundColor: palette.colors.background,
                    borderColor: isActive
                      ? palette.colors.accent
                      : palette.colors.codeBackground,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.paletteDot,
                    { backgroundColor: palette.colors.accent },
                  ]}
                />
                <Text
                  style={[styles.paletteLabel, { color: palette.colors.text }]}
                >
                  {palette.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {demoSnippets.map((snippet) => (
          <View key={snippet.id} style={styles.card}>
            <CodeCard snippet={snippet} colors={selectedPalette.colors} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  paletteBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  paletteTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2A2A38",
    marginBottom: 10,
  },
  paletteList: {
    gap: 10,
    paddingBottom: 8,
  },
  paletteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 2,
  },
  paletteDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
  paletteLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    width: "100%",
  },
});
