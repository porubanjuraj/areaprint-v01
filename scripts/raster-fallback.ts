// Statický PNG fallback rastra (pre prehliadače bez WebGL2), vyrenderovaný tým istým shaderom v hodnotách z dizajnu.
import { chromium } from "playwright";
const url = process.argv[2] || "http://localhost:5175/";
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const [w, suffix] of [[1280, ""], [390, "-m"]] as const) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".raster-tile > :not(canvas){visibility:hidden!important} .raster-tile{border-radius:0!important;background:none!important} .raster-tile__canvas{opacity:1!important}" });
  await p.waitForTimeout(3000);
  await p.locator(".hero-tile").screenshot({ path: `public/img/raster-hero${suffix}.png` });
  await p.locator(".tile--thirty").screenshot({ path: `public/img/raster-thirty${suffix}.png` });
  await p.close();
}
const sharp = (await import("sharp")).default;
for (const f of ["hero", "thirty", "hero-m", "thirty-m"]) {
  const buf = await sharp(`public/img/raster-${f}.png`).png({ palette: true, quality: 90 }).toBuffer();
  await Bun.write(`public/img/raster-${f}.png`, buf);
}
await b.close();
console.log("ok");
