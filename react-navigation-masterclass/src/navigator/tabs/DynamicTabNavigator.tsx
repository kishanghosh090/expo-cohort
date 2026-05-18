import * as React from "react";
import { Platform, Text, View } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailedScreen from "../../screens/DetailedScreen";
import SearchScreen from "../../screens/SearchScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailedScreen} />
    </HomeStack.Navigator>
  );
}

const topTab = createBottomTabNavigator();
// const topTab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <topTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const icon =
            route.name === "Home"
              ? focused
                ? "home"
                : "home-outline"
              : route.name === "Search"
                ? focused
                  ? "search"
                  : "search-outline"
                : focused
                  ? "person"
                  : "person-outline";

          return <Ionicons name={icon} color={color} />;
        },
      })}
    >
      <topTab.Screen name="Home" component={HomeStackScreen} options={{}} />
      <topTab.Screen name="Search" component={SearchScreen} />
    </topTab.Navigator>
  );
}

export default function DynamicTabNavigator() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
