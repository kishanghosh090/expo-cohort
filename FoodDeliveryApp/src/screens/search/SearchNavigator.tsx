import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchScreen } from "./Search";
import { FoodItemDetails } from "../foodDetails/FoodItemDetails";
import { useAppTheme } from "../../theme/ThemeProvider";

const Stack = createStackNavigator();

export default function SearchNavigator() {
  const { theme } = useAppTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: "600",
        },
      }}
    >
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
