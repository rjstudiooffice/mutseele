// ─────────────────────────────────────────────────────────────────────────────
// MutSeele · Content-Layer · Typmodell
//
// Framework-agnostisch. Diese Typen sind die EINZIGE Quelle der Wahrheit für
// Welten, Kategorien, Produktfamilien, Produkte, Bundles, Lead-Magnets und Quiz.
// Sie sind bewusst so geschnitten, dass sie 1:1 auf ein Headless-CMS (Sanity)
// abbildbar sind: jede Entität hat eine stabile `id` (= späterer Document-Slug),
// referenziert andere Entitäten nur über ihre `id` (= spätere Sanity-Reference)
// und trennt strikt zwischen Inhalt und Darstellung.
//
// WICHTIG (Markenstrategie): Produkte werden über PROBLEM / WUNSCH / ERGEBNIS
// positioniert — niemals über die Methode (Human Design, Numerologie, …).
// Die Methode lebt ausschließlich in `method` und wird im UI nur dezent gezeigt.
// ─────────────────────────────────────────────────────────────────────────────

/** Stabile, URL-taugliche Kennung. Wird später zum CMS-Slug. */
export type Id = string;

/** Preis-Architektur aus der Strategie. Steuert UI-Badges & Sortierung. */
export type PriceTier =
  | "signature" // 555 €  — Referenzwerke
  | "premium" //   249–399 €
  | "experten" //  149–179 €
  | "core" //      39–59 €
  | "einstieg" //  19–29 €
  | "free"; //     Lead-Magnets

/** Produktfamilien — sichtbar zusammengehörig (Cross-Sell & Trust). */
export type ProductFamilyId =
  | "human-design"
  | "seelenstark"
  | "entwicklung-regulation";

/** Auslieferungsformat — rein informativ fürs UI, NICHT die Positionierung. */
export type ProductFormat =
  | "referenzwerk"
  | "ebook"
  | "workbook"
  | "journal"
  | "kartenset"
  | "videokurs"
  | "programm"
  | "analyse"
  | "freebie";

/** Methode im Hintergrund — niemals als Verkaufsargument prominent. */
export type Method =
  | "human-design"
  | "numerologie"
  | "tiroler-zahlenrad"
  | "astrologie"
  | "bewusstseinsarbeit"
  | "paedagogik";

// ── Welt ─────────────────────────────────────────────────────────────────────
export interface World {
  id: Id;
  /** Reihenfolge in Navigation / Übersicht. */
  order: number;
  /** Sichtbarer Welt-Titel, z. B. „Kinder verstehen & stärken“. */
  title: string;
  /** Kurzlabel für Tabs / Chips, z. B. „Kinder“. */
  shortLabel: string;
  /** Ein-Satz-Versprechen (Wunsch der Zielgruppe). */
  promise: string;
  emoji: string;
  /** Primäre Zielgruppe dieser Welt. */
  audience: "eltern" | "frauen" | "paedagogen" | "alle";
  /** Soll die Welt eigenständig behandelt werden (z. B. Pädagogen)? */
  standalone?: boolean;
  /** Optionale eigene Akzentfarbe (sonst Markengradient). */
  accent?: string;
  /** Darstellung in der „Themenwelten“-Kachel auf der Startseite. */
  landing?: {
    /** Längere, emotionale Beschreibung für die Kachel. */
    description: string;
    /** Link-Label der Kachel, z. B. „Für Kinder & Mamas entdecken“. */
    cta: string;
    /** Optionaler Hintergrund-Gradient der Kachel. */
    gradient?: string;
  };
  seo?: Seo;
}

// ── Kategorie ────────────────────────────────────────────────────────────────
export interface Category {
  id: Id;
  worldId: Id;
  order: number;
  title: string;
  /** Problem/Wunsch-orientierte Unterzeile. */
  subtitle?: string;
  emoji?: string;
  seo?: Seo;
}

// ── Produktfamilie ───────────────────────────────────────────────────────────
export interface ProductFamily {
  id: ProductFamilyId;
  title: string;
  description: string;
}

// ── Produkt ──────────────────────────────────────────────────────────────────
export interface Product {
  id: Id;
  /** Primäre Kategorie (1 Produkt → 1 Heimat-Kategorie). */
  categoryId: Id;
  /** Abgeleitet aus der Kategorie, aber denormalisiert für schnelle Queries. */
  worldId: Id;
  /** Optional: weitere Kategorien, in denen das Produkt auftauchen darf. */
  secondaryCategoryIds?: Id[];
  familyId?: ProductFamilyId;

  // — Positionierung (Strategie: Problem → Wunsch → Ergebnis) —
  title: string;
  /** Emotionaler Einzeiler übers Ergebnis, nicht über die Methode. */
  tagline: string;
  /** Welches Problem löst es? (für Quiz-Matching & Texte) */
  problem: string;
  /** Welches Ergebnis entsteht? */
  outcome: string;
  description: string;

