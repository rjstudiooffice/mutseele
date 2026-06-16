import type { Quiz, QuizOutcome } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ · „Was möchtest du aktuell verbessern?“
// Jede Antwort-Option zeigt auf ein QuizOutcome. Das Outcome bündelt
// world/category/matchTags + Anker-Produkt + Freebie. Die Empfehlungs-Engine
// (recommend.ts) übersetzt das in eine konkrete Produktliste.
// Erweiterbar: weitere Fragen (Alter des Kindes, Budget …) nur ergänzen.
// ─────────────────────────────────────────────────────────────────────────────
export const quiz: Quiz = {
  id: "quiz-einstieg",
  title: "Was möchtest du aktuell verbessern?",
  questions: [
    {
      id: "q-ziel",
      prompt: "Was möchtest du aktuell verbessern?",
      multiple: false,
      options: [
        { id: "o-kind-verstehen", label: "Mein Kind besser verstehen", outcomeId: "out-kind-verstehen", emoji: "🧭" },
        { id: "o-schlaf", label: "Schlaf verbessern", outcomeId: "out-schlaf", emoji: "🌙" },
        { id: "o-lernen", label: "Lernen & Konzentration", outcomeId: "out-lernen", emoji: "📚" },
        { id: "o-selbst-verstehen", label: "Mich selbst besser verstehen", outcomeId: "out-selbst-verstehen", emoji: "🪞" },
        { id: "o-entwicklung", label: "Persönlichkeitsentwicklung", outcomeId: "out-entwicklung", emoji: "🌱" },
        { id: "o-intuition", label: "Intuition stärken", outcomeId: "out-intuition", emoji: "🔮" },
      ],
    },
  ],
};

export const quizOutcomes: QuizOutcome[] = [
  {
    id: "out-kind-verstehen",
    headline: "Du willst dein Kind wirklich verstehen.",
    description:
      "Der beste Start ist eine persönliche Anleitung für dein Kind — und das Master-Referenzwerk, wenn du tiefer gehen willst.",
    worldId: "kinder-verstehen-staerken",
    categoryId: "kind-verstehen",
    matchTags: ["kind-verstehen", "human-design", "individuell"],
    primaryProductId: "betriebsanleitung-kind",
    leadMagnetId: "freebie-wegbegleiter-kinder",
  },
  {
    id: "out-schlaf",
    headline: "Ihr verdient erholsame Nächte.",
    description:
      "Der Schlaf Guide bringt die ganze Familie in einen ruhigeren Rhythmus.",
    worldId: "kinder-verstehen-staerken",
    categoryId: "schlaf-regulation",
    matchTags: ["schlaf", "regulation", "ruhe", "familie"],
    primaryProductId: "schlaf-guide",
    leadMagnetId: "freebie-gefuehle-lernen-achterbahn",
  },
  {
    id: "out-lernen",
    headline: "Lernen darf leicht werden.",
    description:
      "Bewegung und das Verständnis für Schulstress nehmen den Druck aus dem Lernalltag.",
    worldId: "kinder-verstehen-staerken",
    categoryId: "lernen-entwicklung",
    matchTags: ["lernen", "konzentration", "schule", "regulation"],
    primaryProductId: "bewegung-vernetzung",
    leadMagnetId: "freebie-lerntipps",
  },
  {
    id: "out-selbst-verstehen",
    headline: "Es ist Zeit, dich selbst zu verstehen.",
    description:
      "Die Geburtsdatenanalyse zeigt deinen Bauplan — der Master Guide gibt dir die ganze Tiefe.",
    worldId: "dich-selbst-verstehen-entfalten",
    categoryId: "dich-selbst-verstehen",
    matchTags: ["selbstverstaendnis", "human-design", "tiefe"],
    primaryProductId: "geburtsdatenanalyse",
    leadMagnetId: "freebie-lebensweg-kompass",
  },
  {
    id: "out-entwicklung",
    headline: "Du bist bereit, dich zu entfalten.",
    description:
      "Vom Vision Book bis zum Seelenstark Videokurs — dein Weg vom Verstehen ins Verändern.",
    worldId: "dich-selbst-verstehen-entfalten",
    categoryId: "dich-selbst-entfalten",
    matchTags: ["entwicklung", "transformation", "vision"],
    primaryProductId: "seelenstark-videokurs",
    leadMagnetId: "freebie-wegbegleiter-erwachsene",
  },
  {
    id: "out-intuition",
    headline: "Vertrau deiner inneren Stimme.",
    description:
      "Der Seelenkompass stärkt deine Intuition Monat für Monat.",
    worldId: "dich-selbst-verstehen-entfalten",
    categoryId: "deiner-intuition-vertrauen",
    matchTags: ["intuition", "ritual", "frauen"],
    primaryProductId: "seelenkompass-monatsimpuls",
    leadMagnetId: "freebie-wegbegleiter-erwachsene",
  },
];
