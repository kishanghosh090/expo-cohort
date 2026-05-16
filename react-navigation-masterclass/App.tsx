// import * as React from "react";

import { DrawerNavigator } from "./src/navigator/drawer/StaticDrawerNavigator";
import DynamicTabNavigator from "./src/navigator/tabs/DynamicTabNavigator";

// import DynamicStack from "./src/navigator/stack/DynamicStackNavigator";

// export default function App() {
//   return <DynamicStack />;
// }

// // navigate("") -> go to screen by the name
// // goBack() -> prev stack element
// // push("") -> push every time a new instance
// // replace("") -> replace current screen
// // popToTop -> go back to the first elment of stack
// // popTo("")

// -------- bottom tabs

export default function App() {
  return <DrawerNavigator />;
}
