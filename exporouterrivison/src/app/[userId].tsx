import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const { userId } = useLocalSearchParams();
  return (
    <View>
      <Text>Profile {userId}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
