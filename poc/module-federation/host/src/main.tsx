import { ChThemeProvider } from "@custhome/ui";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <ChThemeProvider>
    <App />
  </ChThemeProvider>
);
