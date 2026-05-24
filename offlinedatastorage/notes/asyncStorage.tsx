import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("Ready to test AsyncStorage.");

  const saveData = async () => {
    await AsyncStorage.setItem("user", "chai code");
    setStatus('Saved "user" = "chai code"');
  };
  const getData = async () => {
    const value = await AsyncStorage.getItem("user");

    setValue(value ?? "");
    setStatus(value ? `Loaded "user" = ${value}` : 'No value found for "user"');
  };

  const removeData = async () => {
    await AsyncStorage.removeItem("user");
    setValue("");
    setStatus('Removed "user"');
  };

  const clearStorage = async () => {
    await AsyncStorage.clear();
    setValue("");
    setStatus("Cleared all AsyncStorage values");
  };
  const getKeys = async () => {
    const val = await AsyncStorage.getAllKeys();
    setStatus(`Keys: ${val.join(", ") || "(none)"}`);
  };
  const saveMultiSet = async () => {
    await AsyncStorage.multiSet([
      ["name", "kishan"],
      ["role", "dev"],
    ]);
    setStatus('Saved "name" and "role"');
  };
  const multiGet = async () => {
    const entries = await AsyncStorage.multiGet(["name", "role"]);
    setStatus(
      entries
        .map(([key, storedValue]) => `${key}: ${storedValue ?? "(empty)"}`)
        .join(" | "),
    );
  };

  const mergeUsers = async () => {
    const USER_1 = {
      name: "Tom",
      age: 20,
      traits: {
        hair: "black",
        eyes: "blue",
      },
    };

    const USER_2 = {
      name: "Sarah",
      age: 21,
      hobby: "cars",
      traits: {
        eyes: "green",
      },
    };

    try {
      //save first user
      await AsyncStorage.setItem("merge_user", JSON.stringify(USER_1));

      // merge USER_2 into saved USER_1
      await AsyncStorage.mergeItem("merge_user", JSON.stringify(USER_2));

      // read merged item
      const currentUser = await AsyncStorage.getItem("merge_user");

      console.log(currentUser);
    } catch (err) {}
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AsyncStorage test</Text>
      <Text style={styles.subtitle}>{status}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Current value</Text>
        <Text style={styles.value}>{value || "(empty)"}</Text>
      </View>

      <View style={styles.buttonGrid}>
        <ActionButton label="Save user" onPress={saveData} />
        <ActionButton label="Load user" onPress={getData} />
        <ActionButton label="Remove user" onPress={removeData} />
        <ActionButton label="Clear all" onPress={clearStorage} />
        <ActionButton label="Get keys" onPress={getKeys} />
        <ActionButton label="Save multi" onPress={saveMultiSet} />
        <ActionButton label="Load multi" onPress={multiGet} />
        <ActionButton label="merge" onPress={mergeUsers} />
      </View>
    </ScrollView>
  );
}

function ActionButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#0f172a",
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#f8fafc",
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5e1",
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#334155",
  },
  label: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    color: "#f8fafc",
    fontWeight: "600",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  button: {
    minWidth: "46%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#38bdf8",
  },
  buttonText: {
    color: "#082f49",
    fontWeight: "700",
    textAlign: "center",
  },
});
