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
    subtitle: "Die komplette Human Design Betriebsanleitung für Kinder",
    tagline: "Verstehe dein Kind tiefer, als Worte es je könnten.",
    problem:
      "Du spürst, dass dein Kind einzigartig ist — aber dir fehlt das Verständnis dafür, warum es so reagiert, fühlt, lernt und handelt.",
    outcome:
      "Du verstehst Human Design wirklich und kannst Kindercharts eigenständig lesen und interpretieren.",
    description:
      "Ein umfassendes Referenz-, Nachschlage- und Praxishandbuch, das dir hilft, Human Design wirklich zu verstehen und im Familienalltag anzuwenden. Kein gewöhnliches E-Book.",
    longDescription: [
      {
        body: [
          "Manche Kinder brauchen ständig Bewegung. Andere ziehen sich zurück. Manche schlafen schlecht, stellen tausend Fragen oder scheinen die Welt intensiver wahrzunehmen als andere.",
          "Viele Eltern spüren intuitiv, dass ihr Kind einzigartig ist. Doch oft fehlt das Verständnis dafür, warum ihr Kind so reagiert, fühlt, lernt oder handelt. Genau hier beginnt Human Design.",
          "Der Human Design Master Guide Kids wurde entwickelt, um Eltern, Pädagogen und Begleitern ein tiefes Verständnis für Kinder und ihre individuellen Bedürfnisse zu ermöglichen.",
        ],
      },
      {
        heading: "Mehr als ein Buch. Mehr als ein Chart.",
        body: [
          "Dieses Werk ist kein gewöhnliches E-Book. Es ist ein umfassendes Referenzwerk, Nachschlagewerk und Praxishandbuch, das dir dabei hilft, Human Design wirklich zu verstehen und im Alltag anzuwenden.",
          "Während viele Human Design Bücher bei theoretischem Wissen enden, zeigt dir dieser Guide die praktische Umsetzung. Du lernst nicht nur, was ein Typ, ein Profil oder eine Autorität bedeutet — du lernst, wie sich diese Eigenschaften im Familienalltag, beim Lernen, beim Schlafen, in Beziehungen und in der Entwicklung eines Kindes zeigen.",
        ],
      },
      {
        heading: "Das erwartet dich",
        checklist: [
          "Human Design Typen verstehen",
          "Autoritäten sicher erkennen",
          "Profile und Linien interpretieren",
          "Zentren verstehen",
          "Kanäle einordnen",
          "Ernährung nach Human Design",
          "Die passende Umgebung erkennen",
          "Aktive und passive Gehirne verstehen",
          "Schlaf und Regeneration",
          "Lernen und Entwicklung",
          "Praktische Umsetzung für den Alltag",
        ],
      },
      {
        heading: "Für wen ist dieser Guide geeignet?",
        bullets: [
          "Eltern",
          "Großeltern",
          "Lehrer",
          "Pädagogen",
          "Coaches",
          "Human Design Interessierte",
          "Menschen, die Kinder besser verstehen möchten",
        ],
      },
      {
        heading: "Das Ergebnis",
        body: [
          "Nach dem Durcharbeiten dieses Guides wirst du Human Design deutlich tiefer verstehen und Kindercharts eigenständig lesen und interpretieren können.",
          "Du wirst Kinder nicht mehr durch die Brille von Erwartungen betrachten — sondern durch die Brille ihrer individuellen Anlagen.",
        ],
      },
    ],
    closing: ["Verstehen statt bewerten.", "Begleiten statt korrigieren.", "Stärken statt verbiegen."],
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
    tagline: "Verstehe dein Kind. Begleite es bewusster.",
    problem:
      "Nicht immer ist es leicht zu erkennen, was dein Kind wirklich braucht.",
    outcome:
      "Du verstehst dein Kind besser und kannst es gezielt und bewusster begleiten.",
    description:
      "Eine individuelle Human Design Analyse für genau dein Kind — mit Chart, Auswertung, Alltagstipps und persönlichen Empfehlungen.",
    longDescription: [
      {
        body: [
          "Jedes Kind bringt seine eigene Energie, Persönlichkeit und Lebensweise mit. Doch nicht immer ist es leicht zu erkennen, was ein Kind wirklich braucht.",
          "Diese individuelle Human Design Analyse hilft dir dabei, dein Kind besser zu verstehen und gezielt zu unterstützen.",
        ],
      },
      {
        heading: "Du erhältst",
        checklist: [
          "Persönliches Human Design Chart",
          "Individuelle Auswertung",
          "Alltagstipps",
          "Sprachmemo",
          "Tiroler Zahlenrad",
          "Persönliche Empfehlungen",
          "Seelenkrafttier",
          "Umsetzungsideen",
          "WhatsApp-Fragemöglichkeit",
        ],
      },
      {
        heading: "Das hilft dir dabei",
        bullets: [
          "Konflikte besser zu verstehen",
          "Bedürfnisse früher zu erkennen",
          "Stärken zu fördern",
          "Herausforderungen leichter zu begleiten",
        ],
      },
      {
        heading: "Eine wertvolle Begleitung",
        body: ["Für Eltern, die ihr Kind nicht verändern möchten. Sondern verstehen."],
      },
    ],
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
    subtitle: "Vernetzung schafft Gleichgewicht",
    tagline: "Eine starke Gehirnbasis ist das Fundament für ein starkes Kind.",
    problem:
      "Konzentrationsprobleme, starke Emotionen, Unruhe oder Lernschwierigkeiten können Hinweise auf nicht vollständig integrierte Entwicklungsschritte sein.",
    outcome:
      "Du schaffst die Grundlage für dein Kind — du unterstützt Entwicklung, statt Symptome zu bekämpfen.",
    description:
      "Ein Praxiskurs über alle 7 Gehirnentwicklungsstufen: wie Bewegung die Vernetzung im Gehirn fördert — mit Videoanleitungen, Übungen und Worksheets.",
    longDescription: [
      {
        body: [
          "Lernen beginnt nicht in der Schule. Es beginnt im Gehirn.",
          "Viele Herausforderungen wie Konzentrationsprobleme, starke Emotionen, Unruhe, Unsicherheit oder Lernschwierigkeiten können Hinweise darauf sein, dass wichtige Entwicklungsschritte noch nicht vollständig integriert wurden. Genau hier setzt dieser Kurs an.",
        ],
      },
      {
        heading: "Warum Bewegung so wichtig ist",
        body: [
          "Die Entwicklung des Gehirns beginnt bereits vor der Geburt. Jede Bewegung unterstützt die Vernetzung von Milliarden Nervenzellen.",
          "Werden bestimmte Entwicklungsschritte nicht vollständig durchlaufen, können sich später verschiedene Auffälligkeiten zeigen.",
        ],
      },
      {
        heading: "Der Kurs umfasst",
        checklist: [
          "Alle 7 Gehirnentwicklungsstufen",
          "Videoanleitungen",
          "Praktische Übungen",
          "Worksheets",
          "Schritt-für-Schritt Umsetzung",
        ],
      },
      {
        heading: "Mögliche Themen",
        bullets: [
          "Konzentration",
          "Lernen",
          "Emotionale Regulation",
          "Selbstvertrauen",
          "Körperwahrnehmung",
          "Schulvorbereitung",
        ],
      },
      {
        heading: "Für wen ist der Kurs geeignet?",
        bullets: [
          "Vorschulkinder",
          "Schulkinder",
          "Kinder mit Konzentrationsschwierigkeiten",
          "Kinder mit Lernproblemen",
          "Familien, die präventiv fördern möchten",
        ],
      },
      {
        heading: "Das Ziel",
        body: ["Die Grundlage schaffen. Nicht Symptome bekämpfen, sondern Entwicklung unterstützen."],
      },
    ],
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
    tagline: "Verstehe, warum Schlaf nicht funktioniert — und was deinem Kind wirklich hilft.",
    problem:
      "Ihr habt schon vieles ausprobiert — neue Routinen, neue Methoden — und trotzdem funktioniert nichts dauerhaft.",
    outcome:
      "Du erkennst das Bedürfnis hinter dem Verhalten und bringst mehr Ruhe in den Familienalltag.",
    description:
      "Ein Schlaf-Guide für die ganze Familie, der Human Design mit praktischen Alltagserfahrungen verbindet — und zeigt, warum Kinder unterschiedlich schlafen.",
    longDescription: [
      {
        body: [
          "Schlafmangel belastet die ganze Familie. Viele Eltern haben bereits alles ausprobiert: neue Routinen, neue Schlafmethoden, neue Tipps. Und trotzdem scheint nichts dauerhaft zu funktionieren.",
        ],
      },
      {
        heading: "Vielleicht liegt das Problem nicht beim Schlaf.",
        body: [
          "Viele Kinder können abends nicht abschalten. Brauchen Nähe. Oder wirken plötzlich wieder voller Energie.",
          "Oft steckt dahinter kein Trotz, sondern ein Bedürfnis, das bisher nicht erkannt wurde.",
        ],
      },
      {
        heading: "Dieser Guide hilft dir dabei",
        checklist: [
          "Schlafverhalten besser zu verstehen",
          "Bedürfnisse hinter dem Verhalten zu erkennen",
          "Abendroutinen zu entwickeln",
          "Energie gezielt zu regulieren",
          "Mehr Ruhe in den Familienalltag zu bringen",
        ],
      },
      {
        heading: "Das Besondere",
        body: [
          "Der Guide verbindet Human Design mit praktischen Alltagserfahrungen und zeigt, warum Kinder unterschiedlich schlafen und unterschiedliche Bedürfnisse haben.",
        ],
      },
      {
        heading: "Für Eltern, die…",
        bullets: [
          "schon vieles ausprobiert haben",
          "ihr Kind besser verstehen möchten",
          "sich wieder ruhigere Nächte wünschen",
          "mehr Leichtigkeit im Familienalltag suchen",
        ],
      },
    ],
    closing: ["Du musst dein Kind nicht verändern.", "Du darfst es zuerst verstehen."],
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
    subtitle: "Wer bist du wirklich? — Der Schlüssel zu deinem inneren Potenzial",
    tagline: "Nicht noch mehr Wissen. Sondern Klarheit.",
    problem:
      "Du spürst, dass mehr in dir steckt — aber dir fehlt die Klarheit, warum du denkst, fühlst und handelst, wie du es tust.",
    outcome:
      "Du gewinnst Klarheit, Verständnis, Selbstannahme und konkrete Orientierung für deinen weiteren Weg.",
    description:
      "Eine persönliche Analyse, die Human Design, Numerologie, Tiroler Zahlenrad und astrologische Grundelemente verbindet — für ein umfassendes Bild deiner Persönlichkeit.",
    longDescription: [
      {
        body: [
          "Hast du manchmal das Gefühl, dass sich bestimmte Situationen in deinem Leben immer wieder wiederholen? Spürst du, dass mehr in dir steckt, aber dir die Klarheit fehlt?",
          "Oder möchtest du endlich verstehen, warum du denkst, fühlst und handelst, wie du es tust? Dann ist die Geburtsdatenanalyse genau der richtige Schritt.",
        ],
      },
      {
        heading: "Ein Blick hinter die Oberfläche",
        body: [
          "In dieser persönlichen Analyse verbinde ich verschiedene Systeme miteinander, um ein umfassendes Bild deiner Persönlichkeit, deiner Talente und deiner Herausforderungen sichtbar zu machen.",
        ],
        checklist: [
          "Human Design",
          "Numerologie",
          "Tiroler Zahlenrad",
          "Astrologische Grundelemente",
        ],
      },
      {
        heading: "Was du erhältst",
        checklist: [
          "Persönliche Analyse",
          "Zoom oder Praxistermin",
          "Individuelle Zusammenfassung",
          "Human Design Auswertung",
          "Persönliche Empfehlungen",
          "Übungen und Tools",
          "Workbook",
        ],
      },
      {
        heading: "Das Ziel",
        body: ["Nicht noch mehr Wissen. Sondern Klarheit. Verständnis. Selbstannahme. Und konkrete Orientierung für deinen weiteren Weg."],
      },
      {
        heading: "Auch für Familien geeignet",
        body: [
          "Viele Mütter nutzen die Analyse zusätzlich für ihre Kinder oder ihren Partner. Denn oft entsteht Verständnis genau dort, wo vorher Konflikte waren.",
        ],
      },
    ],
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
    subtitle: "Die komplette Human Design Betriebsanleitung für Erwachsene",
    tagline: "Lerne dich selbst auf einer völlig neuen Ebene kennen.",
    problem:
      "Du suchst seit Jahren nach Antworten: Warum bin ich so? Warum treffen mich manche Dinge stärker als andere?",
    outcome:
      "Du lernst, Charts eigenständig zu lesen und die Zusammenhänge hinter Verhalten, Entscheidungen und Mustern zu verstehen.",
    description:
      "Ein Referenzwerk für echte Selbstkenntnis, das tiefes Wissen mit praktischer Anwendung verbindet — ein Werkzeug, das dich ein Leben lang begleitet.",
    longDescription: [
      {
        body: [
          "Viele Menschen verbringen Jahre damit, nach Antworten zu suchen. Warum bin ich so? Warum treffen mich manche Dinge stärker als andere? Warum funktionieren bestimmte Entscheidungen und andere nicht? Warum fühle ich mich manchmal, als würde ich gegen meine eigene Natur leben?",
          "Human Design liefert keine Schubladen. Es liefert Verständnis.",
        ],
      },
      {
        heading: "Ein Referenzwerk für echte Selbstkenntnis",
        body: [
          "Der Human Design Master Guide Erwachsene verbindet tiefes Wissen mit praktischer Anwendung. Du lernst Schritt für Schritt die Sprache von Human Design zu verstehen und für dich selbst anzuwenden.",
          "Dieses Werk wurde nicht geschrieben, um Wissen anzusammeln. Es wurde geschrieben, um Menschen dabei zu helfen, sich selbst besser zu verstehen.",
        ],
      },
      {
        heading: "Inhalte",
        checklist: [
          "Typen",
          "Autoritäten",
          "Profile",
          "Zentren",
          "Kanäle",
          "Ernährung",
          "Umgebung",
          "Schlaf",
          "Aktive und passive Gehirne",
          "Umsetzung im Alltag",
          "Beziehungen und Kommunikation",
        ],
      },
      {
        heading: "Für wen ist dieses Werk?",
        bullets: [
          "Menschen, die sich selbst besser verstehen möchten",
          "Coaches",
          "Begleiter",
          "Human Design Interessierte",
          "Alle, die Human Design nicht nur kennenlernen, sondern anwenden möchten",
        ],
      },
      {
        heading: "Das Ergebnis",
        body: [
          "Du wirst lernen, Charts eigenständig zu lesen und die Zusammenhänge hinter Verhalten, Entscheidungen und persönlichen Mustern besser zu verstehen.",
          "Ein Werkzeug, das dich ein Leben lang begleitet.",
        ],
      },
    ],
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
