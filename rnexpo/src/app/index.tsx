import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const HomeScreen = () => {
  const systemTheme = useColorScheme();
  console.log(systemTheme);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
