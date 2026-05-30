import React from "react";
import { StyleSheet, View } from "react-native";
import GyroScopeCard from "./components/GyroScopeCard";

const Home = () => {
  return (
    <View style={styles.container}>
      <GyroScopeCard />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
});
