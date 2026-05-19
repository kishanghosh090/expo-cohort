import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoggedIn = true;
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <Text>Header</Text>
    //   <Slot />
    //   <Text>Footer</Text>
    // </SafeAreaView>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#212121",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn}>
        {/* <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen name="about" /> */}
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
