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
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "../../utils/asyncStorage";


const SignInScreen = () => {
  const navigation = useNavigation<any>();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const asyncStorageValue = `${trimmedEmail}:${trimmedPassword}`;
    const storage = new Storage();
    await storage.storeData(asyncStorageValue);
    setError("");
    navigation.replace("Home");
  };

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
            <Text style={styles.kicker}>Welcome back</Text>
            <Text style={styles.title}>Sign in to continue</Text>
            <Text style={styles.subtitle}>
              Your favorite meals are only a tap away.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#9aa0a6"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Your password"
                placeholderTextColor="#9aa0a6"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable style={styles.primaryButton} onPress={handleSignIn}>
              <Text style={styles.primaryButtonText}>Sign in</Text>
            </Pressable>

            <View style={styles.secondaryRow}>
              <Text style={styles.secondaryButtonText}>New here?</Text>
              <Pressable onPress={() => navigation.replace("SignUp")}>
                <Text style={styles.secondaryButtonTextLink}>
                  Create an account
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f4fb",
  },
  flex: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTop: {
    position: "absolute",
    top: -140,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(120, 132, 255, 0.25)",
  },
  glowBottom: {
    position: "absolute",
    left: -120,
    bottom: -160,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(164, 206, 255, 0.35)",
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
    backgroundColor: "#f1f2f8",
  },
  brandName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2430",
  },
  brandTag: {
    fontSize: 12,
    color: "#667085",
    letterSpacing: 0.3,
  },
  kicker: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1.8,
    color: "#4a5bff",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    color: "#1f2430",
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#667085",
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
    backgroundColor: "#f1f2f8",
    borderWidth: 1,
    borderColor: "#e0e3f2",
    color: "#1f2430",
  },
  errorText: {
    marginTop: 12,
    color: "#d64545",
    fontSize: 13,
  },
  primaryButton: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: "#4a5bff",
    alignItems: "center",
    shadowColor: "#4a5bff",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  secondaryButtonText: {
    color: "#4a4f7a",
    fontSize: 14,
  },
  secondaryButtonTextLink: {
    color: "#4a5bff",
    fontSize: 14,
    fontWeight: "600",
  },
});
