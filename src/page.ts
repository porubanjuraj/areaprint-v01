/**
 * Homepage v01: skladá stránku z komponentov. Texty sú z Figmy (sekcia v01 58:4974, hero upravený 26. 11. 2026).
 */
import { Button, Chip, ClientLogo, SliderDots, TechLink, icon } from "./components/core";
import {
  ArticleTile, CtaBanner, Footer, MobileMenu, Navigation, RealizationCard, SectionHeader,
  SolutionTile, StepTile, type Realization, type Solution,
} from "./components/blocks";

const CHIPS = ["UV tlač", "Veľkoformát", "Frézovanie", "Laser", "Montáž"];

// poradie log presne podľa Figmy (riadok 1: 58:4142, riadok 2: 58:4167)
const LOGOS = ["Mecom", "Mirinda", "Pepsi", "Amundsen", "Božkov", "Mattoni", "Posmedia", "YIT", "Poštová banka", "Schweppes", "UniCredit Bank"];
const LOGO_ROW_1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 10];
const LOGO_ROW_2 = [3, 4, 5, 0, 1, 2, 8, 9, 10, 5, 8];

const SOLUTIONS: Solution[] = [
  { size: "large", icon: "storefront", title: `Retail<br class="br-d"> a predajné miesta`, text: `POS materiály, kartónové stojany<br class="br-m"> a komunikácia v predajniach.`, photo: "sol_retail", alt: "Svetlá predajňa s drevenými pultmi a vystaveným tovarom", href: "#" },
  { size: "large", icon: "billboard", title: `Kampane<br> a veľkoplošná reklama`, text: `Outdoorové formáty, bannery<br> a polepy pre vašu komunikáciu.`, photo: "sol_kampane", alt: "Prázdny podsvietený reklamný panel na zastávke v noci", href: "#" },
  { size: "small", icon: "rollup", title: "Výstavy a eventy", text: `Prezentačné systémy, steny a materiály<br> na podujatia.`, photo: "sol_vystavy", alt: "Výstavný stánok s veľkoformátovou grafikou a pultom", href: "#" },
  { size: "small", icon: "totem", title: "Orientačné systémy", text: `Označenie, polepy a vizuálne prvky<br> pre vaše priestory.`, photo: "sol_orientacne", alt: "Svetelný nápis WAY so šípkou zo žiaroviek", href: "#" },
  { size: "small", icon: "box", title: "Firemné tlačoviny a obaly", text: `Tlačové materiály, kartónové obaly<br> a balenia na mieru.`, photo: "sol_tlacoviny", alt: "Kartónové priečky v krabici zblízka", href: "#" },
];

const STEPS = [
  { num: "01", label: "Pochopíme zadanie" },
  { num: "02", label: "Navrhneme riešenie" },
  { num: "03", label: "Zameriame<br> a pripravíme" },
  { num: "04", label: "Vyrobíme<br> na mieru" },
  { num: "05", label: "Dodáme<br> a nainštalujeme", highlight: true },
];

const REALIZATIONS: Realization[] = [
  { size: "large", chip: "Retail", title: "Uvedenie produktu<br> v predajni", text: "Kartónový stojan, POS materiály a polepy ako jedno zadanie.", photo: "real_predajna", alt: "Interiér obchodného domu s predajnými ostrovčekmi", href: "#" },
  { size: "small", chip: "Kampane", title: `Kampaň vo verejnom priestore`, text: "Viacero reklamných formátov<br> v jednom produkčnom procese.", photo: "real_kampan", alt: "Billboard pri ceste vo večernom svetle", href: "#" },
  { size: "small", chip: "Výstavy a eventy", title: `Prezentácia značky<br class="br-m"> na podujatí`, text: "Prezentačná stena, označenie<br> a sprievodné tlačoviny.", photo: "real_podujatie", alt: "Plná výstavná hala s návštevníkmi z vtáčej perspektívy", href: "#" },
];

