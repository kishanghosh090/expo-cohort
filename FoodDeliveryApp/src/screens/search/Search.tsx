import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FOOD_ITEMS } from "../../constants/food";
import { FoodItemCard } from "../../components/FoodItemCard";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../theme/ThemeProvider";

export function SearchScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const [foodItems, setFoodItems] = useState<null | any[]>(null);

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function filterByName() {
    setIsLoading(true);
    if (search == "") {
      setFoodItems(FOOD_ITEMS);
      setIsLoading(false);
      return;
    }
    const categories = FOOD_ITEMS?.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
    setFoodItems(categories);
    setIsLoading(false);
  }

  useEffect(() => {
    function loadFoods() {
      setTimeout(() => {
        filterByName();
        setIsLoading(false);
      }, 1000);
    }
    loadFoods();
  }, [filterByName, search]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TextInput
        placeholder="Search restaurants, dishes..."
        placeholderTextColor={theme.colors.placeholder}
        onChangeText={(text) => {
          setSearch(text);
          setIsLoading(true);
          setTimeout(() => {
            filterByName();
          }, 200);
        }}
        style={[
          styles.searchInput,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
          },
        ]}
      />
      {foodItems != null && foodItems.length == 0 && (
        <View
          style={[
            styles.emptyState,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.emptyBadge,
              { backgroundColor: theme.colors.accentSoft },
            ]}
          >
            <Text
              style={[styles.emptyBadgeText, { color: theme.colors.accent }]}
            >
              No match
            </Text>
          </View>
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Nothing delicious found
          </Text>
          <Text
            style={[styles.emptySubtitle, { color: theme.colors.textMuted }]}
          >
            Try a shorter keyword or search by cuisine.
          </Text>
        </View>
      )}
      {/* food items */}
      {foodItems && isLoading == false ? (
        <FlatList
          data={foodItems}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
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
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  emptyState: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  emptyBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  emptyBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
