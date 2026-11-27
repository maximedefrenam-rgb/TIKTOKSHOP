/**
 * Lot du 27/11 (4) : Nutrimea — 5 × Pack Force (créatine + collagène, les DEUX produits mis en avant) et 5 × crème de riz.
 * Collagène : faits de l'emballage uniquement (marin type I, 90 gélules, vitamines C et E naturelles, sans lactose ni gluten),
 * aucune allégation. Créatine : allégation UE 3 g. Promos Black Friday (fiches du 27/11).
 */
import {variant, kw, JACKETS} from '../../src/lib/variant';
import d1 from '../../public/videos/pack-duo/timings.json';
import d2 from '../../public/videos/pack-routine/timings.json';
import d3 from '../../public/videos/pack-economie/timings.json';
import d4 from '../../public/videos/pack-placard/timings.json';
import d5 from '../../public/videos/pack-noel/timings.json';
import e1 from '../../public/videos/riz-flan/timings.json';
import e2 from '../../public/videos/riz-fromageblanc/timings.json';
import e3 from '../../public/videos/riz-croissant/timings.json';
import e4 from '../../public/videos/riz-jambes/timings.json';
import e5 from '../../public/videos/riz-gainer/timings.json';

type R = (w: string, n?: number) => number;
type K = ReturnType<typeof kw>;
type It = {label: string; sub?: string; at: number};
const B = (from: number, keywords: K[]) => ({kind: 'benefit' as const, from, keywords});
const PH = (from: number, image: string, keywords: K[] = []) => ({kind: 'photo' as const, from, image, keywords});
const CUT = (from: number, items: It[], style: 'lid' | 'zoom' = 'lid', keywords: K[] = []) =>
  ({kind: 'cutaway' as const, from, openAt: from + 0.1, style, items, keywords});
const CTA = (r: R, from: number, keywords: K[] = []) => ({kind: 'cta' as const, from, arrowAt: r('panier'), keywords});
const T1 = (text: string, at: number, o: Record<string, unknown> = {}) => kw(text, at, {y: text.includes('\n') ? 340 : 300, size: 140, color: 'accent', ...o});
const ST = (text: string, at: number, y: number, o = {}) => kw(text, at, {y, size: 110, stack: true, ...o});
const SM = (text: string, at: number, y: number) => kw(text, at, {y, size: 34, small: true, stack: true});

/* ------------------------------------------------------------------ PACK FORCE */
const WARN_PACK = "Compléments alimentaires. Déconseillés aux femmes enceintes ou allaitantes et aux enfants.\nNe pas dépasser la dose journalière indiquée.";
const PACK = {accent: '#E8323C', productImage: 'videos/pack-duo/produit.png', productScale: 0.85,
  priceTag: {text: '45,90 € · -22 %', sub: 'CRÉATINE + COLLAGÈNE'}};
const CREA = 'videos/photos/nutrimea-creatine.jpg';
const COLL = 'videos/photos/nutrimea-collagene.jpg';
const PDEAL = (from: number, badgeAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 58.8, newPrice: 45.9, discount: '-22 %', badgeAt, strikeAt: badgeAt + 0.25, newAt: badgeAt + 0.55, keywords});
const ALLEG = (r: R, from: number) => ({
  kind: 'power' as const, from, fillFrom: from + 0.1, fillTo: r('répétés'), dumbbells: [r('courts'), r('intenses'), r('répétés')],
  keywords: [
    kw('3 G DE CRÉATINE PAR JOUR', from + 0.05, {y: 240, size: 100, stack: true}),
    kw('AUGMENTENT LA\nPERFORMANCE PHYSIQUE', r('performance'), {y: 410, size: 100, color: 'accent', stack: true}),
    kw("LORS D'EXERCICES COURTS,\nINTENSES ET RÉPÉTÉS", r('courts'), {y: 590, size: 80, stack: true}),
  ],
});
const PCTA = (r: R, from: number, lines: string[], ats: number[]) => CTA(r, from, [
  ...lines.map((t, i) => kw(t, ats[i], {y: 480 + i * 95, size: 85, stack: true, color: i ? 'white' : 'accent'})),
  kw(WARN_PACK, from + 0.05, {y: 500 + lines.length * 95, size: 30, small: true, stack: true})]);
