import { Animated, StyleSheet, Text, View } from "react-native";
import { useEffect, useMemo, useRef } from "react";
import { useAppTheme } from "../theme/ThemeProvider";

type FoodItemCardProps = {
  name: string;
  description: string;
  image: string;
  price: number;
  index?: number;
};

export function FoodItemCard({
  name,
  description,
  image,
  price,
  index = 0,
}: FoodItemCardProps) {
  const { theme } = useAppTheme();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 360,
      delay: index * 60,
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
            outputRange: [12, 0],
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

  const imageScale = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1.04, 1],
      }),
    [progress],
  );

  return (
    <Animated.View
      style={[
        styles.card,
        animatedStyle,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.mediaWrap,
          { backgroundColor: theme.colors.placeholder },
        ]}
      >
        <Animated.Image
          source={{ uri: image }}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
        />
        <View style={styles.imageShade} />
        <View
          style={[styles.pricePill, { backgroundColor: theme.colors.accent }]}
        >
          <Text style={[styles.priceText, { color: theme.colors.surface }]}>
            ${price.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={[styles.name, { color: theme.colors.text }]}
        >
          {name}
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.description, { color: theme.colors.textMuted }]}
        >
          {description}
        </Text>
        <View style={styles.metaRow}>
          <View
            style={[
              styles.tagPill,
              { backgroundColor: theme.colors.accentSoft },
            ]}
          >
            <Text style={[styles.tagText, { color: theme.colors.accent }]}>
              Chef's pick
            </Text>
          </View>
          <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>
            15-25 min
          </Text>
        </View>
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
    marginBottom: 16,
  },
  mediaWrap: {
    height: 170,
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: "rgba(27, 27, 31, 0.18)",
  },
  pricePill: {
    position: "absolute",
    right: 12,
    bottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  priceText: {
    fontWeight: "700",
    fontSize: 13,
  },
  content: {
    padding: 14,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  metaText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
