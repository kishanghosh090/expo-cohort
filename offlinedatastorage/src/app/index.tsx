import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const [output, setOutput] = useState<string>("Ready to test SecureStore.");

  // NetInfo.fetch().then((state) => {
  //   console.log("Connection type", state.type);
  //   console.log("Is connected?", state.isConnected);
  // });
  // NetInfo.addEventListener((state) => {
  //   console.log(state);
  // });
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    // To unsubscribe to these update, just use:
    unsubscribe();
  }, []);

  const saveToken = async () => {
    await SecureStore.setItemAsync("token", "eW91cl90b2tlbl9oZXJl");
    setOutput('Saved "token"');
  };
  const getToken = async () => {
    const value = await SecureStore.getItemAsync("token");

    setOutput(value ?? 'No value found for "token"');
  };

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
    setOutput("Token deleted");
  };

  const checkAvailability = async () => {
    const available = await SecureStore.isAvailableAsync();

    setOutput(
      available ? "SecureStore is available" : "SecureStore is not available",
    );
  };

  const saveObject = async () => {
    const user = {
      name: "kishan",
      age: 20,
    };
    await SecureStore.setItemAsync("token2", JSON.stringify(user));
    setOutput('Saved object in "token2"');
  };

  const getObject = async () => {
    const value = await SecureStore.getItemAsync("token2");

    setOutput(value ? value : 'No value found for "token2"');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>SecureStore test</Text>
      <Text style={styles.subtitle}>{output}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Stored keys</Text>
        <Text style={styles.cardValue}>token, token2</Text>
      </View>

      <View style={styles.buttonGrid}>
        <ActionButton label="Save token" onPress={saveToken} />
        <ActionButton label="Load token" onPress={getToken} />
        <ActionButton label="Delete token" onPress={deleteToken} />
        <ActionButton label="Check availability" onPress={checkAvailability} />
        <ActionButton label="Save object" onPress={saveObject} />
        <ActionButton label="Load object" onPress={getObject} />
      </View>
    </ScrollView>
  );
};

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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  cardLabel: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 18,
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
    backgroundColor: "#34d399",
  },
  buttonText: {
    color: "#064e3b",
    fontWeight: "700",
    textAlign: "center",
  },
});
