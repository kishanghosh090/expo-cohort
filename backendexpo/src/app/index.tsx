import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  useEffect(() => {
    fetch("http://localhost:3002/api/hello")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <View>
      <Text>IndexScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
