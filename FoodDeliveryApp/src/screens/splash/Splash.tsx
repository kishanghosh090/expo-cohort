import { Animated, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Splash = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, rise]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.background}>
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />
      </View>
      <Animated.View
        style={[
          styles.content,
          { opacity: fade, transform: [{ translateY: rise }] },
        ]}
      >
        <View style={styles.logoWrap}>
          <Image
            source={require("../../../assets/chai-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.brand}>Chai Code</Text>
        <Text style={styles.tagline}>Food Delivery App</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f5f1",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTop: {
    position: "absolute",
    top: -140,
    right: -90,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255, 199, 168, 0.6)",
  },
  glowBottom: {
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
    alignItems: "center",
    gap: 8,
  },
  logoWrap: {
    width: 92,
    height: 92,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1a1a1a",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  logo: {
    width: 56,
    height: 56,
  },
  brand: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e1b1a",
  },
  tagline: {
    fontSize: 13,
    letterSpacing: 0.4,
    color: "#5f4b45",
  },
});
