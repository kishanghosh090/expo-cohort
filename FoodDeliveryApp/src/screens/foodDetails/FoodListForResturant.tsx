import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { POPPULAR_RESTURANT_LIST } from "../../constants/food";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const FoodListForResturant = ({ route }: any) => {
  const { itemId } = route.params;
  const navigator = useNavigation<any>();

  const [foodHaveInResturant, setfoodHaveInResturant] = useState<any>([]);

  useEffect(() => {
    const res = POPPULAR_RESTURANT_LIST.filter((item) =>
      item.categoryIds.includes(itemId),
    );
    setfoodHaveInResturant(res ? res : []);
  }, [itemId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={foodHaveInResturant}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              navigator.navigate("foodDetails", {
                resId: item.id,
                resName: item.name,
              });
            }}
          >
            <View style={styles.card}>
              <View style={styles.mediaWrap}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.mediaImage}
                  resizeMode={item.imageFit ?? "cover"}
                />
                <View style={styles.mediaShade} />
              </View>
              <View style={styles.cardHeader}>
                <Text style={styles.cardBadge}>Popular</Text>
                <Text style={styles.cardRating}>
                  ★ {item.rating.toFixed(1)}
                </Text>
              </View>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.cardSubtitle}>Free delivery · 20-30 min</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No restaurants found</Text>
            <Text style={styles.emptySubtitle}>Try a different category.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default FoodListForResturant;

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
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#f4e6d9",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  mediaWrap: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#f4e6d9",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f4e6d9",
  },
  mediaShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: "rgba(27, 27, 31, 0.2)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardBadge: {
    backgroundColor: "rgba(255, 122, 61, 0.16)",
    color: "#ff7a3d",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  cardRating: {
    color: "#1b1b1f",
    fontSize: 12,
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1b1b1f",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#7b7169",
    fontWeight: "500",
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
