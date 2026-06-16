import type { Product, Money } from "../types";
import { productCheckout as checkout } from "../tentary";

// Hilfsfunktion: hält die Preis-Objekte kompakt & sortierbar.
const eur = (amount: number, compareAt?: number): Money => ({
  amount,
  currency: "EUR",
  ...(compareAt ? { compareAt } : {}),
});

// ─────────────────────────────────────────────────────────────────────────────
// PRODUKTKATALOG
// Positionierung über Problem → Wunsch → Ergebnis. Methode bleibt im Hintergrund.
// Preis als Zahl (eur(...)) für Sortierung, Bundle-Rechnung & Filter.
// ─────────────────────────────────────────────────────────────────────────────
export const products: Product[] = [
  // ── WELT 1 · Kind verstehen ────────────────────────────────────────────────
  {
    id: "hd-master-guide-kids",
    categoryId: "kind-verstehen",
    worldId: "kinder-verstehen-staerken",
    familyId: "human-design",
    title: "Human Design Master Guide · Kids",
    tagline: "Verstehe dein Kind tiefer, als Worte es je könnten.",
    problem:
      "Du spürst, dass dein Kind anders tickt — aber niemand erklärt dir, wie und warum.",
    outcome:
      "Du kannst die Charts deines Kindes selbst lesen und seine Natur, Stärken und Bedürfnisse einordnen.",
    description:
      "Ein umfangreiches Referenz- und Praxishandbuch — eine Ausbildung im Buchformat. Nach dem Durcharbeiten verstehst du die Sprache deines Kindes und kannst Kindercharts eigenständig interpretieren. Kein E-Book, kein Workbook: ein Nachschlagewerk fürs Leben.",
    price: eur(555),
    tier: "signature",
    format: "referenzwerk",
    method: ["human-design"],
    emoji: "📖",
    badge: "signature",
    featured: true,
    tentary: checkout("hd-master-guide-kids"),
    tags: ["kind-verstehen", "human-design", "tiefe", "referenzwerk"],
    nextStepProductId: "betriebsanleitung-kind",
    recommendedProductIds: ["betriebsanleitung-kind", "seelenstark-kind"],
  },
  {
    id: "betriebsanleitung-kind",
    categoryId: "kind-verstehen",
    worldId: "kinder-verstehen-staerken",
    familyId: "human-design",
    title: "Persönliche Betriebsanleitung für dein Kind",
    tagline: "Dein Kind — endlich verständlich, auf den Punkt.",
    problem:
      "Du willst dein Kind verstehen, aber dir fehlt Zeit für ein ganzes Studium.",
    outcome:
      "Du bekommst eine persönliche, sofort anwendbare Anleitung für genau dein Kind.",
    description:
      "Eine individuell erstellte Anleitung, die die Natur deines Kindes greifbar macht: Wie es entscheidet, was es stärkt, was es überfordert. Konkret, alltagsnah, sofort umsetzbar.",
    price: eur(249),
    tier: "premium",
    format: "analyse",
    method: ["human-design"],
    emoji: "🧭",
    badge: "empfohlen",
    featured: true,
    tentary: checkout("betriebsanleitung-kind"),
    tags: ["kind-verstehen", "human-design", "alltag", "individuell"],
    nextStepProductId: "hd-master-guide-kids",
  },
  {
    id: "seelenstark-kind",
    categoryId: "kind-verstehen",
    worldId: "kinder-verstehen-staerken",
    secondaryCategoryIds: ["intuition-selbstvertrauen-kind"],
    familyId: "seelenstark",
    title: "Seelenstark · Kind",
    tagline: "Damit dein Kind sich selbst vertrauen lernt.",
    problem: "Dein Kind zweifelt an sich und braucht mehr inneren Halt.",
    outcome: "Dein Kind erlebt Selbstwert und innere Stärke im Alltag.",
    description:
      "Ein liebevoller Einstieg, der Kindern hilft, ihren eigenen Wert zu spüren — mit Impulsen, die in den Familienalltag passen.",
    price: eur(29),
    tier: "einstieg",
    format: "workbook",
    method: ["bewusstseinsarbeit"],
    emoji: "🌟",
    badge: "beliebt",
    tentary: checkout("seelenstark-kind"),
    tags: ["selbstvertrauen", "selbstwert", "kind", "einstieg"],
    nextStepProductId: "betriebsanleitung-kind",
  },

  // ── WELT 1 · Lernen & Entwicklung ──────────────────────────────────────────
  {
    id: "bewegung-vernetzung",
    categoryId: "lernen-entwicklung",
    worldId: "kinder-verstehen-staerken",
    familyId: "entwicklung-regulation",
    title: "Bewegung schafft Vernetzung",
    tagline: "Wenn Bewegung das Lernen entriegelt.",
    problem:
      "Dein Kind kann sich schwer konzentrieren und Lernen wird zum Kampf.",
    outcome:
      "Du verstehst die Verbindung von Bewegung, Gehirn und Lernen — und nutzt sie gezielt.",
    description:
      "Ein fundiertes Praxisprogramm darüber, wie Bewegung neuronale Vernetzung und damit Konzentration, Lernen und Regulation fördert. Reich an umsetzbaren Übungen.",
    price: eur(349),
    tier: "premium",
    format: "programm",
    method: ["paedagogik", "bewusstseinsarbeit"],
    emoji: "🤸",
    featured: true,
    tentary: checkout("bewegung-vernetzung"),
    tags: ["lernen", "konzentration", "bewegung", "regulation"],
    recommendedProductIds: ["schulstress-verstehen", "schlaf-guide"],
  },
  {
    id: "schulstress-verstehen",
    categoryId: "lernen-entwicklung",
    worldId: "kinder-verstehen-staerken",
    familyId: "entwicklung-regulation",
    title: "Schulstress verstehen. Kinder stärken.",
    tagline: "Schule muss kein Kraftakt sein.",
    problem:
      "Schule bedeutet bei euch Druck, Tränen und Streit ums Lernen.",
    outcome:
      "Du erkennst die Wurzeln des Stresses und stärkst dein Kind gezielt.",
    description:
      "Ein praxisnaher Leitfaden, der Schulstress entschlüsselt und konkrete Wege zeigt, wie Kinder wieder in Ruhe und Selbstvertrauen lernen.",
    price: eur(179),
    tier: "experten",
    format: "programm",
    method: ["paedagogik", "bewusstseinsarbeit"],
    emoji: "🎒",
    tentary: checkout("schulstress-verstehen"),
    tags: ["lernen", "schule", "stress", "regulation"],
    recommendedProductIds: ["bewegung-vernetzung", "21-tage-leichtigkeit"],
  },
  {
    id: "21-tage-leichtigkeit",
    categoryId: "lernen-entwicklung",
    worldId: "kinder-verstehen-staerken",
    title: "21 Tage für mehr Leichtigkeit",
    tagline: "Drei Wochen, die euren Alltag entlasten.",
    problem: "Euer Familienalltag fühlt sich schwer und angespannt an.",
    outcome: "Ihr etabliert in 21 Tagen mehr Leichtigkeit und Verbindung.",
    description:
      "Ein begleitetes 21-Tage-Programm mit kleinen, machbaren Impulsen, die spürbar Druck aus dem Alltag nehmen.",
    price: eur(24),
    tier: "einstieg",
    format: "programm",
    method: ["bewusstseinsarbeit"],
    emoji: "🪶",
    badge: "neu",
    tentary: checkout("21-tage-leichtigkeit"),
    tags: ["leichtigkeit", "alltag", "routine", "lernen"],
  },

  // ── WELT 1 · Schlaf & Regulation ───────────────────────────────────────────
  {
    id: "schlaf-guide",
    categoryId: "schlaf-regulation",
    worldId: "kinder-verstehen-staerken",
    familyId: "entwicklung-regulation",
    title: "Schlaf Guide für die ganze Familie",
    tagline: "Endlich Nächte, die alle erholen.",
    problem: "Die Nächte sind unruhig — und tagsüber fehlt allen die Kraft.",
    outcome:
      "Ihr findet als Familie in einen tragfähigen, ruhigeren Schlafrhythmus.",
    description:
      "Ein ganzheitlicher Schlaf-Guide für die ganze Familie: Regulation, Rituale und Verständnis statt starrer Regeln.",
    price: eur(149),
    tier: "experten",
    format: "ebook",
    method: ["bewusstseinsarbeit"],
    emoji: "🌙",
    tentary: checkout("schlaf-guide"),
    tags: ["schlaf", "regulation", "familie", "ruhe"],
    recommendedProductIds: ["bewegung-vernetzung"],
  },

  // ── WELT 1 · Intuition & Selbstvertrauen ───────────────────────────────────
  {
    id: "magisches-kinder-workbook",
    categoryId: "intuition-selbstvertrauen-kind",
    worldId: "kinder-verstehen-staerken",
    title: "Magisches Kinder Workbook",
    tagline: "Spielerisch zu mehr Selbstvertrauen.",
    problem: "Dein Kind soll seiner Intuition und sich selbst mehr vertrauen.",
    outcome:
      "Dein Kind entdeckt spielerisch seine innere Stärke und Intuition.",
    description:
      "Ein liebevoll gestaltetes Workbook voller Impulse, Übungen und Magie, das Kindern hilft, sich selbst und ihrer Intuition zu vertrauen.",
    price: eur(39),
    tier: "core",
    format: "workbook",
    method: ["bewusstseinsarbeit"],
    emoji: "✨",
    badge: "bestseller",
    featured: true,
    tentary: checkout("magisches-kinder-workbook"),
    tags: ["intuition", "selbstvertrauen", "kind", "spielerisch"],
    recommendedProductIds: ["seelenstark-kind"],
  },

  // ── WELT 1 · Schwangerschaft & Baby ────────────────────────────────────────
  {
    id: "mamastart",
    categoryId: "schwangerschaft-baby",
    worldId: "kinder-verstehen-staerken",
    title: "MamaStart",
    tagline: "Ein klarer, ruhiger Start ins Mama-Sein.",
    problem: "Du wünschst dir Orientierung und Ruhe für den Start mit deinem Baby.",
    outcome: "Du gehst gestärkt, informiert und gelassen in die erste Zeit.",
    description:
      "Dein Begleiter für Schwangerschaft und die erste Babyzeit — Orientierung und Sicherheit statt Überforderung.",
    price: eur(59),
    tier: "core",
    format: "ebook",
    emoji: "🤍",
    tentary: checkout("mamastart"),
    tags: ["baby", "schwangerschaft", "mama", "start"],
  },

  // ── WELT 2 · Dich selbst verstehen ─────────────────────────────────────────
  {
    id: "geburtsdatenanalyse",
    categoryId: "dich-selbst-verstehen",
    worldId: "dich-selbst-verstehen-entfalten",
    familyId: "human-design",
    title: "Geburtsdatenanalyse",
    tagline: "Dein Bauplan — endlich entschlüsselt.",
    problem: "Du fragst dich, warum du bist, wie du bist.",
    outcome:
      "Du erhältst eine persönliche Analyse, die deine Anlagen und Muster sichtbar macht.",
    description:
      "Eine tiefgehende, persönliche Analyse deines Geburtsdatums, die deine Stärken, Muster und deinen Weg klar herausarbeitet.",
    price: eur(399),
    tier: "premium",
    format: "analyse",
    method: ["numerologie", "tiroler-zahlenrad", "human-design"],
    emoji: "🔎",
    badge: "empfohlen",
    featured: true,
    tentary: checkout("geburtsdatenanalyse"),
    tags: ["selbstverstaendnis", "analyse", "individuell", "tiefe"],
    nextStepProductId: "hd-master-guide-erwachsene",
    recommendedProductIds: ["hd-master-guide-erwachsene", "seelenstark-erwachsene"],
  },
  {
    id: "hd-master-guide-erwachsene",
    categoryId: "dich-selbst-verstehen",
    worldId: "dich-selbst-verstehen-entfalten",
    familyId: "human-design",
    title: "Human Design Master Guide · Erwachsene",
    tagline: "Verstehe dich selbst, als hättest du die Bedienungsanleitung.",
    problem:
      "Du willst dich grundlegend verstehen — nicht oberflächlich, sondern wirklich.",
    outcome:
      "Du kannst deinen eigenen Chart lesen und deine Natur souverän einordnen.",
    description:
      "Das umfangreiche Referenz- und Praxishandbuch für Erwachsene — eine Ausbildung im Buchformat. Danach liest du Charts eigenständig und verstehst dich auf einer neuen Ebene.",
    price: eur(555),
    tier: "signature",
    format: "referenzwerk",
    method: ["human-design"],
    emoji: "📖",
    badge: "signature",
    featured: true,
    tentary: checkout("hd-master-guide-erwachsene"),
    tags: ["selbstverstaendnis", "human-design", "tiefe", "referenzwerk"],
    nextStepProductId: "seelenstark-videokurs",
    recommendedProductIds: ["geburtsdatenanalyse", "seelenstark-videokurs"],
  },
  {
    id: "seelenstark-erwachsene",
    categoryId: "dich-selbst-verstehen",
    worldId: "dich-selbst-verstehen-entfalten",
    secondaryCategoryIds: ["dich-selbst-entfalten"],
    familyId: "seelenstark",
    title: "Seelenstark · Erwachsene",
    tagline: "Zurück zu deinem Selbstwert.",
    problem: "Du zweifelst an deinem Wert und deiner Kraft.",
    outcome: "Du findest in deinen Selbstwert und deine innere Stärke zurück.",
    description:
      "Ein transformativer Einstieg für Frauen, die alte Glaubenssätze loslassen und in ihre Kraft zurückfinden möchten.",
    price: eur(29),
    tier: "einstieg",
    format: "workbook",
    method: ["bewusstseinsarbeit"],
    emoji: "🌸",
    badge: "beliebt",
    featured: true,
    tentary: checkout("seelenstark-erwachsene"),
    tags: ["selbstwert", "selbstvertrauen", "frauen", "einstieg"],
    nextStepProductId: "seelenstark-videokurs",
  },

  // ── WELT 2 · Dich selbst entfalten ─────────────────────────────────────────
  {
    id: "seelenstark-videokurs",
    categoryId: "dich-selbst-entfalten",
    worldId: "dich-selbst-verstehen-entfalten",
    familyId: "seelenstark",
    title: "Seelenstark · Videokurs",
    tagline: "Vom Verstehen ins echte Verändern.",
    problem: "Du weißt vieles über dich — aber die Umsetzung fehlt.",
    outcome: "Du gehst Schritt für Schritt in deine gelebte innere Stärke.",
    description:
      "Der vertiefende Videokurs der Seelenstark-Familie: geführte Lektionen, die dich von Erkenntnis in nachhaltige Veränderung bringen.",
    price: eur(149),
    tier: "experten",
    format: "videokurs",
    method: ["bewusstseinsarbeit"],
    emoji: "🎬",
    tentary: checkout("seelenstark-videokurs"),
    tags: ["entwicklung", "transformation", "frauen", "kurs"],
    recommendedProductIds: ["vision-book", "mandala-magic"],
  },
  {
    id: "vision-book",
    categoryId: "dich-selbst-entfalten",
    worldId: "dich-selbst-verstehen-entfalten",
    title: "Vision Book",
    tagline: "Dein Leben — in deinen Worten.",
    problem: "Dir fehlt Klarheit über das, was du wirklich willst.",
    outcome:
      "Du formulierst deine Wünsche, Werte und Vision Schritt für Schritt.",
    description:
      "Ein geführtes Journal, das dich zu deinen tiefsten Wünschen, Werten und deiner inneren Stimme führt.",
    price: eur(24),
    tier: "einstieg",
    format: "journal",
    method: ["bewusstseinsarbeit"],
    emoji: "📓",
    badge: "bestseller",
    featured: true,
    tentary: checkout("vision-book"),
    tags: ["vision", "klarheit", "entwicklung", "journal"],
    nextStepProductId: "seelenstark-videokurs",
  },
  {
    id: "mandala-magic",
    categoryId: "dich-selbst-entfalten",
    worldId: "dich-selbst-verstehen-entfalten",
    title: "Mandala Magic",
    tagline: "Zur Ruhe kommen, kreativ entfalten.",
    problem: "Du suchst einen sanften Weg zu Ruhe und Selbstausdruck.",
    outcome: "Du findest über kreatives Tun zurück zu dir.",
    description:
      "Ein kreativer Einstieg, der über Mandalas Ruhe, Fokus und Selbstausdruck verbindet.",
    price: eur(19),
    tier: "einstieg",
    format: "workbook",
    method: ["bewusstseinsarbeit"],
    emoji: "🌀",
    tentary: checkout("mandala-magic"),
    tags: ["kreativitaet", "ruhe", "entwicklung", "einstieg"],
  },

  // ── WELT 2 · Deiner Intuition vertrauen ────────────────────────────────────
  {
    id: "seelenkompass-monatsimpuls",
    categoryId: "deiner-intuition-vertrauen",
    worldId: "dich-selbst-verstehen-entfalten",
    title: "Seelenkompass · Monatsimpuls",
    tagline: "Deine innere Stimme — Monat für Monat.",
    problem: "Du möchtest deiner Intuition mehr vertrauen und dranbleiben.",
    outcome:
      "Du bekommst monatliche Impulse, die deine Intuition stärken und ausrichten.",
    description:
      "Kartenlegungen und monatliche Impulse, die dich mit deiner inneren Stimme verbinden und deine Intuition trainieren.",
    price: eur(29),
    tier: "einstieg",
    format: "kartenset",
    method: ["bewusstseinsarbeit"],
    emoji: "🧭",
    tentary: checkout("seelenkompass-monatsimpuls"),
    tags: ["intuition", "ritual", "monat", "frauen"],
  },

  // ── WELT 2 · Fülle & Geld ──────────────────────────────────────────────────
  {
    id: "fuelle-beginnt-in-dir",
    categoryId: "fuelle-geld",
    worldId: "dich-selbst-verstehen-entfalten",
    title: "Fülle beginnt in dir",
    tagline: "Fülle ist zuerst eine innere Entscheidung.",
    problem: "Dein Verhältnis zu Geld und Fülle ist von alten Mustern geprägt.",
    outcome: "Du löst Blockaden und öffnest dich für Fülle in allen Formen.",
    description:
      "Ein Workbook (ehemals Gold Edition Money Mindset), das dein Verhältnis zu Geld und Fülle von innen heraus wandelt.",
    price: eur(24),
    tier: "einstieg",
    format: "workbook",
    method: ["bewusstseinsarbeit"],
    emoji: "💛",
    tentary: checkout("fuelle-beginnt-in-dir"),
    tags: ["fuelle", "geld", "mindset", "frauen"],
  },

  // ── WELT 3 · Pädagogen ─────────────────────────────────────────────────────
  {
    id: "mentale-magie-schulalltag",
    categoryId: "schulalltag",
    worldId: "fuer-lehrer-paedagogen",
    title: "Mentale Magie im Schulalltag",
    tagline: "Mehr Ruhe und Wirkung — für die, die Kinder begleiten.",
    problem:
      "Der Schulalltag zehrt an Kraft, Nerven und Verbindung.",
    outcome:
      "Du bringst mehr Ruhe, Präsenz und Wirksamkeit in deinen Schulalltag.",
    description:
      "Ein praxisnaher Begleiter für Lehrkräfte und Pädagog:innen: mentale Werkzeuge für Ruhe, Verbindung und Wirksamkeit im Alltag mit Kindern.",
    price: eur(179),
    tier: "experten",
    format: "ebook",
    method: ["paedagogik", "bewusstseinsarbeit"],
    emoji: "🍎",
    tentary: checkout("mentale-magie-schulalltag"),
    tags: ["paedagogik", "schule", "lehrer", "regulation"],
  },
];
