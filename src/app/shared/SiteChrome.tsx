import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSabrina from "@/imports/mutseele.png";
import { G } from "./brand";

// In-Page-Anker zeigen auf die Landing (/#section): von Unterseiten lädt das die
// Startseite und scrollt zum Abschnitt; auf der Startseite scrollt es direkt.
const navLinks = [
  ["Themenwelten", "/#themenwelten"],
  ["Angebote", "/#produkte"],
  ["Finde dein Produkt", "/quiz"],
  ["Freebie", "/gratis"],
  ["Über mich", "/#sabrina"],
] as const;

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-md border-b border-border">
      <div className="max-w-lg mx-auto px-5 py-3 flex items-center justify-between lg:max-w-5xl lg:px-10">
        <Link to="/" aria-label="Zur Startseite">
          <ImageWithFallback src={logoSabrina} alt="MUTSeeLe" className="h-10 w-auto object-contain" style={{}} />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className="text-foreground/60 hover:text-foreground text-sm tracking-wide transition-colors whitespace-nowrap">{label}</a>
          ))}
          <button className="text-white px-5 py-2.5 rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap" style={{ background: G }}>
            Erstgespräch buchen
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Menü">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5"
          >
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} className="text-foreground/70 hover:text-foreground text-sm tracking-wide transition-colors">{label}</a>
            ))}
            <button className="mt-2 text-white py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity" style={{ background: G }}>
              Kostenloses Erstgespräch buchen
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const footerLinks: [string, string][] = [
  ["Über mich", "/#sabrina"],
  ["Themenwelten", "/#themenwelten"],
  ["Angebote", "/#produkte"],
  ["Freebie", "/gratis"],
  ["Impressum", "#"],
  ["Datenschutz", "#"],
];

export function SiteFooter() {
  return (
    <footer className="px-6 py-14" style={{ background: "var(--foreground)" }}>
      <div className="max-w-lg mx-auto lg:max-w-5xl lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-16 lg:items-start">
        <div className="mb-8 lg:mb-0">
          <Link to="/">
            <ImageWithFallback src={logoSabrina} alt="MUTSeeLe by Sabrina Wenzl" className="h-10 w-auto object-contain mb-4" />
          </Link>
          <p className="text-background/45 text-xs leading-relaxed max-w-[180px]">Spirituelles &amp; emotionales Coaching für Frauen, Mütter und Kinder.</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10 lg:mb-0">
          {footerLinks.map(([label, href]) => (
            <a key={label} href={href} className="text-background/50 hover:text-background/90 text-sm transition-colors duration-200">{label}</a>
          ))}
        </div>

        <div className="hidden lg:block text-right">
          <p className="text-background/30 text-xs mb-2">Folge mir</p>
          <a href="#" className="text-background/50 hover:text-background/90 text-sm transition-colors">Instagram</a>
        </div>
      </div>

      <div className="max-w-lg mx-auto lg:max-w-5xl pt-6 border-t border-background/10 flex items-center justify-between mt-6 lg:mt-0">
        <p className="text-background/25 text-xs">© {new Date().getFullYear()} MUTSeeLe by Sabrina Wenzl</p>
        <Link to="/brand-bible" className="text-background/25 hover:text-background/50 text-xs transition-colors duration-200">Brand Bible</Link>
      </div>
    </footer>
  );
}
