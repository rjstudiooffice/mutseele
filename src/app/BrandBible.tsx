import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSabrina from "@/imports/mutseele.png";
import sabrinavPhoto from "@/imports/Sabrina.png";

// ─── Design tokens ────────────────────────────────────────────────────────────
const G  = "linear-gradient(135deg, #E01F5A 0%, #F47820 100%)";
const GS = "linear-gradient(135deg, #fce4ec 0%, #fde8d8 100%)";
const D  = { fontFamily: "var(--font-display)" };
const B  = { fontFamily: "var(--font-body)" };
const CREAM = "#FDF7F4";
const DEEP  = "#2D1A22";

const GT: React.CSSProperties = {
  background: G,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

// ─── Sections index (for nav + IntersectionObserver) ─────────────────────────
const SECTIONS = [
  { id: "bb-cover", label: "Cover"           },
  { id: "bb-01",    label: "Markenidentität" },
  { id: "bb-02",    label: "Geschichte"      },
  { id: "bb-03",    label: "Mission"         },
  { id: "bb-04",    label: "Zielgruppen"     },
  { id: "bb-05",    label: "Markenwerte"     },
  { id: "bb-06",    label: "Tonalität"       },
  { id: "bb-07",    label: "Farben"          },
  { id: "bb-08",    label: "Typografie"      },
  { id: "bb-09",    label: "Logo"            },
  { id: "bb-10",    label: "Bildsprache"     },
  { id: "bb-11",    label: "UI-System"       },
  { id: "bb-12",    label: "Produktwelten"   },
];

// ─── Shared components ────────────────────────────────────────────────────────

function ChapterLabel({
  num, label, light = false,
}: {
  num: string; label: string; light?: boolean;
}) {
  const c = light ? "rgba(255,255,255,0.4)" : "#E01F5A";
  const lc = light ? "rgba(255,255,255,0.12)" : "rgba(224,31,90,0.18)";
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[10px] tracking-[0.45em] uppercase font-bold" style={{ ...B, color: c }}>{num}</span>
      <div className="flex-1 h-px" style={{ background: lc }} />
      <span className="text-[10px] tracking-[0.3em] uppercase" style={{ ...B, color: light ? "rgba(255,255,255,0.3)" : "var(--muted-foreground)" }}>{label}</span>
    </div>
  );
}

function BigBg({ n }: { n: string }) {
  return (
    <span
      aria-hidden
      className="absolute -top-4 right-6 select-none pointer-events-none leading-none"
      style={{ ...D, fontSize: "clamp(120px, 18vw, 240px)", fontWeight: 300, ...GT, opacity: 0.055 }}
    >
      {n}
    </span>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setW(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: "rgba(224,31,90,0.08)" }}>
      <div className="h-full" style={{ width: `${w}%`, background: G, transition: "width 60ms linear" }} />
    </div>
  );
}

// ─── Dot navigation ───────────────────────────────────────────────────────────

function DotNav({ active }: { active: string }) {
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="fixed right-7 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3.5">
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scroll(s.id)}
            className="group flex items-center justify-end gap-3"
            title={s.label}
          >
            <span
              className="text-[9px] tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ ...B, color: "var(--muted-foreground)" }}
            >
              {s.label}
            </span>
            <span
              className="block rounded-full transition-all duration-300 flex-shrink-0"
              style={
                on
                  ? { width: 8, height: 8, background: G, transform: "scale(1.4)" }
                  : { width: 8, height: 8, background: "transparent", border: "1.5px solid #9C6E72", opacity: 0.45 }
              }
            />
          </button>
        );
      })}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COVER
// ═══════════════════════════════════════════════════════════════════════════════

