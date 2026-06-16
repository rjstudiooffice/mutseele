// ─────────────────────────────────────────────────────────────────────────────
// Sitemap-Generator (läuft VOR `vite build`)
//
// Erzeugt public/sitemap.xml automatisch aus dem Content-Layer:
// Welten, Produkte, Bundles und die Gratis-Seite. So bleibt die Sitemap
// immer synchron zum Katalog — keine manuelle Pflege.
//
// Da der Content in TypeScript liegt, wird er via esbuild gebündelt und dann
// importiert (kein TS-Loader nötig; esbuild ist bereits Dev-Dependency).
// ─────────────────────────────────────────────────────────────────────────────
import { build } from "esbuild";
import { writeFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const BASE = "https://www.mutseele.at";
const today = new Date().toISOString().slice(0, 10);

// Content-Layer bündeln und importieren.
const tmpFile = resolve(tmpdir(), `mutseele-content-${Date.now()}.mjs`);
await build({
  entryPoints: [resolve(root, "src/content/index.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: tmpFile,
  logLevel: "silent",
});
const content = await import(pathToFileURL(tmpFile).href);
rmSync(tmpFile, { force: true });

const { getWorlds, products, bundles, validateContent } = content;

// Integrität vor dem Build sicherstellen — kaputte Referenzen brechen den Build.
const errors = validateContent();
if (errors.length) {
  console.error("[sitemap] Content-Integritätsfehler:");
  errors.forEach((e) => console.error("  -", e));
  process.exit(1);
}

const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/gratis", priority: "0.6", changefreq: "monthly" },
  ...getWorlds().map((w) => ({ loc: `/${w.id}`, priority: "0.8", changefreq: "weekly" })),
  ...products.map((p) => ({ loc: `/produkt/${p.id}`, priority: "0.7", changefreq: "weekly" })),
  ...bundles.map((b) => ({ loc: `/bundle/${b.id}`, priority: "0.6", changefreq: "monthly" })),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${BASE}${u.loc}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml, "utf8");
console.log(`[sitemap] ✓ ${urls.length} URLs → public/sitemap.xml`);