const DUO = (from: number, creaAt: number, collAt: number) => CUT(from, [
  {label: 'CRÉATINE CREAPURE®', sub: '500 g · 144 doses', at: creaAt},
  {label: '+ COLLAGÈNE MARIN', sub: 'type I · 90 gélules', at: collAt}], 'zoom');

export const packDuo = variant({
  id: 'pack-duo', timings: d1, ...PACK, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('CRÉATINE\nOU COLLAGÈNE ?', 0, {size: 180, stack: true}),
      ST('LES DEUX !', r('DEUX'), 620, {size: 200, color: 'white', impact: true})]},
    B(r('Pack') - 0.2, [T1('PACK FORCE\nNUTRIMEA', r('Pack'), {size: 180})]),
    PH(r("d'un") - 0.08, CREA, [kw('CRÉATINE CREAPURE®', r('créatine', 2), {y: 250, size: 110, color: 'accent', stack: true}),
      kw('500 G · 144 DOSES', r('cinq'), {y: 360, size: 90, stack: true})]),
    PH(r("l'autre") - 0.08, COLL, [kw('COLLAGÈNE MARIN', r('collagène', 2), {y: 250, size: 120, color: 'accent', stack: true}),
      kw('TYPE I · 90 GÉLULES', r('type'), {y: 360, size: 90, stack: true}),
      kw('vitamines C et E naturelles (selon l’emballage)', r('vitamines'), {y: 430, size: 34, small: true, stack: true})]),
    ALLEG(r, r('trois') - 0.08),
    PDEAL(r('les', 2) - 0.08, r('les', 2), [kw('LES DEUX PRODUITS', r('deux', 2), {y: 840, size: 90, stack: true})]),
    PCTA(r, r('Black') - 0.08, ["BLACK FRIDAY · JUSQU'AU 30/11", 'LIVRAISON GRATUITE'], [r('Black'), r('livraison')]),
  ],
});

export const packRoutine = variant({
  id: 'pack-routine', timings: d2, ...PACK, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('MA ROUTINE\nWINTER ARC ❄️', 0, {size: 180})]},
    PH(r('Le') - 0.08, CREA, [kw('MATIN : 1 DOSE DE CRÉA', r('dose'), {y: 250, size: 100, color: 'accent', stack: true}),
      kw("DANS UN GRAND VERRE D'EAU", r('grand'), {y: 360, size: 80, stack: true})]),
    PH(r('et') - 0.08, COLL, [kw('+ MES GÉLULES DE\nCOLLAGÈNE MARIN', r('gélules'), {y: 290, size: 100, color: 'accent', stack: true})]),
    B(r('et', 2) - 0.08, [T1('LE SOIR : SALLE 🏋️', r('soir'), {size: 160, impact: true})]),
    ALLEG(r, r('trois') - 0.08),
    DUO(r('et', 3) - 0.08, r('cent'), r('quatre-vingt-dix')),
    PDEAL(r('quarante-cinq') - 0.08, r('quarante-cinq')),
    PCTA(r, r('livraison') - 0.08, ['LIVRAISON GRATUITE', "BLACK FRIDAY · JUSQU'AU 30/11"], [r('livraison'), r('livraison') + 0.3]),
  ],
});

