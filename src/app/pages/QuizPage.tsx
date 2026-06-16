import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import { quiz, recommendForOutcome, getFeaturedLeadMagnet, getLeadMagnets } from "@/content";
import { D, GS, FadeUp, useDocumentMeta } from "../shared/brand";
import { PageShell, Breadcrumb } from "../shared/Layout";
import { ProductCardAuto } from "../shared/ProductCard";

// Bewusst minimalistisch: EINE Hauptfrage, 6 Antworten, direkte Empfehlung.
// Keine Funnels. Baut vollständig auf der vorhandenen Engine recommendForOutcome.
export default function QuizPage() {
  useDocumentMeta("Finde dein Produkt | MUTSeeLe", "In einer Frage zu deiner persönlichen Produktempfehlung.");

  const question = quiz.questions[0];
  const [outcomeId, setOutcomeId] = useState<string | null>(null);

  const result = outcomeId ? recommendForOutcome(outcomeId, 3) : null;
  const outcome = result?.outcome;
  const recommended = result?.products.map((r) => r.product) ?? [];
  const leadMagnet = outcome?.leadMagnetId
    ? getLeadMagnets().find((l) => l.id === outcome.leadMagnetId) ?? getFeaturedLeadMagnet()
    : getFeaturedLeadMagnet();

  return (
    <PageShell>
      <section className="px-6 pt-10 pb-16 lg:pt-16 lg:pb-24 min-h-[70vh]" style={{ background: GS }}>
        <div className="max-w-lg mx-auto lg:max-w-3xl">
          <Breadcrumb items={[{ label: "Start", to: "/" }, { label: "Finde dein Produkt" }]} />

          <AnimatePresence mode="wait">
            {!outcome ? (
              // ── Frage ──────────────────────────────────────────────────────
              <motion.div key="question" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3" style={{ color: "#E01F5A" }}>1 Frage · sofort passend</span>
                <h1 style={D} className="text-[2rem] lg:text-[2.7rem] font-light text-foreground mb-3 leading-snug">
                  {question.prompt}
                </h1>
                <p className="text-muted-foreground text-sm mb-8">Wähle, was dich gerade am meisten bewegt.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((opt, i) => (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => setOutcomeId(opt.outcomeId)}
                      className="flex items-center gap-3 text-left rounded-2xl p-5 border bg-card transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                      style={{ borderColor: "rgba(224,31,90,0.16)" }}
                    >
                      <span className="text-2xl leading-none flex-shrink-0">{opt.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              // ── Ergebnis ───────────────────────────────────────────────────
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3" style={{ color: "#E01F5A" }}>Dein Ergebnis</span>
                <h1 style={D} className="text-[2rem] lg:text-[2.7rem] font-light text-foreground mb-3 leading-snug">{outcome.headline}</h1>
                <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl">{outcome.description}</p>

                <FadeUp>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {recommended.map((p, i) => <ProductCardAuto key={p.id} p={p} index={i} />)}
                  </div>
                </FadeUp>

                {/* Sanfter Einstieg übers Freebie */}
                {leadMagnet && (
                  <FadeUp>
                    <Link to="/gratis" className="block mt-4 rounded-2xl p-5 border transition-colors hover:bg-white/60" style={{ borderColor: "rgba(224,31,90,0.2)", background: "white" }}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1" style={{ color: "#E01F5A" }}>Lieber erst kostenlos starten?</p>
                          <p style={D} className="text-[1.05rem] font-medium text-foreground leading-snug">{leadMagnet.title}</p>
                        </div>
                        <ArrowRight size={18} style={{ color: "#E01F5A" }} className="flex-shrink-0" />
                      </div>
                    </Link>
                  </FadeUp>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button onClick={() => setOutcomeId(null)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <RotateCcw size={14} /> Nochmal
                  </button>
                  {outcome.worldId && (
                    <Link to={`/${outcome.worldId}`} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#E01F5A" }}>
                      Ganze Welt ansehen <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  );
}
