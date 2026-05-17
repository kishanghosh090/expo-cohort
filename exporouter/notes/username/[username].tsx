import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserName = () => {
  const { username } = useLocalSearchParams<{ username: string }>();
  return (
    <View>
      <Text>UserName {username}</Text>
    </View>
  );
};

export default UserName;

const styles = StyleSheet.create({});
