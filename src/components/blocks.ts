/** Zložené komponenty v01 (Navigation, Solution tile, Step tile, Realization card, Section header, CTA banner, Article tile, Footer). */
import { Button, Chip, IconButton, IconPill, NavItem, Photo, cx, icon } from "./core";
import type { IconName } from "../icons";

export const NAV = [
  { label: "Riešenia", href: "#riesenia" },
  { label: "Realizácie", href: "#realizacie" },
  { label: "O nás", href: "#proces" },
  { label: "Magazín", href: "#magazin" },
  { label: "Kontakt", href: "#kontakt" },
];

/* ---------- Navigation (77:548): Desktop / Mobile ---------- */
export function Navigation() {
  return `<nav class="navigation" aria-label="Hlavná navigácia">
  <a class="navigation__logo" href="#top" aria-label="Areaprint, na začiatok stránky">${icon("logo")}</a>
  <div class="navigation__items">${NAV.map(n => NavItem(n)).join("")}</div>
  <div class="navigation__end">
    ${Button({ label: "Tlač na mieru", href: "#kontakt", style: "accent", size: "s", cls: "navigation__cta" })}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Otvoriť menu"><span></span><span></span></button>
  </div>
</nav>`;
}

/* Mobilné menu: v dizajne nie je, NÁVRH podľa HANDOFF 7.2 (overlay v štýle navigácie) */
export function MobileMenu() {
  return `<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden data-proposal="mobilné menu: návrh, nie je vo Figme">
  <div class="mobile-menu__bar">
    <a class="navigation__logo" href="#top" aria-label="Areaprint, na začiatok stránky">${icon("logo")}</a>
    <button class="menu-btn is-open" type="button" aria-label="Zavrieť menu" data-menu-close><span></span><span></span></button>
  </div>
  <ul class="mobile-menu__list">
    ${NAV.map(n => `<li><a class="mobile-menu__link t-heading-xl" href="${n.href}">${n.label}</a></li>`).join("")}
  </ul>
  ${Button({ label: "Tlač na mieru", href: "#kontakt", style: "accent", size: "m", full: true })}
</div>`;
}

/* ---------- Section header (81:872): Desktop / Mobile, s odkazom aj bez ---------- */
export function SectionHeader(p: { id: string; title: string; link?: { label: string; href: string }; mobileAlign?: "center" | "start" }) {
  return `<div class="${cx("section-header", p.mobileAlign === "start" && "section-header--m-start")}" data-reveal>
  <h2 class="section-header__title" id="${p.id}-title">${p.title}</h2>
  ${p.link ? Button({ label: p.link.label, href: p.link.href, style: "outline", size: "l", cls: "section-header__link" }) : ""}
</div>`;
}

/* ---------- Solution tile (77:549): Large / Small ---------- */
export type Solution = { size: "large" | "small"; icon: IconName; title: string; text: string; photo: string; alt: string; href: string };
export function SolutionTile(s: Solution, i = 0) {
  const sizes = s.size === "large"
    ? "(min-width: 1024px) 20vw, (min-width: 768px) 45vw, 80vw"
    : "(min-width: 1024px) 29vw, (min-width: 768px) 45vw, 80vw";
  return `<article class="${cx("solution-tile", `solution-tile--${s.size}`, "slider__item")}" data-reveal style="--reveal-delay:${i * 70}ms">
  <div class="solution-tile__media">
    ${Photo({ name: s.photo, alt: s.alt, sizes, cls: "solution-tile__photo", reveal: false })}
    ${IconButton({ cls: "solution-tile__btn" })}
  </div>
  <div class="solution-tile__body">
    ${IconPill({ icon: s.icon })}
    <div class="solution-tile__text">
      <h3 class="solution-tile__title"><a class="stretched" href="${s.href}">${s.title}</a></h3>
      <p class="t-body-m muted">${s.text}</p>
    </div>
  </div>
</article>`;
}

/* ---------- Step tile (77:550): Default / Highlight ---------- */
export function StepTile(p: { num: string; label: string; highlight?: boolean }, i = 0) {
  return `<li class="${cx("step-tile", p.highlight && "step-tile--highlight", "slider__item")}" data-reveal style="--reveal-delay:${i * 70}ms">
  <span class="step-tile__num" aria-hidden="true">${p.num}</span>
  <p class="step-tile__label"><span class="visually-hidden">Krok ${Number(p.num)}: </span>${p.label}</p>
</li>`;
}

