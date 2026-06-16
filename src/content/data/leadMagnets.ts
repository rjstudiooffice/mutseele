import type { LeadMagnet } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// LEAD-MAGNETS (Freebies) · eigene Welt „Kostenlose Ressourcen“
// Jedes Freebie hat einen `emailTag` (Mailtool-Automation) und einen Funnel:
// `leadsToWorldId` / `leadsToProductIds` für gezielte Folge-Empfehlungen.
// ─────────────────────────────────────────────────────────────────────────────
export const leadMagnets: LeadMagnet[] = [
  {
    // Hervorgehobenes Freebie für den Startseiten-Funnel.
    id: "freebie-atemreise",
    title: "5-Minuten-Atemreise für Frauen",
    tagline: "In unter 5 Minuten zurück zu deiner Mitte.",
    description:
      "Eine kostenlose geführte Atemreise — dein sanfter erster Schritt zurück zu dir.",
    audience: "frauen",
    emailTag: "freebie_atemreise",
    leadsToWorldId: "dich-selbst-verstehen-entfalten",
    leadsToProductIds: ["seelenstark-erwachsene", "vision-book"],
    featured: true,
    bullets: [
      "Geführtes PDF + Audiodatei",
      "Sofort nach Anmeldung verfügbar",
      "Keine Vorkenntnisse nötig",
      "Von über 500 Frauen geliebt",
    ],
  },
  {
    id: "freebie-lerntipps",
    title: "Lerntipps für entspanntes Lernen",
    tagline: "Kleine Impulse, große Wirkung im Lernalltag.",
    description:
      "Sofort umsetzbare Tipps, mit denen Lernen für dein Kind leichter wird.",
    audience: "eltern",
    emailTag: "freebie_lerntipps",
    leadsToWorldId: "kinder-verstehen-staerken",
    leadsToProductIds: ["schulstress-verstehen", "bewegung-vernetzung"],
  },
  {
    id: "freebie-gefuehle-lernen-achterbahn",
    title: "Wenn Gefühle und Lernen Achterbahn fahren",
    tagline: "Verstehen, was im Kind vorgeht — und wie du hilfst.",
    description:
      "Ein Leitfaden für die Tage, an denen Emotionen und Lernen kollidieren.",
    audience: "eltern",
    emailTag: "freebie_gefuehle_lernen",
    leadsToWorldId: "kinder-verstehen-staerken",
    leadsToProductIds: ["schulstress-verstehen", "seelenstark-kind"],
  },
  {
    id: "freebie-lebensweg-kompass",
    title: "Lebensweg Kompass",
    tagline: "Ein erster Blick auf deinen Weg.",
    description:
      "Ein kostenloser Impuls, der dir Orientierung über deinen Lebensweg gibt.",
    audience: "frauen",
    emailTag: "freebie_lebensweg_kompass",
    leadsToWorldId: "dich-selbst-verstehen-entfalten",
    leadsToProductIds: ["geburtsdatenanalyse", "seelenstark-erwachsene"],
  },
  {
    id: "freebie-wegbegleiter-erwachsene",
    title: "Magische Wegbegleiter · Erwachsene",
    tagline: "Tägliche Impulse für deinen Weg.",
    description:
      "Liebevolle Begleiter-Impulse für mehr Klarheit und Vertrauen im Alltag.",
    audience: "frauen",
    emailTag: "freebie_wegbegleiter_erwachsene",
    leadsToWorldId: "dich-selbst-verstehen-entfalten",
    leadsToProductIds: ["seelenkompass-monatsimpuls", "vision-book"],
  },
  {
    id: "freebie-wegbegleiter-kinder",
    title: "Magische Wegbegleiter · Kinder",
    tagline: "Kleine Begleiter für große Gefühle.",
    description:
      "Impulse, die Kinder spielerisch durch ihren Alltag begleiten.",
    audience: "eltern",
    emailTag: "freebie_wegbegleiter_kinder",
    leadsToWorldId: "kinder-verstehen-staerken",
    leadsToProductIds: ["magisches-kinder-workbook", "seelenstark-kind"],
  },
];
