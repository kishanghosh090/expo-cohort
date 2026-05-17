import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DocsDynamic = () => {
  const { slug } = useLocalSearchParams();
  return (
    <View>
      <Text>DocsDynamic {slug}</Text>
    </View>
  );
};

export default DocsDynamic;

const styles = StyleSheet.create({});
