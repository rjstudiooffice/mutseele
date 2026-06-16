import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { ArrowRight, Download, Star, Heart, Sparkles, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import sabrinavPhoto from "@/imports/hero.jpeg";
import sabrinaAbout from "@/imports/sabrina-about.jpeg";
import { getMainWorlds, getProductsByWorld, getTestimonials, getFeaturedLeadMagnet, getProduct, getHomeBundles, bundleSavings } from "@/content";
import { D, B, G, GS, GT, FadeUp } from "./shared/brand";
import { SiteNav, SiteFooter } from "./shared/SiteChrome";
import { ProductCard, SignatureCard } from "./shared/ProductCard";

// Startseite: Hauptwelten als Tabs, je deren featured-Produkte (aus @/content).
const MAIN_WORLDS = getMainWorlds();
const TESTIMONIALS = getTestimonials();
const FEATURED_FREEBIE = getFeaturedLeadMagnet();
const HOME_BUNDLES = getHomeBundles();
// Wechselnde Kachel-Hintergründe (reine Darstellung).
const TESTI_BG = [
  "linear-gradient(135deg,#fce4ec 0%,#fde8d8 100%)",
  "linear-gradient(135deg,#fde8d8 0%,#fff3e0 100%)",
  "linear-gradient(135deg,#fce4ec 0%,#fff3e0 100%)",
];

type FreebieForm = { email: string };

// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [activeWorldId, setActiveWorldId]   = useState<string>(MAIN_WORLDS[0].id);
  const [freebieSubmitted, setFreebieSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FreebieForm>();

  const activeWorld = MAIN_WORLDS.find((w) => w.id === activeWorldId) ?? MAIN_WORLDS[0];
  const products = getProductsByWorld(activeWorldId).filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background text-foreground" style={B}>

      <SiteNav />

      {/* ══ HERO — MOBILE ═══════════════════════════════════════════════════ */}
      <section className="pt-[64px] relative lg:hidden">
        <div className="relative h-[78vh] min-h-[520px] overflow-hidden" style={{ background: "linear-gradient(160deg,#fce4ec 0%,#fde8d8 55%,#fff3e0 100%)" }}>
          <ImageWithFallback src={sabrinavPhoto} alt="Sabrina Wenzl" className="w-full h-full object-cover object-top opacity-35" style={{ mixBlendMode: "multiply" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
        <div className="relative z-10 -mt-32 px-6 pb-16 text-center max-w-lg mx-auto">
          <FadeUp>
            <h1 style={D} className="text-[2.8rem] font-light leading-[1.15] text-foreground mb-5">
              Angst beginnt<br />im Kopf —{" "}
              <em className="italic not-italic font-semibold" style={GT}>MUT auch.</em>
            </h1>
            <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-9 max-w-[290px] mx-auto">
              Erschöpft davon, immer für alle da zu sein — außer für dich selbst? Hier darfst du endlich ankommen.
            </p>
            <div className="flex flex-col items-center gap-3">
              <a href="#produkte" className="text-white px-10 py-[1.05rem] rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity w-full max-w-xs shadow-md text-center" style={{ background: G }}>
                Meine Angebote ansehen
              </a>
              <a href="#freebie" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                Gratis Freebie holen <ArrowRight size={13} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ HERO — DESKTOP ══════════════════════════════════════════════════ */}
      <section className="hidden lg:flex min-h-screen pt-[64px]">
        {/* Left: gradient + text */}
        <div className="flex-1 flex flex-col justify-center px-16 xl:px-24 relative overflow-hidden" style={{ background: G }}>
          {/* Subtle orb */}
          <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)" }} />

          <FadeUp>
            <h1 style={D} className="text-[clamp(3rem,4.5vw,5rem)] font-light leading-[1.1] text-white mb-6">
              Angst beginnt<br />im Kopf —<br />
              <em className="italic opacity-85">MUT auch.</em>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-md">
              Erschöpft davon, immer für alle da zu sein — außer für dich selbst? Hier darfst du endlich ankommen.
            </p>
            <div className="flex items-center gap-4">
              <a href="#produkte" className="bg-white px-8 py-3.5 rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity shadow-sm font-medium" style={{ color: "#E01F5A" }}>
                Meine Angebote ansehen
              </a>
              <a href="#freebie" className="text-white/70 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
                Gratis Freebie holen <ArrowRight size={14} />
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Right: photo */}
        <div className="flex-1 relative overflow-hidden">
          <ImageWithFallback src={sabrinavPhoto} alt="Sabrina Wenzl" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(224,31,90,0.1) 0%, transparent 30%)" }} />
        </div>
      </section>

      {/* ══ TRUST BAR ═══════════════════════════════════════════════════════ */}
      <div className="px-6 py-5 border-y" style={{ borderColor: "rgba(224,31,90,0.1)", background: "white" }}>
        <FadeUp>
          <div className="max-w-lg mx-auto lg:max-w-5xl flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} style={{ fill: "#E01F5A", color: "#E01F5A" }} />)}
            </div>
            <span className="text-muted-foreground text-xs hidden sm:block">·</span>
            <span className="text-foreground/70 text-xs" style={B}><strong className="text-foreground">300+</strong> Frauen &amp; Kinder begleitet</span>
            <span className="text-muted-foreground text-xs hidden sm:block">·</span>
            <span className="text-foreground/70 text-xs" style={B}><strong className="text-foreground">5 Jahre</strong> Erfahrung</span>
            <span className="text-muted-foreground text-xs hidden sm:block">·</span>
            <span className="text-foreground/70 text-xs" style={B}><strong className="text-foreground">2</strong> Themenwelten</span>
          </div>
        </FadeUp>
      </div>

      {/* ══ ZITAT ════════════════════════════════════════════════════════════ */}
      <div className="px-6 py-10 text-center" style={{ background: GS }}>
        <FadeUp>
          <div className="max-w-lg mx-auto lg:max-w-2xl">
            <Sparkles size={16} className="mx-auto mb-4" style={{ color: "#E01F5A", opacity: 0.5 }} />
            <p style={{ ...D, color: "var(--foreground)" }} className="text-[1.3rem] lg:text-[1.6rem] font-light italic leading-relaxed">
              „Dein Gefühl ist keine Schwäche — es ist dein Wegweiser."
            </p>
            <p className="text-xs text-muted-foreground mt-3 tracking-widest uppercase">— Sabrina Wenzl</p>
          </div>
        </FadeUp>
      </div>

      {/* ══ THEMENWELTEN ═════════════════════════════════════════════════════ */}
      <section id="themenwelten" className="px-6 py-16 bg-background lg:py-24">
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <FadeUp>
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center" style={{ color: "#E01F5A" }}>Meine Themenwelten</span>
            <h2 style={D} className="text-[2rem] lg:text-[2.5rem] font-light text-center text-foreground mb-3 leading-snug">
              Wo darf ich dich <em className="italic" style={GT}>begleiten?</em>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-10 max-w-xs mx-auto leading-relaxed">Zwei Welten, ein Kern — dein Weg zurück zu dir.</p>
          </FadeUp>

          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-6 lg:max-w-2xl lg:mx-auto">
            {MAIN_WORLDS.map((w, i) => (
              <FadeUp key={w.id} delay={i * 0.08}>
                <Link
                  to={`/${w.id}`}
                  className="block rounded-[1.5rem] p-7 border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full"
                  style={{ background: w.landing?.gradient ?? GS, borderColor: "rgba(224,31,90,0.14)" }}
                >
                  <span className="text-[2.2rem] block mb-4 leading-none">{w.emoji}</span>
                  <h3 style={D} className="text-[1.3rem] font-medium text-foreground mb-2 leading-snug">{w.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{w.landing?.description ?? w.promise}</p>
                  <span className="flex items-center gap-2 text-sm font-medium" style={{ color: "#E01F5A" }}>
                    {w.landing?.cta ?? "Entdecken"} <ArrowRight size={13} />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROZESS ══════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24" style={{ background: "white" }}>
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <FadeUp>
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center" style={{ color: "#E01F5A" }}>So einfach geht's</span>
            <h2 style={D} className="text-[2rem] lg:text-[2.5rem] font-light text-center text-foreground mb-10 leading-snug">
              Dein Weg zu <em className="italic" style={GT}>dir.</em>
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
            {[
              { step: "01", icon: <Heart size={20} style={{ color: "#E01F5A" }} />,        title: "Hol dir dein Gratis-Freebie",  desc: "Starte kostenlos mit meiner geführten Atemreise — in 5 Minuten zurück zu dir." },
              { step: "02", icon: <Sparkles size={20} style={{ color: "#E01F5A" }} />,     title: "Wähle dein Angebot",           desc: "Workbooks, Programme oder persönliche Begleitung — du entscheidest wie tief du gehen möchtest." },
              { step: "03", icon: <CheckCircle size={20} style={{ color: "#E01F5A" }} />,  title: "Starte deine Reise",           desc: "Ich begleite dich — liebevoll, tief und vollständig auf dich abgestimmt." },
            ].map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.1}>
                <div className="flex items-start gap-5 rounded-2xl p-6 border h-full" style={{ background: GS, borderColor: "rgba(224,31,90,0.12)" }}>
                  <span style={{ ...D, ...GT }} className="text-[2rem] font-light leading-none flex-shrink-0 pt-0.5">{s.step}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">{s.icon}<h3 style={D} className="text-[1rem] font-medium text-foreground">{s.title}</h3></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUKTE ═════════════════════════════════════════════════════════ */}
      <section id="produkte" className="px-6 py-16 lg:py-24" style={{ background: "linear-gradient(180deg,#FDF7F4 0%,#fde8d8 60%,#fce4ec 100%)" }}>
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <FadeUp>
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center" style={{ color: "#E01F5A" }}>Meine Angebote</span>
            <h2 style={D} className="text-[2rem] lg:text-[2.5rem] font-light text-center text-foreground mb-2 leading-snug">
              Dein nächster <em className="italic" style={GT}>Schritt</em> wartet
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-5 leading-relaxed">Digitale Produkte, Programme &amp; persönliche Begleitung.</p>
            <div className="flex justify-center mb-8">
              <Link to="/quiz" className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border transition-colors hover:bg-white/60" style={{ borderColor: "rgba(224,31,90,0.25)", color: "#E01F5A" }}>
                ✨ Nicht sicher? Finde dein Produkt in 1 Minute <ArrowRight size={14} />
              </Link>
            </div>
          </FadeUp>

          {/* World tabs — kompakt & zentriert */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full p-1 gap-1" style={{ background: "rgba(224,31,90,0.08)" }}>
              {MAIN_WORLDS.map((w) => (
                <button
                  key={w.id} onClick={() => setActiveWorldId(w.id)}
                  className="py-2.5 px-7 sm:px-9 rounded-full text-sm font-medium tracking-wide transition-all duration-300 leading-tight"
                  style={activeWorldId === w.id
                    ? { background: "white", color: "#E01F5A", boxShadow: "0 1px 10px rgba(224,31,90,0.18)" }
                    : { color: "var(--muted-foreground)", background: "transparent" }}
                >
                  {w.emoji} {w.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg">{activeWorld.emoji}</span>
            <span style={D} className="text-[1.1rem] font-light text-foreground">{activeWorld.title}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorldId}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              {/* Signature-Produkte zuerst, volle Breite — konsistent in jeder Welt. */}
              {products.filter((p) => p.tier === "signature").map((p, i) => (
                <SignatureCard key={p.id} p={p} index={i} />
              ))}
              {/* Übrige Produkte im 3-Spalten-Raster (keine Waisen, fülliger). */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.filter((p) => p.tier !== "signature").map((p, i) => (
                  <ProductCard key={p.id} p={p} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <Link to={`/${activeWorldId}`} className="block w-full mt-6 border text-foreground/70 py-4 rounded-full text-sm tracking-wide hover:bg-white/50 transition-colors duration-300 text-center" style={{ borderColor: "rgba(224,31,90,0.2)" }}>
            Alle Angebote in „{activeWorld.shortLabel}“ entdecken
          </Link>
        </div>
      </section>

      {/* ══ BUNDLES ══════════════════════════════════════════════════════════ */}
      <section id="bundles" className="px-6 py-16 lg:py-24 bg-background">
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <FadeUp>
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center" style={{ color: "#E01F5A" }}>Spar-Pakete</span>
            <h2 style={D} className="text-[2rem] lg:text-[2.5rem] font-light text-center text-foreground mb-2 leading-snug">
              Zusammen <em className="italic" style={GT}>tiefer gehen</em>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-10 max-w-sm mx-auto leading-relaxed">Unsere stärksten Angebote — als Paket spürbar günstiger.</p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {HOME_BUNDLES.map((b, i) => (
              <FadeUp key={b.id} delay={i * 0.08}>
                <Link
                  to={`/bundle/${b.id}`}
                  className="flex flex-col h-full rounded-[1.5rem] p-7 border bg-card transition-all duration-300 hover:scale-[1.015] hover:shadow-lg"
                  style={{ borderColor: "rgba(224,31,90,0.18)" }}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">Bundle · {b.productIds.length} Produkte</span>
                  <h3 style={D} className="text-[1.3rem] font-medium text-foreground mb-2 leading-snug">{b.title}</h3>
                  <p className="text-sm italic font-light mb-6 flex-1" style={{ color: "#E01F5A" }}>{b.tagline}</p>
                  {b.price.compareAt && (
                    <p className="text-xs text-muted-foreground mb-0.5">Einzelpreis <span className="line-through">{b.price.compareAt} €</span></p>
                  )}
                  <div className="flex items-baseline justify-between">
                    <span style={D} className="text-[1.7rem] font-light text-foreground">{b.price.amount} €</span>
                    {bundleSavings(b) > 0 && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: G }}>−{bundleSavings(b)} €</span>
                    )}
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ÜBER SABRINA ═════════════════════════════════════════════════════ */}
      <section id="sabrina" className="bg-background overflow-hidden">
        <div className="max-w-lg mx-auto lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:min-h-[600px]">

            {/* Photo */}
            <div className="relative lg:order-2" style={{ height: "72vw", maxHeight: "500px" }}>
              <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(160deg,#fce4ec 0%,#fde8d8 100%)" }} />
              <ImageWithFallback
                src={sabrinaAbout} alt="Sabrina Wenzl"
                className="w-full h-full object-cover object-top relative z-10"
                style={{ mixBlendMode: "multiply", opacity: 0.88 }}
              />
              <div className="absolute inset-0 z-20 lg:hidden" style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 55%)" }} />
              <div className="hidden lg:block absolute inset-0 z-20" style={{ background: "linear-gradient(to left, transparent 60%, var(--background) 100%)" }} />
            </div>

            {/* Text */}
            <div className="px-6 py-12 lg:order-1 lg:px-16 lg:py-20 lg:flex lg:flex-col lg:justify-center">
              <FadeUp>
                <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3" style={{ color: "#E01F5A" }}>Über Sabrina Wenzl</span>
                <h2 style={D} className="text-[2rem] lg:text-[2.5rem] font-light text-foreground mb-5 leading-snug">
                  Ich bin <em className="italic" style={GT}>für dich da.</em>
                </h2>
                <p className="text-muted-foreground text-sm leading-[1.9] mb-4">
                  Ich bin Sabrina — Mutter, Frau und Gründerin von MUTSeeLe. Ich kenne das Gefühl, sich selbst zu verlieren. In der Stille nach dem Sturm habe ich meinen eigenen Weg zurück zu mir gefunden — durch Energie, Seele und tiefes Vertrauen.
                </p>
                <p className="text-muted-foreground text-sm leading-[1.9] mb-8">
                  Heute begleite ich Frauen, Mütter und Kinder dabei, sich selbst zu vertrauen, ihre Gefühle zu verstehen und in ihrer vollen Kraft zu leben — authentisch, warm und ohne Masken.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[{ num: "300+", label: "Frauen begleitet" }, { num: "5 J.", label: "Erfahrung" }, { num: "∞", label: "Herzlichkeit" }].map((s) => (
                    <div key={s.label} className="rounded-2xl p-4 text-center border" style={{ background: GS, borderColor: "rgba(224,31,90,0.14)" }}>
                      <p style={{ ...D, ...GT }} className="text-[1.45rem] font-light mb-0.5">{s.num}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FREEBIE ══════════════════════════════════════════════════════════ */}
      <section id="freebie" className="px-6 py-16 lg:py-24" style={{ background: "linear-gradient(160deg,#fce4ec 0%,#fde8d8 60%,#fff3e0 100%)" }}>
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <FadeUp>
            {/* Mobile: centered, Desktop: two columns */}
            <div className="text-center lg:hidden">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md" style={{ background: G }}>
                <Heart className="text-white" size={24} />
              </div>
              <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3" style={{ color: "#E01F5A" }}>Kostenlos für dich</span>
              <h2 style={D} className="text-[2rem] font-light text-foreground mb-4 leading-snug">
                Dein erster Schritt <em className="italic" style={GT}>beginnt hier.</em>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-[270px] mx-auto">
                {FEATURED_FREEBIE.description}
              </p>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:grid grid-cols-2 gap-16 items-center mb-0">
              <div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-md" style={{ background: G }}>
                  <Heart className="text-white" size={22} />
                </div>
                <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: "#E01F5A" }}>Kostenlos für dich</span>
                <h2 style={D} className="text-[2.5rem] font-light text-foreground mb-5 leading-snug">
                  Dein erster Schritt <em className="italic" style={GT}>beginnt hier.</em>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Hole dir jetzt meine kostenlose geführte Atemreise — in unter 5 Minuten zurück zu deiner Mitte.
                </p>
                <div className="space-y-3">
                  {(FEATURED_FREEBIE.bullets ?? []).map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle size={15} style={{ color: "#E01F5A", flexShrink: 0 }} />
                      <span className="text-sm text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop form */}
              <div className="rounded-[1.5rem] border p-8" style={{ background: "rgba(255,255,255,0.85)", borderColor: "rgba(224,31,90,0.15)", backdropFilter: "blur(8px)" }}>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium mb-2">Gratis-Download</p>
                <p style={D} className="text-[1.4rem] font-light text-foreground mb-6 leading-snug">{FEATURED_FREEBIE.title}</p>
                {freebieSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl py-6 px-4 text-center" style={{ background: GS, border: "1px solid rgba(224,31,90,0.15)" }}>
                    <p className="text-2xl mb-2">🌸</p>
                    <p style={D} className="text-foreground font-light text-base mb-1">Danke! Dein Freebie ist unterwegs.</p>
                    <p className="text-xs text-muted-foreground">Schau in dein Postfach — auch im Spam-Ordner.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(() => setFreebieSubmitted(true))} className="flex flex-col gap-3">
                    <div>
                      <input type="email" placeholder="Deine E-Mail-Adresse"
                        className="w-full px-4 py-3 rounded-full text-sm border outline-none transition-all"
                        style={{ borderColor: errors.email ? "#E01F5A" : "rgba(224,31,90,0.2)", background: "white" }}
                        {...register("email", { required: "Bitte gib deine E-Mail ein.", pattern: { value: /\S+@\S+\.\S+/, message: "Bitte eine gültige E-Mail eingeben." } })}
                      />
                      {errors.email && <p className="text-[11px] mt-1.5 ml-4" style={{ color: "#E01F5A" }}>{errors.email.message}</p>}
                    </div>
                    <button type="submit" className="w-full text-white py-3.5 rounded-full text-sm tracking-wide flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity shadow-md" style={{ background: G }}>
                      <Download size={15} /> Jetzt gratis herunterladen
                    </button>
                  </form>
                )}
                <p className="text-xs text-muted-foreground mt-3 text-center">Kein Spam. Nur Mut &amp; Liebe. 🌸</p>
              </div>
            </div>

            {/* Mobile form */}
            <div className="lg:hidden">
              <div className="rounded-[1.5rem] border p-6 text-left mb-5" style={{ background: "rgba(255,255,255,0.8)", borderColor: "rgba(224,31,90,0.15)", backdropFilter: "blur(8px)" }}>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium mb-2">Gratis-Download</p>
                <p style={D} className="text-[1.4rem] font-light text-foreground mb-4 leading-snug">{FEATURED_FREEBIE.title}</p>
                <div className="space-y-2.5 mb-5">
                  {(FEATURED_FREEBIE.bullets ?? []).map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[0.4rem]" style={{ background: "#E01F5A" }} />{f}
                    </div>
                  ))}
                </div>
                {freebieSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl py-5 px-4 text-center" style={{ background: GS, border: "1px solid rgba(224,31,90,0.15)" }}>
                    <p className="text-2xl mb-2">🌸</p>
                    <p style={D} className="text-foreground font-light text-base mb-1">Danke! Dein Freebie ist unterwegs.</p>
                    <p className="text-xs text-muted-foreground">Schau in dein Postfach — auch im Spam-Ordner.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(() => setFreebieSubmitted(true))} className="flex flex-col gap-3">
                    <div>
                      <input type="email" placeholder="Deine E-Mail-Adresse"
                        className="w-full px-4 py-3 rounded-full text-sm border outline-none transition-all"
                        style={{ borderColor: errors.email ? "#E01F5A" : "rgba(224,31,90,0.2)", background: "white" }}
                        {...register("email", { required: "Bitte gib deine E-Mail ein.", pattern: { value: /\S+@\S+\.\S+/, message: "Bitte eine gültige E-Mail eingeben." } })}
                      />
                      {errors.email && <p className="text-[11px] mt-1.5 ml-4" style={{ color: "#E01F5A" }}>{errors.email.message}</p>}
                    </div>
                    <button type="submit" className="w-full text-white py-3.5 rounded-full text-sm tracking-wide flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity shadow-md" style={{ background: G }}>
                      <Download size={15} /> Jetzt gratis herunterladen
                    </button>
                  </form>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">Kein Spam. Nur Mut &amp; Liebe. 🌸</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════════════ */}
      <section id="testimonials" className="px-6 py-16 bg-background lg:py-24">
        <div className="max-w-lg mx-auto lg:max-w-5xl">
          <FadeUp>
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center" style={{ color: "#E01F5A" }}>Erfahrungen</span>
            <h2 style={D} className="text-[2rem] lg:text-[2.5rem] font-light text-center text-foreground mb-3 leading-snug">
              Was Frauen <em className="italic" style={GT}>erzählen</em>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-12 max-w-xs mx-auto leading-relaxed">Echte Worte. Echte Verwandlungen.</p>
          </FadeUp>

          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-5">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.id} delay={i * 0.1}>
                <div className="rounded-[1.5rem] p-7 border h-full flex flex-col" style={{ background: TESTI_BG[i % TESTI_BG.length], borderColor: "rgba(224,31,90,0.13)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">{Array.from({ length: t.rating ?? 5 }).map((_, j) => <Star key={j} size={12} style={{ fill: "#E01F5A", color: "#E01F5A" }} />)}</div>
                    {t.productId && (
                      <Link to={`/produkt/${t.productId}`} className="text-[9px] tracking-wide font-medium px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity" style={{ background: "rgba(224,31,90,0.1)", color: "#E01F5A" }}>{getProduct(t.productId)?.title ?? ""}</Link>
                    )}
                  </div>
                  <p className="text-foreground/80 text-sm leading-[1.9] mb-5 italic flex-1">„{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ background: G }}>{t.author[0]}</div>
                    <div>
                      <p className="text-foreground font-medium text-sm leading-none mb-0.5">{t.author}</p>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24" style={{ background: "white" }}>
        <div className="max-w-lg mx-auto lg:max-w-3xl">
          <FadeUp>
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center" style={{ color: "#E01F5A" }}>Häufige Fragen</span>
            <h2 style={D} className="text-[2rem] lg:text-[2.5rem] font-light text-center text-foreground mb-10 leading-snug">
              Du fragst — <em className="italic" style={GT}>ich antworte.</em>
            </h2>
          </FadeUp>
          <FadeUp>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {[
                { q: "Ist MUTSeeLe das Richtige für mich?",           a: "Wenn du das Gefühl hast, irgendwo feststeckst — ob als Mutter, als Frau, spirituell oder im Alltag — dann bist du hier richtig. Ich begleite Menschen, die bereit sind, ehrlich hinzuschauen und sich selbst wieder nahezukommen." },
                { q: "Wie läuft eine 1:1-Session ab?",                a: "Wir arbeiten per Video-Call (ca. 60–90 Minuten). Ich kombiniere Gespräch, Energiearbeit und je nach Bedarf Elemente aus Human Design oder Numerologie. Nach jeder Session bekommst du persönliche Impulse und Übungen." },
                { q: "Muss ich spirituell offen oder erfahren sein?", a: "Nein — du brauchst keine Vorkenntnisse. Ich begegne dir dort, wo du gerade bist. Ob du zum ersten Mal über dich nachdenkst oder schon länger auf dem Weg bist: alle sind willkommen." },
                { q: "Was wenn ich keine Ergebnisse sehe?",           a: "Echte Veränderung braucht Zeit und Ehrlichkeit mit sich selbst. Ich begleite dich dabei, aber der Weg gehört dir. Wenn du das Gefühl hast, dass etwas nicht passt, sprechen wir offen darüber — das ist mein Versprechen." },
                { q: "Wie bekomme ich mein Gratis-Freebie?",          a: "Einfach deine E-Mail-Adresse im Freebie-Bereich eingeben — du bekommst die Atemreise sofort in dein Postfach. Schau auch im Spam-Ordner nach, falls du nichts siehst." },
                { q: "Wie schnell sehe ich erste Veränderungen?",     a: "Viele Frauen beschreiben schon nach der ersten Session oder den ersten Tagen mit einem Workbook ein Gefühl von Leichtigkeit und Klarheit. Tiefere Transformation entfaltet sich über Wochen — aber du merkst sie." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border px-5 overflow-hidden" style={{ borderColor: "rgba(224,31,90,0.12)", background: GS }}>
                  <AccordionTrigger className="text-sm font-medium text-foreground text-left hover:no-underline py-5" style={B}>{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5" style={B}>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </section>

      {/* ══ CTA BAND ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 text-center lg:py-24" style={{ background: G }}>
        <div className="max-w-lg mx-auto lg:max-w-2xl">
          <FadeUp>
            <div className="w-12 h-[1px] bg-white/30 mx-auto mb-8" />
            <h2 style={D} className="text-[2rem] lg:text-[2.8rem] font-light text-white mb-4 leading-snug">
              Bereit für<br /><em className="italic opacity-90">deinen Mut?</em>
            </h2>
            <p className="text-white/65 text-sm leading-relaxed mb-9 max-w-xs mx-auto lg:max-w-sm">
              Ich freue mich darauf, dich auf deiner Reise zu begleiten — mit ganzer Herzlichkeit und tiefer Präsenz.
            </p>
            <button className="bg-white px-10 py-[1.05rem] rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity shadow-sm font-medium" style={{ color: "#E01F5A" }}>
              Kostenloses Erstgespräch buchen
            </button>
            <p className="text-white/40 text-xs mt-5">Kostenlos &amp; unverbindlich</p>
          </FadeUp>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
