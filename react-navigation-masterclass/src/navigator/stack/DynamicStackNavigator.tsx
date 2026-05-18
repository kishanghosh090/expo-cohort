import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailedScreen from "../../screens/DetailedScreen";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "ios_from_right",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          headerStyle: {
            backgroundColor: "#0B1220",
          },
          headerTintColor: "#F8FAFC",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
          },
          animation: "slide_from_right",

          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailedScreen}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}

export default function DynamicStack() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

// Animations assignment
