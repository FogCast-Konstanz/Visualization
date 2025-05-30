import {
  ChakraProvider,
  ColorModeScript
} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import theme from "./theme"; // Optional custom theme
import "./index.scss"; // Optional global styles

import "./i18n/i18n";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Injects initial color mode settings */}
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