export const packEconomie = variant({
  id: 'pack-economie', timings: d3, ...PACK, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1("12,90 € D'ÉCO\nSUR TON STOCK D'HIVER", 0, {size: 140}),
      kw('QUI A VALIDÉ ÇA ?!', r('validé'), {y: 300, size: 150, color: 'alert', impact: true})]},
    PDEAL(r('Le') - 0.08, r('normalement')),
    B(r('et') - 0.08, [T1('2 PRODUITS\nDANS LE PACK', r('DEUX'), {size: 180, impact: true})]),
    PH(r('créatine') - 0.25, CREA, [kw('CRÉATINE CREAPURE®', r('créatine'), {y: 250, size: 110, color: 'accent', stack: true}),
      kw('100 % PURE · TESTÉE ANTIDOPAGE', r('cent'), {y: 360, size: 75, stack: true})]),
    PH(r('et', 2) - 0.08, COLL, [kw('COLLAGÈNE MARIN', r('collagène'), {y: 250, size: 120, color: 'accent', stack: true}),
      kw('TYPE I · 90 GÉLULES', r('type'), {y: 360, size: 90, stack: true}),
      kw('SANS LACTOSE NI GLUTEN', r('sans'), {y: 450, size: 70, stack: true})]),
    ALLEG(r, r('trois') - 0.08),
    B(r('prix') - 0.08, [T1('LE PLUS BAS\nSUR 30 JOURS', r('prix'), {size: 180, impact: true})]),
    PCTA(r, r('livraison') - 0.08, ['LIVRAISON GRATUITE', '45,90 € AU LIEU DE 58,80 €'], [r('livraison'), r('livraison') + 0.3]),
  ],
});

export const packPlacard = variant({
  id: 'pack-placard', timings: d4, ...PACK, jacket: JACKETS[2], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TON PLACARD DE MUSCU ?', 0, {size: 130, stack: true}),
      ST('1 SHAKER + 1 WHEY\nÀ MOITIÉ VIDE 💀', r('shaker'), 560, {size: 120, color: 'white'})]},
    B(r('Il') - 0.08, [T1('IL TE MANQUE\nLE DUO', r('duo'), {size: 190, impact: true})]),
    PH(r('la') - 0.08, CREA, [kw('CRÉATINE CREAPURE®', r('créatine'), {y: 250, size: 110, color: 'accent', stack: true}),
      kw('500 G · VEGAN · SANS GLUTEN', r('cinq'), {y: 360, size: 80, stack: true})]),
    PH(r('et', 2) - 0.08, COLL, [kw('COLLAGÈNE MARIN', r('collagène'), {y: 250, size: 120, color: 'accent', stack: true}),
      kw('TYPE I', r('type'), {y: 360, size: 100, stack: true}),
      kw('riche en vitamines C et E naturelles (selon l’emballage)', r('riche'), {y: 430, size: 34, small: true, stack: true})]),
    ALLEG(r, r('trois') - 0.08),
    {kind: 'reviews', from: r('quatre') - 0.08, rating: 4.6, reviews: 347, sold: 4835, soldLabel: 'PACKS VENDUS', ratingAt: r('quatre') + 0.1, soldAt: r('presque')},
    PDEAL(r('quarante-cinq') - 0.08, r('quarante-cinq')),
    PCTA(r, r('panier') - 0.1, ['LIVRAISON GRATUITE'], [r('panier')]),
  ],
});

export const packNoel = variant({
  id: 'pack-noel', timings: d5, ...PACK, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE CADEAU DE NOËL\nDE TON POTE DE SALLE 🎁', 0, {size: 120})]},
    B(r('et') - 0.08, [T1('LIVRÉ AVANT NOËL', r('livré'), {size: 150, stack: true}), SM('livraison prévue du 1er au 5 décembre selon la fiche', r('livré') + 0.2, 430)]),
    PH(r('Pack') - 0.2, CREA, [kw('CRÉATINE CREAPURE®', r('créatine'), {y: 250, size: 110, color: 'accent', stack: true}),
      kw('500 G', r('cinq'), {y: 360, size: 110, stack: true})]),
    PH(r('et', 2) - 0.08, COLL, [kw('+ COLLAGÈNE MARIN', r('collagène'), {y: 250, size: 120, color: 'accent', stack: true}),
      kw('TYPE I · 90 GÉLULES', r('type'), {y: 360, size: 90, stack: true})]),
    B(r('deux') - 0.08, [ST('2 PRODUITS', r('deux'), 280, {size: 160, color: 'accent'}), ST('1 SEUL COLIS', r('seul'), 450, {size: 150}),
      ST('MARQUE FRANÇAISE 🇫🇷', r('marque'), 600, {size: 100})]),
    ALLEG(r, r('trois') - 0.08),
    PDEAL(r('quarante-cinq') - 0.08, r('quarante-cinq')),
    PCTA(r, r('livraison') - 0.08, ['LIVRAISON GRATUITE', 'OFFRE-LUI LE PACK 🎁'], [r('livraison'), r('offre-lui')]),
  ],
});

