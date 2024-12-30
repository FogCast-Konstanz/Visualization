import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
// import theme from "./theme"; // Optional custom theme
import "./index.css"; // Optional global styles

import "./i18n/i18n";

const theme = extendTheme({
  colors: {
    custom: {
      surface: "#2F4F4F",
      background: "#293F3F",
      text: "#DCDCDC",
      secondarytext: "#000000",
      primary: "#AFDBF5",
      secondary: "#A1E5AB",
      ternary: "#AE5656",
    },
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Injects initial color mode settings */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);