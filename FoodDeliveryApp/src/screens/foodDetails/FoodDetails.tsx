import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FOOD_ITEMS, POPPULAR_RESTURANT_LIST } from "../../constants/food";
import { SafeAreaView } from "react-native-safe-area-context";

const foodDetails = ({ route }: any) => {
  const { resId } = route.params;
  const [food, setFoods] = useState<any[]>([]);
  useEffect(() => {
    const res = POPPULAR_RESTURANT_LIST.filter((item) => item.id == resId);
    const resMenu = res[0]?.menu ?? [];

    const foods = FOOD_ITEMS.filter((food) => {
      return resMenu.includes(food.id);
    });
    setFoods(foods ? foods : []);
  }, [resId]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={food}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.mediaWrap}>
              <Image source={{ uri: item.image }} style={styles.mediaImage} />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.cardSubtitle} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Pressable style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No items found</Text>
            <Text style={styles.emptySubtitle}>
              This restaurant has no items yet.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default foodDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#faf6f2",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#fffaf6",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#f4e6d9",
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  mediaWrap: {
    width: "100%",
    height: 140,
    backgroundColor: "#f4e6d9",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardBody: {
    padding: 14,
    gap: 10,
  },
  cardText: {
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1b1b1f",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#7b7169",
    lineHeight: 18,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1b1b1f",
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ff7a3d",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ff7a3d",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  addButtonText: {
    color: "#fffaf6",
    fontSize: 20,
    fontWeight: "700",
    marginTop: -1,
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
