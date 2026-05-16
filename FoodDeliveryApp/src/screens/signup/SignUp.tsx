import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const SignUp = () => {
  const navigation = useNavigation<any>();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.background}>
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fade,
                transform: [{ translateY: slide }],
              },
            ]}
          >
            <View style={styles.brandRow}>
              <Image
                source={require("../../../assets/chai-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.brandName}>Chai Code</Text>
                <Text style={styles.brandTag}>Food Delivery App</Text>
              </View>
            </View>
            <Text style={styles.kicker}>Create account</Text>
            <Text style={styles.title}>Start your food journey</Text>
            <Text style={styles.subtitle}>
              Fresh flavors, faster checkout, zero hassle.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                placeholder="Jane Doe"
                placeholderTextColor="#9aa0a6"
                style={styles.input}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#9aa0a6"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Create a secure password"
                placeholderTextColor="#9aa0a6"
                style={styles.input}
                secureTextEntry
              />
            </View>

            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Create account</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>
                Already have an account?{" "}
                <Pressable onPress={() => navigation.replace("Login")}>
                  <Text style={styles.secondaryButtonTextLink}>Sign in</Text>
                </Pressable>
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f7f1e8",
  },
  flex: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTop: {
    position: "absolute",
    top: -120,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(255, 166, 92, 0.35)",
  },
  glowBottom: {
    position: "absolute",
    right: -120,
    bottom: -160,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(255, 214, 140, 0.35)",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#1a1a1a",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f6f4f1",
  },
  brandName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b2b2b",
  },
  brandTag: {
    fontSize: 12,
    color: "#6d6d6d",
    letterSpacing: 0.3,
  },
  kicker: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1.8,
    color: "#d47b3a",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    color: "#2b2b2b",
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#6d6d6d",
  },
  fieldGroup: {
    marginTop: 18,
  },
  label: {
    fontSize: 13,
    color: "#4b4b4b",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f6f4f1",
    borderWidth: 1,
    borderColor: "#ebe3d9",
    color: "#222",
  },
  primaryButton: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: "#ff7a3d",
    alignItems: "center",
    shadowColor: "#ff7a3d",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 18,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#6d4b2e",
    fontSize: 14,
  },
  secondaryButtonTextLink: {
    color: "#ff7a3d",
    fontSize: 14,
    fontWeight: "600",
  },
});