const TECH = ["Veľkoplošná digitálna tlač", "Maloplošná digitálna tlač", "Produkty z kartónu", "Prezentačné systémy", "Návrhy a dizajn", "Finalizácia a inštalácia"];

const ARTICLES = [
  { title: "Dobré riešenie sa začína správnymi otázkami", photo: "mag_otazky", alt: "Vzorkovník farieb Pantone", href: "#" },
  { title: "Jedna kampaň, viac formátov, jeden celok.", photo: "mag_kampan", alt: "Veľkoformátová tlačiareň počas tlače", href: "#" },
  { title: "Materiál vyberáme<br> pre konkrétne použitie", photo: "mag_material", alt: "Tri vzorky papiera rôznych farieb a štruktúr", href: "#" },
];

const logoRow = (idx: number[], dir: 1 | -1) =>
  `<div class="marquee logos__row" data-marquee="time" data-dir="${dir}" data-align="center"><div class="marquee__track">${idx.map(i => ClientLogo({ file: `clientlogo_${i}`, name: LOGOS[i] })).join("")}</div></div>`;

function Hero() {
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="hero-tile on-dark raster-tile" data-raster="hero">
    <canvas class="raster-tile__canvas" aria-hidden="true"></canvas>
    <div class="hero-tile__inner">
      <h1 class="hero-tile__title t-display-xl" id="hero-title" data-reveal>Jeden partner<br> od tlače<br class="br-m"> po montáž</h1>
      <div class="hero-tile__bottom" data-reveal style="--reveal-delay:80ms">
        <p class="hero-tile__lead t-body-m"><span class="copy-d">Nemusíte koordinovať grafika, tlačiareň<br> a montážnikov. Celé zadanie prevezmeme<br> a odovzdáme hotové priamo na mieste.</span><span class="copy-m">Navrhneme, technicky pripravíme, vyrobíme a nainštalujeme. Zastrešíme celý proces, aby ste<br> sa mohli venovať svojmu biznisu.</span></p>
        <div class="hero-tile__actions">
          ${Button({ label: "Tlač na mieru", href: "#kontakt", style: "accent", size: "m" })}
          ${Button({ label: "Realizácie", href: "#realizacie", style: "outline-dark", size: "m" })}
        </div>
      </div>
    </div>
  </div>
  <div class="hero__slider slider" id="hero-slider" aria-label="O Areaprinte" tabindex="0">
    <div class="tile tile--thirty raster-tile slider__item" data-raster="thirty" data-reveal style="--reveal-delay:120ms">
      <canvas class="raster-tile__canvas" aria-hidden="true"></canvas>
      <p class="tile__big t-display-xl">30</p>
      <p class="t-body-m">rokov skúseností, dlhodobé<br> vzťahy a znalosť výroby.</p>
    </div>
    <div class="tile tile--pastel slider__item" data-reveal style="--reveal-delay:180ms">
      <div class="tile__head">
        <p class="t-label-m muted">Technologický partner</p>
        <h2 class="t-heading-l">Vlastná výroba<br> a technológie</h2>
      </div>
      <div class="marquee chips" data-marquee="time" data-dir="-1" data-align="center">
        <ul class="marquee__track" aria-label="Technológie">${CHIPS.map(c => `<li>${Chip({ label: c, tone: "pastel" })}</li>`).join("")}</ul>
      </div>
    </div>
    <div class="tile tile--subtle tile--process slider__item" data-reveal style="--reveal-delay:240ms">
      <h2 class="t-heading-l">Od návrhu<br> po inštaláciu</h2>
      <p class="t-body-m muted">Jeden partner pre celé zadanie.</p>
    </div>
  </div>
  ${SliderDots({ count: 3, target: "hero-slider", label: "O Areaprinte" })}
  <div class="logos" data-reveal style="--reveal-delay:300ms">
    <h2 class="visually-hidden">Klienti</h2>
    ${logoRow(LOGO_ROW_1, -1)}
    ${logoRow(LOGO_ROW_2, 1)}
  </div>
</section>`;
}

export function renderPage() {
  return `<a class="skip-link" href="#obsah">Preskočiť na obsah</a>
<div class="page" id="top">
  <header class="site-header" data-reveal>${Navigation()}</header>
  ${MobileMenu()}
  <main id="obsah" class="page__main">
    ${Hero()}

    <section class="section" id="riesenia" aria-labelledby="riesenia-title">
      ${SectionHeader({ id: "riesenia", title: "Čo potrebujete vyriešiť?", link: { label: "Všetky riešenia", href: "#" } })}
      <div class="solutions slider" id="solutions-slider" tabindex="0" aria-label="Riešenia">
        ${SOLUTIONS.map((s, i) => SolutionTile(s, i)).join("")}
      </div>
      ${SliderDots({ count: SOLUTIONS.length, target: "solutions-slider", label: "Riešenia" })}
    </section>

    <section class="section" id="proces" aria-labelledby="proces-title">
      ${SectionHeader({ id: "proces", title: "Jeden partner, celý proces", mobileAlign: "start" })}
      <ol class="steps slider" id="steps-slider" tabindex="0" aria-label="Kroky procesu">
        ${STEPS.map((s, i) => StepTile(s, i)).join("")}
      </ol>
      ${SliderDots({ count: STEPS.length, target: "steps-slider", label: "Kroky procesu" })}
      <div class="spacer-m" aria-hidden="true"></div>
      ${CtaBanner()}
    </section>

    <section class="section" id="realizacie" aria-labelledby="realizacie-title">
      ${SectionHeader({ id: "realizacie", title: "Schopnosti ukážeme<br> na výsledkoch", link: { label: "Všetky realizácie", href: "#" } })}
      <div class="realizations">
        ${RealizationCard(REALIZATIONS[0])}
        <div class="realizations__side">
          ${RealizationCard(REALIZATIONS[1], 1)}
          ${RealizationCard(REALIZATIONS[2], 2)}
        </div>
      </div>
    </section>

    <div class="spacer-lg" aria-hidden="true"></div>

    <!-- tech-pin: na desktope sa sekcia počas scrollu pripne a pilulky prejdú od prvej po poslednú -->
    <div class="tech-pin" data-pin>
    <section class="tech" id="technologie" aria-labelledby="technologie-title">
      <div class="tech__head">
        <h2 class="tech__title t-display-l" id="technologie-title" data-reveal>Technológie<br class="br-m"> v službách vášho zadania</h2>
        <p class="tech__text t-body-l" data-reveal style="--reveal-delay:80ms">Od firemných tlačovín po veľkoplošnú reklamu a kartónové riešenia. Produkty, materiály a spracovanie vyberáme podľa toho, čo potrebujete dosiahnuť.</p>
      </div>
      <div class="marquee tech__links" data-marquee="range" data-align="start" data-reveal style="--reveal-delay:160ms">
        <ul class="marquee__track">${TECH.map((t) => `<li>${TechLink({ label: t, href: "#" })}</li>`).join("")}</ul>
      </div>
    </section>
    </div>

    <section class="section" id="magazin" aria-labelledby="magazin-title">
      ${SectionHeader({ id: "magazin", title: "Čo sa deje za výsledkom", link: { label: "Vstúpiť do magazínu", href: "#" } })}
      <div class="magazine slider" id="magazine-slider" tabindex="0" aria-label="Články z magazínu">
        ${ARTICLES.map((a, i) => ArticleTile(a, i)).join("")}
      </div>
      ${SliderDots({ count: ARTICLES.length, target: "magazine-slider", label: "Magazín" })}
      <div class="spacer-m" aria-hidden="true"></div>
    </section>
  </main>
  ${Footer()}
</div>`;
}

export { icon };
