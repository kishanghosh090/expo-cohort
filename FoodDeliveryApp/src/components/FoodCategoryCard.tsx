import { Animated, StyleSheet, Text, View } from "react-native";
import { useEffect, useMemo, useRef } from "react";
import { useAppTheme } from "../theme/ThemeProvider";

type FoodCategoryCardProps = {
  name: string;
  image: string;
  index?: number;
};

export function FoodCategoryCard({
  name,
  image,
  index = 0,
}: FoodCategoryCardProps) {
  const { theme } = useAppTheme();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 320,
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
            outputRange: [10, 0],
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
        style={[styles.imageWrap, { backgroundColor: theme.colors.accentSoft }]}
      >
        <Animated.Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text
        style={[styles.label, { color: theme.colors.text }]}
        numberOfLines={1}
      >
        {name}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    padding: 12,
    borderRadius: 18,
    marginRight: 12,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  imageWrap: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
  },
});
