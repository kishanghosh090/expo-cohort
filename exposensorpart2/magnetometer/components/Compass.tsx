import { useMemo } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { useMagnetometer } from "../../src/hook/use-magnetometer";

const CARDINALS = [
  { label: "N", angle: 0 },
  { label: "NE", angle: 45 },
  { label: "E", angle: 90 },
  { label: "SE", angle: 135 },
  { label: "S", angle: 180 },
  { label: "SW", angle: 225 },
  { label: "W", angle: 270 },
  { label: "NW", angle: 315 },
];

const TITLE_FONT = Platform.select({
  ios: "Baskerville",
  android: "serif",
  default: "serif",
});

const DIGITS_FONT = Platform.select({
  ios: "Menlo",
  android: "monospace",
  default: "monospace",
});

export default function Compass() {
  const { width, height } = useWindowDimensions();
  const { heading, isAvailable } = useMagnetometer();

  const size = Math.min(width, height) * 0.76;
  const dialRotation = `${-heading}deg`;

  const ticks = useMemo(() => {
    return Array.from({ length: 60 }, (_, index) => {
      const angle = index * 6;
      const isMajor = index % 5 === 0;
      return { angle, isMajor, key: `tick-${index}` };
    });
  }, []);

  const tickOffset = size / 2 - 22;
  const labelOffset = size / 2 - 48;

  return (
    <View style={styles.screen}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.header}>
        <Text style={styles.title}>AURORA COMPASS</Text>
        <Text style={styles.subtitle}>
          {isAvailable ? "MAGNETOMETER ONLINE" : "SENSOR UNAVAILABLE"}
        </Text>
      </View>

      <View style={[styles.dialWrap, { width: size, height: size }]}>
        <View style={[styles.dial, { transform: [{ rotate: dialRotation }] }]}>
          {ticks.map((tick) => (
            <View
              key={tick.key}
              style={[
                styles.tick,
                tick.isMajor && styles.tickMajor,
                {
                  transform: [
                    { rotate: `${tick.angle}deg` },
                    { translateY: -tickOffset },
                  ],
                },
              ]}
            />
          ))}

          {CARDINALS.map((cardinal) => (
            <View
              key={cardinal.label}
              style={[
                styles.labelContainer,
                {
                  transform: [
                    { rotate: `${cardinal.angle}deg` },
                    { translateY: -labelOffset },
                  ],
                },
              ]}
            >
              <Text
                style={[
                  styles.labelText,
                  cardinal.label === "N" && styles.labelNorth,
                  { transform: [{ rotate: `${-cardinal.angle}deg` }] },
                ]}
              >
                {cardinal.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.needleShadow} />
        <View style={styles.needle}>
          <View style={styles.needleNorth} />
          <View style={styles.needleSouth} />
        </View>
        <View style={styles.centerCapOuter}>
          <View style={styles.centerCapInner} />
        </View>
      </View>

      <View style={styles.readout}>
        <Text style={styles.readoutLabel}>HEADING</Text>
        <Text style={styles.readoutValue}>
          {Math.round(heading).toString().padStart(3, "0")}°
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0a0e16",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 48,
    paddingBottom: 48,
  },
  glowTop: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "rgba(69, 190, 255, 0.18)",
    top: -120,
    left: -80,
  },
  glowBottom: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: "rgba(246, 214, 118, 0.14)",
    bottom: -160,
    right: -120,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontFamily: TITLE_FONT,
    fontSize: 20,
    letterSpacing: 4,
    color: "#e9f4ff",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    letterSpacing: 2,
    color: "rgba(233, 244, 255, 0.6)",
  },
  dialWrap: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "rgba(15, 22, 34, 0.92)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 18 },
    shadowRadius: 30,
    elevation: 12,
  },
  dial: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tick: {
    position: "absolute",
    width: 2,
    height: 8,
    backgroundColor: "rgba(233, 244, 255, 0.35)",
    borderRadius: 2,
  },
  tickMajor: {
    width: 3,
    height: 16,
    backgroundColor: "rgba(233, 244, 255, 0.7)",
  },
  labelContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontSize: 14,
    letterSpacing: 2,
    color: "rgba(233, 244, 255, 0.75)",
  },
  labelNorth: {
    fontSize: 18,
    color: "#ffb45c",
  },
  needleShadow: {
    position: "absolute",
    width: 6,
    height: "62%",
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    transform: [{ translateY: 6 }],
  },
  needle: {
    position: "absolute",
    width: 6,
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  needleNorth: {
    position: "absolute",
    top: 0,
    width: 6,
    height: "50%",
    backgroundColor: "#ff5d5d",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  needleSouth: {
    position: "absolute",
    bottom: 0,
    width: 6,
    height: "50%",
    backgroundColor: "#72d6ff",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  centerCapOuter: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  centerCapInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ffb45c",
  },
  readout: {
    marginTop: 24,
    alignItems: "center",
  },
  readoutLabel: {
    letterSpacing: 3,
    fontSize: 11,
    color: "rgba(233, 244, 255, 0.55)",
  },
  readoutValue: {
    fontFamily: DIGITS_FONT,
    fontSize: 42,
    marginTop: 6,
    color: "#e9f4ff",
  },
});
