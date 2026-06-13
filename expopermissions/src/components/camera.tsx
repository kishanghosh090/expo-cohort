import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
const camera = () => {
  const [permisson, requestPermission] = useCameraPermissions();

  if (!permisson) {
    return <Text>Loading...</Text>;
  }

  if (!permisson.granted) {
    return (
      <View>
        <Text>We need permisson</Text>
        <Button title="Request Permisson" onPress={requestPermission} />
      </View>
    );
  }
  return <CameraView style={{ flex: 1 }} facing="back" />;
};

export default camera;

const styles = StyleSheet.create({});
