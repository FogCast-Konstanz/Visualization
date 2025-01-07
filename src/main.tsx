import React from "react";
import ReactDOM from "react-dom/client";
import { mode } from "@chakra-ui/theme-tools";
import {
  ChakraProvider,
  ColorModeScript,
  defineStyle,
  defineStyleConfig,
  extendTheme,
  StyleFunctionProps,
  useColorModeValue,
} from "@chakra-ui/react";
import App from "./App";
// import theme from "./theme"; // Optional custom theme
import "./index.css"; // Optional global styles

import "./i18n/i18n";
import _default from "@emotion/styled";
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
