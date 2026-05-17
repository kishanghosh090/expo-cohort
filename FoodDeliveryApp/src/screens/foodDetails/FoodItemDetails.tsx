import React, { useMemo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FOOD_ITEMS } from "../../constants/food";

const FoodItemDetails = ({ route }: any) => {
  const { itemId } = route.params;

  const item = useMemo(
    () => FOOD_ITEMS.find((food) => food.id === itemId),
    [itemId],
  );

  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Item not found</Text>
          <Text style={styles.emptySubtitle}>Try another dish.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mediaWrap}>
          <Image source={{ uri: item.image }} style={styles.mediaImage} />
          <View style={styles.mediaShade} />
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to cart</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodItemDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#faf6f2",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  mediaWrap: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#f4e6d9",
    marginBottom: 16,
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mediaShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: "rgba(27, 27, 31, 0.2)",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: "#1b1b1f",
    marginRight: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff7a3d",
  },
  description: {
    fontSize: 14,
    color: "#7b7169",
    lineHeight: 22,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: "#ff7a3d",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#ff7a3d",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  addButtonText: {
    color: "#fffaf6",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyState: {
    marginTop: 32,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#fffaf6",
    borderWidth: 1,
    borderColor: "#f4e6d9",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1b1b1f",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: "#7b7169",
  },
});
