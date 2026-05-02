import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
const h1 = React.createElement("h1", null, "hello from chai code");

createRoot(document.getElementById("root")).render(<App title="chai code" />);
