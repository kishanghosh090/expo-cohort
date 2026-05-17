import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MENU_CATEGORIES,
  NEARBY_RESTURANT_LIST,
  POPPULAR_RESTURANT_LIST,
} from "../../constants/food";
import { FoodCategoryCard } from "../../components/FoodCategoryCard";
import { RestaurantCard } from "../../components/ResturantCard";

import { useNavigation } from "@react-navigation/native";

export function HomeScreen() {
  const navigator = useNavigation<any>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="never"
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerLabel}>Delivery</Text>
              <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Home</Text>
                <Text style={styles.headerChevron}>v</Text>
              </View>
              <Text style={styles.headerSubtitle}>Sector 21, City Center</Text>
            </View>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>JD</Text>
            </View>
          </View>
          <Pressable
            style={styles.searchBar}
            onPress={() => {
              navigator.navigate("Search");
            }}
          >
            <Text style={styles.searchIcon}>Search</Text>
            <Text style={styles.searchPlaceholder}>Dishes, restaurants, or cuisines</Text>
          </Pressable>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Food Categories</Text>
            <Text style={styles.sectionSubtitle}>Browse by craving</Text>
          </View>
          <FlatList
            horizontal
            data={MENU_CATEGORIES}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FoodCategoryCard
                name={item.name}
                image={item.image}
                index={index}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Restaurants</Text>
            <Text style={styles.sectionSubtitle}>Top picks near you</Text>
          </View>
          <View style={styles.listStack}>
            {POPPULAR_RESTURANT_LIST.map((item, index) => (
              <RestaurantCard
                key={item.id}
                name={item.name}
                image={item.image}
                rating={item.rating}
                index={index}
                variant="wide"
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
            <Text style={styles.sectionSubtitle}>Quick bites around you</Text>
          </View>
          <FlatList
            horizontal
            data={NEARBY_RESTURANT_LIST}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RestaurantCard
                name={item.name}
                image={item.image}
                rating={item.rating}
                index={index}
                variant="compact"
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#faf6f2",
  },
  content: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ff7a3d",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b1b1f",
  },
  headerChevron: {
    fontSize: 16,
    color: "#1b1b1f",
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6b6b6f",
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 122, 61, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ff7a3d",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 122, 61, 0.08)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 122, 61, 0.18)",
  },
  searchIcon: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ff7a3d",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1b1b1f",
  },
  searchPlaceholder: {
    fontSize: 14,
    color: "#9c9aa0",
  },
  section: {
    marginBottom: 28,
    gap: 14,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1b1b1f",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#6b6b6f",
  },
  listStack: {
    gap: 14,
  },
});
