import { useParams, Link } from "react-router";
import { Check } from "lucide-react";
import { getBundle, getProduct, getWorld, bundleSavings } from "@/content";
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

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pt-10 pb-12 lg:pt-14 lg:pb-16" style={{ background: GS }}>
        <div className="max-w-lg mx-auto lg:max-w-4xl">
          <Breadcrumb items={[
            { label: "Start", to: "/" },
            ...(world ? [{ label: world.shortLabel, to: `/${world.id}` }] : []),
            { label: b.title },
          ]} />
          <FadeUp>
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3" style={{ color: "#E01F5A" }}>Bundle · {items.length} Produkte</span>
            <h1 style={D} className="text-[2rem] lg:text-[2.7rem] font-light text-foreground mb-3 leading-tight">{b.title}</h1>
            <p className="text-base italic font-light mb-5" style={{ color: "#E01F5A" }}>{b.tagline}</p>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mb-7">{b.description}</p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-3">
                <span style={D} className="text-[2.2rem] font-light text-foreground">{formatPrice(b)}</span>
                {b.price.compareAt && (
                  <span className="text-base text-muted-foreground line-through">{b.price.compareAt} €</span>
                )}
              </div>
              {savings > 0 && (
                <span className="text-sm font-semibold px-3 py-1.5 rounded-full text-white" style={{ background: G }}>Du sparst {savings} €</span>
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
        <div className="max-w-lg mx-auto lg:max-w-4xl">
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
    </PageShell>
  );
}
