// Import React and ReactDOM
import "core-js/features/global-this";

import React from "react";
import { createRoot } from "react-dom/client";

import "zmp-ui/zaui.css";

import "./css/app.less";
import "./css/tailwind.css";

// Import App Component
import App from "./components/app";
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

// Mount React App
const root = createRoot(document.getElementById("app") as Element);
root.render(React.createElement(App));