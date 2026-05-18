import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { createStackNavigator } from "@react-navigation/stack";

import foodDetails from "../foodDetails/FoodDetails";
import FoodListForResturant from "../foodDetails/FoodListForResturant";
import { FoodItemDetails } from "../foodDetails/FoodItemDetails";
import { useAppTheme } from "../../theme/ThemeProvider";

function HomeScreen() {
  const navigator = useNavigation<any>();
  const { theme, isDark, toggleTheme } = useAppTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="never"
      >
        <View
          style={[styles.header, { backgroundColor: theme.colors.surface }]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text
                style={[styles.headerLabel, { color: theme.colors.accent }]}
              >
                Delivery
              </Text>
              <View style={styles.headerRow}>
                <Text
                  style={[styles.headerTitle, { color: theme.colors.text }]}
                >
                  Home
                </Text>
                <Text
                  style={[styles.headerChevron, { color: theme.colors.text }]}
                >
                  v
                </Text>
              </View>
              <Text
                style={[
                  styles.headerSubtitle,
                  { color: theme.colors.textMuted },
                ]}
              >
                Sector 21, City Center
              </Text>
            </View>
            <Pressable style={[styles.headerIcon]} onPress={toggleTheme}>
              <Ionicons
                name={isDark ? "sunny" : "moon"}
                size={24}
                color={theme.colors.accent}
              />
            </Pressable>
          </View>
          <Pressable
            style={[
              styles.searchBar,
              {
                backgroundColor: theme.colors.accentSoft,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => {
              navigator.navigate("Search");
            }}
          >
            <Text style={[styles.searchIcon, { color: theme.colors.accent }]}>
              Search
            </Text>
            <Text
              style={[
                styles.searchPlaceholder,
                { color: theme.colors.placeholder },
              ]}
            >
              Dishes, restaurants, or cuisines
            </Text>
          </Pressable>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Food Categories
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                { color: theme.colors.textMuted },
              ]}
            >
              Browse by craving
            </Text>
          </View>
          <FlatList
            horizontal
            data={MENU_CATEGORIES}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  navigator.navigate("foodListForResturat", {
                    itemId: item.id,
                    foodName: item.name,
                  });
                }}
              >
                <FoodCategoryCard
                  name={item.name}
                  image={item.image}
                  index={index}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Popular Restaurants
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                { color: theme.colors.textMuted },
              ]}
            >
              Top picks near you
            </Text>
          </View>
          <View style={styles.listStack}>
            {POPPULAR_RESTURANT_LIST.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  navigator.navigate("foodListForResturat", {
                    resId: item.id,
                    resName: item.name,
                  });
                }}
              >
                <RestaurantCard
                  name={item.name}
                  image={item.image}
                  imageFit={(item as any).imageFit}
                  rating={item.rating}
                  index={index}
                  variant="wide"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Nearby Restaurants
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                { color: theme.colors.textMuted },
              ]}
            >
              Quick bites around you
            </Text>
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
                imageFit={(item as any).imageFit}
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

const Stack = createStackNavigator();

function MyStack() {
  const { theme } = useAppTheme();
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="foodDetails"
        component={foodDetails}
        options={({ route }) => ({
          title:
            (route.params as { resName: string }).resName ?? "Food Details",
        })}
      />
      <Stack.Screen
        name="foodListForResturat"
        options={({ route }) => ({
          title:
            (route.params as { foodName: string }).foodName ?? "Restaurant",
        })}
        component={FoodListForResturant}
      />
      <Stack.Screen
        name="FoodItemDetails"
        component={FoodItemDetails}
        options={({ route }) => ({
          title:
            (route.params as { foodName: string }).foodName ?? "Food Details",
          headerBackTitle: "menu",
        })}
      />
    </Stack.Navigator>
  );
}
export default function HomeScreenNavigator() {
  return <MyStack />;
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  header: {
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
  },
  headerChevron: {
    fontSize: 16,
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 12,
    fontWeight: "700",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  searchPlaceholder: {
    fontSize: 14,
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
  },
  sectionSubtitle: {
    fontSize: 13,
  },
  listStack: {
    gap: 14,
  },
});
