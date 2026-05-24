import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// import * as FileSystem from "expo-file-system/legacy";
import { File, Paths } from "expo-file-system";

const HomeScreen = () => {
  const [output, setOutput] = useState("");

  const demoFile = new File(Paths.document, "demo.txt");

  // console.log(Paths.document);
  const writeFile = async () => {
    await demoFile.write("hhdhdhdhd");
  };

  const copiedFile = new File(Paths.document, "copiedFile.txt");

  const readFile = async () => {
    const data = await demoFile.text();
    console.log(data);

    return data;
  };

  const appendFIle = async () => {
    const oldData = await readFile();
    await demoFile.write(oldData + "\n" + "my new Data");
  };

  const copyFile = async () => {
    await demoFile.copy(copiedFile);
  };

  const getFileInfo = () => {
    const info = {
      exists: demoFile.exists,
      size: demoFile.size,
      uri: demoFile.uri,
      name: demoFile.name,
    };
  };

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
