import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FoodListForResturan = ({ route }: any) => {
  const { resId } = route.params;
  return (
    <View>
      <Text>FoodListForResturantScreen {resId}</Text>
    </View>
  );
};

export default FoodListForResturan;

const styles = StyleSheet.create({});
