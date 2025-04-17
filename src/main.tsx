import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App";
import { MetadataProvider } from "./Context/Metadata";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <MetadataProvider>
      <App />
    </MetadataProvider>
  </BrowserRouter>,
);
