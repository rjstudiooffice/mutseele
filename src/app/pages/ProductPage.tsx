import { useParams, Link } from "react-router";
import { Check, Sparkles } from "lucide-react";
import type { Method } from "@/content";
import { getProduct, getWorld, getCategory, getRecommendations } from "@/content";
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
  const recommendations = getRecommendations(p, 3);
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
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <div className={isSignature ? "[&_*]:!text-white/70" : ""}>
            <Breadcrumb items={[
              { label: "Start", to: "/" },
              ...(world ? [{ label: world.shortLabel, to: `/${world.id}` }] : []),
              ...(category ? [{ label: category.title }] : []),
            ]} />
          </div>

          <FadeUp className="text-center max-w-2xl mx-auto flex flex-col items-center">
            {isSignature && (
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.14)" }}>
                <Sparkles size={12} /> Signature · Referenzwerk
              </span>
            )}
            <span className="text-[3rem] leading-none mb-3">{p.emoji}</span>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: isSignature ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)" }}>
              {FORMAT_LABEL[p.format]}{p.badge && ` · ${BADGE_LABEL[p.badge]}`}
            </p>
            <h1 style={D} className={`text-[2rem] lg:text-[2.7rem] font-light leading-tight mb-2 ${isSignature ? "text-white" : "text-foreground"}`}>{p.title}</h1>
            {p.subtitle && (
              <p className={`text-base lg:text-lg font-light mb-3 ${isSignature ? "text-white/75" : "text-foreground/70"}`}>{p.subtitle}</p>
            )}
            <p className="text-base italic font-light mb-7" style={{ color: isSignature ? "#FBD0B0" : "#E01F5A" }}>{p.tagline}</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <span style={D} className={`text-[2rem] font-light ${isSignature ? "text-white" : "text-foreground"}`}>
                {p.priceNote && <span className="text-[1rem] align-middle mr-1.5 opacity-70">{p.priceNote}</span>}
                {formatPrice(p)}
              </span>
              <a
                href={p.tentary?.checkoutUrl} target="_blank" rel="noopener noreferrer"
                className="px-7 py-3 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity shadow-md"
                style={isSignature ? { background: "white", color: "#E01F5A" } : { background: G, color: "white" }}
              >
                {ctaLabel(p)}
              </a>
            </div>
            {p.scarcity && (
              <span className="text-xs font-semibold mt-3" style={{ color: isSignature ? "#FBD0B0" : "#E01F5A" }}>{p.scarcity}</span>
            )}
          </FadeUp>
        </div>
      </section>

      {/* Inhalt */}
      <section className="px-6 py-14 lg:py-20 bg-background">
        <div className="max-w-lg mx-auto lg:max-w-3xl flex flex-col gap-12">
          {p.longDescription ? (
            /* Reichhaltige, sektionierte Beschreibung */
            p.longDescription.map((s, i) => (
              <FadeUp key={i}>
                {s.heading && (
                  <h2 style={D} className="text-[1.5rem] lg:text-[1.8rem] font-light text-foreground mb-4 leading-snug">{s.heading}</h2>
                )}
                {s.body?.map((para, j) => (
                  <p key={j} className="text-foreground/80 text-base leading-[1.9] mb-3 last:mb-0">{para}</p>
                ))}
                {s.checklist && (
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mt-4">
                    {s.checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#E01F5A" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.bullets && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[0.45rem]" style={{ background: "#E01F5A" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </FadeUp>
            ))
          ) : (
            <>
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
            </>
          )}

          {/* Abschluss-Zeilen */}
          {p.closing && p.closing.length > 0 && (
            <FadeUp>
              <div className="text-center py-2">
                {p.closing.map((line, i) => (
                  <p key={i} style={{ ...D, ...GT }} className="text-[1.4rem] lg:text-[1.7rem] font-light leading-snug">{line}</p>
                ))}
              </div>
            </FadeUp>
          )}

          {/* Methode dezent im Hintergrund */}
          {p.method && p.method.length > 0 && (
            <FadeUp>
              <p className="text-xs text-muted-foreground">
                Im Hintergrund basiert dies auf{" "}
                <span className="text-foreground/70">{p.method.map((m) => METHOD_LABEL[m]).join(", ")}</span>.
              </p>
            </FadeUp>
          )}

        </div>
      </section>

      {/* Einziger Empfehlungsbereich · genau 3, kuratiert, keine Funnel-Begriffe */}
      {recommendations.length > 0 && (
        <section className="px-6 py-14 lg:py-20" style={{ background: GS }}>
          <div className="max-w-lg mx-auto lg:max-w-5xl">
            <FadeUp>
              <h2 style={D} className="text-[1.6rem] lg:text-[2rem] font-light text-foreground mb-8 leading-snug text-center">
                Das könnte dich <em className="italic" style={GT}>ebenfalls begleiten</em>
              </h2>
            </FadeUp>
            {/* Mobil: horizontale Cards (Scroll). Desktop: 3-spaltiges Raster. */}
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 snap-x lg:grid lg:grid-cols-3 lg:overflow-visible lg:mx-0 lg:px-0">
              {recommendations.map((rp, i) => (
                <div key={rp.id} className="min-w-[78%] sm:min-w-[20rem] lg:min-w-0 snap-start">
                  <ProductCard p={rp} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