/* ------------------------------------------------------------------ CRÈME DE RIZ */
const RIZ = {accent: '#A65CE8', productImage: 'videos/riz-flan/produit.png', productScale: 0.9,
  priceTag: {text: '30,90 € · 66 DOSES', sub: '0,47 € LA DOSE · -12 %'}};
const RDEAL = (from: number, badgeAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 35.06, newPrice: 30.9, discount: '-12 %', badgeAt, strikeAt: badgeAt + 0.25, newAt: badgeAt + 0.55, keywords});
const RCTA = (r: R, from: number, lines: string[], ats: number[]) => CTA(r, from,
  lines.map((t, i) => kw(t, ats[i], {y: 490 + i * 110, size: 100, stack: true, color: i ? 'white' : 'accent'})));
const GLU = (r: R, from: number, extra: It[] = []) => CUT(from, [{label: '23 G DE GLUCIDES', sub: 'par dose de 30 g', at: r('vingt-trois')}, {label: '0 SUCRE', at: r('zéro')}, ...extra]);

export const rizFlan = variant({
  id: 'riz-flan', timings: e1, ...RIZ, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('UN FLAN BISCUIT\nEN 1 MINUTE ?!', 0, {size: 170})]},
    B(r('Une') - 0.08, [ST('1 DOSE DE CRÈME DE RIZ', r('dose'), 280, {size: 100, color: 'accent'}), ST('+ 50 ML DE LAIT', r('cinquante'), 420, {size: 130}),
      ST('+ 1 MIN AU MICRO-ONDES', r('minute', 2), 560, {size: 100, color: 'accent'})]),
    B(r('et') - 0.08, [T1('TEXTURE\nFLAN 🍮', r('texture'), {size: 200, impact: true})]),
    GLU(r, r('vingt-trois') - 0.08),
    B(r('deux') - 0.08, [ST('2 KG', r('deux'), 300, {size: 200, color: 'accent'}), ST('66 DOSES', r('soixante-six'), 500, {size: 170})]),
    RDEAL(r('trente') - 0.08, r('trente')),
    RCTA(r, r('Black') - 0.08, ["BLACK FRIDAY · JUSQU'AU 30/11", 'LIVRAISON GRATUITE'], [r('Black'), r('livraison')]),
  ],
});

export const rizFromageBlanc = variant({
  id: 'riz-fromageblanc', timings: e2, ...RIZ, jacket: JACKETS[2], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TON FROMAGE BLANC\nEST FADE ?!', 0, {size: 160})]},
    B(r('Balance') - 0.08, [T1('BALANCE UNE DOSE\nDE CRÈME DE RIZ', r('Balance'), {size: 140, stack: true}), ST('SAVEUR BISCUIT 🍪', r('saveur'), 560, {size: 120, color: 'white'})]),
    CUT(r('deux') - 0.08, [{label: '250 G DE FROMAGE BLANC', at: r('deux')}, {label: '+ 30 G DE CRÈME DE RIZ', at: r('trente')}],
      'lid', [kw("= UN DESSERT", r('dessert'), {y: 560, size: 130, color: 'white', stack: true})]),
    B(r('vingt-trois') - 0.08, [ST('+ 23 G DE GLUCIDES', r('vingt-trois'), 290, {size: 130, color: 'accent'}), ST('0 SUCRE · VEGAN', r('zéro'), 450, {size: 120})]),
    B(r('quarante-sept') - 0.08, [T1('0,47 €\nLA DOSE', r('quarante-sept'), {size: 220, impact: true})]),
    RDEAL(r('moins') - 0.08, r('moins')),
    RCTA(r, r('livraison') - 0.08, ['LIVRAISON GRATUITE'], [r('livraison')]),
  ],
});

