import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";

export function OrdersScreen() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: theme.colors.text,
        }}
      >
        Orders Screen
      </Text>
    </SafeAreaView>
  );
}
