import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FOOD_ITEMS } from "../../constants/food";
import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { useAppTheme } from "../../theme/ThemeProvider";

export function FoodItemDetails() {
  const { theme } = useAppTheme();
  const route = useRoute<any>();
  const { itemId, foodName } = route.params;

  const item = useMemo(() => {
    return FOOD_ITEMS.find((item) => item.id === itemId);
  }, [itemId]);
  const handlePress = () => {
    Alert.alert("UI only", "This is only UI.");
  };
  if (!item) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      >
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Item not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.mediaWrap,
            { backgroundColor: theme.colors.placeholder },
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {item.name}
          </Text>

          <Text style={[styles.description, { color: theme.colors.textMuted }]}>
            {item.description}
          </Text>

          <View
            style={[
              styles.priceRow,
              {
                borderTopColor: theme.colors.border,
                borderBottomColor: theme.colors.border,
              },
            ]}
          >
            <Text
              style={[styles.priceLabel, { color: theme.colors.textMuted }]}
            >
              Price
            </Text>
            <Text style={[styles.price, { color: theme.colors.accent }]}>
              ${item.price.toFixed(2)}
            </Text>
          </View>

          <Pressable
            style={[styles.addButton, { backgroundColor: theme.colors.accent }]}
            onPress={handlePress}
          >
            <Text
              style={[styles.addButtonText, { color: theme.colors.surface }]}
            >
              Add to cart
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  mediaWrap: {
    width: "100%",
    height: 220,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
  },
  addButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#ff7a3d",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
});
