import { useParams, Navigate, Link } from "react-router";
import { ArrowRight } from "lucide-react";
import {
  getWorld,
  getCategoriesByWorld,
  getProductsByCategory,
  getBundlesByWorld,
  bundleSavings,
} from "@/content";
import { D, GT, GS, G, FadeUp, formatPrice, useDocumentMeta } from "../shared/brand";
import { PageShell, Breadcrumb } from "../shared/Layout";
import { ProductCardAuto } from "../shared/ProductCard";

export default function WorldPage() {
  const { worldSlug = "" } = useParams();
  const world = getWorld(worldSlug);

  // Unbekannte Welt → zurück zur Startseite (Catch-all bleibt der Landing).
  if (!world) return <Navigate to="/" replace />;

  useDocumentMeta(`${world.title} | MUTSeeLe`, world.promise);

  const categories = getCategoriesByWorld(world.id);
  const bundles = getBundlesByWorld(world.id);

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pt-10 pb-12 lg:pt-16 lg:pb-16" style={{ background: GS }}>
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <Breadcrumb items={[{ label: "Start", to: "/" }, { label: world.shortLabel }]} />
          <FadeUp className="text-center max-w-2xl mx-auto">
            <span className="text-[3.4rem] block mb-4 leading-none">{world.emoji}</span>
            <h1 style={D} className="text-[2.2rem] lg:text-[3rem] font-light text-foreground mb-4 leading-snug">
              {world.title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">{world.promise}</p>
          </FadeUp>
        </div>
      </section>

      {/* Kategorien mit Produkten */}
      <div className="px-6 py-14 lg:py-20" style={{ background: "linear-gradient(180deg,#FDF7F4 0%,#fde8d8 80%,#fce4ec 100%)" }}>
        <div className="max-w-lg mx-auto lg:max-w-5xl flex flex-col gap-16">
          {categories.map((cat) => {
            const products = getProductsByCategory(cat.id);
            if (!products.length) return null;
            return (
              <section key={cat.id} id={cat.id}>
                <FadeUp>
                  <div className="flex items-center gap-2 mb-1.5">
                    {cat.emoji && <span className="text-xl">{cat.emoji}</span>}
                    <h2 style={D} className="text-[1.6rem] lg:text-[2rem] font-light text-foreground leading-snug">{cat.title}</h2>
                  </div>
                  {cat.subtitle && <p className="text-muted-foreground text-sm mb-7">{cat.subtitle}</p>}
                </FadeUp>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {products.map((p, i) => <ProductCardAuto key={p.id} p={p} index={i} />)}
                </div>
              </section>
            );
          })}

          {/* Bundles dieser Welt */}
          {bundles.length > 0 && (
            <section id="bundles">
              <FadeUp>
                <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-2" style={{ color: "#E01F5A" }}>Spar-Pakete</span>
                <h2 style={D} className="text-[1.6rem] lg:text-[2rem] font-light text-foreground mb-7 leading-snug">
                  Zusammen <em className="italic" style={GT}>günstiger</em>
                </h2>
              </FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {bundles.map((b) => (
                  <Link
                    key={b.id} to={`/bundle/${b.id}`}
                    className="rounded-[1.5rem] p-6 border bg-card flex flex-col transition-all duration-300 hover:scale-[1.015] hover:shadow-lg"
                    style={{ borderColor: "rgba(224,31,90,0.18)" }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">Bundle · {b.productIds.length} Produkte</span>
                    <h3 style={D} className="text-[1.2rem] font-medium text-foreground mb-1.5 leading-snug">{b.title}</h3>
                    <p className="text-sm italic font-light mb-4" style={{ color: "#E01F5A" }}>{b.tagline}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span style={D} className="text-[1.35rem] font-light text-foreground">{formatPrice(b)}</span>
                        {bundleSavings(b) > 0 && (
                          <span className="text-[11px] font-semibold" style={{ color: "#E01F5A" }}>−{bundleSavings(b)} €</span>
                        )}
                      </div>
                      <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#E01F5A" }}>
                        Ansehen <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageShell>
  );
}
