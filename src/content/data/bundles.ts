import type { Bundle, Money } from "../types";
import { bundleCheckout as checkout } from "../tentary";

const eur = (amount: number, compareAt?: number): Money => ({
  amount,
  currency: "EUR",
  ...(compareAt ? { compareAt } : {}),
});

// ─────────────────────────────────────────────────────────────────────────────
// BUNDLES
// Drei Bündel-Logiken:
//   • family  → Produktfamilie als Paket (Trust + Cross-Sell)
//   • journey → Werttreppe (Einstieg → Vertiefung)
//   • world   → thematische Sammlung innerhalb einer Welt
// `compareAt` = Summe der Einzelpreise (im UI als Ersparnis ausweisen).
// ─────────────────────────────────────────────────────────────────────────────
export const bundles: Bundle[] = [
  {
    id: "bundle-hd-kids-komplett",
    title: "Human Design · Kind verstehen Komplett",
    tagline: "Vom ersten Verstehen bis zum eigenständigen Chart-Lesen.",
    description:
      "Die Persönliche Betriebsanleitung für den schnellen Einstieg plus das Master-Referenzwerk für echte Tiefe — alles, um dein Kind wirklich zu verstehen.",
    kind: "family",
    familyId: "human-design",
    worldId: "kinder-verstehen-staerken",
    productIds: ["betriebsanleitung-kind", "hd-master-guide-kids"],
    price: eur(649, 804),
    badge: "empfohlen",
    tentary: checkout("hd-kids-komplett"),
  },
  {
    id: "bundle-seelenstark-frau",
    title: "Seelenstark · Deine Reise",
    tagline: "Vom Selbstwert-Einstieg in die gelebte Stärke.",
    description:
      "Seelenstark Erwachsene als Einstieg und der Videokurs zur Vertiefung — deine Werttreppe in die innere Stärke.",
    kind: "journey",
    familyId: "seelenstark",
    worldId: "dich-selbst-verstehen-entfalten",
    productIds: ["seelenstark-erwachsene", "seelenstark-videokurs"],
    price: eur(159, 178),
    tentary: checkout("seelenstark-frau"),
  },
  {
    id: "bundle-lernen-regulation",
    title: "Lernen & Regulation Paket",
    tagline: "Konzentration, Schlaf und Lernen — gemeinsam gedacht.",
    description:
      "Bewegung schafft Vernetzung, der Schlaf Guide und Schulstress verstehen — drei Bausteine, die sich gegenseitig verstärken.",
    kind: "world",
    familyId: "entwicklung-regulation",
    worldId: "kinder-verstehen-staerken",
    productIds: ["bewegung-vernetzung", "schlaf-guide", "schulstress-verstehen"],
    price: eur(599, 677),
    tentary: checkout("lernen-regulation"),
  },
  {
    // Human Design Erwachsenen-Bundle — parallel zum Kids-Bundle aufgebaut.
    id: "bundle-hd-erwachsene-komplett",
    title: "Human Design · Dich selbst verstehen Komplett",
    tagline: "Persönliche Analyse trifft Master-Referenzwerk.",
    description:
      "Die Geburtsdatenanalyse für deinen persönlichen Bauplan plus das Human Design Master-Referenzwerk für die ganze Tiefe.",
    kind: "family",
    familyId: "human-design",
    worldId: "dich-selbst-verstehen-entfalten",
    productIds: ["geburtsdatenanalyse", "hd-master-guide-erwachsene"],
    price: eur(799, 954),
    badge: "empfohlen",
    tentary: checkout("hd-erwachsene-komplett"),
  },
];
