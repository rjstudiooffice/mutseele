import type { Product, QuizOutcome } from "./types";
import { products } from "./data/products";
import { quizOutcomes } from "./data/quiz";
import { recommendations } from "./data/recommendations";

const productById = new Map(products.map((p) => [p.id, p]));

// ─────────────────────────────────────────────────────────────────────────────
// „Das könnte dich ebenfalls begleiten“
//
// Die EINZIGE Empfehlungsfunktion für Produktseiten. Liefert genau `limit`
// Produkte (Standard 3) aus der kuratierten Matrix, in fester Reihenfolge.
// Deterministisch, keine Zufallslogik, keine Selbstempfehlung.
//
// Regel 9: Ist ein empfohlenes Produkt deaktiviert/fehlend, rückt automatisch
// das nächste Produkt aus derselben Welt nach.
// ─────────────────────────────────────────────────────────────────────────────
export function getRecommendations(product: Product, limit = 3): Product[] {
  const out: Product[] = [];
  const seen = new Set<string>([product.id]);

  const push = (id: string) => {
    if (out.length >= limit || seen.has(id)) return;
    const p = productById.get(id);
    if (!p || p.disabled) return;
    seen.add(id);
    out.push(p);
  };

  // 1) Kuratierte Empfehlungen in Reihenfolge.
  (recommendations[product.id] ?? []).forEach(push);

  // 2) Auffüllen aus derselben Welt (Regel 9), bis `limit` erreicht ist.
  if (out.length < limit) {
    for (const p of products) {
      if (p.worldId === product.worldId) push(p.id);
      if (out.length >= limit) break;
    }
  }

  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPFEHLUNGS-ENGINE
//
// Eine deterministische, erklärbare Scoring-Funktion. Bewusst regelbasiert
// (keine Blackbox), damit Sabrina nachvollziehen und kuratieren kann. Dieselbe
// Funktion bedient: Quiz-Ergebnis, „Passt dazu“ auf der Produktseite und später
// die KI-/Luna-Empfehlung (die KI liefert dann nur `matchTags` + Kontext).
//
// Score-Faktoren (gewichtet):
//   +5  manuell kuratiert (recommendedProductIds / primaryProductId)
//   +3  Tag-Treffer (pro übereinstimmendem Tag)
//   +2  gleiche Kategorie
//   +1  gleiche Welt
//   +1  gleiche Produktfamilie
//   −∞  ausgeschlossene IDs (z. B. das bereits angesehene Produkt)
// ─────────────────────────────────────────────────────────────────────────────

export interface RecommendInput {
  worldId?: string;
  categoryId?: string;
  familyId?: string;
  tags?: string[];
  /** Manuell priorisierte Produkte (Anker). */
  pinnedProductIds?: string[];
  /** Niemals empfehlen (z. B. aktuelles Produkt, bereits gekauft). */
  excludeProductIds?: string[];
  limit?: number;
}

export interface ScoredProduct {
  product: Product;
  score: number;
  /** Erklärbarkeit: warum wurde es empfohlen? */
  reasons: string[];
}

export function recommendProducts(input: RecommendInput): ScoredProduct[] {
  const {
    worldId,
    categoryId,
    familyId,
    tags = [],
    pinnedProductIds = [],
    excludeProductIds = [],
    limit = 4,
  } = input;

  const exclude = new Set(excludeProductIds);
  const pinned = new Set(pinnedProductIds);
  const tagSet = new Set(tags);

  const scored: ScoredProduct[] = products
    .filter((p) => !exclude.has(p.id))
    .map((p) => {
      let score = 0;
      const reasons: string[] = [];

      if (pinned.has(p.id)) {
        score += 5;
        reasons.push("empfohlen");
      }
      const tagHits = (p.tags ?? []).filter((t) => tagSet.has(t));
      if (tagHits.length) {
        score += tagHits.length * 3;
        reasons.push(`Thema: ${tagHits.join(", ")}`);
      }
      if (categoryId && (p.categoryId === categoryId || p.secondaryCategoryIds?.includes(categoryId))) {
        score += 2;
        reasons.push("passende Kategorie");
      }
      if (worldId && p.worldId === worldId) {
        score += 1;
        reasons.push("gleiche Welt");
      }
      if (familyId && p.familyId === familyId) {
        score += 1;
        reasons.push("gleiche Produktfamilie");
      }

      return { product: p, score, reasons };
    })
    .filter((s) => s.score > 0);

  // Sortierung: Score desc, bei Gleichstand günstiger zuerst (sanfter Einstieg).
  scored.sort((a, b) =>
    b.score - a.score || a.product.price.amount - b.product.price.amount,
  );

  return scored.slice(0, limit);
}

/** „Passt dazu“ für eine Produktseite: nutzt kuratierte IDs + Auto-Scoring. */
export function relatedProducts(product: Product, limit = 4): ScoredProduct[] {
  return recommendProducts({
    worldId: product.worldId,
    categoryId: product.categoryId,
    familyId: product.familyId,
    tags: product.tags,
    pinnedProductIds: product.recommendedProductIds,
    excludeProductIds: [product.id],
    limit,
  });
}

/** Quiz-Ergebnis → konkrete Empfehlung (Anker-Produkt zuerst). */
export function recommendForOutcome(
  outcomeId: string,
  limit = 3,
): { outcome: QuizOutcome | undefined; products: ScoredProduct[] } {
  const outcome = quizOutcomes.find((o) => o.id === outcomeId);
  if (!outcome) return { outcome: undefined, products: [] };

  return {
    outcome,
    products: recommendProducts({
      worldId: outcome.worldId,
      categoryId: outcome.categoryId,
      tags: outcome.matchTags,
      pinnedProductIds: outcome.primaryProductId ? [outcome.primaryProductId] : [],
      limit,
    }),
  };
}