/* ---------- Realization card (77:551): Large / Small / Mobile ---------- */
export type Realization = { size: "large" | "small"; chip: string; title: string; text: string; photo: string; alt: string; href: string };
export function RealizationCard(r: Realization, i = 0) {
  const sizes = r.size === "large" ? "(min-width: 1024px) 48vw, 90vw" : "(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 80vw";
  if (r.size === "large") {
    return `<article class="real-card real-card--large" data-reveal="img" style="--reveal-delay:${i * 70}ms">
  ${Photo({ name: r.photo, alt: r.alt, sizes, cls: "real-card__bg", reveal: false })}
  <div class="real-card__top">${Chip({ label: r.chip, tone: "light" })}${IconButton()}</div>
  <div class="real-card__panel">
    <h3 class="real-card__title t-heading-xl"><a class="stretched" href="${r.href}">${r.title}</a></h3>
    <p class="t-body-m muted">${r.text}</p>
  </div>
</article>`;
  }
  return `<article class="real-card real-card--small" data-reveal style="--reveal-delay:${i * 70}ms">
  <div class="real-card__media">${Photo({ name: r.photo, alt: r.alt, sizes, cls: "real-card__photo", reveal: false })}${IconButton({ cls: "real-card__btn" })}</div>
  <div class="real-card__body">
    ${Chip({ label: r.chip, tone: "light" })}
    <div class="real-card__text">
      <h3 class="real-card__title t-heading-l"><a class="stretched" href="${r.href}">${r.title}</a></h3>
      <p class="t-body-m muted">${r.text}</p>
    </div>
  </div>
</article>`;
}

/* ---------- CTA banner (81:886): Desktop / Mobile ---------- */
export function CtaBanner() {
  return `<aside class="cta-banner on-dark" data-reveal aria-label="Výroba na mieru">
  ${IconPill({ icon: "merge", theme: "dark" })}
  <p class="cta-banner__text t-heading-s">Nemusíte koordinovať jednotlivé kroky výroby.<br class="br-d"> Prepojíme technickú prípravu, výrobu a realizáciu do jedného postupu.</p>
  ${Button({ label: "Tlač na mieru", href: "#kontakt", style: "accent", size: "m", cls: "cta-banner__btn" })}
</aside>`;
}

/* ---------- Article tile (77:500) ---------- */
export function ArticleTile(a: { title: string; photo: string; alt: string; href: string }, i = 0) {
  return `<article class="article-tile slider__item" data-reveal style="--reveal-delay:${i * 70}ms">
  <div class="article-tile__text">
    <h3 class="t-body-l"><a class="stretched" href="${a.href}">${a.title}</a></h3>
    ${IconButton()}
  </div>
  ${Photo({ name: a.photo, alt: a.alt, sizes: "(min-width: 1024px) 11vw, 9rem", cls: "article-tile__photo", reveal: false })}
</article>`;
}

/* ---------- Footer (81:937): Desktop / Mobile ---------- */
export function Footer() {
  const col = (title: string, links: [string, string][], cls = "") => `<div class="footer__col ${cls}">
      <h2 class="t-heading-s">${title}</h2>
      <ul class="footer__links t-label-m">${links.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
    </div>`;
  return `<footer class="footer on-dark" id="kontakt" data-reveal>
  <div class="footer__news">
    <div class="footer__news-head">
      <p class="t-label-m" id="newsletter-label">Areaprint newsletter</p>
      <h2 class="t-display-l">Dobré <br class="br-m">témy<br class="br-d"> majú pokračovanie</h2>
    </div>
    <form class="newsletter" novalidate aria-labelledby="newsletter-label">
      <div class="newsletter__row">
        <label class="visually-hidden" for="nl-email">Váš e-mail</label>
        <input class="newsletter__input" id="nl-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="Váš e-mail" required>
        <button class="newsletter__submit" type="submit">Odoberať</button>
      </div>
      <label class="newsletter__consent">
        <input type="checkbox" name="consent" required>
        <span class="newsletter__box" aria-hidden="true"></span>
        <span class="newsletter__consent-text">Chcem dostávať newsletter Areaprint.<br class="br-m"> Z odberu sa budem môcť odhlásiť.</span>
      </label>
      <p class="newsletter__msg" role="status" aria-live="polite"></p>
    </form>
  </div>
  <div class="footer__bottom">
    <div class="footer__symbol">${icon("symbol")}</div>
    <div class="footer__info">
      <div class="footer__cols">
        ${col("Riešenia a výroba", [["Riešenia", "#riesenia"], ["Produkty a služby", "#technologie"], ["Realizácie", "#realizacie"], ["Ako pracujeme", "#proces"]])}
        ${col("Areaprint", [["O nás", "#proces"], ["Kontakt", "#kontakt"], ["Kariéra", "#"], ["Magazín", "#magazin"]], "footer__col--fixed")}
      </div>
      <address class="footer__contact">
        <a href="tel:+421245642601">+421 245 642 601</a>
        <a class="footer__fixed" href="mailto:area@areaprint.com">area@areaprint.com</a>
      </address>
      <div class="footer__legal">
        <a class="footer__logo" href="#top" aria-label="Areaprint, na začiatok stránky">${icon("logo-footer")}</a>
        <p class="footer__fixed t-label-m">© 2026, Areaprint</p>
      </div>
    </div>
  </div>
</footer>`;
}
