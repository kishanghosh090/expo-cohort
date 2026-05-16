import { View, Text, Button } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        onPress={() => {
          navigation.navigate("Details", {
            username: "chai code",
          });
        }}
        title="button"
      />
    </View>
  );
};

export default HomeScreen;
