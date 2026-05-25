import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// import * as FileSystem from "expo-file-system/legacy"; // legecy

import { File, Paths } from "expo-file-system";

const HomeScreen = () => {
  const [output, setOutput] = useState("");

  const demoFile = new File(Paths.document, "demo.txt");
  try {
    demoFile.create();
  } catch (error) {}

  const writeFile = async () => {
    demoFile.write("hello from kishan rana ghosh");
  };
  // writeFile();

  const readFile = async () => {
    const data = await demoFile.text();
    console.log(data);
    return data;
  };
  readFile();

  const appendFile = async () => {
    const olddata = await readFile();
    await demoFile.write(olddata + " this is kishan from chai code");
  };
  appendFile();
  readFile();
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
