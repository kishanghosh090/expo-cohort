import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
// useRouter
const About = () => {
  console.log(router);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>About</Text>
      <Pressable
        onPress={() => {
          router.push("/");
        }}
      >
        <Text>home</Text>
      </Pressable>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
