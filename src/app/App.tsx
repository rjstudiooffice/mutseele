import { useState } from "react";
import { Menu, X, ArrowRight, Download, Star, Heart, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSabrina from "@/imports/Logo_Sabrina.png";
import sabrinavPhoto from "@/imports/Sabrina.png";

const displayFont = { fontFamily: "var(--font-display)" };
const bodyFont = { fontFamily: "var(--font-body)" };

// Brand gradient: Magenta → Orange (pulled directly from MUTSeeLe logo)
const BRAND_GRADIENT = "linear-gradient(135deg, #E01F5A 0%, #F47820 100%)";
const BRAND_GRADIENT_SOFT = "linear-gradient(135deg, #fce4ec 0%, #fde8d8 100%)";

// ─── Product data ────────────────────────────────────────────────────────────
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
    },
    {
      emoji: "🃏",
      tagline: "Kleine Karten. Große Wirkung.",
      title: "Lernkarten: Konzentration & Ruhe",
      desc: "44 liebevoll gestaltete Karten mit Affirmationen, Atemübungen und emotionalen Impulsen für Kinder ab 5 Jahren.",
      price: "14 €",
      type: "Kartenset (PDF)",
      tag: "",
    },
    {
      emoji: "🌱",
      tagline: "Schule muss kein Kraftakt sein.",
      title: "Schulstart ohne Stress",
      desc: "Ein 4-wöchiges digitales Begleitprogramm für Kinder und Eltern — emotional, spielerisch und nachhaltig.",
      price: "45 €",
      type: "Online-Programm",
      tag: "Beliebt",
    },
    {
      emoji: "💛",
      tagline: "Dein Kind darf sich sicher fühlen.",
      title: "Emotionale Stärke für Kinder",
      desc: "Intensive 1:1-Begleitung für Kinder und Eltern. Wir arbeiten gemeinsam an Urvertrauen, Selbstwert und innerer Ruhe.",
      price: "145 €",
      type: "1:1 Begleitung",
      tag: "Empfohlen",
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
    },
    {
      emoji: "🌸",
      tagline: "Du bist genug. Immer.",
      title: "Seelenstark — Selbstwert & feminine Energie",
      desc: "Ein transformatives Workbook für Frauen, die alte Glaubenssätze loslassen und in ihre weibliche Kraft zurückfinden möchten.",
      price: "25 €",
      type: "Digitales Workbook",
      tag: "Neu",
    },
    {
      emoji: "🔥",
      tagline: "4 Wochen, die dein Leben verändern.",
      title: "Emotionale Heilung — Intensiv-Begleitung",
      desc: "Tiefgehende 4-Wochen-Begleitung mit wöchentlichen Calls, persönlichem Workbook und Energiearbeit. Für Frauen, die bereit sind.",
      price: "145 €",
      type: "4-Wochen-Programm",
      tag: "Beliebt",
    },
    {
      emoji: "💫",
      tagline: "Wer bist du wirklich?",
      title: "Persönliche Selbstfindungs-Reise",
      desc: "Die intensive 1:1-Begleitung für Frauen, die tief gehen wollen. Seele, Energie, Identität — alles in einem geschützten Raum.",
      price: "355 €",
      type: "Premium 1:1",
      tag: "Tiefste Ebene",
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
    },
    {
      emoji: "🌙",
      tagline: "Deine Zahl erzählt deine Geschichte.",
      title: "Geburtszahlen-Analyse",
      desc: "Eine tiefe numerologische Analyse deiner Lebenszahl, Seelenzahl und deines Jahreszyklus — als PDF und Audio-Aufnahme.",
      price: "45 €",
      type: "Analyse (PDF + Audio)",
      tag: "",
    },
    {
      emoji: "✨",
      tagline: "Lass die Karten sprechen.",
      title: "Spirituelles Kartenset für Frauen",
      desc: "36 Karten mit energetischen Impulsen, Seelenbotschaften und Affirmationen für deinen täglichen spirituellen Moment.",
      price: "14 €",
      type: "Kartenset (PDF)",
      tag: "Beliebt",
    },
    {
      emoji: "🕊️",
      tagline: "Tiefe Transformation beginnt innen.",
      title: "Energetische Premium-Begleitung",
      desc: "Das intensivste Angebot. 3 Monate tiefe Energie- und Seelenarbeit. Human Design, Geburtszahlen, Pendeln und 1:1-Sessions.",
      price: "555 €",
      type: "3-Monats-Premium",
      tag: "Intensivst",
    },
  ],
};

type Category = "kinder" | "frauen" | "spiritual";

