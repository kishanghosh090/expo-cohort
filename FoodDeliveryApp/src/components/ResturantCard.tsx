import { Animated, StyleSheet, Text, View } from "react-native";
import { useEffect, useMemo, useRef } from "react";
import { useAppTheme } from "../theme/ThemeProvider";

type RestaurantCardProps = {
  name: string;
  image: string;
  imageFit?: "cover" | "contain";
  rating: number;
  index?: number;
  variant?: "wide" | "compact";
};

export function RestaurantCard({
  name,
  image,
  imageFit,
  rating,
  index = 0,
  variant = "wide",
}: RestaurantCardProps) {
  const { theme } = useAppTheme();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 380,
      delay: index * 70,
      useNativeDriver: true,
    }).start();
  }, [index, progress]);

  const animatedStyle = useMemo(
    () => ({
      opacity: progress,
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 0],
          }),
        },
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.98, 1],
          }),
        },
      ],
    }),
    [progress],
  );

  const resolvedFit = imageFit ?? "cover";

  const imageScale = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [resolvedFit === "cover" ? 1.06 : 1, 1],
      }),
    [progress, resolvedFit],
  );

  const isCompact = variant === "compact";

  return (
    <Animated.View
      style={[
        styles.card,
        isCompact ? styles.compactCard : styles.wideCard,
        animatedStyle,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Animated.Image
        source={{ uri: image }}
        style={[
          styles.image,
          isCompact ? styles.compactImage : styles.wideImage,
          { transform: [{ scale: imageScale }] },
        ]}
        resizeMode={resolvedFit}
      />
      <View style={styles.imageShade} />
      <View style={styles.ratingFloat}>
        <View style={styles.ratingPill}>
          <View style={styles.starBadge}>
            <Text style={styles.starText}>★</Text>
          </View>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <Text style={styles.ratingLabel}>Popular</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={[styles.name, { color: theme.colors.text }]}
        >
          {name}
        </Text>
        <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>
          Free delivery · 20-30 min
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,
  },
  wideCard: {
    marginBottom: 16,
  },
  compactCard: {
    width: 180,
    marginRight: 14,
  },
  image: {
    width: "100%",
  },
  wideImage: {
    height: 170,
  },
  compactImage: {
    height: 110,
  },
  content: {
    padding: 12,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  metaText: {
    fontSize: 12,
    fontWeight: "500",
  },
  imageShade: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 70,
    backgroundColor: "rgba(255, 122, 61, 0.18)",
  },
  ratingFloat: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "#ff7a3d",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  starBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff2e9",
  },
  starText: {
    color: "#ff7a3d",
    fontSize: 12,
    fontWeight: "700",
  },
  ratingText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  ratingLabel: {
    color: "#fff4ee",
    fontSize: 11,
    fontWeight: "600",
  },
});
