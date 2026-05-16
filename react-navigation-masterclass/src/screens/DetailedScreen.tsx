import { View, Text } from "react-native";
import React from "react";

const DetailedScreen = ({ route }: any) => {
  const { username } = route.params;
  return (
    <View>
      <Text>DetailedScreen {username}</Text>
    </View>
  );
};

export default DetailedScreen;
