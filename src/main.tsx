import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import BrandBible from "./app/BrandBible.tsx";
import WorldPage from "./app/pages/WorldPage.tsx";
import ProductPage from "./app/pages/ProductPage.tsx";
import BundlePage from "./app/pages/BundlePage.tsx";
import FreebiePage from "./app/pages/FreebiePage.tsx";
import QuizPage from "./app/pages/QuizPage.tsx";
import { ScrollToTop } from "./app/shared/Layout.tsx";
import "./styles/index.css";

// Routing-Hinweis: Der Build ist ein einzelnes inlined index.html (viteSingleFile)
// und der Prerender rendert nur "/" über file://. Daher:
//  • BrowserRouter für saubere Pfade (/produkt/:slug …)
//  • Catch-all "*" → App: unter file:// matcht kein Pfad → Landing wird gerendert
//    (Prerender bleibt heil); unbekannte Top-Level-Pfade zeigen ebenfalls die Landing.
//  • Statische Hosts brauchen ein SPA-Fallback auf index.html (siehe public/_redirects).
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/gratis" element={<FreebiePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/brand-bible" element={<BrandBible />} />
      <Route path="/produkt/:slug" element={<ProductPage />} />
      <Route path="/bundle/:slug" element={<BundlePage />} />
      <Route path="/:worldSlug" element={<WorldPage />} />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
