import { useEffect } from "react";
import { motion } from "motion/react";
import type { Product } from "@/content";

// ─────────────────────────────────────────────────────────────────────────────
// Geteilte Marken-Primitives — von Landing- UND Detailseiten genutzt.
// Single Source für Stilkonstanten, Animationen und Produkt-Labels.
// ─────────────────────────────────────────────────────────────────────────────

export const D = { fontFamily: "var(--font-display)" };
export const B = { fontFamily: "var(--font-body)" };
export const G = "linear-gradient(135deg, #E01F5A 0%, #F47820 100%)";
export const GS = "linear-gradient(135deg, #fce4ec 0%, #fde8d8 100%)";
export const GT: React.CSSProperties = {
  background: G,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

// ── Scroll-Reveal ────────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Produkt-Labels & Helpers ─────────────────────────────────────────────────
export const FORMAT_LABEL: Record<Product["format"], string> = {
  referenzwerk: "Referenzwerk",
  ebook: "Digitales E-Book",
  workbook: "Digitales Workbook",
  journal: "Digitales Journal",
  kartenset: "Kartenset",
  videokurs: "Videokurs",
  programm: "Online-Programm",
  analyse: "Persönliche Analyse",
  freebie: "Freebie",
};

export const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  bestseller: "Bestseller",
  neu: "Neu",
  beliebt: "Beliebt",
  empfohlen: "Empfohlen",
  signature: "Signature",
};

export const formatPrice = (p: { price: { amount: number } }): string =>
  p.price.amount > 0 ? `${p.price.amount} €` : "Bald";

export function ctaLabel(p: Product): string {
  if (p.tier === "signature") return "Referenzwerk entdecken";
  if (p.format === "analyse") return "Analyse anfragen";
  return "Sofort erhalten";
}

// ── Per-Route SEO (client-seitig) ────────────────────────────────────────────
// Setzt <title> + meta[description] pro Seite. Ersetzt KEIN statisches SSR,
// macht aber Titel/Beschreibung beim Client-Routing korrekt (auch für Crawler,
// die JS rendern). Beim Verlassen wird der Ausgangszustand wiederhergestellt.
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const tag = document.querySelector('meta[name="description"]');
    const prevDesc = tag?.getAttribute("content") ?? null;
    if (tag && description) tag.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (tag && prevDesc !== null) tag.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
