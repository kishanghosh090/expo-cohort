import * as React from "react";

import DynamicStack from "./src/navigator/stack/DynamicStackNavigator";

export default function App() {
  return <DynamicStack />;
}

// navigate("") -> go to screen by the name
// goBack() -> prev stack element
// push("") -> push every time a new instance
// replace("") -> replace current screen
// popToTop -> go back to the first elment of stack
// popTo("")