const CATEGORY_META: Record<Category, { label: string; short: string; emoji: string }> = {
  kinder:   { label: "Kinder & Lernen",        short: "Kinder",      emoji: "🌿" },
  frauen:   { label: "Frauen & Selbstfindung",  short: "Frauen",      emoji: "🌸" },
  spiritual:{ label: "Spiritualität & Energie", short: "Spiritualität", emoji: "✨" },
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("kinder");

  const products = PRODUCTS[activeCategory];

  return (
    <div className="min-h-screen bg-background text-foreground" style={bodyFont}>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-md border-b border-border">
        <div className="max-w-lg mx-auto px-5 py-3 flex items-center justify-between">
          {/* Real logo */}
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

        {menuOpen && (
          <div className="bg-background border-t border-border px-6 py-6 flex flex-col gap-5">
            {[
              ["Über mich", "#sabrina"],
              ["Themenwelten", "#themenwelten"],
              ["Angebote", "#produkte"],
              ["Gratis Freebie", "#freebie"],
              ["Erfahrungen", "#testimonials"],
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
              Erstgespräch anfragen
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-[64px] relative">
        {/* Gradient canvas behind blended photo */}
        <div
          className="relative h-[78vh] min-h-[520px] overflow-hidden"
          style={{ background: "linear-gradient(160deg, #fce4ec 0%, #fde8d8 55%, #fff3e0 100%)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=800&h=1100&fit=crop&auto=format"
            alt="Frau in der Natur — ruhig, frei, mutig"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="relative z-10 -mt-32 px-6 pb-16 text-center max-w-lg mx-auto">
          {/* Logo repeated inline as brand mark */}
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
          <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-9 max-w-[280px] mx-auto">
            Spirituelles und emotionales Coaching für Frauen, Mütter und Kinder — liebevoll, tief und von Herzen.
          </p>
          <div className="flex flex-col items-center gap-3">
            <button
              className="text-white px-10 py-[1.05rem] rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity w-full max-w-xs shadow-md"
              style={{ background: BRAND_GRADIENT }}
            >
              Jetzt entdecken
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              Gratis Freebie holen <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ZITAT ── */}
      <div className="px-6 py-10 text-center" style={{ background: BRAND_GRADIENT_SOFT }}>
        <div className="max-w-lg mx-auto">
          <Sparkles size={16} className="mx-auto mb-4" style={{ color: "#E01F5A", opacity: 0.5 }} />
          <p
            style={{ ...displayFont, color: "var(--foreground)" }}
            className="text-[1.3rem] font-light italic leading-relaxed"
          >
            „Angst beginnt im Kopf — MUT auch."
          </p>
          <p className="text-xs text-muted-foreground mt-3 tracking-widest uppercase">— Sabrina Wenzl</p>
        </div>
      </div>

      {/* ── DREI THEMENWELTEN ── */}
      <section id="themenwelten" className="px-6 py-16 bg-background">
        <div className="max-w-lg mx-auto">
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] p-7 border"
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
            Digitale Produkte, Programme & persönliche Begleitung.
          </p>

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

          {/* Product cards */}
          <div className="flex flex-col gap-4">
            {products.map((p) => (
              <div
                key={p.title}
                className="rounded-[1.5rem] p-6 border bg-card relative overflow-hidden"
                style={{ borderColor: "rgba(224,31,90,0.13)" }}
              >
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
                    Mehr erfahren
                  </button>
                </div>
              </div>
            ))}
          </div>

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
          {/* Real Sabrina photo with brand gradient overlay */}
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
                { num: "∞", label: "Herzlichkeit" },
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
            <div className="space-y-2.5">
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
          </div>

          <button
            className="w-full text-white py-4 rounded-full text-sm tracking-wide flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity shadow-md"
            style={{ background: BRAND_GRADIENT }}
          >
            <Download size={15} />
            Jetzt gratis herunterladen
          </button>
          <p className="text-xs text-muted-foreground mt-3">Kein Spam. Nur Mut & Liebe. 🌸</p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="px-6 py-16 bg-background">
        <div className="max-w-lg mx-auto">
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

          <div className="flex flex-col gap-5">
            {[
              {
                name: "Maria K.",
                role: "Mutter von 2 Kindern",
                text: "Durch Sabrina habe ich mich selbst wieder gefunden. Die Begleitung war so einfühlsam und liebevoll — ich kann sie von ganzem Herzen empfehlen.",
                tag: "Human Design Reading",
                bg: "linear-gradient(135deg, #fce4ec 0%, #fde8d8 100%)",
              },
              {
                name: "Lisa M.",
                role: "Unternehmerin & Mama",
                text: "Das Vision Book hat mein Leben verändert. Endlich weiß ich wieder, wer ich bin und was ich wirklich will. Danke, Sabrina.",
                tag: "Vision Book",
                bg: "linear-gradient(135deg, #fde8d8 0%, #fff3e0 100%)",
              },
              {
                name: "Daniela R.",
                role: "Frau im Wandel",
                text: "Die Emotionale Heilungs-Begleitung hat mir geholfen, Muster loszulassen, die mich jahrelang blockiert haben. Tief, echt und transformativ.",
                tag: "Intensiv-Begleitung",
                bg: "linear-gradient(135deg, #fce4ec 0%, #fff3e0 100%)",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-[1.5rem] p-7 border"
                style={{ background: t.bg, borderColor: "rgba(224,31,90,0.13)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} style={{ fill: "#E01F5A", color: "#E01F5A" }} />
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
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="px-6 py-16 text-center" style={{ background: BRAND_GRADIENT }}>
        <div className="max-w-lg mx-auto">
          <div className="w-12 h-[1px] bg-white/30 mx-auto mb-8" />
          <h2 style={displayFont} className="text-[2rem] font-light text-white mb-4 leading-snug">
            Bereit für<br />
            <em className="italic opacity-90">deinen Mut?</em>
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-9 max-w-xs mx-auto">
            Ich freue mich darauf, dich auf deiner Reise zu begleiten — mit ganzer Herzlichkeit und tiefer Präsenz.
          </p>
          <button className="bg-white px-10 py-[1.05rem] rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity shadow-sm font-medium" style={{ color: "#E01F5A" }}>
            Erstgespräch anfragen
          </button>
          <p className="text-white/40 text-xs mt-5">Kostenlos & unverbindlich</p>
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
            Spirituelles & emotionales Coaching für Frauen, Mütter und Kinder.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10">
            {[
              ["Über mich", "#sabrina"],
              ["Themenwelten", "#themenwelten"],
              ["Angebote", "#produkte"],
              ["Freebie", "#freebie"],
              ["Impressum", "#"],
              ["Datenschutz", "#"],
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
            <p className="text-background/25 text-xs">© 2024 MUTSeeLe by Sabrina Wenzl</p>
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
