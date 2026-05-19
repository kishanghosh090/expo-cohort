import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <Slot
      screenOptions={({ navigation, route, theme }) => {
        // console.log(navigation);

        // console.log(route);

        // console.log(theme);

        return {};
      }}
    />
  );
}