function Cover() {
  return (
    <section
      id="bb-cover"
      className="relative min-h-screen flex flex-col justify-between px-10 py-10 overflow-hidden"
      style={{ background: G }}
    >
      {/* Radial orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{
          width: "65vw", height: "65vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%)",
          top: "-25%", right: "-15%",
        }} />
        <div className="absolute rounded-full" style={{
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 65%)",
          bottom: "5%", left: "-8%",
        }} />
        <div className="absolute rounded-full" style={{
          width: "28vw", height: "28vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.11) 0%, transparent 65%)",
          top: "40%", left: "20%",
        }} />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center">
        <ImageWithFallback
          src={logoSabrina}
          alt="MUTSeeLe"
          className="h-11 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)", opacity: 0.88 }}
        />
        <span className="text-white/35 text-[10px] tracking-[0.4em] uppercase" style={B}>Vertraulich</span>
      </div>

      {/* Headline */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-white/35 text-[10px] tracking-[0.55em] uppercase mb-10" style={B}>
          Markenidentität &amp; Design-System
        </p>
        <h1 style={D} className="leading-[0.95] text-white">
          <span className="block font-light" style={{ fontSize: "clamp(4.5rem,13vw,9.5rem)" }}>Brand</span>
          <span className="block font-light italic opacity-85" style={{ fontSize: "clamp(4.5rem,13vw,9.5rem)" }}>Bible</span>
        </h1>
        <div className="w-14 h-px bg-white/25 my-9" />
        <p className="text-white/55 text-sm tracking-[0.18em]" style={B}>MUTSeeLe by Sabrina Wenzl</p>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex justify-between items-end">
        <p className="text-white/28 text-[11px]" style={B}>Version 1.0 — 2025</p>
        <div className="flex flex-col items-center gap-2 opacity-30">
          <p className="text-white text-[9px] tracking-[0.4em] uppercase" style={B}>Scroll</p>
          <div className="w-px h-9" style={{ background: "rgba(255,255,255,0.4)" }} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 01 MARKENIDENTITÄT
// ═══════════════════════════════════════════════════════════════════════════════

function Identitaet() {
  return (
    <section id="bb-01" className="relative py-28 overflow-hidden" style={{ background: "white" }}>
      <BigBg n="01" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="01" label="Markenidentität" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Die Seele der Marke
        </h2>

        {/* MUT / SEELE split */}
        <div
          className="grid grid-cols-2 mb-16 rounded-3xl overflow-hidden border"
          style={{ borderColor: "rgba(224,31,90,0.1)" }}
        >
          <div className="p-10" style={{ background: CREAM }}>
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-6" style={B}>Der erste Teil</p>
            <p style={{ ...D, fontSize: "clamp(3.5rem,8vw,6rem)", fontWeight: 300, lineHeight: 1, ...GT }}>
              MUT
            </p>
            <p className="text-sm text-muted-foreground mt-5 leading-relaxed max-w-52" style={B}>
              Den ersten Schritt wagen, auch wenn die Angst noch da ist. Mut als aktive Entscheidung.
            </p>
          </div>
          <div className="p-10 border-l" style={{ background: CREAM, borderColor: "rgba(224,31,90,0.1)" }}>
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-6" style={B}>Der zweite Teil</p>
            <p style={{ ...D, fontSize: "clamp(3.5rem,8vw,6rem)", fontWeight: 300, lineHeight: 1, color: DEEP, opacity: 0.55 }}>
              SEELE
            </p>
            <p className="text-sm text-muted-foreground mt-5 leading-relaxed max-w-52" style={B}>
              Von innen heraus arbeiten. Tiefe, ehrliche, transformative Veränderung.
            </p>
          </div>
        </div>

        {/* Claim */}
        <div className="py-12 border-y mb-16" style={{ borderColor: "rgba(224,31,90,0.1)" }}>
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-7" style={B}>Markenclaim</p>
          <blockquote
            style={{ ...D, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, lineHeight: 1.15 }}
            className="text-foreground"
          >
            „Angst beginnt im Kopf —{" "}
            <em className="italic" style={GT}>MUT auch.</em>"
          </blockquote>
          <p className="text-xs text-muted-foreground mt-6 tracking-widest uppercase" style={B}>— Sabrina Wenzl</p>
        </div>

        {/* Essence */}
        <div>
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-7" style={B}>Markenessenz</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { word: "Mutig",       icon: "💪", desc: "Transformation braucht Mut — den wir gemeinsam finden." },
              { word: "Tief",        icon: "🌊", desc: "Keine Oberfläche. Echte, ganzheitliche Seelenarbeit." },
              { word: "Warm",        icon: "💛", desc: "Liebe als Fundament jeder Begegnung." },
            ].map((e) => (
              <div key={e.word} className="rounded-2xl p-7 border" style={{ background: GS, borderColor: "rgba(224,31,90,0.12)" }}>
                <span className="text-3xl block mb-4">{e.icon}</span>
                <p style={{ ...D, ...GT }} className="text-[1.35rem] font-light mb-2">{e.word}</p>
                <p className="text-xs text-muted-foreground leading-relaxed" style={B}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 02 GESCHICHTE
// ═══════════════════════════════════════════════════════════════════════════════

function Geschichte() {
  return (
    <section id="bb-02" className="relative py-28 overflow-hidden" style={{ background: CREAM }}>
      <BigBg n="02" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="02" label="Geschichte & Person" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Wer steht hinter MUTSeeLe?
        </h2>

        <div className="grid grid-cols-[1fr_260px] gap-12 items-start mb-14">
          <div>
            <p className="text-sm text-muted-foreground leading-[1.95] mb-5" style={B}>
              Sabrina Wenzl ist Mutter, Frau und Gründerin von MUTSeeLe. Sie kennt das Gefühl, sich selbst zu verlieren — in Rollen, Erwartungen und dem Lärm des Alltags. In der Stille nach dem Sturm hat sie ihren eigenen Weg zurück zu sich gefunden — durch Energie, Seele und tiefes Vertrauen.
            </p>
            <p className="text-sm text-muted-foreground leading-[1.95]" style={B}>
              Heute begleitet sie Frauen, Mütter und Kinder dabei, sich selbst zu vertrauen, ihre Gefühle zu verstehen und in ihrer vollen Kraft zu leben — authentisch, warm und ohne Masken.
            </p>
            <div className="mt-10 pt-8 border-t" style={{ borderColor: "rgba(224,31,90,0.1)" }}>
              <blockquote style={{ ...D, fontStyle: "italic", fontWeight: 300 }} className="text-[1.3rem] text-foreground/75 leading-snug">
                „Ich habe meinen Weg zurück zu mir gefunden — jetzt begleite ich andere auf ihrem."
              </blockquote>
            </div>
          </div>

          <div
            className="rounded-3xl overflow-hidden"
            style={{ height: 360, background: GS }}
          >
            <ImageWithFallback
              src={sabrinavPhoto}
              alt="Sabrina Wenzl"
              className="w-full h-full object-cover object-top"
              style={{ mixBlendMode: "multiply", opacity: 0.88 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { num: "300+", label: "Frauen & Kinder begleitet" },
            { num: "5 J.",  label: "Erfahrung in Coaching & Energie" },
            { num: "∞",     label: "Herzlichkeit in jeder Begegnung" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-8 text-center border bg-white" style={{ borderColor: "rgba(224,31,90,0.12)" }}>
              <p style={{ ...D, ...GT }} className="text-[2.5rem] font-light mb-2 leading-none">{s.num}</p>
              <p className="text-xs text-muted-foreground leading-snug" style={B}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 03 MISSION & VISION
// ═══════════════════════════════════════════════════════════════════════════════

function MissionVision() {
  return (
    <section id="bb-03" className="relative py-28 overflow-hidden" style={{ background: "white" }}>
      <BigBg n="03" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="03" label="Mission & Vision" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Wozu &amp; wohin?
        </h2>

        <div className="space-y-5">
          {/* Mission — gradient card */}
          <div className="rounded-3xl p-10 relative overflow-hidden" style={{ background: G }}>
            <div aria-hidden className="absolute right-0 top-0 bottom-0 w-72 pointer-events-none"
              style={{ background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)" }} />
            <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-white/50 mb-6" style={B}>Mission</p>
            <p style={{ ...D, fontWeight: 300 }} className="text-[1.6rem] text-white leading-snug mb-5">
              Menschen helfen, zu sich selbst zu finden —<br />mutig, tief und von Herzen.
            </p>
            <p className="text-white/58 text-sm leading-[1.9]" style={B}>
              MUTSeeLe schafft einen sicheren Raum, in dem Frauen, Mütter und Kinder ihre innere Stärke entdecken. Durch emotionale Intelligenz, spirituelle Werkzeuge und liebevolle Begleitung entstehen echte, nachhaltige Transformationen.
            </p>
          </div>

          {/* Vision — cream card */}
          <div className="rounded-3xl p-10 border" style={{ background: CREAM, borderColor: "rgba(244,120,32,0.22)" }}>
            <p className="text-[9px] tracking-[0.4em] uppercase font-bold mb-6" style={{ ...B, color: "#F47820" }}>Vision</p>
            <p style={{ ...D, fontWeight: 300, color: DEEP }} className="text-[1.6rem] leading-snug mb-5">
              Eine Welt, in der jeder Mensch den Mut hat, er selbst zu sein.
            </p>
            <p className="text-muted-foreground text-sm leading-[1.9]" style={B}>
              MUTSeeLe wird die erste Adresse für ganzheitliches, spirituell-emotionales Coaching im deutschsprachigen Raum — bekannt für Tiefe, Wärme und echte Verwandlung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 04 ZIELGRUPPEN
// ═══════════════════════════════════════════════════════════════════════════════

function Zielgruppen() {
  const p = [
    {
      emoji: "🌿", title: "Die Mutter",       sub: "Mama mit sensiblem Kind · 30–45 J.",
      pain:  "Fühlt sich hilflos, wenn ihr Kind Angst vor Schule oder Leistungsdruck hat.",
      want:  "Sanfte, liebevolle Begleitung für ihr Kind — und für sich selbst als Mutter.",
      tone:  "Einfühlsam, lösungsorientiert, nicht belehrend.",
      bg: "linear-gradient(135deg,#fce4ec 0%,#fde8d8 100%)", bc: "rgba(224,31,90,0.15)",
    },
    {
      emoji: "🌸", title: "Die Frau im Wandel", sub: "Suchende, Erschöpfte · 28–50 J.",
      pain:  "Hat lange für andere funktioniert und sich selbst dabei verloren.",
      want:  "Sich selbst wiederentdecken. Alte Muster loslassen. In ihrer Kraft ankommen.",
      tone:  "Einladend, poetisch, ermutigend — kein Druck.",
      bg: "linear-gradient(135deg,#fde8d8 0%,#fce4ec 100%)", bc: "rgba(224,31,90,0.15)",
    },
    {
      emoji: "✨", title: "Die Suchende",      sub: "Spirituell Interessierte · 25–45 J.",
      pain:  "Spürt, dass es mehr gibt — zwischen Alltag und Tiefe.",
      want:  "Fundierte, ehrliche spirituelle Begleitung ohne Esoterik-Kitsch.",
      tone:  "Respektvoll, kompetent, geerdet und trotzdem magisch.",
      bg: "linear-gradient(135deg,#fff3e0 0%,#fde8d8 100%)", bc: "rgba(244,120,32,0.2)",
    },
  ];

  return (
    <section id="bb-04" className="relative py-28 overflow-hidden" style={{ background: CREAM }}>
      <BigBg n="04" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="04" label="Zielgruppen" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Für wen ist MUTSeeLe?
        </h2>

        <div className="space-y-5">
          {p.map((x) => (
            <div key={x.title} className="rounded-3xl p-9 border" style={{ background: x.bg, borderColor: x.bc }}>
              <div className="grid grid-cols-[auto_1fr] gap-7 items-start">
                <span className="text-[2.5rem] leading-none pt-1">{x.emoji}</span>
                <div>
                  <h3 style={D} className="text-[1.25rem] font-medium text-foreground mb-1">{x.title}</h3>
                  <p className="text-xs text-muted-foreground mb-6" style={B}>{x.sub}</p>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: "#E01F5A" }}>Schmerzpunkt</p>
                      <p className="text-sm text-foreground/70 leading-relaxed" style={B}>{x.pain}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: "#F47820" }}>Wunsch</p>
                      <p className="text-sm text-foreground/70 leading-relaxed" style={B}>{x.want}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-2 text-muted-foreground">Ansprache</p>
                      <p className="text-sm text-foreground/70 leading-relaxed italic" style={B}>{x.tone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 05 MARKENWERTE  (dark section — visual contrast moment)
// ═══════════════════════════════════════════════════════════════════════════════

function Markenwerte() {
  const values = [
    { emoji: "💪", title: "Mut",          desc: "Mut als aktive Entscheidung. Nicht das Fehlen von Angst — sondern der erste Schritt trotzdem." },
    { emoji: "🕊️", title: "Seele",        desc: "Von innen heraus arbeiten. Echte Transformation entsteht tief, nicht an der Oberfläche." },
    { emoji: "💛", title: "Liebe",         desc: "Warmherzigkeit als Fundament. Kein Coaching ohne echtes Mitgefühl und Herzlichkeit." },
    { emoji: "🌊", title: "Leichtigkeit", desc: "Wandel darf sich leicht anfühlen. Sabrina glaubt: Leichtigkeit ist keine Schwäche." },
    { emoji: "🌳", title: "Vertrauen",    desc: "Geborgenheit schaffen. Frauen und Kinder sollen sich gesehen und sicher fühlen." },
    { emoji: "🔮", title: "Tiefe",         desc: "Ganzheitlich statt oberflächlich. Emotion, Spiritualität und Energie als Einheit." },
  ];

  return (
    <section id="bb-05" className="relative py-28 overflow-hidden" style={{ background: DEEP }}>
      {/* Faint big number, light-on-dark */}
      <span aria-hidden className="absolute -top-4 right-6 select-none pointer-events-none leading-none"
        style={{ ...D, fontSize: "clamp(120px,18vw,240px)", fontWeight: 300, color: "rgba(255,255,255,0.04)" }}>
        05
      </span>

      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="05" label="Markenwerte" light />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1, color: "white" }} className="mb-14">
          Unsere{" "}
          <em className="italic" style={GT}>sechs</em>{" "}
          Kernwerte
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl p-7 border"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span className="text-3xl block mb-5">{v.emoji}</span>
              <p style={{ ...D, ...GT }} className="text-[1.15rem] font-light mb-2">{v.title}</p>
              <p className="text-sm leading-relaxed" style={{ ...B, color: "rgba(255,255,255,0.45)" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 06 TONALITÄT
// ═══════════════════════════════════════════════════════════════════════════════

function Tonalitaet() {
  const pairs = [
    { yes: "Warm",       no: "Kalt"        },
    { yes: "Einladend",  no: "Drängend"    },
    { yes: "Poetisch",   no: "Technisch"   },
    { yes: "Ehrlich",    no: "Aufgesetzt"  },
    { yes: "Mutig",      no: "Ängstlich"   },
    { yes: "Tief",       no: "Oberflächlich" },
  ];
  const rows = [
    { yes: '„Du darfst dich zeigen."',              no: '„Sie sollten jetzt handeln."'         },
    { yes: '„Dein Mut beginnt hier."',              no: '„Nur noch 2 Plätze! Jetzt kaufen!"'   },
    { yes: '„Ich bin für dich da."',                no: '„Ich coache Sie professionell."'       },
    { yes: '„Angst ist nur eine Einladung."',       no: '„Überwinden Sie Ihre Schwächen."'      },
    { yes: '„Deine Seele kennt den Weg."',          no: '„Unsere Methoden sind belegt."'        },
  ];

  return (
    <section id="bb-06" className="relative py-28 overflow-hidden" style={{ background: "white" }}>
      <BigBg n="06" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="06" label="Tonalität & Sprache" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Wie MUTSeeLe spricht
        </h2>

        {/* Voice pairs */}
        <div className="grid grid-cols-3 gap-3 mb-14">
          {pairs.map(({ yes, no }) => (
            <div key={yes} className="rounded-xl px-5 py-4 border" style={{ background: GS, borderColor: "rgba(224,31,90,0.12)" }}>
              <p style={{ ...D, ...GT }} className="text-[1.05rem] font-light">{yes}</p>
              <p className="text-xs text-muted-foreground mt-0.5" style={B}>statt {no}</p>
            </div>
          ))}
        </div>

        {/* Do / Don't */}
        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-5" style={B}>Sprache — Beispiele</p>
        <div className="rounded-2xl overflow-hidden border mb-12" style={{ borderColor: "rgba(224,31,90,0.1)" }}>
          <div className="grid grid-cols-2">
            <div className="px-7 py-4" style={{ background: "rgba(224,31,90,0.05)" }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: "#E01F5A" }}>So klingt MUTSeeLe ✓</p>
            </div>
            <div className="px-7 py-4" style={{ background: "rgba(0,0,0,0.02)" }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-muted-foreground">So klingt es nicht ✗</p>
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-2 border-t" style={{ borderColor: "rgba(224,31,90,0.07)" }}>
              <div className="px-7 py-5 border-r" style={{ borderColor: "rgba(224,31,90,0.07)" }}>
                <p className="text-sm text-foreground/80 italic leading-relaxed" style={D}>{r.yes}</p>
              </div>
              <div className="px-7 py-5">
                <p className="text-sm text-muted-foreground/45 leading-relaxed line-through" style={B}>{r.no}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { rule: "Du-Anrede",         detail: "Immer per Du — persönlich, warm, auf Augenhöhe." },
            { rule: "Kurze Sätze",       detail: "Lieber zwei kurze als ein langer. Atemrhythmus beachten." },
            { rule: "Emotionale Bilder", detail: "Metaphern aus Natur, Körper, Reise und Licht." },
            { rule: "Keine Fachbegriffe", detail: "Human Design erklären, nicht voraussetzen." },
          ].map((r) => (
            <div key={r.rule} className="flex gap-5 rounded-xl px-6 py-5 border" style={{ background: CREAM, borderColor: "rgba(224,31,90,0.1)" }}>
              <p className="text-sm font-medium text-foreground w-32 flex-shrink-0" style={B}>{r.rule}</p>
              <p className="text-sm text-muted-foreground leading-relaxed" style={B}>{r.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 07 FARBEN
// ═══════════════════════════════════════════════════════════════════════════════

function Farben() {
  const palette = [
    { name: "Brand Magenta", hex: "#E01F5A", role: "Primärfarbe · CTAs · Akzente",    light: false },
    { name: "Brand Orange",  hex: "#F47820", role: "Gradient-Ende · Highlights",       light: false },
    { name: "Cream White",   hex: "#FDF7F4", role: "Seitenhintergrund",                light: true  },
    { name: "Deep Plum",     hex: "#2D1A22", role: "Primärer Text · Footer",           light: false },
    { name: "Card Cream",    hex: "#FFF3EF", role: "Kartenhintergrund",                light: true  },
    { name: "Peach Mist",    hex: "#FDE8E0", role: "Sekundäre Flächen",               light: true  },
    { name: "Rose Muted",    hex: "#F5E8E2", role: "Subdued Flächen",                 light: true  },
    { name: "Dusty Rose",    hex: "#9C6E72", role: "Muted Text · Labels",             light: false },
  ];

  return (
    <section id="bb-07" className="relative py-28 overflow-hidden" style={{ background: CREAM }}>
      <BigBg n="07" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="07" label="Farbpalette" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Farbe als Emotion
        </h2>

        {/* Brand gradient — full width swatch */}
        <div className="mb-4">
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-4" style={B}>Brand-Gradient</p>
          <div className="rounded-2xl h-32 flex items-end p-6" style={{ background: G }}>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-white/60 text-xs" style={B}>
              <span className="font-mono">#E01F5A → #F47820</span>
              <span>·</span>
              <span>135°</span>
              <span>·</span>
              <span>Buttons, CTAs, Texthighlights, CTA-Bänder</span>
            </div>
          </div>
        </div>

        {/* Soft gradient */}
        <div className="mb-12">
          <div className="rounded-2xl h-20 flex items-end p-5 border" style={{ background: GS, borderColor: "rgba(224,31,90,0.1)" }}>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-muted-foreground text-xs" style={B}>
              <span className="font-mono">#fce4ec → #fde8d8</span>
              <span>·</span>
              <span>Karten, Sektionen, Soft-Backgrounds</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-5" style={B}>Farbpalette</p>
        <div className="grid grid-cols-4 gap-3">
          {palette.map((c) => (
            <div key={c.name} className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(224,31,90,0.08)" }}>
              <div className="h-20 w-full flex items-end p-3" style={{ background: c.hex }}>
                <span className="font-mono text-[10px]" style={{ color: c.light ? "rgba(45,26,34,0.45)" : "rgba(255,255,255,0.55)" }}>{c.hex}</span>
              </div>
              <div className="px-3 py-3 bg-white">
                <p className="text-xs font-medium text-foreground leading-none mb-1" style={B}>{c.name}</p>
                <p className="text-[10px] text-muted-foreground leading-snug" style={B}>{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 08 TYPOGRAFIE
// ═══════════════════════════════════════════════════════════════════════════════

function Typografie() {
  return (
    <section id="bb-08" className="relative py-28 overflow-hidden" style={{ background: "white" }}>
      <BigBg n="08" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="08" label="Typografie" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Schrift als Seelenspiegel
        </h2>

        {/* Fraunces hero */}
        <div className="mb-14">
          <div className="flex items-baseline justify-between mb-5">
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium" style={B}>Display-Schrift</p>
            <p className="text-xs text-muted-foreground" style={B}>Fraunces · Variable Optical Serif</p>
          </div>
          <div className="rounded-3xl overflow-hidden border" style={{ borderColor: "rgba(224,31,90,0.1)" }}>
            {/* Specimen */}
            <div className="p-10" style={{ background: CREAM }}>
              <p style={{ ...D, fontWeight: 300, lineHeight: 1, ...GT, fontSize: "clamp(5rem,13vw,9.5rem)" }}>
                Mut.
              </p>
              <p style={{ ...D, fontWeight: 300, fontStyle: "italic", lineHeight: 1.1, color: DEEP, opacity: 0.28, fontSize: "clamp(3rem,7vw,5.5rem)", marginTop: "0.1em" }}>
                Seele.
              </p>
            </div>
            {/* Weight row */}
            <div className="grid grid-cols-3 divide-x" style={{ borderTop: "1px solid rgba(224,31,90,0.08)", borderColor: "rgba(224,31,90,0.08)" }}>
              {[
                { label: "Light 300",      sample: "Ich bin für dich da.",    extra: {} },
                { label: "Light 300 Italic", sample: "Dein Mut beginnt hier.", extra: { fontStyle: "italic" as const } },
                { label: "Medium 500",     sample: "Kinder & Lernen",         extra: { fontWeight: 500 } },
              ].map((s) => (
                <div key={s.label} className="px-7 py-6">
                  <p className="text-[9px] text-muted-foreground tracking-widest uppercase mb-2" style={B}>{s.label}</p>
                  <p style={{ ...D, ...s.extra }} className="text-base text-foreground">{s.sample}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3" style={B}>Einsatz: H1–H3, Zitate, Produktnamen, emotionale Momente.</p>
        </div>

        {/* DM Sans */}
        <div className="mb-14">
          <div className="flex items-baseline justify-between mb-5">
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium" style={B}>Body-Schrift</p>
            <p className="text-xs text-muted-foreground" style={B}>DM Sans · Variable Humanist Sans-Serif</p>
          </div>
          <div className="rounded-3xl overflow-hidden border" style={{ borderColor: "rgba(224,31,90,0.1)" }}>
            <div className="p-10 bg-white">
              <p style={B} className="text-[1.1rem] text-foreground/75 leading-[1.95]">
                Spirituelles und emotionales Coaching für Frauen, Mütter und Kinder — liebevoll, tief und von Herzen. Ich begleite dich auf deinem Weg zurück zu dir selbst.
              </p>
            </div>
            <div className="grid grid-cols-3 divide-x" style={{ borderTop: "1px solid rgba(224,31,90,0.08)" }}>
              {[
                { label: "Light 300",   s: "Fließtext, Beschreibungen"  },
                { label: "Regular 400", s: "Navigation, UI-Labels"       },
                { label: "Medium 500",  s: "Buttons, Tags, Preise"       },
              ].map((s) => (
                <div key={s.label} className="px-7 py-6" style={{ background: CREAM }}>
                  <p className="text-[9px] text-muted-foreground tracking-widest uppercase mb-2" style={B}>{s.label}</p>
                  <p style={B} className="text-sm text-foreground">{s.s}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3" style={B}>Einsatz: Fließtexte, Labels, Navigation, Buttons, Tags, Footer.</p>
        </div>

        {/* Type scale */}
        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-5" style={B}>Typografische Hierarchie</p>
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(224,31,90,0.1)" }}>
          {[
            { size: "2.8rem",   label: "Hero H1",   sample: "MUT auch.",                                       font: D, extra: { fontWeight: 300 } },
            { size: "2rem",     label: "Section H2", sample: "Wo darf ich dich begleiten?",                    font: D, extra: { fontWeight: 300 } },
            { size: "1.3rem",   label: "Card H3",    sample: "Kinder & Lernen",                                font: D, extra: { fontWeight: 500 } },
            { size: "1rem",     label: "Body",       sample: "Heute begleite ich Frauen, Mütter und Kinder.",  font: B, extra: {} },
            { size: "0.875rem", label: "Small",      sample: "Ein sanftes Begleit-Workbook für sensible Kinder.", font: B, extra: {} },
            { size: "0.625rem", label: "Label",      sample: "MEINE THEMENWELTEN",                             font: B, extra: { letterSpacing: "0.3em", textTransform: "uppercase" as const } },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex items-baseline gap-8 px-7 py-5 border-b last:border-b-0"
              style={{ borderColor: "rgba(224,31,90,0.07)", background: i % 2 === 0 ? "white" : CREAM }}
            >
              <div className="w-28 flex-shrink-0">
                <p className="text-[9px] text-muted-foreground tracking-wide uppercase" style={B}>{s.label}</p>
                <p className="font-mono text-[9px] text-muted-foreground/55">{s.size}</p>
              </div>
              <p style={{ ...s.font, ...s.extra, fontSize: s.size }} className="text-foreground/80">{s.sample}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 09 LOGO
// ═══════════════════════════════════════════════════════════════════════════════

function Logo() {
  return (
    <section id="bb-09" className="relative py-28 overflow-hidden" style={{ background: CREAM }}>
      <BigBg n="09" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="09" label="Logo" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          MUTSeeLe — der visuelle Kern
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {[
            { bg: "white",  border: "rgba(224,31,90,0.12)", label: "Auf hellem Grund",     invert: false },
            { bg: DEEP,     border: "none",                  label: "Auf dunklem Grund",    invert: true  },
            { bg: G,        border: "none",                  label: "Auf Brand-Gradient",   invert: true  },
            { bg: GS,       border: "rgba(224,31,90,0.12)", label: "Auf Soft-Gradient",    invert: false },
          ].map((v) => (
            <div key={v.label}>
              <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-3" style={B}>{v.label}</p>
              <div
                className="rounded-2xl flex items-center justify-center p-10 border"
                style={{ background: v.bg, borderColor: v.border, minHeight: 130 }}
              >
                <ImageWithFallback
                  src={logoSabrina}
                  alt="MUTSeeLe"
                  className="h-14 w-auto object-contain"
                  style={v.invert ? { filter: "brightness(0) invert(1)", opacity: 0.88 } : {}}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-5" style={B}>Logo-Regeln</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { ok: true,  rule: "Ausreichend Freiraum rund um das Logo (mind. Logohöhe × 0.5)" },
            { ok: true,  rule: "Original-Proportionen stets beibehalten" },
            { ok: true,  rule: "Auf kontrastreichem, ruhigem Hintergrund platzieren" },
            { ok: false, rule: "Nicht verzerren, drehen oder strecken" },
            { ok: false, rule: "Keine Schatten, Verläufe oder eigene Effekte ergänzen" },
            { ok: false, rule: "Nicht auf unruhigen Fotos oder Mustern platzieren" },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl px-5 py-4 border"
              style={{
                background: r.ok ? "rgba(224,31,90,0.04)" : "rgba(0,0,0,0.02)",
                borderColor: r.ok ? "rgba(224,31,90,0.1)" : "rgba(0,0,0,0.07)",
              }}
            >
              <span className="text-xs mt-0.5 flex-shrink-0 font-semibold" style={{ color: r.ok ? "#E01F5A" : "#9C6E72" }}>
                {r.ok ? "✓" : "✗"}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed" style={B}>{r.rule}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 10 BILDSPRACHE
// ═══════════════════════════════════════════════════════════════════════════════

function Bildsprache() {
  const moods = [
    { title: "Licht & Wärme",    desc: "Goldene Stunden, weiches Morgenlicht. Bilder die sich anfühlen wie ein tiefer Atemzug.",    bg: "linear-gradient(135deg,#fde8d8 0%,#fff3e0 100%)" },
    { title: "Natur & Stille",   desc: "Wälder, Wasser, Erde. Die Natur als Spiegel der inneren Reise.",                           bg: "linear-gradient(135deg,#e8f5e9 0%,#fde8d8 100%)" },
    { title: "Weibliche Kraft",  desc: "Frauen präsent — nicht performend. Echte Emotionen, echte Momente.",                       bg: "linear-gradient(135deg,#fce4ec 0%,#fde8d8 100%)" },
    { title: "Kinderwelt",       desc: "Verspielt, leicht, warm. Kinder die spielen, lachen, lernen — echt und ungestellt.",       bg: "linear-gradient(135deg,#fff9c4 0%,#fde8d8 100%)" },
  ];
  const words = ["Natürliches Licht", "Warme Töne", "Sanfte Unschärfe", "Echte Momente", "Natur & Innenraum", "Keine gestellten Posen", "Emotionale Tiefe", "Goldene Stunde", "Authentizität", "Bewegung & Stille"];

  return (
    <section id="bb-10" className="relative py-28 overflow-hidden" style={{ background: "white" }}>
      <BigBg n="10" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="10" label="Bildsprache" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Was Bilder erzählen sollen
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-12">
          {moods.map((m) => (
            <div key={m.title} className="rounded-2xl p-8 border" style={{ background: m.bg, borderColor: "rgba(224,31,90,0.1)" }}>
              <h3 style={D} className="text-[1.1rem] font-medium text-foreground mb-3">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed" style={B}>{m.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-5" style={B}>Schlüsselwörter für die Bildauswahl</p>
        <div className="flex flex-wrap gap-2">
          {words.map((w) => (
            <span key={w} className="px-4 py-2 rounded-full text-sm border text-foreground/70" style={{ background: GS, borderColor: "rgba(224,31,90,0.15)" }}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 11 UI-SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

function UISystem() {
  return (
    <section id="bb-11" className="relative py-28 overflow-hidden" style={{ background: CREAM }}>
      <BigBg n="11" />
      <div className="max-w-4xl mx-auto px-10">
        <ChapterLabel num="11" label="UI-System" />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1 }} className="text-foreground mb-14">
          Interaktive Elemente
        </h2>

        {/* Buttons */}
        <div className="mb-12">
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-5" style={B}>Buttons</p>
          <div className="flex flex-wrap gap-8 items-end p-10 rounded-2xl bg-white border" style={{ borderColor: "rgba(224,31,90,0.1)" }}>
            {[
              { label: "Primary CTA",  el: <button className="text-white px-8 py-3 rounded-full text-sm tracking-wide" style={{ background: G }}>Jetzt entdecken</button> },
              { label: "Secondary",    el: <button className="px-8 py-3 rounded-full text-sm tracking-wide border" style={{ borderColor: "#E01F5A", color: "#E01F5A" }}>Mehr erfahren</button> },
              { label: "Ghost",        el: <button className="px-8 py-3 rounded-full text-sm tracking-wide border text-foreground/60" style={{ borderColor: "rgba(224,31,90,0.2)" }}>Alle Angebote</button> },
              { label: "Link Button",  el: <button className="text-sm font-medium" style={{ color: "#E01F5A" }}>Mehr lesen →</button> },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-3">
                {b.el}
                <span className="text-[9px] text-muted-foreground text-center" style={B}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-12">
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-5" style={B}>Tags & Badges</p>
          <div className="flex flex-wrap gap-3 items-center p-8 rounded-2xl bg-white border" style={{ borderColor: "rgba(224,31,90,0.1)" }}>
            {["Bestseller", "Neu", "Beliebt", "Empfohlen"].map((t) => (
              <span key={t} className="text-[9px] tracking-wide font-semibold px-3 py-1.5 rounded-full text-white" style={{ background: G }}>{t}</span>
            ))}
            {["Digitales Workbook", "1:1 Begleitung", "Kartenset (PDF)"].map((t) => (
              <span key={t} className="text-[9px] font-medium px-3 py-1.5 rounded-full border" style={{ background: "rgba(224,31,90,0.07)", color: "#E01F5A", borderColor: "rgba(224,31,90,0.2)" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Card example */}
        <div>
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-5" style={B}>Produkt-Karte</p>
          <div className="max-w-sm">
            <div className="rounded-[1.5rem] p-7 border bg-white relative overflow-hidden" style={{ borderColor: "rgba(224,31,90,0.13)" }}>
              <span className="absolute top-4 right-4 text-[9px] tracking-wide font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: G }}>Bestseller</span>
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl leading-none flex-shrink-0 mt-0.5">📖</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-1">Digitales Workbook</p>
                  <p className="text-sm leading-snug font-light italic" style={{ color: "#E01F5A" }}>Lernen fühlt sich leicht an.</p>
                </div>
              </div>
              <h4 style={D} className="text-[1.1rem] font-medium text-foreground mb-2">Lernen mit Leichtigkeit</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">Ein sanftes Begleit-Workbook für sensible Kinder.</p>
              <div className="flex items-center justify-between">
                <span style={D} className="text-[1.3rem] font-light">19 €</span>
                <button className="text-white px-5 py-2 rounded-full text-xs font-medium" style={{ background: G }}>Mehr erfahren</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 12 PRODUKTWELTEN  (gradient — second dramatic moment)
// ═══════════════════════════════════════════════════════════════════════════════

function Produktwelten() {
  const worlds = [
    {
      emoji: "🌿", title: "Kinder & Lernen",
      tagline: "Schule ohne Stress. Lernen mit Leichtigkeit.",
      products: ["Lernen mit Leichtigkeit · 19 €", "Lernkarten: Konzentration & Ruhe · 14 €", "Schulstart ohne Stress · 45 €", "Emotionale Stärke (1:1) · 145 €"],
      range: "14 € – 145 €",
    },
    {
      emoji: "🌸", title: "Frauen & Selbstfindung",
      tagline: "Zurück zu dir. In deiner weiblichen Kraft.",
      products: ["Vision Book · 22 €", "Seelenstark Workbook · 25 €", "Emotionale Heilung (4-Wochen) · 145 €", "Persönliche Selbstfindungs-Reise · 355 €"],
      range: "22 € – 355 €",
    },
    {
      emoji: "✨", title: "Spiritualität & Energie",
      tagline: "Deine Blaupause. Deine Zahlen. Deine Energie.",
      products: ["Human Design Reading · 145 €", "Geburtszahlen-Analyse · 45 €", "Spirituelles Kartenset · 14 €", "Premium-Begleitung 3 Monate · 555 €"],
      range: "14 € – 555 €",
    },
  ];

  return (
    <section id="bb-12" className="relative py-28 overflow-hidden" style={{ background: G }}>
      <div aria-hidden className="absolute top-0 right-0 w-[55vw] h-[55vw] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)" }} />

      <div className="max-w-4xl mx-auto px-10 relative z-10">
        <ChapterLabel num="12" label="Produktuniversen" light />

        <h2 style={{ ...D, fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1, color: "white" }} className="mb-14">
          <em className="italic">Drei Welten.</em> Ein Kern.
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {worlds.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl p-7 flex flex-col gap-5 border"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255,255,255,0.16)",
              }}
            >
              <div>
                <span className="text-3xl block mb-3">{w.emoji}</span>
                <h3 style={D} className="text-white text-[1rem] font-medium leading-snug mb-1">{w.title}</h3>
                <p className="text-white/45 text-xs italic" style={B}>{w.tagline}</p>
              </div>
              <div className="space-y-2 flex-1">
                {w.products.map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-[0.4rem] flex-shrink-0" style={{ background: "rgba(255,255,255,0.35)" }} />
                    <p className="text-xs text-white/55 leading-relaxed" style={B}>{p}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <p className="text-[9px] text-white/35 tracking-widest uppercase mb-1" style={B}>Preisspanne</p>
                <p style={D} className="text-white text-base font-light">{w.range}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// END
// ═══════════════════════════════════════════════════════════════════════════════

function End() {
  return (
    <section className="py-20 text-center" style={{ background: DEEP }}>
      <div className="max-w-4xl mx-auto px-10">
        <ImageWithFallback
          src={logoSabrina}
          alt="MUTSeeLe"
          className="h-11 w-auto object-contain mx-auto mb-6"
          style={{ filter: "brightness(0) invert(1)", opacity: 0.5 }}
        />
        <p className="text-white/22 text-xs mb-8" style={B}>
          Brand Bible · MUTSeeLe by Sabrina Wenzl · Version 1.0 · 2025
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 rounded-full text-xs tracking-widest uppercase border transition-opacity hover:opacity-60"
          style={{ color: "rgba(255,255,255,0.35)", borderColor: "rgba(255,255,255,0.12)" }}
        >
          ← Zur Landingpage
        </a>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BrandBible() {
  const [activeId, setActiveId] = useState("bb-cover");

  useEffect(() => {
    const obs = SECTIONS.map((s) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveId(s.id); },
        { threshold: 0.25 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="min-h-screen" style={B}>
      <ProgressBar />
      <DotNav active={activeId} />
      <Cover />
      <Identitaet />
      <Geschichte />
      <MissionVision />
      <Zielgruppen />
      <Markenwerte />
      <Tonalitaet />
      <Farben />
      <Typografie />
      <Logo />
      <Bildsprache />
      <UISystem />
      <Produktwelten />
      <End />
    </div>
  );
}
