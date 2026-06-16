import { useParams, Link } from "react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import type { Method } from "@/content";
import {
  getProduct,
  getWorld,
  getCategory,
  getFamily,
  getProductsByFamily,
  relatedProducts,
} from "@/content";
import { D, G, GS, GT, FadeUp, FORMAT_LABEL, BADGE_LABEL, formatPrice, ctaLabel, useDocumentMeta } from "../shared/brand";
import { PageShell, Breadcrumb } from "../shared/Layout";
import { ProductCard } from "../shared/ProductCard";

const METHOD_LABEL: Record<Method, string> = {
  "human-design": "Human Design",
  numerologie: "Numerologie",
  "tiroler-zahlenrad": "Tiroler Zahlenrad",
  astrologie: "Astrologie",
  bewusstseinsarbeit: "Bewusstseinsarbeit",
  paedagogik: "Pädagogik",
};

function NotFound() {
  return (
    <PageShell>
      <div className="px-6 py-32 text-center max-w-lg mx-auto">
        <p className="text-[3rem] mb-4">🌸</p>
        <h1 style={D} className="text-2xl font-light text-foreground mb-3">Produkt nicht gefunden</h1>
        <Link to="/" className="text-sm font-medium" style={{ color: "#E01F5A" }}>Zurück zur Startseite</Link>
      </div>
    </PageShell>
  );
}

export default function ProductPage() {
  const { slug = "" } = useParams();
  const p = getProduct(slug);
  if (!p) return <NotFound />;

  useDocumentMeta(`${p.title} | MUTSeeLe`, p.tagline);

  const world = getWorld(p.worldId);
  const category = getCategory(p.categoryId);
  const family = p.familyId ? getFamily(p.familyId) : undefined;
  const familyProducts = p.familyId ? getProductsByFamily(p.familyId).filter((x) => x.id !== p.id) : [];
  const nextStep = p.nextStepProductId ? getProduct(p.nextStepProductId) : undefined;
  const related = relatedProducts(p).map((r) => r.product);
  const isSignature = p.tier === "signature";

  return (
    <PageShell>
      {/* Hero */}
      <section
        className="px-6 pt-10 pb-12 lg:pt-14 lg:pb-16"
        style={isSignature
          ? { background: "linear-gradient(135deg,#2D1A22 0%,#5A2233 60%,#E01F5A 150%)", color: "white" }
          : { background: GS }}
      >
        <div className="max-w-lg mx-auto lg:max-w-4xl">
          <div className={isSignature ? "[&_*]:!text-white/70" : ""}>
            <Breadcrumb items={[
              { label: "Start", to: "/" },
              ...(world ? [{ label: world.shortLabel, to: `/${world.id}` }] : []),
              ...(category ? [{ label: category.title }] : []),
            ]} />
          </div>

          <FadeUp>
            {isSignature && (
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.14)" }}>
                <Sparkles size={12} /> Signature · Referenzwerk
              </span>
            )}
            <div className="flex items-start gap-4 mb-4">
              <span className="text-[2.6rem] leading-none">{p.emoji}</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-1.5" style={{ color: isSignature ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)" }}>
                  {FORMAT_LABEL[p.format]}{p.badge && ` · ${BADGE_LABEL[p.badge]}`}
                </p>
                <h1 style={D} className={`text-[2rem] lg:text-[2.7rem] font-light leading-tight ${isSignature ? "text-white" : "text-foreground"}`}>{p.title}</h1>
              </div>
            </div>
            <p className="text-base italic font-light mb-6" style={{ color: isSignature ? "#FBD0B0" : "#E01F5A" }}>{p.tagline}</p>

            <div className="flex flex-wrap items-center gap-4">
              <span style={D} className={`text-[2rem] font-light ${isSignature ? "text-white" : "text-foreground"}`}>{formatPrice(p)}</span>
              <a
                href={p.tentary?.checkoutUrl} target="_blank" rel="noopener noreferrer"
                className="px-7 py-3 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity shadow-md"
                style={isSignature ? { background: "white", color: "#E01F5A" } : { background: G, color: "white" }}
              >
                {ctaLabel(p)}
              </a>
              {p.scarcity && (
                <span className="text-xs font-semibold" style={{ color: isSignature ? "#FBD0B0" : "#E01F5A" }}>{p.scarcity}</span>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Inhalt */}
      <section className="px-6 py-14 lg:py-20 bg-background">
        <div className="max-w-lg mx-auto lg:max-w-3xl flex flex-col gap-12">
          {/* Beschreibung */}
          <FadeUp>
            <p className="text-foreground/80 text-base leading-[1.9]">{p.description}</p>
          </FadeUp>

          {/* Problem → Ergebnis */}
          <FadeUp>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(224,31,90,0.14)", background: GS }}>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-2" style={{ color: "#E01F5A" }}>Wo du gerade stehst</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{p.problem}</p>
              </div>
              <div className="rounded-2xl p-6 border" style={{ borderColor: "rgba(224,31,90,0.14)", background: "white" }}>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-2 flex items-center gap-1.5" style={{ color: "#E01F5A" }}>
                  <Check size={12} /> Dein Ergebnis
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">{p.outcome}</p>
              </div>
            </div>
          </FadeUp>

          {/* Methode dezent im Hintergrund */}
          {p.method && p.method.length > 0 && (
            <FadeUp>
              <p className="text-xs text-muted-foreground">
                Im Hintergrund basiert dies auf{" "}
                <span className="text-foreground/70">{p.method.map((m) => METHOD_LABEL[m]).join(", ")}</span>.
              </p>
            </FadeUp>
          )}

          {/* Nächster Schritt (Werttreppe) */}
          {nextStep && (
            <FadeUp>
              <Link to={`/produkt/${nextStep.id}`} className="block rounded-2xl p-6 border transition-colors hover:bg-white/60" style={{ borderColor: "rgba(224,31,90,0.2)", background: GS }}>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-2" style={{ color: "#E01F5A" }}>Dein nächster Schritt</p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 style={D} className="text-[1.15rem] font-medium text-foreground leading-snug">{nextStep.title}</h3>
                    <p className="text-sm text-muted-foreground">{nextStep.tagline}</p>
                  </div>
                  <ArrowRight size={18} style={{ color: "#E01F5A" }} className="flex-shrink-0" />
                </div>
              </Link>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Produktfamilie */}
      {family && familyProducts.length > 0 && (
        <section className="px-6 py-14 lg:py-20" style={{ background: GS }}>
          <div className="max-w-lg mx-auto lg:max-w-4xl">
            <FadeUp>
              <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-2" style={{ color: "#E01F5A" }}>{family.title}</span>
              <h2 style={D} className="text-[1.6rem] lg:text-[2rem] font-light text-foreground mb-3 leading-snug">Gehört <em className="italic" style={GT}>zusammen</em></h2>
              <p className="text-muted-foreground text-sm mb-7 max-w-xl">{family.description}</p>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {familyProducts.map((fp, i) => <ProductCard key={fp.id} p={fp} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Passt dazu (Empfehlungs-Engine) */}
      {related.length > 0 && (
        <section className="px-6 py-14 lg:py-20 bg-background">
          <div className="max-w-lg mx-auto lg:max-w-4xl">
            <FadeUp>
              <h2 style={D} className="text-[1.6rem] lg:text-[2rem] font-light text-foreground mb-7 leading-snug text-center">Passt <em className="italic" style={GT}>dazu</em></h2>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {related.map((rp, i) => <ProductCard key={rp.id} p={rp} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
