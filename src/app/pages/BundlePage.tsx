import { useParams, Link } from "react-router";
import { Check } from "lucide-react";
import { getBundle, getProduct, getWorld, bundleSavings, getBundleRecommendations } from "@/content";
import { D, G, GS, GT, FadeUp, formatPrice, useDocumentMeta } from "../shared/brand";
import { PageShell, Breadcrumb } from "../shared/Layout";
import { ProductCard } from "../shared/ProductCard";

function NotFound() {
  return (
    <PageShell>
      <div className="px-6 py-32 text-center max-w-lg mx-auto">
        <p className="text-[3rem] mb-4">🌸</p>
        <h1 style={D} className="text-2xl font-light text-foreground mb-3">Bundle nicht gefunden</h1>
        <Link to="/" className="text-sm font-medium" style={{ color: "#E01F5A" }}>Zurück zur Startseite</Link>
      </div>
    </PageShell>
  );
}

export default function BundlePage() {
  const { slug = "" } = useParams();
  const b = getBundle(slug);
  if (!b) return <NotFound />;

  useDocumentMeta(`${b.title} | MUTSeeLe`, b.tagline);

  const world = b.worldId ? getWorld(b.worldId) : undefined;
  const items = b.productIds.map(getProduct).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const savings = bundleSavings(b);
  const recommendations = getBundleRecommendations(b, 3);

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pt-10 pb-12 lg:pt-14 lg:pb-16" style={{ background: GS }}>
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <Breadcrumb items={[
            { label: "Start", to: "/" },
            ...(world ? [{ label: world.shortLabel, to: `/${world.id}` }] : []),
            { label: b.title },
          ]} />
          <FadeUp className="text-center max-w-2xl mx-auto flex flex-col items-center">
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3" style={{ color: "#E01F5A" }}>Bundle · {items.length} Produkte</span>
            <h1 style={D} className="text-[2rem] lg:text-[2.7rem] font-light text-foreground mb-3 leading-tight">{b.title}</h1>
            <p className="text-base italic font-light mb-5" style={{ color: "#E01F5A" }}>{b.tagline}</p>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mb-7">{b.description}</p>

            {/* Preis immer absolut: Einzelpreis / Bundlepreis / Du sparst. */}
            <div className="flex flex-col items-center gap-1.5">
              {b.price.compareAt && (
                <p className="text-sm text-muted-foreground">
                  Einzelpreis <span className="line-through">{b.price.compareAt} €</span>
                </p>
              )}
              <div className="flex items-baseline gap-2.5">
                <span className="text-sm text-muted-foreground">Bundlepreis</span>
                <span style={D} className="text-[2.4rem] font-light text-foreground leading-none">{formatPrice(b)}</span>
              </div>
              {savings > 0 && (
                <span className="mt-1 text-sm font-semibold px-3.5 py-1.5 rounded-full text-white" style={{ background: G }}>Du sparst {savings} €</span>
              )}
            </div>
            <a
              href={b.tentary?.checkoutUrl} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-6 text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity shadow-md" style={{ background: G }}
            >
              Bundle sichern
            </a>
          </FadeUp>
        </div>
      </section>

      {/* Enthaltene Produkte */}
      <section className="px-6 py-14 lg:py-20 bg-background">
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <FadeUp>
            <h2 style={D} className="text-[1.6rem] lg:text-[2rem] font-light text-foreground mb-2 leading-snug">Das ist <em className="italic" style={GT}>enthalten</em></h2>
            <p className="text-muted-foreground text-sm mb-8 flex items-center gap-1.5">
              <Check size={14} style={{ color: "#E01F5A" }} /> {items.length} Produkte im Paket
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {items.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Empfehlungen · genau 3, nie ein im Bundle enthaltenes Produkt */}
      {recommendations.length > 0 && (
        <section className="px-6 py-14 lg:py-20" style={{ background: GS }}>
          <div className="max-w-lg mx-auto lg:max-w-5xl">
            <FadeUp>
              <h2 style={D} className="text-[1.6rem] lg:text-[2rem] font-light text-foreground mb-8 leading-snug text-center">
                Das könnte dich <em className="italic" style={GT}>ebenfalls begleiten</em>
              </h2>
            </FadeUp>
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
