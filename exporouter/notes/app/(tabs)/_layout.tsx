// import { NativeTabs } from "expo-router/unstable-native-tabs";

// export default function TabLayout() {
//   return (
//     <NativeTabs>
//       <NativeTabs.Trigger name="index">
//         <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
//       </NativeTabs.Trigger>
//       <NativeTabs.Trigger name="settings">
//         <NativeTabs.Trigger.Icon sf="gear" md="settings" />
//         <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
//       </NativeTabs.Trigger>
//     </NativeTabs>
//   );
// }

import { Tabs } from "expo-router";
import { View } from "react-native";

function MyTabs({ state, descripter, navigator }) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
      }}
    ></View>
  );
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="about" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
