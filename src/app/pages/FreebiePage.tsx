import { useState } from "react";
import { Download, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import type { LeadMagnet } from "@/content";
import { leadMagnets, getProduct } from "@/content";
import { D, G, GS, GT, FadeUp, useDocumentMeta } from "../shared/brand";
import { PageShell, Breadcrumb } from "../shared/Layout";

const AUDIENCE_LABEL: Record<LeadMagnet["audience"], string> = {
  eltern: "Für Eltern",
  frauen: "Für Frauen",
  paedagogen: "Für Pädagog:innen",
  alle: "Für alle",
};

// Clientseitige Erfassung wie auf der Landing (noch kein Mail-Backend).
// `emailTag` ist bereits vorbereitet für die spätere E-Mail-Automation.
function FreebieCard({ lm }: { lm: LeadMagnet }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Bitte eine gültige E-Mail eingeben."); return; }
    setError("");
    setDone(true);
    // TODO(email-automation): emailTag = lm.emailTag an Mailtool senden.
  };

  const leadsTo = lm.leadsToProductIds?.map(getProduct).filter(Boolean).slice(0, 1)[0];

  return (
    <div className="rounded-[1.5rem] p-6 border bg-card flex flex-col" style={{ borderColor: "rgba(224,31,90,0.14)" }}>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">{AUDIENCE_LABEL[lm.audience]}</span>
      <h3 style={D} className="text-[1.2rem] font-medium text-foreground mb-1.5 leading-snug">{lm.title}</h3>
      <p className="text-sm italic font-light mb-3" style={{ color: "#E01F5A" }}>{lm.tagline}</p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{lm.description}</p>

      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl py-5 px-4 text-center" style={{ background: GS, border: "1px solid rgba(224,31,90,0.15)" }}>
          <p className="text-xl mb-1">🌸</p>
          <p style={D} className="text-foreground font-light text-sm mb-0.5">Danke! Unterwegs zu dir.</p>
          <p className="text-xs text-muted-foreground">Schau in dein Postfach — auch im Spam.</p>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2.5">
          <input
            type="email" placeholder="Deine E-Mail-Adresse" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-full text-sm border outline-none"
            style={{ borderColor: error ? "#E01F5A" : "rgba(224,31,90,0.2)", background: "white" }}
          />
          {error && <p className="text-[11px] ml-4" style={{ color: "#E01F5A" }}>{error}</p>}
          <button type="submit" className="w-full text-white py-3 rounded-full text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ background: G }}>
            <Download size={14} /> Gratis sichern
          </button>
        </form>
      )}

      {leadsTo && (
        <p className="text-xs text-muted-foreground mt-3">
          Passt dazu:{" "}
          <Link to={`/produkt/${leadsTo.id}`} className="font-medium" style={{ color: "#E01F5A" }}>{leadsTo.title}</Link>
        </p>
      )}
    </div>
  );
}

export default function FreebiePage() {
  useDocumentMeta("Kostenlose Ressourcen | MUTSeeLe", "Kostenlose Impulse, Guides und Wegbegleiter für Eltern, Frauen und Pädagog:innen.");

  return (
    <PageShell>
      <section className="px-6 pt-10 pb-12 lg:pt-16 lg:pb-16" style={{ background: "linear-gradient(160deg,#fce4ec 0%,#fde8d8 60%,#fff3e0 100%)" }}>
        <div className="max-w-lg mx-auto lg:max-w-4xl">
          <Breadcrumb items={[{ label: "Start", to: "/" }, { label: "Kostenlose Ressourcen" }]} />
          <FadeUp>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-md" style={{ background: G }}>
              <Heart className="text-white" size={22} />
            </div>
            <span className="block text-[10px] tracking-[0.35em] uppercase font-medium mb-3" style={{ color: "#E01F5A" }}>Kostenlos für dich</span>
            <h1 style={D} className="text-[2.2rem] lg:text-[3rem] font-light text-foreground mb-4 leading-snug">
              Kostenlose <em className="italic" style={GT}>Ressourcen</em>
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
              Kleine Impulse mit großer Wirkung — dein erster Schritt beginnt hier.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 py-14 lg:py-20 bg-background">
        <div className="max-w-lg mx-auto lg:max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4">
          {leadMagnets.map((lm) => <FreebieCard key={lm.id} lm={lm} />)}
        </div>
      </section>
    </PageShell>
  );
}
