import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const [output, SetOutput] = useState<String>("");

  const saveToken = async () => {
    await SecureStore.setItemAsync("token", "eW91cl90b2tlbl9oZXJl");
  };
  const getToken = async () => {
    const value = await SecureStore.getItemAsync("token");
    SetOutput(value!);
  };

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
    SetOutput("token deleted");
  };

  const checkAvailability = async () => {
    const available = await SecureStore.isAvailableAsync();

    SetOutput(available ? "secure store is availe" : "not available");
  };

  const seveObj = async () => {
    const user = {
      name: "kishan",
      age: 20,
    };
    await SecureStore.setItemAsync("token2", JSON.stringify(user));
  };

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
