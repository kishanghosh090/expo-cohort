// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack
//       screenOptions={({ navigation, route, theme }) => {
//         // console.log(navigation);

//         // console.log(route);

//         // console.log(theme);

//         return {};
//       }}
//     />
//   );
// }

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "home",
        
        }}
      />
    </Stack>
  );
}
