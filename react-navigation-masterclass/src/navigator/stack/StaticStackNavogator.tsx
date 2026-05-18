import * as React from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailedScreen from "../../screens/DetailedScreen";

// assignment ----
const Stack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
    Detail: DetailedScreen,
  },
});

const Navigation = createStaticNavigation(Stack);

export default function App() {
  return <Navigation />;
}
