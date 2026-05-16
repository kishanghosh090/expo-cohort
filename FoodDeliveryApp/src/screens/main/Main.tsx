import * as React from "react";
import { Animated, Easing, Text, View, Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { TAB_CONFIG } from "../../constants/tabConfig";
import { TabIcon } from "../../components/TabIcon";
import ProfileScreen from "../profile/Profile";
import { SearchScreen } from "../search/Search";
import { OrdersScreen } from "../orders/Orders";
import { HomeScreen } from "../Home/Home";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];

        return {
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 90,
            backgroundColor: "#ffffff",
            borderTopWidth: 0,
            elevation: 0,
            paddingHorizontal: 15,
            paddingTop: 10,
            shadowOpacity: 0.08,
            shadowRadius: 10,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            ...(Platform.OS === "android" && {
              elevation: 10,
            }),
          },

          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },

          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} config={config} />
          ),
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Search" component={SearchScreen} />

      <Tab.Screen name="Orders" component={OrdersScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
