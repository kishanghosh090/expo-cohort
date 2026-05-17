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


export function SearchScreen() {
  const [foodItems, setFoodItems] = useState<null | any[]>(null);

  useEffect(() => {
    function loadFoods() {
      setTimeout(() => {
        setFoodItems((prev) => [...[]]);
      }, 5000);
    }
    loadFoods();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <TextInput
        placeholder="Search restaurants, dishes..."
        placeholderTextColor="#9c9aa0"
        style={{
          height: 50,
          margin: 12,
          borderWidth: 1,
          borderColor: "#e5e5e5",
          borderRadius: 8,
          paddingHorizontal: 16,
        }}
      />
      {/* food items */}
      {foodItems ? (
        <FlatList
          horizontal
          data={foodItems}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <View>{item.name}</View>}
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
});
