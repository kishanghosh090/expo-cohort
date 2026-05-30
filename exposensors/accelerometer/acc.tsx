import { StyleSheet, Text, View } from "react-native";
import { TiltGame } from "./components/tilt-game";

// isAvailable or not
// subscribe
export default function Index() {
  // const { x, y, z, available } = useAccelerometer();
  // console.log(available, x, y, z);

  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <TiltGame />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
