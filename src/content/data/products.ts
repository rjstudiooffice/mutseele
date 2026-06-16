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
    subtitle: "Was die Geburtszahlen über dein Kind verraten",
    tagline: "Verstehe dein Kind auf einer neuen Ebene.",
    problem:
      "Warum fällt deinem Kind manches leicht, während andere Dinge immer wieder zur Herausforderung werden?",
    outcome:
      "Du verstehst die Persönlichkeit, Talente und Bedürfnisse deines Kindes besser — und begleitest es individueller.",
    description:
      "Ein Workbook, das über die Geburtszahlen Stärken, Lernverhalten und Persönlichkeit deines Kindes sichtbar macht — für eine individuellere Begleitung.",
    longDescription: [
      {
        body: [
          "Warum fällt deinem Kind manches leicht, während andere Dinge immer wieder zur Herausforderung werden? Warum ist es besonders sensibel, neugierig, kreativ oder freiheitsliebend?",
          "Und warum scheint es manche Menschen zu lieben, während es bei anderen ständig zu Konflikten kommt?",
          "Dieses Workbook hilft dir dabei, die Persönlichkeit, Talente und Bedürfnisse deines Kindes besser zu verstehen.",
        ],
      },
      {
        heading: "Was sind Geburtszahlen?",
        body: [
          "Jedes Kind bringt seine ganz eigene Energie mit.",
          "Die Geburtszahlen geben Hinweise auf Stärken, Potenziale, Lernverhalten und Persönlichkeitsmerkmale. Sie können helfen, bestimmte Verhaltensweisen besser einzuordnen und Kinder individueller zu begleiten.",
        ],
      },
      {
        heading: "Das erwartet dich",
        checklist: [
          "Erklärung aller Himmelsrichtungen",
          "Persönlichkeitsmerkmale",
          "Lerntypen",
          "Talente und Potenziale",
          "Herausforderungen verstehen",
          "Berufsorientierungen",
          "Affirmationen",
          "Eltern-Checklisten",
          "Schritt-für-Schritt-Anleitung",
        ],
      },
      {
        heading: "Das Ziel",
        body: ["Nicht dein Kind zu verändern. Sondern es besser zu verstehen."],
      },
    ],
    closing: ["Verständnis schafft Verbindung.", "Verbindung schafft Vertrauen."],
    price: eur(29),
    tier: "einstieg",
    format: "workbook",
    method: ["numerologie"],
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
    subtitle: "Ganzheitliche Lernbegleitung für Kinder und Familien",
    tagline: "Lernen sollte kein täglicher Kampf sein.",
    problem:
      "Hausaufgaben werden zur Belastung, die Konzentration fehlt, Frust und Streit nehmen zu — und Eltern fühlen sich hilflos.",
    outcome:
      "Mehr Verständnis, mehr Leichtigkeit und mehr Sicherheit für Eltern und Kinder.",
    description:
      "Eine ganzheitliche Lernbegleitung, die dein Kind als Ganzes betrachtet — mit Beratung, Worksheets, Übungsvideos und WhatsApp-Nachbetreuung.",
    longDescription: [
      {
        body: [
          "Lernen sollte kein täglicher Kampf sein. Und doch erleben viele Familien genau das.",
          "Hausaufgaben werden zur Belastung. Die Konzentration fehlt. Frust und Streit nehmen zu. Eltern fühlen sich hilflos.",
        ],
      },
      {
        heading: "Gemeinsam Ursachen erkennen",
        body: [
          "In dieser ganzheitlichen Lernbegleitung betrachten wir dein Kind als Ganzes. Nicht nur die schulischen Leistungen, sondern auch die Faktoren, die Lernen, Konzentration und Wohlbefinden beeinflussen.",
        ],
      },
      {
        heading: "Wir betrachten unter anderem",
        checklist: [
          "Konzentration",
          "Lernverhalten",
          "Emotionale Belastungen",
          "Gehirnvernetzung",
          "Nährstoffversorgung",
          "Human Design",
          "Persönliche Stärken",
        ],
      },
      {
        heading: "Du erhältst",
        checklist: [
          "1,5–2 Stunden Beratung",
          "Persönliche Zusammenfassung",
          "Worksheets",
          "Übungsvideos",
          "Individuelle Empfehlungen",
          "Nachbetreuung per WhatsApp",
        ],
      },
      {
        heading: "Das Ziel",
        body: ["Mehr Verständnis. Mehr Leichtigkeit. Mehr Sicherheit für Eltern und Kinder."],
      },
    ],
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
    subtitle: "Gemeinsam stärken. Gemeinsam wachsen.",
    tagline: "Kleine Momente, die langfristig den größten Unterschied machen.",
    problem:
      "Im oft hektischen Alltag bleibt wenig Zeit für bewusste Verbindung.",
    outcome:
      "Über kleine tägliche Übungen entstehen neue Verbindungen, mehr Sicherheit und mehr innere Balance.",
    description:
      "Ein begleitetes 21-Tage-Programm mit kleinen, alltagstauglichen Übungen für mehr Verbindung, Stärke und Leichtigkeit in der Familie.",
    longDescription: [
      {
        body: [
          "In unserem oft hektischen Alltag bleibt wenig Zeit für bewusste Verbindung. Dabei sind es genau diese kleinen Momente, die langfristig den größten Unterschied machen.",
        ],
      },
      {
        heading: "Warum 21 Tage?",
        body: [
          "Wiederholungen helfen dem Gehirn, neue Gewohnheiten zu etablieren.",
          "Durch kleine tägliche Übungen entstehen neue Verbindungen, mehr Sicherheit und mehr innere Balance.",
        ],
      },
      {
        heading: "Die Übungen fördern",
        checklist: [
          "Konzentration",
          "Selbstvertrauen",
          "Achtsamkeit",
          "Selbstliebe",
          "Schlaf",
          "Lernfähigkeit",
          "Emotionale Stabilität",
        ],
      },
      {
        heading: "Das Besondere",
        body: [
          "Die Übungen sind bewusst einfach gehalten. Sie lassen sich problemlos in den Familienalltag integrieren und benötigen nur wenige Minuten pro Tag.",
        ],
      },
      {
        heading: "Für Familien, die…",
        bullets: [
          "mehr Verbindung möchten",
          "ihr Kind stärken wollen",
          "gemeinsam wachsen möchten",
          "mehr Leichtigkeit suchen",
        ],
      },
    ],
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
    subtitle: "Stärke deine Intuition und dein Selbstvertrauen",
    tagline: "Spielerisch. Liebevoll. Ohne Druck.",
    problem:
      "Mit der Zeit lernen viele Kinder, ihrer eigenen Wahrnehmung immer weniger zu vertrauen.",
    outcome:
      "Dein Kind lernt, seiner eigenen Wahrnehmung zu vertrauen und seine innere Stärke zu entwickeln.",
    description:
      "Ein liebevolles Workbook, das Kindern spielerisch hilft, ihre Intuition und ihr Selbstvertrauen zu stärken — mit Übungen, Schutztechniken und Worksheets.",
    longDescription: [
      {
        body: [
          "Kinder tragen eine natürliche Intuition in sich. Sie spüren. Sie fühlen. Sie nehmen die Welt oft viel intensiver wahr, als Erwachsene glauben.",
          "Doch mit der Zeit lernen viele Kinder, ihrer eigenen Wahrnehmung immer weniger zu vertrauen.",
        ],
      },
      {
        heading: "Dieses Workbook hilft dabei",
        body: ["…die Verbindung zu sich selbst zu stärken. Spielerisch. Liebevoll. Ohne Druck."],
      },
      {
        heading: "Inhalte",
        checklist: [
          "Intuitionsübungen",
          "Pendelübungen",
          "Gedankenkraft",
          "Selbstvertrauen",
          "Abgrenzung",
          "Schutztechniken",
          "Worksheets",
          "Praktische Übungen",
        ],
      },
      {
        heading: "Das Ziel",
        body: [
          "Kinder dabei unterstützen, ihrer eigenen Wahrnehmung zu vertrauen und ihre innere Stärke zu entwickeln.",
        ],
      },
    ],
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
    subtitle: "Dein sicherer Weg durch Schwangerschaft und Babyzeit",
    tagline: "Mehr Orientierung. Weniger widersprüchliche Ratschläge. Mehr Sicherheit.",
    problem:
      "Viele Mütter wünschen sich mehr Orientierung, weniger widersprüchliche Ratschläge und vor allem mehr Sicherheit.",
    outcome:
      "Du startest informiert, entspannt und gestärkt in diese besondere Lebensphase.",
    description:
      "Ein kompakter Kurs für die wichtigsten Fragen rund um Schwangerschaft, Geburt und Babyzeit — Orientierung statt widersprüchlicher Ratschläge.",
    longDescription: [
      {
        body: [
          "Viele Mütter wünschen sich mehr Orientierung. Weniger widersprüchliche Ratschläge. Und vor allem mehr Sicherheit. Genau dafür wurde MamaStart entwickelt.",
        ],
      },
      {
        heading: "Ein kompakter Kurs für die wichtigsten Fragen",
        body: [
          "Was braucht mein Baby wirklich? Welche Anschaffungen sind sinnvoll? Wie kann ich die Entwicklung meines Kindes unterstützen? Welche Nährstoffe sind wichtig?",
        ],
      },
      {
        heading: "Inhalte",
        checklist: [
          "Schwangerschaft",
          "Geburt",
          "Babyentwicklung",
          "Nährstoffe",
          "Gehirnentwicklung",
          "Vernetzungsübungen",
          "Alltagstipps",
        ],
      },
      {
        heading: "Für werdende Mütter",
        body: ["…die informiert, entspannt und gestärkt in diese besondere Lebensphase starten möchten."],
      },
    ],
    closing: ["Ein Kurs, den viele Mütter gerne früher gehabt hätten."],
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
    subtitle: "Was Geburtszahlen über dich verraten",
    tagline: "Verstehe die Sprache deiner Energie.",
    problem:
      "Warum wiederholen sich bestimmte Muster in deinem Leben — und warum fallen dir manche Dinge leichter als anderen?",
    outcome:
      "Mehr Verständnis für dich selbst, mehr Klarheit und mehr Bewusstsein für deine eigenen Potenziale.",
    description:
      "Ein Workbook, das über deine Geburtszahlen neue Perspektiven auf deine Persönlichkeit, deine Stärken und deine Muster eröffnet.",
    longDescription: [
      {
        body: [
          "Warum wiederholen sich bestimmte Muster in deinem Leben? Warum fühlst du dich zu manchen Menschen hingezogen und bei anderen sofort unwohl? Und warum fallen dir bestimmte Dinge leichter als anderen?",
        ],
      },
      {
        heading: "Dieses Workbook hilft dir dabei",
        body: ["…deine Zahlen besser zu verstehen und neue Perspektiven auf deine Persönlichkeit zu gewinnen."],
      },
      {
        heading: "Inhalte",
        checklist: [
          "Zahlen verstehen",
          "Farben verstehen",
          "Persönlichkeitsmuster",
          "Beziehungen",
          "Stärken",
          "Herausforderungen",
          "Alltagstipps",
        ],
      },
      {
        heading: "Das Ergebnis",
        body: ["Mehr Verständnis für dich selbst. Mehr Klarheit. Mehr Bewusstsein für die eigenen Potenziale."],
      },
    ],
    price: eur(29),
    tier: "einstieg",
    format: "workbook",
    method: ["numerologie"],
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
    subtitle: "Menschen verstehen. Beziehungen stärken.",
    tagline: "Viele Konflikte entstehen nicht durch böse Absicht, sondern durch fehlendes Verständnis.",
    problem:
      "Warum reagiert mein Kind so? Warum geraten wir immer wieder an denselben Punkt? Warum fühle ich mich bei manchen Menschen gestärkt und bei anderen ausgelaugt?",
    outcome:
      "Du verstehst Menschen auf einer tieferen Ebene, erkennst Persönlichkeitsmuster und nimmst Beziehungen bewusster wahr.",
    description:
      "Ein Videokurs, der dir hilft, Menschen tiefer zu verstehen und Beziehungen bewusster zu gestalten — inkl. Seelenstark Kind & Erwachsene.",
    longDescription: [
      {
        body: ["Viele Konflikte entstehen nicht durch böse Absicht. Sondern durch fehlendes Verständnis."],
      },
      {
        body: [
          "Warum reagiert mein Kind so? Warum geraten wir immer wieder an denselben Punkt? Warum fühle ich mich bei manchen Menschen gestärkt und bei anderen ausgelaugt?",
        ],
      },
      {
        heading: "In diesem Kurs lernst du",
        body: ["…Menschen auf einer tieferen Ebene zu verstehen. Persönlichkeitsmuster zu erkennen. Beziehungen bewusster wahrzunehmen."],
      },
      {
        heading: "Enthalten",
        checklist: [
          "1,5 Stunden Videokurs",
          "Seelenstark Kind",
          "Seelenstark Erwachsene",
          "Präsentation",
          "Praxisbeispiele",
        ],
      },
      {
        heading: "Für alle, die",
        bullets: [
          "Beziehungen besser verstehen möchten",
          "Konflikte anders betrachten möchten",
          "mehr Klarheit über sich und ihr Umfeld gewinnen möchten",
        ],
      },
    ],
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
    subtitle: "Entdecke deine Stärken. Gestalte deine Zukunft.",
    tagline: "Zeit für dich. Zeit für deine Gedanken. Zeit für deine Zukunft.",
    problem:
      "Du spürst, dass mehr in dir steckt — doch oft fehlt die Klarheit, wo du anfangen sollst.",
    outcome:
      "Du gewinnst Schritt für Schritt mehr Selbstbewusstsein, Klarheit und eine klare Ausrichtung für deine Zukunft.",
    description:
      "Ein geführtes 4-Wochen-Journal zu mehr Selbstbewusstsein, Klarheit und einer klaren Vision für deine Zukunft.",
    longDescription: [
      {
        body: [
          "Manchmal spüren wir, dass mehr in uns steckt. Wir wissen, dass wir etwas verändern möchten. Doch oft fehlt die Klarheit darüber, wo wir anfangen sollen.",
          "Das Vision Book begleitet dich Schritt für Schritt auf dem Weg zu mehr Selbstbewusstsein, Klarheit und persönlicher Entwicklung.",
        ],
      },
      {
        heading: "Zeit für dich",
        body: [
          "Zeit für deine Gedanken. Zeit für deine Zukunft.",
          "In vier aufeinander aufbauenden Wochen setzt du dich intensiv mit dir selbst auseinander und gewinnst neue Erkenntnisse über deine Wünsche, Ziele und Potenziale.",
        ],
      },
      {
        heading: "Das erwartet dich",
        body: [
          "Woche 1 — Selbstreflexion & Selbstbewusstsein: Lerne dich selbst besser kennen und erkenne deine Stärken und Herausforderungen.",
          "Woche 2 — Ziele & Visionen: Definiere klare Ziele und entwickle eine Vorstellung davon, wohin dein Weg führen darf.",
          "Woche 3 — Positive Gedanken & innere Ausrichtung: Lerne deine Gedanken bewusster wahrzunehmen und neue Perspektiven zu entwickeln.",
          "Woche 4 — Deine Vision: Verbinde deine Erkenntnisse und entwickle eine klare Ausrichtung für die Zukunft.",
        ],
      },
      {
        heading: "Das bekommst du",
        checklist: [
          "Reflexionsübungen",
          "Journaling-Impulse",
          "Zielsetzungsübungen",
          "Vision-Arbeit",
          "Schritt-für-Schritt-Anleitung",
          "Tägliche Aufgaben",
        ],
      },
      {
        heading: "Für wen ist das Vision Book geeignet?",
        bullets: [
          "Frauen, die sich selbst besser kennenlernen möchten",
          "Frauen, die neue Klarheit suchen",
          "Frauen, die ihr Leben bewusster gestalten möchten",
        ],
      },
    ],
    closing: ["Die wichtigste Beziehung in deinem Leben ist die zu dir selbst."],
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
    subtitle: "Affirmationen, Krafttiere & Selbstliebe",
    tagline: "Schenke dir einen Moment der Ruhe.",
    problem: "Der Alltag ist oft laut, schnell und fordernd.",
    outcome:
      "Du schaffst dir bewusste Inseln der Entspannung und verbindest Kreativität mit Achtsamkeit.",
    description:
      "Ein Ausmal-Workbook, das kreatives Ausmalen mit Selbstfürsorge, Achtsamkeit und Krafttier-Botschaften verbindet.",
    longDescription: [
      {
        body: [
          "Der Alltag ist oft laut. Schnell. Fordernd. Umso wichtiger ist es, bewusst kleine Inseln der Entspannung zu schaffen.",
          "Mandala Magic verbindet kreatives Ausmalen mit Selbstfürsorge, Achtsamkeit und inspirierenden Botschaften.",
        ],
      },
      {
        heading: "Mehr als nur Mandalas",
        body: [
          "Jedes Mandala ist mit einem Krafttier verbunden.",
          "Diese Krafttiere erinnern dich an innere Ressourcen, Stärken und Qualitäten, die bereits in dir vorhanden sind.",
        ],
      },
      {
        heading: "Das erwartet dich",
        checklist: [
          "Mandalas für Erwachsene",
          "Krafttierbotschaften",
          "Affirmationen",
          "Reflexionsimpulse",
          "Momente der Entspannung",
          "Bewusste Me-Time",
        ],
      },
      {
        heading: "Warum Mandalas?",
        body: ["Das Ausmalen von Mandalas kann helfen:"],
        checklist: [
          "den Geist zu beruhigen",
          "Stress abzubauen",
          "die Konzentration zu fördern",
          "innere Balance zu stärken",
        ],
      },
      {
        heading: "Für Frauen, die…",
        bullets: [
          "bewusste Auszeiten suchen",
          "zur Ruhe kommen möchten",
          "Kreativität und Achtsamkeit verbinden möchten",
        ],
      },
    ],
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
    title: "Seelenkompass",
    subtitle: "Klarheit für deinen Weg",
    tagline: "Eine neue Perspektive. Ein Impuls. Eine Bestätigung deines Gefühls.",
    problem:
      "Manchmal stehst du an einem Punkt, an dem du dir Orientierung wünschst.",
    outcome: "Du findest wieder Zugang zu deiner eigenen Klarheit.",
    description:
      "Kartenlegungen und Impulse — als Monatsimpuls, Jahresimpuls oder Tiefenimpuls —, die dir Orientierung geben und deine Intuition stärken.",
    longDescription: [
      {
        body: [
          "Manchmal stehen wir an einem Punkt im Leben, an dem wir uns Orientierung wünschen. Eine neue Perspektive. Einen Impuls. Eine Bestätigung unseres Gefühls.",
          "Der Seelenkompass schenkt dir genau diesen Raum.",
        ],
      },
      {
        heading: "Monatsimpuls",
        body: ["Ein Blick auf die Energien, Themen und Möglichkeiten des kommenden Monats. Du erhältst Impulse zu:"],
        checklist: ["Beruf", "Finanzen", "Beziehungen", "Persönlicher Entwicklung", "Seelenbotschaften"],
      },
      {
        heading: "Jahresimpuls",
        body: ["Ein Überblick über die kommenden zwölf Monate. Monat für Monat. Mit Orientierung, Inspiration und neuen Perspektiven."],
      },
      {
        heading: "Tiefenimpuls",
        body: ["Für Themen, die dich besonders beschäftigen. Für Muster, die sich wiederholen. Für Situationen, die nach Klarheit verlangen."],
      },
      {
        heading: "Das Ziel",
        body: ["Nicht Entscheidungen für dich zu treffen. Sondern dich dabei zu unterstützen, wieder Zugang zu deiner eigenen Klarheit zu finden."],
      },
    ],
    price: eur(29),
    priceNote: "ab",
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
    subtitle: "Löse alte Geldmuster und öffne dich für mehr Wohlstand.",
    tagline: "Fülle beginnt nicht im Außen. Fülle beginnt in dir.",
    problem:
      "Viele Menschen tragen unbewusst Überzeugungen über Geld in sich, die sie klein halten.",
    outcome:
      "Eine neue Beziehung zu Geld — mehr Vertrauen, mehr Bewusstsein, mehr Offenheit für Fülle.",
    description:
      "Ein Workbook, das dir hilft, alte Geldmuster und Glaubenssätze zu lösen und eine neue, offene Beziehung zu Fülle zu entwickeln.",
    longDescription: [
      {
        body: [
          "Viele Menschen tragen unbewusst Überzeugungen über Geld in sich, die sie klein halten. Prägungen. Glaubenssätze. Ängste.",
          "Oft entstehen sie bereits in der Kindheit und beeinflussen unser Handeln bis heute.",
        ],
      },
      {
        heading: "Fülle beginnt nicht im Außen.",
        body: [
          "Fülle beginnt in dir.",
          "Dieses Workbook begleitet dich dabei, deine Beziehung zu Geld bewusst wahrzunehmen und neue Möglichkeiten zu entdecken.",
        ],
      },
      {
        heading: "Inhalte",
        checklist: [
          "Glaubenssatzarbeit",
          "Reflexionsübungen",
          "Manifestationsübungen",
          "Visualisierungen",
          "Affirmationen",
          "Rituale",
          "Worksheets",
        ],
      },
      {
        heading: "Das Ziel",
        body: ["Eine neue Beziehung zu Geld. Mehr Vertrauen. Mehr Bewusstsein. Mehr Offenheit für Fülle."],
      },
      {
        heading: "Für Frauen, die…",
        bullets: [
          "alte Geldmuster loslassen möchten",
          "ihre finanzielle Energie bewusst verändern möchten",
          "mehr Leichtigkeit im Umgang mit Geld entwickeln möchten",
        ],
      },
    ],
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
    subtitle: "Kinder anders abholen. Besser verstehen.",
    tagline: "Kinder denken, fühlen und lernen heute anders — und brauchen einen anderen Zugang.",
    problem:
      "Viele Kinder denken, fühlen und lernen heute anders als frühere Generationen und brauchen oft einen anderen Zugang.",
    outcome:
      "Du stärkst Kinder mental, förderst Selbstvertrauen und begleitest sie ganzheitlich.",
    description:
      "Ein Kurs für Lehrer, Pädagogen und alle, die mit Kindern arbeiten — praktische Methoden für mentale Stärke, Selbstvertrauen und ganzheitliches Lernen.",
    longDescription: [
      {
        body: [
          "Unsere Kinder wachsen in einer Zeit auf, die sich stark verändert. Viele Kinder denken, fühlen und lernen heute anders als frühere Generationen. Deshalb brauchen sie oft auch einen anderen Zugang.",
        ],
      },
      {
        body: [
          "Dieser Kurs richtet sich an Lehrer, Pädagogen und Menschen, die mit Kindern arbeiten. Er verbindet praktische Methoden mit neuen Perspektiven auf Lernen, Entwicklung und Persönlichkeitsstärkung.",
        ],
      },
      {
        heading: "Du lernst",
        checklist: [
          "Kinder mental zu stärken",
          "Selbstvertrauen zu fördern",
          "Emotionale Stabilität aufzubauen",
          "Intuition zu stärken",
          "Kreative Methoden einzusetzen",
          "Positive Glaubenssätze in den Alltag zu integrieren",
        ],
      },
      {
        heading: "Das bekommst du",
        checklist: [
          "Videokurs",
          "Digitales Kartenset",
          "Worksheets",
          "Wochenpläne",
          "Praktische Übungen",
          "Sofort umsetzbare Impulse",
        ],
      },
      {
        heading: "Für wen ist der Kurs geeignet?",
        bullets: [
          "Lehrer",
          "Pädagogen",
          "Nachhilfelehrer",
          "Lernbegleiter",
          "Menschen, die Kinder stärken möchten",
        ],
      },
      {
        heading: "Das Ziel",
        body: ["Unterricht neu denken. Verbindung stärken. Kinder ganzheitlich begleiten."],
      },
    ],
    closing: ["Für unsere Kinder. Für unsere Zukunft."],
    price: eur(179),
    tier: "experten",
    format: "ebook",
    method: ["paedagogik", "bewusstseinsarbeit"],
    emoji: "🍎",
    tentary: checkout("mentale-magie-schulalltag"),
    tags: ["paedagogik", "schule", "lehrer", "regulation"],
  },
];