export const rizCroissant = variant({
  id: 'riz-croissant', timings: e3, ...RIZ, jacket: JACKETS[0], format: 'comparatif',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TA DOSE DE GLUCIDES\nMOINS CHÈRE QU’UN\nCROISSANT 🥐', 0, {size: 120})]},
    {kind: 'price', from: r('La') - 0.08, price: 30.9, doses: 66, divLabel: 'DOSES', unitLabel: 'LA DOSE',
      priceAt: r('trente'), dividerAt: r('divisé'), resultAt: r('quarante-sept')},
    GLU(r, r('vingt-trois') - 0.08, [{label: '106 KCAL', sub: 'par dose', at: r('cent')}, {label: 'SAVEUR BISCUIT', at: r('saveur')}]),
    B(r('et') - 0.08, [T1('DANS TON SHAKER\nDE WHEY', r('shaker'), {size: 170})]),
    RDEAL(r('Black') - 0.08, r('Black'), [kw("JUSQU'AU 30/11", r('novembre'), {y: 840, size: 90, stack: true})]),
    RCTA(r, r('livraison') - 0.08, ['LIVRAISON GRATUITE'], [r('livraison')]),
  ],
});

export const rizJambes = variant({
  id: 'riz-jambes', timings: e4, ...RIZ, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('SÉANCE JAMBES\nCE SOIR 🦵', 0, {size: 190, stack: true}),
      ST("ET RIEN MANGÉ\nDEPUIS MIDI ?!", r('rien'), 600, {size: 120, color: 'alert', impact: true})]},
    B(r('Une') - 0.08, [T1('1 H AVANT :\nUN SHAKER', r('heure'), {size: 180})]),
    GLU(r, r('vingt-trois') - 0.08, [{label: 'FAIBLE EN MATIÈRES GRASSES', at: r('faible')}]),
    B(r('et', 2) - 0.08, [T1('ÇA PASSE\nTOUT SEUL', r('passe'), {size: 190, impact: true}), ]),
    {kind: 'reviews', from: r('presque') - 0.08, rating: 4.5, reviews: 746, sold: 8959, ratingAt: r('quatre') + 0.1, soldAt: r('presque') + 0.1},
    RDEAL(r('trente') - 0.08, r('trente')),
    RCTA(r, r('livraison') - 0.08, ['LIVRAISON GRATUITE', 'BLACK FRIDAY'], [r('livraison'), r('livraison') + 0.3]),
  ],
});

export const rizGainer = variant({
  id: 'riz-gainer', timings: e5, ...RIZ, jacket: JACKETS[2], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TU GALÈRES À MANGER\nASSEZ ?!', 0, {size: 160})]},
    B(r('Ajoute') - 0.08, [T1('AJOUTE DES GLUCIDES\nSANS TE GAVER', r('Ajoute'), {size: 140})]),
    CUT(r('soixante-dix-sept') - 0.08, [{label: '77 % DE GLUCIDES', at: r('soixante-dix-sept')}, {label: 'SAVEUR BISCUIT', at: r('saveur')},
      {label: 'SANS GLUTEN · SANS LACTOSE', at: r('sans')}]),
    B(r('une') - 0.08, [ST('1 À 2 DOSES / JOUR', r('une'), 290, {size: 140, color: 'accent'}), ST("DANS L'EAU OU\nAVEC TA WHEY", r("l'eau"), 480, {size: 120})]),
    B(r('deux', 2) - 0.08, [ST('2 KG', r('deux', 2), 300, {size: 200, color: 'accent'}), ST('66 DOSES', r('soixante-six'), 500, {size: 170})]),
    RDEAL(r('trente') - 0.08, r('trente')),
    RCTA(r, r('livraison') - 0.08, ['LIVRAISON GRATUITE', 'BLACK FRIDAY'], [r('livraison'), r('livraison') + 0.3]),
  ],
});
