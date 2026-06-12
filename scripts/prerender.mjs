// ─────────────────────────────────────────────────────────────────────────────
// Prerender-Schritt (läuft nach `vite build`)
//
// Warum: Die App rendert komplett client-seitig (React). Im gebauten HTML steht
// sonst nur ein leeres <div id="root">. Google & Co. bekommen dann zunächst eine
// leere Seite. Dieses Skript lädt den fertigen Build in ein echtes (headless)
// Chrome, lässt React rendern und schreibt das fertige Markup statisch ins HTML
// zurück – so steht der gesamte Text sofort im Quelltext (crawlbar).
//
// Nutzt das bereits installierte System-Chrome (lädt kein eigenes Chromium).
// Pfad bei Bedarf via PUPPETEER_EXECUTABLE_PATH überschreiben.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distHtml = resolve(__dirname, "../dist/index.html");

if (!existsSync(distHtml)) {
  console.error("[prerender] dist/index.html nicht gefunden – läuft `vite build` davor?");
  process.exit(1);
}

function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];
  return candidates.find((p) => existsSync(p));
}

const executablePath = findChrome();
if (!executablePath) {
  console.error("[prerender] Kein Chrome gefunden. Setze PUPPETEER_EXECUTABLE_PATH.");
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(pathToFileURL(distHtml).href, { waitUntil: "networkidle0", timeout: 60000 });

  // Warten, bis React in #root gerendert hat.
  await page.waitForFunction(
    () => document.getElementById("root")?.children.length > 0,
    { timeout: 30000 }
  );

  // Durch die Seite scrollen, damit scroll-getriggerte Animationen (whileInView)
  // ihren sichtbaren Endzustand erreichen, bevor wir den Snapshot machen.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(60);
    }
    window.scrollTo(0, 0);
    await sleep(150);
  });

  let rootHtml = await page.evaluate(() => document.getElementById("root").innerHTML);

  // Base64-Bilder aus dem Snapshot entfernen: die echten Bilder stecken bereits
  // im JS-Bundle und werden vom Client neu gerendert. Im statischen Markup würden
  // sie das HTML nur unnötig (mehrere MB) aufblähen und den LCP verschlechtern.
  // alt-Texte bleiben erhalten (SEO-relevant), src wird ein 1×1-Transparent-Pixel.
  const PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  rootHtml = rootHtml
    .replace(/src="data:image[^"]*"/g, `src="${PIXEL}"`)
    .replace(/srcset="[^"]*data:image[^"]*"/g, "");

  let html = readFileSync(distHtml, "utf8");
  const before = html;
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${rootHtml}</div>`
  );

  if (html === before) {
    console.error('[prerender] Konnte <div id="root"></div> nicht ersetzen – Markup unverändert?');
    process.exit(1);
  }

  writeFileSync(distHtml, html, "utf8");
  console.log(`[prerender] ✓ Statisches Markup eingebettet (${(rootHtml.length / 1024).toFixed(1)} KB).`);
} finally {
  await browser.close();
}
