/**
 * Vizuálna kontrola: web vs Figma (Playwright + sharp).
 *   bun qa/compare.ts [url]
 * Urobí full-page screenshot pri 1280 a 390 (prefers-reduced-motion = statický raster v pozícii z dizajnu,
 * bez animácií), oreže sekcie podľa súradníc z Figmy a uloží dvojice Figma | web | diff do qa/.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "fs";

const SITE = process.argv[2] || "http://localhost:5175/";
const OUT = import.meta.dir + "/";

type Box = [name: string, y: number, h: number, sel?: string];
const DESKTOP: Box[] = [
  ["01-hero", 24, 552, ".site-header"], ["02-hero-row2", 592, 200, ".tile--process"], ["03-riesenia-header", 808, 157, "#riesenia .section-header"], ["04-riesenia-r1", 981, 400, ".solutions"],
  ["05-riesenia-r2", 1397, 487, ".solution-tile--small"], ["06-proces-header", 1900, 157, "#proces .section-header"], ["07-proces-kroky", 2073, 280, ".steps"], ["08-cta", 2369, 136, ".cta-banner"],
  ["09-realizacie-header", 2521, 218, "#realizacie .section-header"], ["10-realizacie", 2755, 600, ".realizations"], ["11-technologie", 3451, 365, ".tech"],
  ["12-magazin-header", 3832, 157, "#magazin .section-header"], ["13-magazin", 4005, 212, ".magazine"], ["14-footer", 4233, 817, ".footer"],
];
const MOBILE: Box[] = [
  ["01-hero", 24, 858, ".site-header"], ["02-riesenia-header", 898, 167, "#riesenia .section-header"], ["03-riesenia", 1081, 534, ".solutions"], ["04-proces", 1631, 377, "#proces .section-header"],
  ["05-cta", 2064, 336, ".cta-banner"], ["06-realizacie-header", 2416, 198, "#realizacie .section-header"], ["07-realizacie", 2630, 1344, ".realizations"], ["08-technologie", 4030, 674, ".tech"],
  ["09-magazin", 4720, 421, "#magazin .section-header"], ["10-footer", 5197, 1177, ".footer"],
];

async function shoot(width: number, file: string, boxes: Box[]) {
  const browser = await chromium.launch({ args: ["--hide-scrollbars", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await page.goto(SITE, { waitUntil: "networkidle" });
  await page.evaluate(async () => { await document.fonts.ready; });
  // lazy obrázky: načítať všetky
  await page.evaluate(async () => {
    document.querySelectorAll("img[loading=lazy]").forEach(i => i.setAttribute("loading", "eager"));
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  });
  await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0), null, { timeout: 20000 }).catch(() => console.log("niektoré obrázky sa nenačítali"));
  await page.waitForTimeout(600);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const ys = await page.evaluate((sels) => sels.map(q => { const e = q && document.querySelector(q); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; }), boxes.map(b => b[3] ?? ""));
  await page.screenshot({ path: file, fullPage: true });
  await browser.close();
  return { height, ys };
}

async function compare(label: string, figmaPath: string, webPath: string, boxes: Box[], width: number, ys: (number | null)[]) {
  const dir = `${OUT}${label}`; mkdirSync(dir, { recursive: true });
  const fMeta = await sharp(figmaPath).metadata(), wMeta = await sharp(webPath).metadata();
  console.log(`\n== ${label}: Figma ${fMeta.width}x${fMeta.height}, web ${wMeta.width}x${wMeta.height}`);
  for (const [bi, [name, y, h, sel]] of boxes.entries()) {
    // Figma box vs rovnaký box na webe zarovnaný podľa polohy elementu (sel); prvý element v boxe je pri tom istom offsete
    const off = ys[bi] != null ? ys[bi]! - y : 0;
    const region = { left: 0, top: y, width, height: Math.min(h + 24, (wMeta.height ?? 0) - y - off, (fMeta.height ?? 0) - y) };
    const wregion = { ...region, top: y + off };
    if (region.height <= 0) { console.log(name, "mimo stránky"); continue; }
    const f = await sharp(figmaPath).extract(region).removeAlpha().raw().toBuffer();
    const w = await sharp(webPath).extract(wregion).removeAlpha().raw().toBuffer();
    const diff = Buffer.alloc(f.length);
    let bad = 0;
    for (let i = 0; i < f.length; i += 3) {
      const d = Math.max(Math.abs(f[i] - w[i]), Math.abs(f[i + 1] - w[i + 1]), Math.abs(f[i + 2] - w[i + 2]));
      if (d > 40) { bad++; diff[i] = 255; diff[i + 1] = 0; diff[i + 2] = 80; }
      else { const g = Math.round(f[i] * 0.25 + 190); diff[i] = diff[i + 1] = diff[i + 2] = g; }
    }
    const pct = (bad / (f.length / 3)) * 100;
    const raw = { raw: { width, height: region.height, channels: 3 as const } };
    const gap = 16;
    await sharp({ create: { width: width * 3 + gap * 2, height: region.height, channels: 3, background: "#ffffff" } })
      .composite([
        { input: await sharp(f, raw).png().toBuffer(), left: 0, top: 0 },
        { input: await sharp(w, raw).png().toBuffer(), left: width + gap, top: 0 },
        { input: await sharp(diff, raw).png().toBuffer(), left: (width + gap) * 2, top: 0 },
      ]).png().toFile(`${dir}/${name}.png`);
    console.log(`${name.padEnd(24)} posun ${String(off).padStart(4)} px   rozdielnych pixelov ${pct.toFixed(2)} %`);
  }
}

const which = process.argv[3] || "all";
if (which !== "mobile") {
  const { height: h, ys } = await shoot(1280, `${OUT}web-desktop-1280.png`, DESKTOP);
  console.log("web výška desktop", h, "(Figma 5073)");
  await compare("desktop-1280", `${OUT}figma/desktop-1280.png`, `${OUT}web-desktop-1280.png`, DESKTOP, 1280, ys);
}
if (which !== "desktop") {
  const { height: h, ys } = await shoot(390, `${OUT}web-mobile-390.png`, MOBILE);
  console.log("web výška mobil", h, "(Figma 6398)");
  await compare("mobile-390", `${OUT}figma/mobile-390.png`, `${OUT}web-mobile-390.png`, MOBILE, 390, ys);
}
