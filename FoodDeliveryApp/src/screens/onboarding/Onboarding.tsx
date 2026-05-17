import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../theme/ThemeProvider";

export function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <Text style={[styles.logoText, { color: theme.colors.accent }]}>
            🍕
          </Text>
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome to FoodDelivery
        </Text>

        <Text
          style={[styles.subtitle, { color: theme.colors.textMuted }]}
        >
          Order your favorite food and get it delivered to your door
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: theme.colors.accent }]}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={[styles.buttonText, { color: theme.colors.surface }]}>
            Sign In
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.outlineButton,
            { borderColor: theme.colors.border },
          ]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={[styles.outlineButtonText, { color: theme.colors.text }]}>
            Sign Up
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    alignItems: "center",
    marginTop: 40,
  },
  logoWrap: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  outlineButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
