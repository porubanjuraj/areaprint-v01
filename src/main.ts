import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import { initRasters } from "./lib/raster";
import { initMarquees } from "./lib/marquee";
import { initMenu, initNewsletter, initReveal, initScale, initScrollSpy, initSliders, initSmartNav } from "./lib/ui";

initScale();
initReveal();
initMenu();
initSliders();
initScrollSpy();
initSmartNav();
initNewsletter();
initMarquees();
// raster (WebGL) až po načítaní a v čase nečinnosti, aby neblokoval prvé vykreslenie;
// dlaždice majú dovtedy statický PNG z toho istého shadera ako pozadie
const startRaster = () => ("requestIdleCallback" in window ? requestIdleCallback(() => initRasters(), { timeout: 2000 }) : setTimeout(initRasters, 300));
if (document.readyState === "complete") startRaster(); else addEventListener("load", startRaster, { once: true });
