import type { World, Category, ProductFamily } from "../types";

// ── Welten ───────────────────────────────────────────────────────────────────
// 2 Hauptwelten + 1 eigenständige Welt (Pädagogen). Freebies = eigene Welt
// (siehe leadMagnets.ts), bewusst NICHT als World-Tab geführt.
export const worlds: World[] = [
  {
    id: "kinder-verstehen-staerken",
    order: 1,
    title: "Kinder verstehen & stärken",
    shortLabel: "Kinder",
    promise: "Verstehe dein Kind — und begleite es mit Klarheit statt Sorge.",
    emoji: "🌿",
    audience: "eltern",
    landing: {
      description:
        "Dein Kind ist einzigartig — nicht schwierig. Wenn du weißt, wie es wirklich funktioniert, verändert sich alles: der Schulalltag, der Schlaf, die Verbindung zwischen euch.",
      cta: "Für Kinder & Mamas entdecken",
      gradient: "linear-gradient(135deg,#fce4ec 0%,#fde8d8 100%)",
    },
  },
  {
    id: "dich-selbst-verstehen-entfalten",
    order: 2,
    title: "Dich selbst verstehen & entfalten",
    shortLabel: "Du",
    promise: "Verstehe dich selbst — und entfalte dein Potenzial.",
    emoji: "🌸",
    audience: "frauen",
    landing: {
      description:
        "Du hast so lange für alle anderen funktioniert. Jetzt ist es Zeit, dich selbst wirklich zu sehen — deine Energie, deine Zahlen, deinen einzigartigen Seelenplan.",
      cta: "Mein Weg als Frau",
      gradient: "linear-gradient(135deg,#fde8d8 0%,#fce4ec 100%)",
    },
  },
  {
    id: "fuer-lehrer-paedagogen",
    order: 3,
    title: "Für Lehrer & Pädagogen",
    shortLabel: "Pädagogik",
    promise: "Mehr Ruhe, Verbindung und Wirksamkeit im Schulalltag.",
    emoji: "🍎",
    audience: "paedagogen",
    standalone: true,
  },
];

// ── Kategorien ───────────────────────────────────────────────────────────────
export const categories: Category[] = [
  // Welt 1 — Kinder
  {
    id: "kind-verstehen",
    worldId: "kinder-verstehen-staerken",
    order: 1,
    title: "Kind verstehen",
    subtitle: "Wer ist dein Kind wirklich — und was braucht es?",
    emoji: "🧭",
  },
  {
    id: "lernen-entwicklung",
    worldId: "kinder-verstehen-staerken",
    order: 2,
    title: "Lernen & Entwicklung",
    subtitle: "Lernen darf leicht werden.",
    emoji: "📚",
  },
  {
    id: "schlaf-regulation",
    worldId: "kinder-verstehen-staerken",
    order: 3,
    title: "Schlaf & Regulation",
    subtitle: "Zur Ruhe kommen — die ganze Familie.",
    emoji: "🌙",
  },
  {
    id: "intuition-selbstvertrauen-kind",
    worldId: "kinder-verstehen-staerken",
    order: 4,
    title: "Intuition & Selbstvertrauen",
    subtitle: "Dein Kind darf sich selbst vertrauen.",
    emoji: "✨",
  },
  {
    id: "schwangerschaft-baby",
    worldId: "kinder-verstehen-staerken",
    order: 5,
    title: "Schwangerschaft & Baby",
    subtitle: "Ein klarer, ruhiger Start.",
    emoji: "🤍",
  },

  // Welt 2 — Du
  {
    id: "dich-selbst-verstehen",
    worldId: "dich-selbst-verstehen-entfalten",
    order: 1,
    title: "Dich selbst verstehen",
    subtitle: "Warum du bist, wie du bist.",
    emoji: "🪞",
  },
  {
    id: "dich-selbst-entfalten",
    worldId: "dich-selbst-verstehen-entfalten",
    order: 2,
    title: "Dich selbst entfalten",
    subtitle: "Vom Verstehen ins Tun.",
    emoji: "🌱",
  },
  {
    id: "deiner-intuition-vertrauen",
    worldId: "dich-selbst-verstehen-entfalten",
    order: 3,
    title: "Deiner Intuition vertrauen",
    subtitle: "Deine innere Stimme als Kompass.",
    emoji: "🔮",
  },
  {
    id: "fuelle-geld",
    worldId: "dich-selbst-verstehen-entfalten",
    order: 4,
    title: "Fülle & Geld",
    subtitle: "Fülle beginnt in dir.",
    emoji: "💛",
  },

  // Welt 3 — Pädagogen
  {
    id: "schulalltag",
    worldId: "fuer-lehrer-paedagogen",
    order: 1,
    title: "Mentale Stärke im Schulalltag",
    subtitle: "Für alle, die Kinder täglich begleiten.",
    emoji: "🍎",
  },
];

// ── Produktfamilien ──────────────────────────────────────────────────────────
export const families: ProductFamily[] = [
  {
    id: "human-design",
    title: "Human Design Familie",
    description:
      "Von der Geburtsdatenanalyse bis zum Master-Referenzwerk — Werkzeuge, um Menschen (und Kinder) wirklich zu verstehen.",
  },
  {
    id: "seelenstark",
    title: "Seelenstark Familie",
    description:
      "Selbstwert und innere Stärke — für Kind, Erwachsene und im vertiefenden Videokurs.",
  },
  {
    id: "entwicklung-regulation",
    title: "Entwicklung & Regulation",
    description:
      "Bewegung, Schlaf und Lernen — Bausteine, die sich gegenseitig verstärken.",
  },
];
