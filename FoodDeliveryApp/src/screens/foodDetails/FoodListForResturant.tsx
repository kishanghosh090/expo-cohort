import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FoodItemCard } from "../../components/FoodItemCard";
import { FOOD_ITEMS, POPPULAR_RESTURANT_LIST } from "../../constants/food";
import React, { useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppTheme } from "../../theme/ThemeProvider";

export default function FoodListForResturant() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { theme } = useAppTheme();
  const { resId, resName, itemId, foodName } = route.params ?? {};

  const foods = useMemo(() => {
    if (typeof resId === "number") {
      const res = POPPULAR_RESTURANT_LIST.find((item) => item.id === resId);
      const resMenu = res?.menu ?? [];

      return FOOD_ITEMS.filter((food) => resMenu.includes(food.id));
    }

    if (typeof itemId === "number") {
      return FOOD_ITEMS.filter((food) => food.categoryId === itemId);
    }

    return [];
  }, [itemId, resId]);

  const title = resName ?? foodName ?? "Restaurant";

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          {title}
        </Text>
      </View>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("FoodItemDetails", {
                itemId: item.id,
                foodName: item.name,
              });
            }}
          >
            <FoodItemCard
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
              index={index}
            />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
});
