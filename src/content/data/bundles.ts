import type { Bundle, Money } from "../types";
import { bundleCheckout as checkout } from "../tentary";

const eur = (amount: number, compareAt?: number): Money => ({
  amount,
  currency: "EUR",
  ...(compareAt ? { compareAt } : {}),
});

// ─────────────────────────────────────────────────────────────────────────────
// BUNDLES
// `compareAt` = Summe der Einzelpreise. Im UI immer absolut ausweisen
// (Einzelpreis / Bundlepreis / Du sparst X €) — NICHT als Prozent-Rabatt.
//
// `homeOrder` bestimmt die Startseiten-Premium-Hierarchie:
//   1 = Human Design Erwachsene (799 €) · 2 = Kinder (649 €) · 3 = Lernen (549 €).
// Das Seelenstark-Bundle und das MamaStart-Bundle erscheinen NICHT auf der
// Startseite (kein homeOrder).
// ─────────────────────────────────────────────────────────────────────────────
export const bundles: Bundle[] = [
  {
    id: "bundle-hd-erwachsene-komplett",
    title: "Human Design Erwachsene Bundle",
    tagline: "Persönliche Analyse trifft Master-Referenzwerk.",
    description:
      "Die Geburtsdatenanalyse für deinen persönlichen Bauplan plus das Human Design Master-Referenzwerk für die ganze Tiefe.",
    kind: "family",
    familyId: "human-design",
    worldId: "dich-selbst-verstehen-entfalten",
    productIds: ["hd-master-guide-erwachsene", "geburtsdatenanalyse"],
    price: eur(799, 954),
    badge: "empfohlen",
    homeOrder: 1,
    tentary: checkout("hd-erwachsene-komplett"),
  },
  {
    id: "bundle-hd-kids-komplett",
    title: "Human Design Kinder Bundle",
    tagline: "Vom ersten Verstehen bis zum eigenständigen Chart-Lesen.",
    description:
      "Die Persönliche Betriebsanleitung für den schnellen Einstieg plus das Master-Referenzwerk für echte Tiefe — alles, um dein Kind wirklich zu verstehen.",
    kind: "family",
    familyId: "human-design",
    worldId: "kinder-verstehen-staerken",
    productIds: ["hd-master-guide-kids", "betriebsanleitung-kind"],
    price: eur(649, 804),
    badge: "empfohlen",
    homeOrder: 2,
    tentary: checkout("hd-kids-komplett"),
  },
  {
    id: "bundle-lernen-regulation",
    title: "Lernen & Regulation Bundle",
    tagline: "Konzentration, Schlaf und Lernen — gemeinsam gedacht.",
    description:
      "Bewegung schafft Vernetzung, der Schlaf Guide und Schulstress verstehen — drei Bausteine, die sich gegenseitig verstärken.",
    kind: "world",
    familyId: "entwicklung-regulation",
    worldId: "kinder-verstehen-staerken",
    productIds: ["bewegung-vernetzung", "schlaf-guide", "schulstress-verstehen"],
    price: eur(549, 677),
    homeOrder: 3,
    tentary: checkout("lernen-regulation"),
  },
  {
    // Erscheint primär auf den Seelenstark-Produktseiten, nicht auf der Startseite.
    id: "bundle-seelenstark",
    title: "Seelenstark Bundle",
    tagline: "Erste Aha-Momente — für dein Kind, dich und eure Beziehungen.",
    description:
      "Seelenstark Kind, Seelenstark Erwachsene und der Videokurs — die ganze Seelenstark-Familie in einem Paket.",
    kind: "family",
    familyId: "seelenstark",
    worldId: "dich-selbst-verstehen-entfalten",
    productIds: ["seelenstark-kind", "seelenstark-erwachsene", "seelenstark-videokurs"],
    price: eur(179, 207),
    tentary: checkout("seelenstark"),
  },
  {
    // Optional / später — kein zentrales Startseiten-Bundle.
    id: "bundle-mamastart",
    title: "MamaStart Bundle",
    tagline: "Ein starker Start — und mehr Leichtigkeit danach.",
    description:
      "MamaStart für den sicheren Start in Schwangerschaft und Babyzeit plus 21 Tage für mehr Leichtigkeit im Familienalltag.",
    kind: "world",
    worldId: "kinder-verstehen-staerken",
    productIds: ["mamastart", "21-tage-leichtigkeit"],
    price: eur(69, 83),
    tentary: checkout("mamastart"),
  },
];
