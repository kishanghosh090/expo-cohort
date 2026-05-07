import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

import UserContextProvider from "./context/UserContextProvider";
import ProvideGithubUserName from "./components/ProvideGithubUserName";

function App() {
  return (
    <UserContextProvider>
      <ProvideGithubUserName></ProvideGithubUserName>
    </UserContextProvider>
  );
}

export default App;
