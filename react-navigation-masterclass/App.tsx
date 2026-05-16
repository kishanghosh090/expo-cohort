import * as React from "react";
import { View, Text } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailedScreen from "./src/screens/DetailedScreen";

// assignment
const Stack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home: HomeScreen,
    Detail: DetailedScreen,
  },
});

const Navigation = createStaticNavigation(Stack);

export default function App() {
  return <Navigation />;
}

// navigate("") -> go to screen by the name
// goBack() -> prev stack element
// push("") -> push every time a new instance
// replace("") -> replace current screen
// popToTop -> go back to the first elment of stack
// popTo("")
