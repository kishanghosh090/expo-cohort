import * as React from "react";
import { Text, View } from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/screens/signup/SignUp";
import SignIn from "./src/screens/signin/SignIn";
import Onboarding from "./src/screens/onboarding/Onboarding";

function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("Profile")}>
        Go to Profile
      </Button>
    </View>
  );
}

const MyStack = createStackNavigator({
  initialRouteName: "Onboarding",
  screens: {
    Onboarding: {
      screen: Onboarding,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: SignIn,
      options: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUp,
      options: {
        headerShown: false,
      },
    },
    Home: { screen: HomeScreen },
  },
});

const Navigation = createStaticNavigation(MyStack);

export default function App() {
  return <Navigation />;
}
