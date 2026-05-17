import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href={"/profile/details"}>About</Link>
      <Link href={"/user/kishanranaghosh"}>id</Link>
      <Link href={"/username/kishanranaghoshsssssc"}>name</Link>
      <Link href={"/docs/ssss/getting-started/23dddsd"}>name</Link>
      <Link href={"/newdocs/hello/from/chai/code"}>... catche all</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
