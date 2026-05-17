import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchScreen } from "./Search";
import FoodItemDetails from "../foodDetails/FoodItemDetails";

const Stack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchRoot"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FoodItemDetails"
        component={FoodItemDetails}
        options={({ route }) => ({
          title: (route.params as any).foodName ?? "Food Details",
          headerBackTitle: "search",
        })}
      />
    </Stack.Navigator>
  );
}
