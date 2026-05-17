import { Animated, StyleSheet, Text, View } from "react-native";
import { useEffect, useMemo, useRef } from "react";

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
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.mediaWrap}>
        <Animated.Image
          source={{ uri: image }}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
        />
        <View style={styles.imageShade} />
        <View style={styles.pricePill}>
          <Text style={styles.priceText}>${price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>Chef's pick</Text>
          </View>
          <Text style={styles.metaText}>15-25 min</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffaf6",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f4e6d9",
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
    backgroundColor: "#ff7a3d",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  priceText: {
    color: "#fffaf6",
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
    color: "#1b1b1f",
  },
  description: {
    fontSize: 12,
    color: "#6f6760",
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagPill: {
    backgroundColor: "rgba(255, 122, 61, 0.16)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ff7a3d",
  },
  metaText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8b8077",
  },
});
