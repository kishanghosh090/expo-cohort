import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="snippet/[snippet_id]"
        options={{
          title: "Snippet",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
