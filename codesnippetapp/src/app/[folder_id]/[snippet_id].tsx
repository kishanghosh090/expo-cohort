import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SnippetScreen = () => {
  const { snippet_id } = useLocalSearchParams<any>();
  return (
    <View>
      <Text>SnippetScreen {snippet_id}</Text>
    </View>
  );
};

export default SnippetScreen;

const styles = StyleSheet.create({});
