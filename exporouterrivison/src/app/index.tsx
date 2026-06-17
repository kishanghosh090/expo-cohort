import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Link href={"/kishanranaghoh"}>Profile</Link>
      <Link href={"/232323232323"}>Profile</Link>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
