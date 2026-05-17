import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FOOD_ITEMS } from "../../constants/food";
import { FoodItemCard } from "../../components/FoodItemCard";

export function SearchScreen() {
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
      style={{
        flex: 1,
      }}
    >
      <TextInput
        placeholder="Search restaurants, dishes..."
        placeholderTextColor="#9c9aa0"
        onChangeText={(text) => {
          setSearch(text);
          setIsLoading(true);
          setTimeout(() => {
            filterByName();
          }, 200);
        }}
        style={{
          height: 50,
          margin: 12,
          borderWidth: 1,
          borderColor: "#e5e5e5",
          borderRadius: 8,
          paddingHorizontal: 16,
        }}
      />
      {foodItems != null && foodItems.length == 0 && (
        <View style={styles.emptyState}>
          <View style={styles.emptyBadge}>
            <Text style={styles.emptyBadgeText}>No match</Text>
          </View>
          <Text style={styles.emptyTitle}>Nothing delicious found</Text>
          <Text style={styles.emptySubtitle}>
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
            <FoodItemCard
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
              index={index}
            />
          )}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
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
    backgroundColor: "#fffaf6",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#f4e6d9",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  emptyBadge: {
    backgroundColor: "rgba(255, 122, 61, 0.16)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  emptyBadgeText: {
    color: "#ff7a3d",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
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
    textAlign: "center",
    lineHeight: 18,
  },
});
