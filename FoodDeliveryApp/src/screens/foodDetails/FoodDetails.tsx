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
import { useAppTheme } from "../../theme/ThemeProvider";

const foodDetails = ({ route }: any) => {
  const { resId } = route.params;
  const { theme } = useAppTheme();
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
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <FlatList
        data={food}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={[styles.mediaWrap, { backgroundColor: theme.colors.placeholder }]}>
              <Image source={{ uri: item.image }} style={styles.mediaImage} />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardText}>
                <Text
                  style={[styles.cardTitle, { color: theme.colors.text }]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.cardSubtitle,
                    { color: theme.colors.textMuted },
                  ]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <Text
                  style={[styles.price, { color: theme.colors.accent }]}
                >
                  ${item.price.toFixed(2)}
                </Text>
                <Pressable
                  style={[
                    styles.addButton,
                    { backgroundColor: theme.colors.accent },
                  ]}
                >
                  <Text style={[styles.addButtonText, { color: theme.colors.surface }]}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              No items found
            </Text>
            <Text
              style={[
                styles.emptySubtitle,
                { color: theme.colors.textMuted },
              ]}
            >
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
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
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
  },
  cardSubtitle: {
    fontSize: 12,
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
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: -1,
  },
  emptyState: {
    marginTop: 32,
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
