import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [date, setData] = useState("");

  // set item
  const saveData = async () => {
    await AsyncStorage.setItem("user", "chai code");
  };
  const getData = async () => {
    const value = await AsyncStorage.getItem("user");

    setData(value!!);
  };

  const removeData = async () => {
    await AsyncStorage.removeItem("user");
    setData("");
  };

  // clear async storage
  const clearStorage = async () => {
    await AsyncStorage.clear();
  };
  const getKeys = async () => {
    const val = await AsyncStorage.getAllKeys();
    console.log(val);
  };
  const saveMultiSet = async () => {
    await AsyncStorage.multiSet([
      ["name", "kishan"],
      ["role", "dev"],
    ]);
  };
  const multiGet = async () => {
    await AsyncStorage.multiGet(["name", "role"]);
  };

  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
