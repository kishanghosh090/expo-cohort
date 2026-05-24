import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#151f34",
        },
      }}
    />
  );
}
