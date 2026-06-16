// ─────────────────────────────────────────────────────────────────────────────
// EMPFEHLUNGS-MATRIX · „Das könnte dich ebenfalls begleiten“
//
// Genau 3 kuratierte Empfehlungen pro Produkt, in Reihenfolge der Relevanz:
//   Platz 1 = höchste · Platz 2 = mittlere · Platz 3 = ergänzende.
//
// Regeln (bewusst hier zentralisiert — eine Quelle der Wahrheit):
//   • Keine Selbstempfehlung, keine Zufallslogik, keine Funnel-Begriffe.
//   • Hero-Produkte (HD Master Guides + Geburtsdatenanalyse) dürfen häufig
//     vorkommen.
//   • Wird ein empfohlenes Produkt deaktiviert (`disabled`), rückt automatisch
//     das nächste Produkt aus derselben Welt nach (siehe getRecommendations()).
// ─────────────────────────────────────────────────────────────────────────────
export const recommendations: Record<string, string[]> = {
  // ── Welt 1 · Kinder ────────────────────────────────────────────────────────
  "hd-master-guide-kids": ["betriebsanleitung-kind", "schlaf-guide", "bewegung-vernetzung"],
  "betriebsanleitung-kind": ["hd-master-guide-kids", "schlaf-guide", "seelenstark-kind"],
  "seelenstark-kind": ["hd-master-guide-kids", "betriebsanleitung-kind", "schlaf-guide"],
  "bewegung-vernetzung": ["schlaf-guide", "schulstress-verstehen", "hd-master-guide-kids"],
  "schlaf-guide": ["bewegung-vernetzung", "hd-master-guide-kids", "betriebsanleitung-kind"],
  "schulstress-verstehen": ["bewegung-vernetzung", "hd-master-guide-kids", "schlaf-guide"],
  "21-tage-leichtigkeit": ["bewegung-vernetzung", "seelenstark-kind", "magisches-kinder-workbook"],
  "magisches-kinder-workbook": ["seelenstark-kind", "hd-master-guide-kids", "21-tage-leichtigkeit"],
  "mamastart": ["bewegung-vernetzung", "schlaf-guide", "hd-master-guide-kids"],

  // ── Welt 2 · Du ────────────────────────────────────────────────────────────
  "hd-master-guide-erwachsene": ["geburtsdatenanalyse", "seelenstark-erwachsene", "seelenstark-videokurs"],
  "geburtsdatenanalyse": ["hd-master-guide-erwachsene", "seelenstark-videokurs", "seelenstark-erwachsene"],
  "seelenstark-erwachsene": ["seelenstark-videokurs", "geburtsdatenanalyse", "hd-master-guide-erwachsene"],
  "seelenstark-videokurs": ["seelenstark-erwachsene", "geburtsdatenanalyse", "hd-master-guide-erwachsene"],
  "vision-book": ["seelenstark-erwachsene", "fuelle-beginnt-in-dir", "mandala-magic"],
  "mandala-magic": ["vision-book", "seelenstark-erwachsene", "fuelle-beginnt-in-dir"],
  "fuelle-beginnt-in-dir": ["vision-book", "seelenstark-erwachsene", "seelenstark-videokurs"],
  "seelenkompass-monatsimpuls": ["geburtsdatenanalyse", "seelenstark-erwachsene", "hd-master-guide-erwachsene"],

  // ── Welt 3 · Pädagogen ─────────────────────────────────────────────────────
  "mentale-magie-schulalltag": ["bewegung-vernetzung", "hd-master-guide-kids", "schulstress-verstehen"],
};
