import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router";
import type { Product } from "@/content";
import { D, G, BADGE_LABEL, FORMAT_LABEL, formatPrice, ctaLabel } from "./brand";

// Die Karte verlinkt auf die Produkt-Detailseite. Der Kauf-CTA (Tentary) lebt
// auf der Detailseite — so bleibt der Kunde möglichst lange auf MutSeele.
const productHref = (p: Product) => `/produkt/${p.id}`;

// ─── Produktkarte (Standard) ────────────────────────────────────────────────
export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.32 }}
    >
      <Link
        to={productHref(p)}
        className="rounded-[1.5rem] p-6 border bg-card relative overflow-hidden transition-all duration-300 hover:scale-[1.015] hover:shadow-lg flex flex-col h-full"
        style={{ borderColor: "rgba(224,31,90,0.13)" }}
      >
        {p.scarcity && (
          <div className="flex items-center gap-1.5 mb-3 text-[10px] font-semibold px-3 py-1.5 rounded-full w-fit" style={{ background: "rgba(224,31,90,0.08)", color: "#E01F5A" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E01F5A" }} />
            {p.scarcity}
          </div>
        )}
        {p.badge && (
          <span className="absolute top-4 right-4 text-[9px] tracking-wide font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: G }}>{BADGE_LABEL[p.badge]}</span>
        )}
        <div className="flex items-start gap-4 mb-4">
          <span className="text-[2rem] leading-none flex-shrink-0 mt-0.5">{p.emoji}</span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-1">{FORMAT_LABEL[p.format]}</p>
            <p className="text-sm leading-snug font-light italic" style={{ color: "#E01F5A" }}>{p.tagline}</p>
          </div>
        </div>
        <h4 style={D} className="text-[1.15rem] font-medium text-foreground mb-2 leading-snug">{p.title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{p.description}</p>
        <div className="flex items-center justify-between">
          <span style={D} className="text-[1.35rem] font-light text-foreground">{formatPrice(p)}</span>
          <span className="text-white px-5 py-2 rounded-full text-xs font-medium tracking-wide" style={{ background: G }}>
            {ctaLabel(p)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Signature-Karte (Human Design Master Guides · 555 €) ───────────────────
// Eigene Darstellung: KEIN gewöhnliches Buch — Referenzwerk / Ausbildung im
// Buchformat. Spannt im Grid die volle Breite und hebt sich bewusst ab.
export function SignatureCard({ p, index = 0 }: { p: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.32 }}
      className="lg:col-span-2"
    >
      <Link
        to={productHref(p)}
        className="block rounded-[1.75rem] p-7 lg:p-9 relative overflow-hidden text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
        style={{ background: "linear-gradient(135deg,#2D1A22 0%,#5A2233 55%,#E01F5A 140%)" }}
      >
        <div aria-hidden className="absolute -top-20 -right-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(244,120,32,0.25) 0%, transparent 70%)" }} />
        <div className="relative z-10 lg:flex lg:items-center lg:gap-9">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.14)" }}>
              <Sparkles size={12} /> Signature · Referenzwerk
            </span>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[2.4rem] leading-none">{p.emoji}</span>
              <h4 style={D} className="text-[1.5rem] lg:text-[1.8rem] font-light leading-tight">{p.title}</h4>
            </div>
            <p className="text-sm italic font-light mb-4" style={{ color: "#FBD0B0" }}>{p.tagline}</p>
            <p className="text-white/75 text-sm leading-relaxed mb-5 max-w-xl">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Ausbildung im Buchformat", "Charts selbst interpretieren", "Nachschlagewerk fürs Leben"].map((f) => (
                <span key={f} className="text-[11px] px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>{f}</span>
              ))}
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:text-right flex-shrink-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1">Investition</p>
            <p style={D} className="text-[2.4rem] font-light leading-none mb-4">{formatPrice(p)}</p>
            <span className="inline-block bg-white px-7 py-3 rounded-full text-sm font-medium tracking-wide" style={{ color: "#E01F5A" }}>
              {ctaLabel(p)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/** Rendert die passende Kartenvariante je nach tier. */
export function ProductCardAuto({ p, index = 0 }: { p: Product; index?: number }) {
  return p.tier === "signature"
    ? <SignatureCard p={p} index={index} />
    : <ProductCard p={p} index={index} />;
}
