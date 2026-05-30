import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useGyro } from "../hooks/use-gyro";

const ROTATION = 34;
const DEPTH = 10;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const GyroScopeCard = () => {
  const { available, x, y, z } = useGyro();
  const tiltX = clamp(-y * ROTATION, -ROTATION, ROTATION);
  const tiltY = clamp(x * ROTATION, -ROTATION, ROTATION);
  const lift = 1 + Math.min(Math.abs(z) * 0.035, 0.06);
  const shiftX = clamp(x * DEPTH, -DEPTH, DEPTH);
  const shiftY = clamp(y * DEPTH, -DEPTH, DEPTH);
  const shadowX = clamp(x * 12, -12, 12);
  const shadowY = clamp(y * 14, -14, 14);
  const lightAlpha = 0.1 + Math.min(Math.abs(x) + Math.abs(y), 1) * 0.12;

  const cardStyle = {
    transform: [
      { perspective: 1200 },
      {
        rotateX: `${tiltX}deg`,
      },
      {
        rotateY: `${tiltY}deg`,
      },
      { scale: lift },
    ],
    shadowOffset: { width: shadowX, height: 18 + shadowY },
    shadowOpacity: 0.28 + Math.min(Math.abs(x) + Math.abs(y), 1) * 0.2,
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Gyroscope</Text>
        <Text style={styles.title}>Tilt-driven 3D card</Text>
        <Text style={styles.subtitle}>
          Move the device and watch the card lean with depth and light.
        </Text>
      </View>

      <View style={styles.stage}>
        <View
          style={[
            styles.glow,
            {
              opacity: 0.55 + Math.min(Math.abs(x) + Math.abs(y), 1) * 0.18,
              transform: [
                { translateX: shiftX },
                { translateY: 30 + shiftY },
                { scale: 0.9 + Math.min(Math.abs(x) + Math.abs(y), 1) * 0.1 },
              ],
            },
          ]}
        />
        <View style={[styles.card, cardStyle]}>
          <LinearGradient
            colors={["#1f2937", "#0f172a", "#111827"]}
            locations={[0, 0.55, 1]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          <LinearGradient
            colors={[`rgba(255,255,255,${lightAlpha})`, "rgba(255,255,255,0)"]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.9 }}
            style={styles.cardLight}
          />

          <View style={styles.cardSheen} />

          <View
            style={[
              styles.cardDepth,
              {
                transform: [
                  { translateX: shiftX * 0.8 },
                  { translateY: shiftY * 0.8 },
                ],
              },
            ]}
          />

          <View
            style={[
              styles.cardContent,
              { transform: [{ translateX: shiftX }, { translateY: shiftY }] },
            ]}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {available === false ? "GYRO OFF" : "LIVE GYRO"}
              </Text>
            </View>

            <View style={styles.metricRow}>
              <Metric label="X" value={x} />
              <Metric label="Y" value={y} />
              <Metric label="Z" value={z} />
            </View>

            <Text style={styles.footer}>
              {available === false
                ? "Motion sensors are unavailable on this device."
                : "The card responds to roll, pitch, and subtle lift for a depth illusion."}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value.toFixed(2)}</Text>
    </View>
  );
}

export default GyroScopeCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#020617",
    justifyContent: "center",
  },
  header: {
    marginBottom: 18,
  },
  kicker: {
    color: "#67e8f9",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    color: "#f8fafc",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    marginTop: 6,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 320,
  },
  stage: {
    minHeight: 320,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: "rgba(34, 211, 238, 0.18)",
    transform: [{ translateY: 30 }],
  },
  card: {
    width: "100%",
    maxWidth: 360,
    minHeight: 230,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.18)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.45,
    shadowRadius: 30,
    elevation: 20,
  },
  cardSheen: {
    position: "absolute",
    top: -40,
    left: -20,
    right: -20,
    height: 120,
    backgroundColor: "rgba(255,255,255,0.08)",
    transform: [{ skewX: "-18deg" }],
  },
  cardLight: {
    position: "absolute",
    inset: 0,
  },
  cardDepth: {
    position: "absolute",
    inset: 0,
    borderRadius: 28,
    backgroundColor: "rgba(34, 211, 238, 0.05)",
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(34, 211, 238, 0.14)",
    borderColor: "rgba(34, 211, 238, 0.3)",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  badgeText: {
    color: "#a5f3fc",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  metricRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  metric: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "rgba(15, 23, 42, 0.78)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.14)",
  },
  metricLabel: {
    color: "#38bdf8",
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: "800",
  },
  metricValue: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 8,
    fontVariant: ["tabular-nums"],
  },
  footer: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 18,
  },
});