  // — Handel —
  price: Money;
  tier: PriceTier;
  format: ProductFormat;
  /** Methode(n) im Hintergrund — UI zeigt sie nur dezent. */
  method?: Method[];

  // — Darstellung / Merch —
  emoji?: string;
  image?: string;
  badge?: ProductBadge;
  /** Knappheits-Hinweis, z. B. „Nur noch 2 Plätze“. */
  scarcity?: string;
  featured?: boolean;

  // — Checkout (Tentary, NUR Zahlung/Auslieferung) —
  tentary?: TentaryRef;

  // — Empfehlungs-Engine —
  /** Frei vergebene Themen-Tags fürs Matching (Quiz, KI, Cross-Sell). */
  tags?: string[];
  /** Manuell kuratierte „Passt dazu“-Produkte (überschreibt Auto-Logik). */
  recommendedProductIds?: Id[];
  /** Nächster logischer Schritt in der Werttreppe (Upsell). */
  nextStepProductId?: Id;

  seo?: Seo;
}

export interface Money {
  /** Betrag in EUR als Zahl (nicht String!) — für Sortierung & Bundles. */
  amount: number;
  currency: "EUR";
  /** Optionaler Streichpreis für Aktionen/Bundles. */
  compareAt?: number;
}

export type ProductBadge =
  | "bestseller"
  | "neu"
  | "beliebt"
  | "empfohlen"
  | "signature";

export interface TentaryRef {
  /** Tentary-Produkt-ID (Mapping Content ↔ Checkout). */
  productId: string;
  /** Direkte Checkout-URL auf shop.mutseele.at. */
  checkoutUrl: string;
}

// ── Bundle ───────────────────────────────────────────────────────────────────
export interface Bundle {
  id: Id;
  title: string;
  tagline: string;
  description: string;
  /** Enthaltene Produkte (Referenzen). */
  productIds: Id[];
  /** Bündel-Logik: Familie, Welt, Werttreppe oder frei kuratiert. */
  kind: "family" | "world" | "journey" | "curated";
  price: Money;
  /** Optional an eine Welt/Familie gekoppelt für Anzeige im Kontext. */
  worldId?: Id;
  familyId?: ProductFamilyId;
  badge?: ProductBadge;
  tentary?: TentaryRef;
  seo?: Seo;
}

// ── Lead-Magnet (Freebie) ────────────────────────────────────────────────────
export interface LeadMagnet {
  id: Id;
  title: string;
  tagline: string;
  description: string;
  audience: World["audience"];
  /** Auslieferung per E-Mail-Automation (Mailtool-Tag). */
  emailTag?: string;
  /** In welche Welt/Produkte führt dieses Freebie? (Funnel) */
  leadsToWorldId?: Id;
  leadsToProductIds?: Id[];
  fileUrl?: string;
  image?: string;
  /** Hervorgehoben im Freebie-Bereich der Startseite (genau eines). */
  featured?: boolean;
  /** Vorteils-Bullets für die hervorgehobene Darstellung. */
  bullets?: string[];
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
export interface Quiz {
  id: Id;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: Id;
  prompt: string;
  /** Single- oder Multi-Choice. */
  multiple?: boolean;
  options: QuizOption[];
}

export interface QuizOption {
  id: Id;
  label: string;
  /** Verknüpft die Antwort mit einem Ergebnis-Pfad. */
  outcomeId: Id;
  emoji?: string;
}

/**
 * Quiz-Ergebnis: bündelt eine Antwort zu einem Empfehlungs-Pfad.
 * Die Engine nutzt outcome → (world/category/tags) → Produkte.
 */
export interface QuizOutcome {
  id: Id;
  /** Überschrift im Ergebnis, spricht den Wunsch an. */
  headline: string;
  description: string;
  worldId?: Id;
  categoryId?: Id;
  /** Tags, die fürs Produkt-Matching gewichtet werden. */
  matchTags: string[];
  /** Garantiert empfohlenes Hero-Produkt (Anker). */
  primaryProductId?: Id;
  /** Passendes Freebie als Einstieg, wenn (noch) kein Kauf. */
  leadMagnetId?: Id;
}

// ── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: Id;
  quote: string;
  author: string;
  role?: string;
  /** Kontext-Zuordnung für gezielte Anzeige. */
  worldId?: Id;
  productId?: Id;
  rating?: 1 | 2 | 3 | 4 | 5;
  image?: string;
}

// ── SEO (CMS-tauglich) ───────────────────────────────────────────────────────
export interface Seo {
  /** URL-Slug innerhalb der Welt/Kategorie. */
  slug?: string;
  title?: string;
  description?: string;
  ogImage?: string;
}
