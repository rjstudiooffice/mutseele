import type { Product, QuizOutcome } from "./types";
import { products } from "./data/products";
import { quizOutcomes } from "./data/quiz";

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
