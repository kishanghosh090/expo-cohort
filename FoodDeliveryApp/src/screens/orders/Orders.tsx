import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function OrdersScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
        }}
      >
        Orders Screen
      </Text>
    </SafeAreaView>
  );
}
