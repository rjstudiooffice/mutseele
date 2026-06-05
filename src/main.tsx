
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import BrandBible from "./app/BrandBible.tsx";
  import "./styles/index.css";

  const isBrandBible = window.location.hash === "#brand-bible";
  createRoot(document.getElementById("root")!).render(isBrandBible ? <BrandBible /> : <App />);
  