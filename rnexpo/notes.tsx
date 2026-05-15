// import { useState } from "react";
// import { Image, Pressable, Text, TextInput, View } from "react-native";

// export default function HomeScreen() {
//   const [name, setName] = useState("");
//   return (
//     <View>
//       <Text numberOfLines={3}>Hello from chai code</Text>
//       {/* <Image
//         source={{
//           uri: "https://avatars.githubusercontent.com/u/107530887?v=4",
//         }}
//         width={200}
//         height={200}
//       /> */}
//       <Image
//         source={require("@/assets/images/icon.png")}
//         style={{ height: 100, width: 100 }}
//         blurRadius={5}
//       />

//       <TextInput
//         value={name}
//         placeholder="Enter password"
//         onChangeText={setName}
//         placeholderTextColor={"#212121"}
//         style={{
//           borderColor: "#212121",
//           borderWidth: 0.5,
//           padding: 10,
//         }}
//       />
//       <Pressable
//         // onLongPress={}
//         // onPressIn={}
//         // onPressOut={}

//         style={({ pressed }) => ({
//           backgroundColor: pressed ? "#36a736" : "#039643",
//         })}
//         onPress={() => alert("button clicked")}
//         hitSlop={100}
//       >
//         {/* <Text>Lets Go</Text> */}

//         {({ pressed }) =>
//           pressed ? <Text>pressing...</Text> : <Text>press</Text>
//         }
//       </Pressable>
//     </View>
//   );
// }

// import React, { useState } from "react";
// import {
//   Button,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   View,
// } from "react-native";

// const HomeScreen = () => {
//   const items = Array.from({ length: 20 }, (_, i) => `item ${i + 1}`);
//   const [isDark, SetIsDark] = useState(false);
//   return (
//     <ScrollView
//       style={{ flex: 1 }}
//       contentContainerStyle={{
//         padding: 16,
//         alignItems: "center",
//       }}
//     >
//       {items.map((idx, el) => (
//         <View
//           key={el}
//           style={{
//             backgroundColor: "white",
//             padding: 16,
//             borderRadius: 10,
//             marginBottom: 10,
//             shadowColor: "#000",
//             shadowOpacity: 0.05,
//             shadowRadius: 4,
//             elevation: 2,
//           }}
//         >
//           <Text style={{ fontSize: 16 }}>item {el}</Text>
//         </View>
//       ))}
//       <Button title="Get"></Button>
//       <Switch
//         value={isDark}
//         onValueChange={SetIsDark}
//         trackColor={{ false: "#ddd", true: "#212121" }}
//         thumbColor={""}
//       />
//     </ScrollView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

// import React from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";

// const HomeScreen = () => {
//   const USERS = [
//     { id: "1", name: "Alice Johnson", role: "Designer" },
//     { id: "2", name: "Bob Smith", role: "Developer" },
//     { id: "3", name: "Carol White", role: "Manager" },
//     { id: "4", name: "David Brown", role: "Developer" },
//     { id: "5", name: "Eve Davis", role: "Designer" },
//   ];
//   return (
//     <FlatList
//       data={USERS}
//       horizontal
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => <Text>{item.name}</Text>}
//       contentContainerStyle={{ padding: 10 }}
//       ItemSeparatorComponent={() => (
//         <View style={{ height: 0.2, backgroundColor: "#212121" }} />
//       )}
//     />
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TextInput
            placeholder="ss"
            style={{ backgroundClip: "#212121", height: 10 }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

// import React from "react";
// import { StyleSheet, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const HomeScreen = () => {
//   return (
//     <SafeAreaView>
//       <Text>HomeScreen</Text>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

/// -------------
// import React from "react";
// import { StatusBar, StyleSheet, Text, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// // safeAreaView, useSafeAreaInsets
// // initialWindowMatirx
// // StyleSheets -> create, compose, flatten
// // Responsiveness -> useWindowDimensions, useColorScheme

// function UnSafeView() {
//   const insets = useSafeAreaInsets();
//   console.log(insets);

//   return (
//     <View
//       style={{
//         paddingTop: insets.top,
//         paddingLeft: insets.left,
//       }}
//     >
//       <StatusBar barStyle={"default"} />
//       <Text>hello</Text>
//     </View>
//   );
// }

// const HomeScreen = () => {
//   return (
//     // <SafeAreaView>
//     //   <StatusBar />
//     //   <Text>HomeScreen</Text>
//     // </SafeAreaView>
//     <>
//       <UnSafeView />
//     </>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});
// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// const HomeScreen = () => {
//   const isActive = true;

//   const bottomStyle = StyleSheet.compose(
//     styles.button,
//     isActive ? styles.active : null,
//   );
//   return (
//     <View>
//       <StatusBar style="dark" />
//       <Text>HomeScreen</Text>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   button: {},
//   active: {},
// });
// import React from "react";
// import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";

// import * as ScreenOrientation from "expo-screen-orientation";
// import { SafeAreaView } from "react-native-safe-area-context";
// const HomeScreen = () => {
//   const { height, width } = useWindowDimensions();
//   console.log(height);
//   console.log(width);

//   const isTablet = width >= 768;
//   const isLandScape = width > height;

//   const lockLandScape = async () => {
//     await ScreenOrientation.lockAsync(
//       ScreenOrientation.OrientationLock.LANDSCAPE,
//     );
//   };
//   const lockPotrait = async () => {
//     await ScreenOrientation.lockAsync(
//       ScreenOrientation.OrientationLock.PORTRAIT,
//     );
//   };

//   return (
//     <SafeAreaView>
//       <Text>HomeScreen</Text>
//       <Pressable onPress={lockLandScape}>
//         <Text>landscape</Text>
//       </Pressable>
//       <Pressable onPress={lockPotrait}>
//         <Text>portrait</Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});
