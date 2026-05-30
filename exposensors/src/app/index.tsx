import { LightSensor } from "expo-sensors";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [{ illuminance }, setData] = useState<any>({ illuminance: 0 });
  const [subscription, setSubscription] = useState<any>(null);

  const toggle = () => {
    if (subscription) {
      unsubscribe();
    } else {
      subscribe();
    }
  };

  const subscribe = () => {
    setSubscription(
      LightSensor.addListener((sensorData) => {
        setData(sensorData);
      }),
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.sensor}>
      <Text>Light Sensor:</Text>
      <Text>
        Illuminance:{" "}
        {Platform.OS === "android"
          ? `${illuminance} lx`
          : `Only available on Android`}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggle} style={styles.button}>
          <Text>Toggle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sensor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
});
