import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";
import { B } from "./brand";
import { SiteNav, SiteFooter } from "./SiteChrome";

/** Seiten-Gerüst: fixe Nav + Inhalt (mit Abstand) + Footer. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground" style={B}>
      <SiteNav />
      <main className="pt-[64px]">{children}</main>
      <SiteFooter />
    </div>
  );
}

export type Crumb = { label: string; to?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrümel" className="flex items-center flex-wrap gap-1.5 text-xs text-muted-foreground mb-6">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="opacity-50" />}
          {c.to ? (
            <Link to={c.to} className="hover:text-foreground transition-colors">{c.label}</Link>
          ) : (
            <span className="text-foreground/80">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/** Scrollt bei jedem Routenwechsel nach oben (sofern kein #anchor). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
