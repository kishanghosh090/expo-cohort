// import React, { useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// // import * as FileSystem from "expo-file-system/legacy";
// import { File, Paths } from "expo-file-system";

// const HomeScreen = () => {
//   const [output, setOutput] = useState("");

//   const demoFile = new File(Paths.document, "demo.txt");

//   // console.log(Paths.document);
//   const writeFile = async () => {
//     await demoFile.write("hhdhdhdhd");
//   };

//   const copiedFile = new File(Paths.document, "copiedFile.txt");

//   const readFile = async () => {
//     const data = await demoFile.text();
//     console.log(data);

//     return data;
//   };

//   const appendFIle = async () => {
//     const oldData = await readFile();
//     await demoFile.write(oldData + "\n" + "my new Data");
//   };

//   const copyFile = async () => {
//     await demoFile.copy(copiedFile);
//   };

//   const getFileInfo = () => {
//     const info = {
//       exists: demoFile.exists,
//       size: demoFile.size,
//       uri: demoFile.uri,
//       name: demoFile.name,
//     };
//   };

//   return (
//     <View>
//       <Text>HomeScreen</Text>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<{
    remove: () => void;
  } | null>(null);

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      }),
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gyroscope:</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
