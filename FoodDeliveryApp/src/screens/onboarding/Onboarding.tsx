import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
  const navigation = useNavigation<any>();
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, rise]);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.background}>
        <View style={styles.blushTop} />
        <View style={styles.blushBottom} />
      </View>

      <Animated.View
        style={[
          styles.content,
          { opacity: fade, transform: [{ translateY: rise }] },
        ]}
      >
        <View style={styles.heroCard}>
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
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <View style={styles.divider} />
            <View style={styles.dividerMuted} />
          </View>
          <Text style={styles.title}>Deliveries, made effortless</Text>
          <Text style={styles.subtitle}>
            Discover nearby favorites, personalize your cravings, and track
            every order in real time.
          </Text>
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Curated menus</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Smart reorders</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleGetStarted}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </Pressable>

        <View style={styles.secondaryRow}>
          <Text style={styles.secondaryText}>Already a member?</Text>
          <Pressable onPress={handleGetStarted}>
            <Text style={styles.secondaryLink}>Sign in</Text>
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f5f1",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  blushTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255, 199, 168, 0.6)",
  },
  blushBottom: {
    position: "absolute",
    bottom: -160,
    left: -120,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 231, 209, 0.7)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  heroCard: {
    borderRadius: 30,
    padding: 24,
    backgroundColor: "#f6d7cf",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    shadowColor: "#1a1a1a",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
  },
  brandName: {
    color: "#1e1b1a",
    fontSize: 20,
    fontWeight: "700",
  },
  brandTag: {
    color: "#5f4b45",
    fontSize: 12,
    letterSpacing: 0.6,
  },
  dividerRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  divider: {
    width: 36,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#1e1b1a",
  },
  dividerMuted: {
    width: 36,
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(30, 27, 26, 0.35)",
  },
  title: {
    color: "#1e1b1a",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 12,
    color: "#4a3f3b",
    fontSize: 15,
    lineHeight: 22,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  tagText: {
    color: "#1e1b1a",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  primaryButton: {
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: "#1e1b1a",
    alignItems: "center",
    shadowColor: "#1e1b1a",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  secondaryRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 18,
  },
  secondaryText: {
    color: "#5f4b45",
    fontSize: 14,
  },
  secondaryLink: {
    color: "#1e1b1a",
    fontSize: 14,
    fontWeight: "600",
  },
});
