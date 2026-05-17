import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const TechScreen = () => {
  const { slug, techname } = useLocalSearchParams();
  return (
    <View>
      <Text>
        TechScreen {slug} {techname}
      </Text>
    </View>
  );
};

export default TechScreen;

const styles = StyleSheet.create({});
