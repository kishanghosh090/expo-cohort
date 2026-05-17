import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserIdScreen = () => {
  const { userid } = useLocalSearchParams<{ userid: string }>();

  return (
    <View>
      <Text>UserIdScreen {userid}</Text>
    </View>
  );
};

export default UserIdScreen;

const styles = StyleSheet.create({});
