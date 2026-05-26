import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CodeSnippet = {
  id: number;
  lang: string;
  title: string;
  code: string;
  isFav: boolean;
  createdAt: string;
  updatedAt: string;
};

type CodeCardColors = {
  background: string;
  accent: string;
  codeBackground: string;
  text: string;
  mutedText: string;
};

type CodeCardProps = {
  snippet: CodeSnippet;
  colors: CodeCardColors;
};

export default function CodeCard({ snippet, colors }: CodeCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.accent }]}>
          <Text style={[styles.badgeText, { color: colors.text }]}>
            {snippet.lang.toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.timestamp, { color: colors.mutedText }]}>
          {snippet.updatedAt}
        </Text>
      </View>

      <View
        style={[styles.titleBlock, { backgroundColor: colors.codeBackground }]}
      >
        <Text style={[styles.titleText, { color: colors.text }]}>
          {snippet.title}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.meta, { color: colors.mutedText }]}>
          Created: {snippet.createdAt}
        </Text>
        <View style={styles.favorite}>
          <Text
            style={[
              styles.favoriteIcon,
              { color: snippet.isFav ? colors.accent : colors.mutedText },
            ]}
          >
            {snippet.isFav ? "♥" : "♡"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  timestamp: {
    fontSize: 12,
  },
  titleBlock: {
    borderRadius: 12,
    padding: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  favorite: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  meta: {
    fontSize: 12,
  },
});
