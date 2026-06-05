import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { Menu, X, ArrowRight, Download, Star, Heart, Sparkles, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import logoSabrina from "@/imports/Logo_Sabrina.png";
import sabrinavPhoto from "@/imports/Sabrina.png";

const displayFont = { fontFamily: "var(--font-display)" };
const bodyFont   = { fontFamily: "var(--font-body)" };

const BRAND_GRADIENT      = "linear-gradient(135deg, #E01F5A 0%, #F47820 100%)";
const BRAND_GRADIENT_SOFT = "linear-gradient(135deg, #fce4ec 0%, #fde8d8 100%)";

// ─── Helper: CTA label per product type ──────────────────────────────────────
function ctaLabel(type: string): string {
  if (["1:1 Begleitung", "Premium 1:1", "3-Monats-Premium"].includes(type)) return "Platz anfragen";
  if (["Online-Programm", "4-Wochen-Programm"].includes(type)) return "Programm ansehen";
  if (type === "Persönliches Reading") return "Reading buchen";
  return "Sofort erhalten";
}

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Product data ─────────────────────────────────────────────────────────────
const PRODUCTS = {
  kinder: [
    {
      emoji: "📖",
      tagline: "Lernen fühlt sich plötzlich leicht an.",
      title: "Lernen mit Leichtigkeit",
      desc: "Ein sanftes Begleit-Workbook für sensible Kinder, die im Schulalltag mehr Ruhe, Fokus und Selbstvertrauen brauchen.",
      price: "19 €",
      type: "Digitales Workbook",
      tag: "Bestseller",
      spots: "",
    },
    {
      emoji: "🃏",
      tagline: "Kleine Karten. Große Wirkung.",
      title: "Lernkarten: Konzentration & Ruhe",
      desc: "44 liebevoll gestaltete Karten mit Affirmationen, Atemübungen und emotionalen Impulsen für Kinder ab 5 Jahren.",
      price: "14 €",
      type: "Kartenset (PDF)",
      tag: "",
      spots: "",
    },
    {
      emoji: "🌱",
      tagline: "Schule muss kein Kraftakt sein.",
      title: "Schulstart ohne Stress",
      desc: "Ein 4-wöchiges digitales Begleitprogramm für Kinder und Eltern — emotional, spielerisch und nachhaltig.",
      price: "45 €",
      type: "Online-Programm",
      tag: "Beliebt",
      spots: "Noch 4 Plätze im Juli",
    },
    {
      emoji: "💛",
      tagline: "Dein Kind darf sich sicher fühlen.",
      title: "Emotionale Stärke für Kinder",
      desc: "Intensive 1:1-Begleitung für Kinder und Eltern. Wir arbeiten gemeinsam an Urvertrauen, Selbstwert und innerer Ruhe.",
      price: "145 €",
      type: "1:1 Begleitung",
      tag: "Empfohlen",
      spots: "Nur noch 2 Plätze",
    },
  ],
  frauen: [
    {
      emoji: "📓",
      tagline: "Dein Leben — in deinen Worten.",
      title: "Vision Book — Klarheit für dein Leben",
      desc: "Ein geführtes Journal, das dich Schritt für Schritt zu deinen tiefsten Wünschen, Werten und deiner inneren Stimme führt.",
      price: "22 €",
      type: "Digitales Journal",
      tag: "Bestseller",
      spots: "",
    },
    {
      emoji: "🌸",
      tagline: "Du bist genug. Immer.",
      title: "Seelenstark — Selbstwert & feminine Energie",
      desc: "Ein transformatives Workbook für Frauen, die alte Glaubenssätze loslassen und in ihre weibliche Kraft zurückfinden möchten.",
      price: "25 €",
      type: "Digitales Workbook",
      tag: "Neu",
      spots: "",
    },
    {
      emoji: "🔥",
      tagline: "4 Wochen, die dein Leben verändern.",
      title: "Emotionale Heilung — Intensiv-Begleitung",
      desc: "Tiefgehende 4-Wochen-Begleitung mit wöchentlichen Calls, persönlichem Workbook und Energiearbeit. Für Frauen, die bereit sind.",
      price: "145 €",
      type: "4-Wochen-Programm",
      tag: "Beliebt",
      spots: "Noch 3 Plätze im Juli",
    },
    {
      emoji: "💫",
      tagline: "Wer bist du wirklich?",
      title: "Persönliche Selbstfindungs-Reise",
      desc: "Die intensive 1:1-Begleitung für Frauen, die tief gehen wollen. Seele, Energie, Identität — alles in einem geschützten Raum.",
      price: "355 €",
      type: "Premium 1:1",
      tag: "Tiefste Ebene",
      spots: "Nur noch 1 Platz",
    },
  ],
  spiritual: [
    {
      emoji: "🔮",
      tagline: "Deine Blaupause wartet auf dich.",
      title: "Human Design Reading",
      desc: "Verstehe deine Energie, deinen Typ und deine einzigartige Strategie. Ein tiefes persönliches Reading von Sabrina — nur für dich.",
      price: "145 €",
      type: "Persönliches Reading",
      tag: "Empfohlen",
      spots: "",
    },
    {
      emoji: "🌙",
      tagline: "Deine Zahl erzählt deine Geschichte.",
      title: "Geburtszahlen-Analyse",
      desc: "Eine tiefe numerologische Analyse deiner Lebenszahl, Seelenzahl und deines Jahreszyklus — als PDF und Audio-Aufnahme.",
      price: "45 €",
      type: "Analyse (PDF + Audio)",
      tag: "",
      spots: "",
    },
    {
      emoji: "✨",
      tagline: "Lass die Karten sprechen.",
      title: "Spirituelles Kartenset für Frauen",
      desc: "36 Karten mit energetischen Impulsen, Seelenbotschaften und Affirmationen für deinen täglichen spirituellen Moment.",
      price: "14 €",
      type: "Kartenset (PDF)",
      tag: "Beliebt",
      spots: "",
    },
    {
      emoji: "🕊️",
      tagline: "Tiefe Transformation beginnt innen.",
      title: "Energetische Premium-Begleitung",
      desc: "Das intensivste Angebot. 3 Monate tiefe Energie- und Seelenarbeit. Human Design, Geburtszahlen, Pendeln und 1:1-Sessions.",
      price: "555 €",
      type: "3-Monats-Premium",
      tag: "Intensivst",
      spots: "Nur noch 2 Plätze",
    },
  ],
};

type Category = "kinder" | "frauen" | "spiritual";

const CATEGORY_META: Record<Category, { label: string; short: string; emoji: string }> = {
  kinder:    { label: "Kinder & Lernen",        short: "Kinder",        emoji: "🌿" },
  frauen:    { label: "Frauen & Selbstfindung",  short: "Frauen",        emoji: "🌸" },
  spiritual: { label: "Spiritualität & Energie", short: "Spiritualität", emoji: "✨" },
};

// ─── Email form type ──────────────────────────────────────────────────────────
type FreebieForm = { email: string };

// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [menuOpen, setMenuOpen]               = useState(false);
  const [activeCategory, setActiveCategory]   = useState<Category>("kinder");
  const [freebieSubmitted, setFreebieSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FreebieForm>();
  const onFreebieSubmit = () => setFreebieSubmitted(true);

  const products = PRODUCTS[activeCategory];

  return (
    <div className="min-h-screen bg-background text-foreground" style={bodyFont}>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-md border-b border-border">
        <div className="max-w-lg mx-auto px-5 py-3 flex items-center justify-between">
          <ImageWithFallback
            src={logoSabrina}
            alt="MUTSeeLe by Sabrina Wenzl"
            className="h-10 w-auto object-contain"
          />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Menü"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-background border-t border-border px-6 py-6 flex flex-col gap-5"
            >
              {[
                ["Über mich",    "#sabrina"],
                ["Themenwelten", "#themenwelten"],
                ["Angebote",     "#produkte"],
                ["Gratis Freebie", "#freebie"],
                ["Erfahrungen",  "#testimonials"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground/70 hover:text-foreground text-sm tracking-wide transition-colors"
                >
                  {label}
                </a>
              ))}
              <button
                className="mt-2 text-white py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity"
                style={{ background: BRAND_GRADIENT }}
              >
                Kostenloses Erstgespräch buchen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-[64px] relative">
        <div
          className="relative h-[78vh] min-h-[520px] overflow-hidden"
          style={{ background: "linear-gradient(160deg, #fce4ec 0%, #fde8d8 55%, #fff3e0 100%)" }}
        >
          {/* Sabrinas echtes Foto statt Unsplash-Placeholder */}
          <ImageWithFallback
            src={sabrinavPhoto}
            alt="Sabrina Wenzl — MUTSeeLe"
            className="w-full h-full object-cover object-top opacity-35"
            style={{ mixBlendMode: "multiply" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="relative z-10 -mt-32 px-6 pb-16 text-center max-w-lg mx-auto">
          <FadeUp>
            <div className="flex justify-center mb-5">
              <ImageWithFallback
                src={logoSabrina}
                alt="MUTSeeLe"
                className="h-12 w-auto object-contain opacity-90"
              />
            </div>
            <h1 style={displayFont} className="text-[2.8rem] font-light leading-[1.15] text-foreground mb-5">
              Angst beginnt<br />
              im Kopf —{" "}
              <em
                className="italic not-italic font-semibold"
                style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                MUT auch.
              </em>
            </h1>
            <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-9 max-w-[290px] mx-auto">
              Erschöpft davon, immer für alle da zu sein — außer für dich selbst? Hier darfst du endlich ankommen.
            </p>
            <div className="flex flex-col items-center gap-3">
              <a
                href="#produkte"
                className="text-white px-10 py-[1.05rem] rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity w-full max-w-xs shadow-md text-center"
                style={{ background: BRAND_GRADIENT }}
              >
                Meine Angebote ansehen
              </a>
              <a
                href="#freebie"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                Gratis Freebie holen <ArrowRight size={13} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="px-6 py-5 border-y" style={{ borderColor: "rgba(224,31,90,0.1)", background: "white" }}>
        <FadeUp>
          <div className="max-w-lg mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} style={{ fill: "#E01F5A", color: "#E01F5A" }} />
              ))}
            </div>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="text-foreground/70 text-xs" style={bodyFont}><strong className="text-foreground">300+</strong> Frauen &amp; Kinder begleitet</span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="text-foreground/70 text-xs" style={bodyFont}><strong className="text-foreground">5 Jahre</strong> Erfahrung</span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="text-foreground/70 text-xs" style={bodyFont}><strong className="text-foreground">3</strong> Themenwelten</span>
          </div>
        </FadeUp>
      </div>

      {/* ── ZITAT ── */}
      <div className="px-6 py-10 text-center" style={{ background: BRAND_GRADIENT_SOFT }}>
        <FadeUp>
          <div className="max-w-lg mx-auto">
            <Sparkles size={16} className="mx-auto mb-4" style={{ color: "#E01F5A", opacity: 0.5 }} />
            <p
              style={{ ...displayFont, color: "var(--foreground)" }}
              className="text-[1.3rem] font-light italic leading-relaxed"
            >
              „Dein Gefühl ist keine Schwäche — es ist dein Wegweiser."
            </p>
            <p className="text-xs text-muted-foreground mt-3 tracking-widest uppercase">— Sabrina Wenzl</p>
          </div>
        </FadeUp>
      </div>

      {/* ── DREI THEMENWELTEN ── */}
      <section id="themenwelten" className="px-6 py-16 bg-background">
        <div className="max-w-lg mx-auto">
          <FadeUp>
            <span
              className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center"
              style={{ color: "#E01F5A" }}
            >
              Meine Themenwelten
            </span>
            <h2 style={displayFont} className="text-[2rem] font-light text-center text-foreground mb-3 leading-snug">
              Wo darf ich dich{" "}
              <em
                className="italic"
                style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                begleiten?
              </em>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-10 max-w-xs mx-auto leading-relaxed">
              Drei Welten, ein Kern — dein Weg zurück zu dir.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-5">
            {[
              {
                emoji: "🌿",
                title: "Kinder & Lernen",
                desc: "Sensible Kinder brauchen mehr als Lernstoff — sie brauchen emotionale Sicherheit, Leichtigkeit und jemanden, der sie wirklich sieht.",
                bg: "linear-gradient(135deg, #fce4ec 0%, #fde8d8 100%)",
                link: "Für Kinder & Mamas entdecken",
              },
              {
                emoji: "🌸",
                title: "Frauen & Selbstfindung",
                desc: "Du hast so lange für alle anderen funktioniert. Jetzt ist es Zeit, dich selbst zu fragen: Wer bin ich eigentlich wirklich?",
                bg: "linear-gradient(135deg, #fde8d8 0%, #fce4ec 100%)",
                link: "Mein Weg als Frau",
              },
              {
                emoji: "✨",
                title: "Spiritualität & Energie",
                desc: "Human Design, Geburtszahlen, Energiearbeit — Werkzeuge, die dich tiefer mit dir selbst verbinden und deinen Weg klären.",
                bg: "linear-gradient(135deg, #fff3e0 0%, #fde8d8 100%)",
                link: "Spirituell erwachen",
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div
                  className="rounded-[1.5rem] p-7 border cursor-pointer transition-all duration-300 hover:scale-[1.015] hover:shadow-lg"
                  style={{ background: item.bg, borderColor: "rgba(224,31,90,0.14)" }}
                >
                  <span className="text-[2.2rem] block mb-4 leading-none">{item.emoji}</span>
                  <h3 style={displayFont} className="text-[1.3rem] font-medium text-foreground mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.desc}</p>
                  <button
                    className="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all duration-300"
                    style={{ color: "#E01F5A" }}
                  >
                    {item.link} <ArrowRight size={13} />
                  </button>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SO GEHT'S — PROZESS ── */}
      <section className="px-6 py-16" style={{ background: "white" }}>
        <div className="max-w-lg mx-auto">
          <FadeUp>
            <span
              className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center"
              style={{ color: "#E01F5A" }}
            >
              So einfach geht's
            </span>
            <h2 style={displayFont} className="text-[2rem] font-light text-center text-foreground mb-10 leading-snug">
              Dein Weg zu{" "}
              <em
                className="italic"
                style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                dir.
              </em>
            </h2>
          </FadeUp>

          <div className="flex flex-col gap-4">
            {[
              {
                step: "01",
                icon: <Heart size={20} style={{ color: "#E01F5A" }} />,
                title: "Hol dir dein Gratis-Freebie",
                desc: "Starte kostenlos mit meiner geführten Atemreise — in 5 Minuten zurück zu dir.",
              },
              {
                step: "02",
                icon: <Sparkles size={20} style={{ color: "#E01F5A" }} />,
                title: "Wähle dein Angebot",
                desc: "Digitale Workbooks, Programme oder persönliche Begleitung — du entscheidest wie tief du gehen möchtest.",
              },
              {
                step: "03",
                icon: <CheckCircle size={20} style={{ color: "#E01F5A" }} />,
                title: "Starte deine Reise",
                desc: "Ich begleite dich — liebevoll, tief und vollständig auf dich abgestimmt.",
              },
            ].map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.1}>
                <div
                  className="flex items-start gap-5 rounded-2xl p-6 border"
                  style={{ background: BRAND_GRADIENT_SOFT, borderColor: "rgba(224,31,90,0.12)" }}
                >
                  <span
                    style={{ ...displayFont, background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    className="text-[2rem] font-light leading-none flex-shrink-0 pt-0.5"
                  >
                    {s.step}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {s.icon}
                      <h3 style={displayFont} className="text-[1rem] font-medium text-foreground">{s.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUKTE ── */}
      <section
        id="produkte"
        className="px-6 py-16"
        style={{ background: "linear-gradient(180deg, #FDF7F4 0%, #fde8d8 60%, #fce4ec 100%)" }}
      >
        <div className="max-w-lg mx-auto">
          <FadeUp>
            <span
              className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center"
              style={{ color: "#E01F5A" }}
            >
              Meine Angebote
            </span>
            <h2 style={displayFont} className="text-[2rem] font-light text-center text-foreground mb-2 leading-snug">
              Dein nächster{" "}
              <em
                className="italic"
                style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                Schritt
              </em>{" "}
              wartet
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-8 leading-relaxed">
              Digitale Produkte, Programme &amp; persönliche Begleitung.
            </p>
          </FadeUp>

          {/* Category tabs */}
          <div
            className="flex rounded-2xl p-1 mb-8 gap-1"
            style={{ background: "rgba(224,31,90,0.08)" }}
          >
            {(Object.keys(CATEGORY_META) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-1 py-2.5 px-1 rounded-xl text-[11px] font-medium tracking-wide transition-all duration-300 leading-tight"
                style={
                  activeCategory === cat
                    ? { background: "white", color: "#E01F5A", boxShadow: "0 1px 10px rgba(224,31,90,0.18)" }
                    : { color: "var(--muted-foreground)", background: "transparent" }
                }
              >
                {CATEGORY_META[cat].emoji}{" "}
                {CATEGORY_META[cat].short}
              </button>
            ))}
          </div>

          {/* Active category label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg">{CATEGORY_META[activeCategory].emoji}</span>
            <span style={displayFont} className="text-[1.1rem] font-light text-foreground">
              {CATEGORY_META[activeCategory].label}
            </span>
          </div>

          {/* Product cards with animated transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="flex flex-col gap-4"
            >
              {products.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="rounded-[1.5rem] p-6 border bg-card relative overflow-hidden transition-all duration-300 hover:scale-[1.015] hover:shadow-lg cursor-pointer"
                  style={{ borderColor: "rgba(224,31,90,0.13)" }}
                >
                  {/* Urgency badge */}
                  {p.spots && (
                    <div
                      className="flex items-center gap-1.5 mb-3 text-[10px] font-semibold px-3 py-1.5 rounded-full w-fit"
                      style={{ background: "rgba(224,31,90,0.08)", color: "#E01F5A" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E01F5A" }} />
                      {p.spots}
                    </div>
                  )}

                  {p.tag && (
                    <span
                      className="absolute top-4 right-4 text-[9px] tracking-wide font-semibold px-2.5 py-1 rounded-full text-white"
                      style={{ background: BRAND_GRADIENT }}
                    >
                      {p.tag}
                    </span>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-[2rem] leading-none flex-shrink-0 mt-0.5">{p.emoji}</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-1">
                        {p.type}
                      </p>
                      <p className="text-sm leading-snug font-light italic" style={{ color: "#E01F5A" }}>
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  <h4 style={displayFont} className="text-[1.15rem] font-medium text-foreground mb-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>

                  <div className="flex items-center justify-between">
                    <span style={displayFont} className="text-[1.35rem] font-light text-foreground">
                      {p.price}
                    </span>
                    <button
                      className="text-white px-5 py-2 rounded-full text-xs font-medium tracking-wide hover:opacity-90 transition-opacity"
                      style={{ background: BRAND_GRADIENT }}
                    >
                      {ctaLabel(p.type)}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            className="w-full mt-6 border text-foreground/70 py-4 rounded-full text-sm tracking-wide hover:bg-white/50 transition-colors duration-300"
            style={{ borderColor: "rgba(224,31,90,0.2)" }}
          >
            Alle Angebote entdecken
          </button>
        </div>
      </section>

      {/* ── ÜBER SABRINA ── */}
      <section id="sabrina" className="bg-background">
        <div className="max-w-lg mx-auto">
          <div
            className="relative overflow-hidden"
            style={{ height: "72vw", maxHeight: "440px" }}
          >
            <div
              className="absolute inset-0 z-0"
              style={{ background: "linear-gradient(160deg, #fce4ec 0%, #fde8d8 100%)" }}
            />
            <ImageWithFallback
              src={sabrinavPhoto}
              alt="Sabrina Wenzl — MUTSeeLe Coach, Mutter und Begleiterin"
              className="w-full h-full object-cover object-top relative z-10"
              style={{ mixBlendMode: "multiply", opacity: 0.88 }}
            />
            <div
              className="absolute inset-0 z-20"
              style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 55%)" }}
            />
          </div>

          <div className="px-6 py-12">
            <FadeUp>
              <span
                className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3"
                style={{ color: "#E01F5A" }}
              >
                Über Sabrina Wenzl
              </span>
              <h2 style={displayFont} className="text-[2rem] font-light text-foreground mb-5 leading-snug">
                Ich bin{" "}
                <em
                  className="italic"
                  style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  für dich da.
                </em>
              </h2>
              <p className="text-muted-foreground text-sm leading-[1.9] mb-4">
                Ich bin Sabrina — Mutter, Frau und Gründerin von MUTSeeLe. Ich kenne das Gefühl, sich selbst zu verlieren. In der Stille nach dem Sturm habe ich meinen eigenen Weg zurück zu mir gefunden — durch Energie, Seele und tiefes Vertrauen.
              </p>
              <p className="text-muted-foreground text-sm leading-[1.9] mb-8">
                Heute begleite ich Frauen, Mütter und Kinder dabei, sich selbst zu vertrauen, ihre Gefühle zu verstehen und in ihrer vollen Kraft zu leben — authentisch, warm und ohne Masken.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { num: "300+", label: "Frauen begleitet" },
                  { num: "5 J.", label: "Erfahrung" },
                  { num: "∞",    label: "Herzlichkeit" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-4 text-center border"
                    style={{ background: BRAND_GRADIENT_SOFT, borderColor: "rgba(224,31,90,0.14)" }}
                  >
                    <p
                      style={{ ...displayFont, background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                      className="text-[1.45rem] font-light mb-0.5"
                    >
                      {s.num}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              <button
                className="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all duration-300"
                style={{ color: "#E01F5A" }}
              >
                Meine Geschichte lesen <ArrowRight size={13} />
              </button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FREEBIE ── */}
      <section
        id="freebie"
        className="px-6 py-16"
        style={{ background: "linear-gradient(160deg, #fce4ec 0%, #fde8d8 60%, #fff3e0 100%)" }}
      >
        <div className="max-w-lg mx-auto text-center">
          <FadeUp>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md"
              style={{ background: BRAND_GRADIENT }}
            >
              <Heart className="text-white" size={24} />
            </div>
            <span
              className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3"
              style={{ color: "#E01F5A" }}
            >
              Kostenlos für dich
            </span>
            <h2 style={displayFont} className="text-[2rem] font-light text-foreground mb-4 leading-snug">
              Dein erster Schritt{" "}
              <em
                className="italic"
                style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                beginnt hier.
              </em>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-[270px] mx-auto">
              Hole dir jetzt meine kostenlose geführte Atemreise — in unter 5 Minuten zurück zu deiner Mitte.
            </p>

            <div
              className="rounded-[1.5rem] border p-6 text-left mb-5"
              style={{ background: "rgba(255,255,255,0.8)", borderColor: "rgba(224,31,90,0.15)", backdropFilter: "blur(8px)" }}
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium mb-2">
                Gratis-Download
              </p>
              <p style={displayFont} className="text-[1.4rem] font-light text-foreground mb-4 leading-snug">
                5-Minuten-Atemreise<br />für Frauen
              </p>
              <div className="space-y-2.5 mb-5">
                {[
                  "Geführtes PDF + Audiodatei",
                  "Sofort nach Anmeldung verfügbar",
                  "Keine Vorkenntnisse nötig",
                  "Von über 500 Frauen geliebt",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[0.4rem]"
                      style={{ background: "#E01F5A" }}
                    />
                    {f}
                  </div>
                ))}
              </div>

              {/* Email capture form */}
              {freebieSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl py-5 px-4 text-center"
                  style={{ background: BRAND_GRADIENT_SOFT, border: "1px solid rgba(224,31,90,0.15)" }}
                >
                  <p className="text-2xl mb-2">🌸</p>
                  <p style={displayFont} className="text-foreground font-light text-base mb-1">Danke! Dein Freebie ist unterwegs.</p>
                  <p className="text-xs text-muted-foreground">Schau in dein Postfach — auch im Spam-Ordner.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onFreebieSubmit)} className="flex flex-col gap-3">
                  <div>
                    <input
                      type="email"
                      placeholder="Deine E-Mail-Adresse"
                      className="w-full px-4 py-3 rounded-full text-sm border outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: errors.email ? "#E01F5A" : "rgba(224,31,90,0.2)",
                        background: "white",
                        focusRingColor: "#E01F5A",
                      }}
                      {...register("email", {
                        required: "Bitte gib deine E-Mail ein.",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Bitte eine gültige E-Mail-Adresse eingeben." },
                      })}
                    />
                    {errors.email && (
                      <p className="text-[11px] mt-1.5 ml-4" style={{ color: "#E01F5A" }}>{errors.email.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white py-3.5 rounded-full text-sm tracking-wide flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity shadow-md"
                    style={{ background: BRAND_GRADIENT }}
                  >
                    <Download size={15} />
                    Jetzt gratis herunterladen
                  </button>
                </form>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Kein Spam. Nur Mut &amp; Liebe. 🌸</p>
          </FadeUp>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="px-6 py-16 bg-background">
        <div className="max-w-lg mx-auto">
          <FadeUp>
            <span
              className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center"
              style={{ color: "#E01F5A" }}
            >
              Erfahrungen
            </span>
            <h2 style={displayFont} className="text-[2rem] font-light text-center text-foreground mb-3 leading-snug">
              Was Frauen{" "}
              <em
                className="italic"
                style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                erzählen
              </em>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-12 max-w-xs mx-auto leading-relaxed">
              Echte Worte. Echte Verwandlungen.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-5">
            {[
              {
                name: "Maria K.",
                role: "Mutter von 2 Kindern",
                text: "Mein Sohn hatte in den ersten drei Wochen mit dem Workbook seinen ersten ruhigen Schultag seit Monaten. Sabrina hat uns wirklich gesehen — das spürt man sofort.",
                tag: "Lernen mit Leichtigkeit",
                bg: "linear-gradient(135deg, #fce4ec 0%, #fde8d8 100%)",
              },
              {
                name: "Lisa M.",
                role: "Unternehmerin & Mama",
                text: "Das Vision Book hat mir nach Jahren des Funktionierens gezeigt, was ich wirklich will. In 4 Wochen mehr Klarheit als in 4 Jahren Selbstoptimierung.",
                tag: "Vision Book",
                bg: "linear-gradient(135deg, #fde8d8 0%, #fff3e0 100%)",
              },
              {
                name: "Daniela R.",
                role: "Frau im Wandel",
                text: "Ich habe Glaubenssätze losgelassen, die mich seit meiner Kindheit blockiert haben. Die 4-Wochen-Begleitung war das Mutigste und Beste, was ich je für mich getan habe.",
                tag: "Emotionale Heilung",
                bg: "linear-gradient(135deg, #fce4ec 0%, #fff3e0 100%)",
              },
            ].map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div
                  className="rounded-[1.5rem] p-7 border"
                  style={{ background: t.bg, borderColor: "rgba(224,31,90,0.13)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={12} style={{ fill: "#E01F5A", color: "#E01F5A" }} />
                      ))}
                    </div>
                    <span
                      className="text-[9px] tracking-wide font-medium px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(224,31,90,0.1)", color: "#E01F5A" }}
                    >
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-foreground/80 text-sm leading-[1.9] mb-5 italic">
                    „{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                      style={{ background: BRAND_GRADIENT }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm leading-none mb-0.5">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-16" style={{ background: "white" }}>
        <div className="max-w-lg mx-auto">
          <FadeUp>
            <span
              className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3 text-center"
              style={{ color: "#E01F5A" }}
            >
              Häufige Fragen
            </span>
            <h2 style={displayFont} className="text-[2rem] font-light text-center text-foreground mb-10 leading-snug">
              Du fragst —{" "}
              <em
                className="italic"
                style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                ich antworte.
              </em>
            </h2>
          </FadeUp>

          <FadeUp>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {[
                {
                  q: "Ist MUTSeeLe das Richtige für mich?",
                  a: "Wenn du das Gefühl hast, irgendwo feststeckst — ob als Mutter, als Frau, spirituell oder im Alltag — dann bist du hier richtig. Ich begleite Menschen, die bereit sind, ehrlich hinzuschauen und sich selbst wieder nahezukommen.",
                },
                {
                  q: "Wie läuft eine 1:1-Session ab?",
                  a: "Wir arbeiten per Video-Call (ca. 60–90 Minuten). Ich kombiniere Gespräch, Energiearbeit und je nach Bedarf Elemente aus Human Design oder Numerologie. Nach jeder Session bekommst du persönliche Impulse und Übungen.",
                },
                {
                  q: "Muss ich spirituell offen oder erfahren sein?",
                  a: "Nein — du brauchst keine Vorkenntnisse. Ich begegne dir dort, wo du gerade bist. Ob du zum ersten Mal über dich nachdenktst oder schon länger auf dem Weg bist: alle sind willkommen.",
                },
                {
                  q: "Was wenn ich keine Ergebnisse sehe?",
                  a: "Echte Veränderung braucht Zeit und Ehrlichkeit mit sich selbst. Ich begleite dich dabei, aber der Weg gehört dir. Wenn du das Gefühl hast, dass etwas nicht passt, sprechen wir offen darüber — das ist mein Versprechen.",
                },
                {
                  q: "Wie bekomme ich mein Gratis-Freebie?",
                  a: "Einfach deine E-Mail-Adresse im Freebie-Bereich eingeben — du bekommst die Atemreise sofort in dein Postfach. Schau auch im Spam-Ordner nach, falls du nichts siehst.",
                },
                {
                  q: "Wie schnell sehe ich erste Veränderungen?",
                  a: "Viele Frauen beschreiben schon nach der ersten Session oder den ersten Tagen mit einem Workbook ein Gefühl von Leichtigkeit und Klarheit. Tiefere Transformation entfaltet sich über Wochen — aber du merkst sie.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-2xl border px-5 overflow-hidden"
                  style={{ borderColor: "rgba(224,31,90,0.12)", background: BRAND_GRADIENT_SOFT }}
                >
                  <AccordionTrigger
                    className="text-sm font-medium text-foreground text-left hover:no-underline py-5"
                    style={bodyFont}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-sm text-muted-foreground leading-relaxed pb-5"
                    style={bodyFont}
                  >
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="px-6 py-16 text-center" style={{ background: BRAND_GRADIENT }}>
        <div className="max-w-lg mx-auto">
          <FadeUp>
            <div className="w-12 h-[1px] bg-white/30 mx-auto mb-8" />
            <h2 style={displayFont} className="text-[2rem] font-light text-white mb-4 leading-snug">
              Bereit für<br />
              <em className="italic opacity-90">deinen Mut?</em>
            </h2>
            <p className="text-white/65 text-sm leading-relaxed mb-9 max-w-xs mx-auto">
              Ich freue mich darauf, dich auf deiner Reise zu begleiten — mit ganzer Herzlichkeit und tiefer Präsenz.
            </p>
            <button
              className="bg-white px-10 py-[1.05rem] rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity shadow-sm font-medium"
              style={{ color: "#E01F5A" }}
            >
              Kostenloses Erstgespräch buchen
            </button>
            <p className="text-white/40 text-xs mt-5">Kostenlos &amp; unverbindlich</p>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-14" style={{ background: "var(--foreground)" }}>
        <div className="max-w-lg mx-auto">
          <ImageWithFallback
            src={logoSabrina}
            alt="MUTSeeLe by Sabrina Wenzl"
            className="h-10 w-auto object-contain mb-4"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.75 }}
          />
          <p className="text-background/45 text-xs leading-relaxed mb-8 max-w-xs">
            Spirituelles &amp; emotionales Coaching für Frauen, Mütter und Kinder.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10">
            {[
              ["Über mich",    "#sabrina"],
              ["Themenwelten", "#themenwelten"],
              ["Angebote",     "#produkte"],
              ["Freebie",      "#freebie"],
              ["Impressum",    "#"],
              ["Datenschutz",  "#"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-background/50 hover:text-background/90 text-sm transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-background/10 flex items-center justify-between">
            <p className="text-background/25 text-xs">© {new Date().getFullYear()} MUTSeeLe by Sabrina Wenzl</p>
            <a
              href="#brand-bible"
              className="text-background/25 hover:text-background/50 text-xs transition-colors duration-200"
            >
              Brand Bible
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
