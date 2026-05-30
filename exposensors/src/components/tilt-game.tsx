import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccelerometer } from "../../gyri/hooks/use-accelerometer";

const BALL_SIZE = 120;

// Movement scale for accelerometer values — reduced for a larger ball
const MOVE = 40;

export function TiltGame() {
  const insets = useSafeAreaInsets();
  const { available, x, y, z } = useAccelerometer();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.title}>Tilt the ball</Text>
      <Text style={styles.subtitle}>
        Tilt the phone. Watch x and y change. The ball follows x and y.
      </Text>

      <View style={styles.playBox}>
        <View
          style={[
            styles.ballContainer,
            {
              transform: [{ translateX: x * MOVE }, { translateY: y * MOVE }],
            },
          ]}
        >
          <LinearGradient
            colors={["#22d3ee", "#0ea5a4"]}
            start={[0.2, 0.2]}
            end={[1, 1]}
            style={styles.ball}
          >
            <View style={styles.ballHighlight} />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0b1220",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: "#f8fafc",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  sensorBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  sensorTitle: {
    color: "#38bdf8",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  sensorLine: {
    color: "#e2e8f0",
    fontSize: 18,
    fontFamily: "monospace",
  },
  sensorHint: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  },
  warning: {
    color: "#fbbf24",
    marginTop: 8,
    fontSize: 13,
  },
  playBox: {
    flex: 1,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#334155",
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
  },
  ballContainer: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  ballHighlight: {
    position: "absolute",
    width: BALL_SIZE * 0.36,
    height: BALL_SIZE * 0.36,
    borderRadius: (BALL_SIZE * 0.36) / 2,
    backgroundColor: "rgba(255,255,255,0.9)",
    top: BALL_SIZE * 0.08,
    left: BALL_SIZE * 0.14,
    opacity: 0.95,
    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
  },
  footer: {
    color: "#64748b",
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
  },
});
