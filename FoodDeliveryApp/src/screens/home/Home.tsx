import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import { Storage } from "../../utils/asyncStorage";
export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        onPress={async () => {
          const storage = new Storage();
          await storage.removeData();
          navigation.replace("Onboarding");
        }}
      >
        Go to Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
