import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";

export function SplashScreen() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.emoji, { color: theme.colors.accent }]}>
          🍕
        </Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          FoodDelivery
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
          Loading your favorite meals...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    gap: 16,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
  },
});
