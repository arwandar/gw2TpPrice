import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { ContextProvider } from "./Context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
