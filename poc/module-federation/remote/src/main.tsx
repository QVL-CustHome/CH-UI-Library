import { ChThemeProvider } from "@custhome/ui";
import { createRoot } from "react-dom/client";
import Widget from "./Widget";

createRoot(document.getElementById("root")!).render(
  <ChThemeProvider>
    <Widget />
  </ChThemeProvider>
);
