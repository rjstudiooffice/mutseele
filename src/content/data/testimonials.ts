import type { Testimonial } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS · mit Kontext-Zuordnung (worldId / productId) für gezielte
// Anzeige auf Produkt-/Weltseiten. `rating` steuert die Sterne-Darstellung.
// ─────────────────────────────────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: "t-maria-k",
    quote:
      "Mein Sohn hatte in den ersten drei Wochen mit dem Workbook seinen ersten ruhigen Schultag seit Monaten. Sabrina hat uns wirklich gesehen — das spürt man sofort.",
    author: "Maria K.",
    role: "Mutter von 2 Kindern",
    worldId: "kinder-verstehen-staerken",
    productId: "schulstress-verstehen",
    rating: 5,
  },
  {
    id: "t-lisa-m",
    quote:
      "Das Vision Book hat mir nach Jahren des Funktionierens gezeigt, was ich wirklich will. In 4 Wochen mehr Klarheit als in 4 Jahren Selbstoptimierung.",
    author: "Lisa M.",
    role: "Unternehmerin & Mama",
    worldId: "dich-selbst-verstehen-entfalten",
    productId: "vision-book",
    rating: 5,
  },
  {
    id: "t-daniela-r",
    quote:
      "Ich habe Glaubenssätze losgelassen, die mich seit meiner Kindheit blockiert haben. Seelenstark war das Mutigste und Beste, was ich je für mich getan habe.",
    author: "Daniela R.",
    role: "Frau im Wandel",
    worldId: "dich-selbst-verstehen-entfalten",
    productId: "seelenstark-erwachsene",
    rating: 5,
  },
];
