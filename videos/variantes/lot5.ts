/**
 * Lot du 27/11 (3) : Nutrimea — 5 × Pack Force (créatine Creapure 500 g + collagène marin 90 gél.) et 5 × crème de riz 2 kg.
 * Angle salle / prise de masse / winter arc + promos Black Friday (fiches du 27/11). Règles visuelles 1–9.
 * Pack : les visuels « plus de force / moins de blessures / prévention des blessures » de la fiche ne sont PAS repris
 * (allégations non autorisées) ; seule l'allégation UE créatine 3 g est utilisée. Collagène : aucune allégation.
 */
import {variant, kw, JACKETS} from '../../src/lib/variant';
import p1 from '../../public/videos/pack-winterarc/timings.json';
import p2 from '../../public/videos/pack-22/timings.json';
import p3 from '../../public/videos/pack-144/timings.json';
import p4 from '../../public/videos/pack-bulk/timings.json';
import p5 from '../../public/videos/pack-retour/timings.json';
import r1 from '../../public/videos/riz-masse/timings.json';
import r2 from '../../public/videos/riz-winterarc/timings.json';
import r3 from '../../public/videos/riz-dose/timings.json';
import r4 from '../../public/videos/riz-recette/timings.json';
import r5 from '../../public/videos/riz-9000/timings.json';

type R = (w: string, n?: number) => number;
type K = ReturnType<typeof kw>;
type It = {label: string; sub?: string; at: number};
const B = (from: number, keywords: K[]) => ({kind: 'benefit' as const, from, keywords});
const CUT = (from: number, items: It[], style: 'lid' | 'zoom' = 'lid', keywords: K[] = []) =>
  ({kind: 'cutaway' as const, from, openAt: from + 0.1, style, items, keywords});
const CTA = (r: R, from: number, keywords: K[] = []) => ({kind: 'cta' as const, from, arrowAt: r('panier'), keywords});
const T1 = (text: string, at: number, o: Record<string, unknown> = {}) => kw(text, at, {y: text.includes('\n') ? 340 : 300, size: 140, color: 'accent', ...o});
const ST = (text: string, at: number, y: number, o = {}) => kw(text, at, {y, size: 110, stack: true, ...o});
const WARN = (text: string, at: number) => kw(text, at, {y: 600, size: 30, small: true, stack: true});

/* ------------------------------------------------------------------ PACK FORCE */
const WARN_PACK = "Compléments alimentaires. Déconseillés aux femmes enceintes ou allaitantes et aux enfants.\nNe pas dépasser la dose journalière indiquée.";
const PACK = {accent: '#E8323C', productImage: 'videos/pack-winterarc/produit.png', productScale: 0.85,
  priceTag: {text: '45,90 € · -22 %', sub: "BLACK FRIDAY JUSQU'AU 30/11"}};
const PDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 58.8, newPrice: 45.9, discount: '-22 %', badgeAt, strikeAt, newAt, keywords});
const ALLEG = (r: R, from: number) => ({
  kind: 'power' as const, from, fillFrom: from + 0.1, fillTo: r('répétés'), dumbbells: [r('courts'), r('intenses'), r('répétés')],
  keywords: [
    kw('3 G DE CRÉATINE PAR JOUR', from + 0.05, {y: 240, size: 100, stack: true}),
    kw('AUGMENTENT LA\nPERFORMANCE PHYSIQUE', r('performance'), {y: 410, size: 100, color: 'accent', stack: true}),
    kw("LORS D'EXERCICES COURTS,\nINTENSES ET RÉPÉTÉS", r('courts'), {y: 590, size: 80, stack: true}),
  ],
});
const PCUT = (from: number, a: number, b: number, c?: number) => CUT(from, [
  {label: 'CRÉATINE CREAPURE®', sub: '500 g · 144 doses', at: a},
  {label: 'COLLAGÈNE MARIN', sub: 'type I · 90 gélules', at: b},
  ...(c !== undefined ? [{label: 'TESTÉE ANTIDOPAGE', at: c}] : [])], 'zoom');
const PCTA = (r: R, from: number, keywords: K[] = []) => CTA(r, from, [...keywords.map((k, i) => ({...k, y: 480 + i * 95, size: Math.min(k.size ?? 90, 85)})), {...WARN(WARN_PACK, from + 0.05), y: 480 + keywords.length * 95 + 20}]);

export const packWinterArc = variant({
  id: 'pack-winterarc', timings: p1, ...PACK, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('WINTER ARC\nACTIVÉ ❄️', 0, {size: 180, y: 290, stack: true}),
      ST('ET TON PLACARD\nEST VIDE ?!', r('rien'), 640, {size: 120, color: 'alert', impact: true})]},
    B(r('Le') - 0.08, [T1('PACK FORCE\nNUTRIMEA', r('Pack'), {size: 180})]),
    PCUT(r('créatine') - 0.08, r('créatine'), r('collagène')),
    PDEAL(r('quarante-cinq') - 0.08, r('quarante-cinq'), r('cinquante-huit'), r('quarante-cinq') + 0.3),
    ALLEG(r, r('trois') - 0.08),
    PCTA(r, r('Black') - 0.08, [ST("BLACK FRIDAY · JUSQU'AU 30/11", r('Black'), 380, {size: 100, color: 'accent'}), ST('LIVRAISON GRATUITE', r('livraison'), 510, {size: 80})]),
  ],
});

export const pack22 = variant({
  id: 'pack-22', timings: p2, ...PACK, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('-22 % SUR LE\nPACK DE LA SALLE', 0, {size: 160}),
      kw('QUI A VALIDÉ\nCE PRIX ?!', r('validé'), {y: 340, size: 160, color: 'alert', impact: true})]},
    PCUT(r('Créatine') - 0.08, r('Créatine'), r('collagène')),
    PDEAL(r('cinquante-huit') - 0.08, r('cinquante-huit'), r('barré'), r('quarante-cinq')),
    B(r('le', 2) - 0.08, [T1('LE PLUS BAS\nSUR 30 JOURS', r('plus'), {size: 170, impact: true})]),
    ALLEG(r, r('trois') - 0.08),
    PCTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 380, {size: 90, color: 'accent'}), ST("JUSQU'AU 30/11", r("jusqu'au"), 500, {size: 100})]),
  ],
});

export const pack144 = variant({
  id: 'pack-144', timings: p3, ...PACK, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('144 DOSES\nDE CRÉATINE', 0, {size: 200, stack: true}), ST('DANS UN SEUL SACHET ?!', r('seul'), 600, {size: 110, impact: true})]},
    B(r('Le') - 0.08, [T1('PACK FORCE\nNUTRIMEA', r('Pack'), {size: 180})]),
    PCUT(r('cinq') - 0.08, r('cinq'), r('quatre-vingt-dix'), r('testée')),
    ALLEG(r, r('trois') - 0.08),
    PDEAL(r('quarante-cinq') - 0.08, r('quarante-cinq'), r('cinquante-huit'), r('quarante-cinq') + 0.3),
    PCTA(r, r('panier') - 0.1, [ST('LIVRAISON GRATUITE', r('panier'), 420, {size: 90, color: 'accent'})]),
  ],
});

export const packBulk = variant({
  id: 'pack-bulk', timings: p4, ...PACK, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1("TON BULK D'HIVER\nA COMMENCÉ", 0, {size: 160, y: 300, stack: true}),
      ST('ET PAS DE CRÉATINE ?!', r('toujours'), 600, {size: 120, color: 'alert', impact: true})]},
    PCUT(r('Prends') - 0.08, r('Prends') + 0.15, r('collagène')),
    ALLEG(r, r('trois') - 0.08),
    {kind: 'reviews', from: r('quatre') - 0.08, rating: 4.6, reviews: 347, sold: 4835, ratingAt: r('quatre') + 0.1, soldAt: r('étoiles')},
    PDEAL(r('moins') - 0.08, r('moins'), r('moins') + 0.25, r('vingt-deux') + 0.2),
    PCTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 420, {size: 90, color: 'accent'})]),
  ],
});

export const packRetour = variant({
  id: 'pack-retour', timings: p5, ...PACK, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE PACK QUI A FAIT\nLE BUZZ EST DE RETOUR', 0, {size: 120, stack: true}),
      kw('selon la marque', 0.1, {y: 470, size: 40, small: true, stack: true})]},
    {kind: 'reviews', from: r('Plus') - 0.08, rating: 4.6, reviews: 347, sold: 4835, ratingAt: r('quatre', 2), soldAt: r('Plus') + 0.1},
    PCUT(r('créatine') - 0.08, r('créatine'), r('collagène')),
    B(r('fabriqué') - 0.08, [T1('MARQUE\nFRANÇAISE 🇫🇷', r('française'), {size: 180})]),
    ALLEG(r, r('trois') - 0.08),
    PDEAL(r('quarante-cinq') - 0.08, r('quarante-cinq'), r('quarante-cinq') + 0.2, r('quatre-vingt-dix') + 0.1),
    PCTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 420, {size: 90, color: 'accent'})]),
  ],
});

/* ------------------------------------------------------------------ CRÈME DE RIZ (aliment, pas de complément) */
const RIZ = {accent: '#A65CE8', productImage: 'videos/riz-masse/produit.png', productScale: 0.9,
  priceTag: {text: '30,90 € · 66 DOSES', sub: '0,47 € LA DOSE · -12 %'}};
const RDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 35.06, newPrice: 30.9, discount: '-12 %', badgeAt, strikeAt, newAt, keywords});
const NUTRI = (from: number, items: It[]) => CUT(from, items);
const RAVIS = (from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.5, reviews: 746, sold: 8959, ratingAt, soldAt});
const RCTA = (r: R, from: number, keywords: K[] = []) => CTA(r, from, keywords);

export const rizMasse = variant({
  id: 'riz-masse', timings: r1, ...RIZ, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('PRISE DE MASSE', 0, {size: 200, stack: true}),
      ST('TU GALÈRES À MANGER\nTES GLUCIDES ?!', r('galères'), 560, {size: 110, color: 'alert', impact: true})]},
    B(r('La') - 0.08, [T1('CRÈME DE RIZ\nSAVEUR BISCUIT', r('crème'), {size: 170})]),
    NUTRI(r('vingt-trois') - 0.08, [{label: '23 G DE GLUCIDES', sub: 'par dose', at: r('vingt-trois')}, {label: '0 SUCRE', at: r('zéro')}]),
    B(r('un') - 0.08, [T1("UN SHAKER\nET C'EST PLIÉ", r('shaker'), {size: 180, impact: true})]),
    B(r('deux') - 0.08, [ST('2 KG', r('deux'), 300, {size: 200, color: 'accent'}), ST('66 DOSES', r('soixante-six'), 500, {size: 170})]),
    RDEAL(r('trente') - 0.08, r('trente'), r('trente-cinq'), r('trente') + 0.3),
    RCTA(r, r('Black') - 0.08, [ST("BLACK FRIDAY\nJUSQU'AU 30/11", r('Black'), 500, {size: 100, color: 'accent'}), ST('LIVRAISON GRATUITE', r('livraison'), 690, {size: 90})]),
  ],
});

export const rizWinterArc = variant({
  id: 'riz-winterarc', timings: r2, ...RIZ, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('WINTER ARC ❄️', 0, {size: 200, stack: true}),
      ST("ET TON PETIT-DÉJ\nC'EST UN CAFÉ ?!", r('petit-déj'), 560, {size: 120, color: 'alert', impact: true})]},
    B(r('Sérieux') - 0.08, [kw('ARRÊTE !', r('arrête'), {y: 320, size: 240, color: 'alert', impact: true})]),
    B(r('Crème') - 0.08, [T1('CRÈME DE RIZ\nSAVEUR BISCUIT', r('Crème'), {size: 170})]),
    NUTRI(r('soixante-dix-sept') - 0.08, [{label: '77 % DE GLUCIDES', at: r('soixante-dix-sept')}, {label: '0 SUCRE', at: r('zéro')},
      {label: 'VEGAN · SANS GLUTEN', at: r('vegan')}]),
    {kind: 'price', from: r('soixante-six') - 0.08, price: 30.9, doses: 66, divLabel: 'DOSES', unitLabel: 'LA DOSE',
      priceAt: r('trente'), dividerAt: r('soixante-six') + 0.2, resultAt: r('quatre-vingt-dix') + 0.3},
    RDEAL(r('moins') - 0.08, r('moins'), r('douze'), r('Black')),
    RCTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 520, {size: 100, color: 'accent'})]),
  ],
});

export const rizDose = variant({
  id: 'riz-dose', timings: r3, ...RIZ, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('0,47 €\nLA DOSE ?!', 0, {size: 230})]},
    {kind: 'price', from: r('Nutrimea') - 0.08, price: 30.9, doses: 66, divLabel: 'DOSES', unitLabel: 'LA DOSE',
      priceAt: r('trente'), dividerAt: r('divisé'), resultAt: r('même'),
      keywords: [kw('CRÈME DE RIZ · 2 KG', r('Nutrimea'), {y: 380, size: 120, color: 'accent', until: r('trente') - 0.05})]},
    NUTRI(r('vingt-trois') - 0.08, [{label: '23 G DE GLUCIDES', at: r('vingt-trois')}, {label: '106 KCAL', sub: 'par dose', at: r('cent')},
      {label: '0 SUCRE', at: r('zéro')}, {label: 'SAVEUR BISCUIT', at: r('saveur')}]),
    RDEAL(r('Black') - 0.08, r('Black'), r('Black') + 0.25, r('Friday') + 0.3, [kw("JUSQU'AU 30/11", r('novembre'), {y: 840, size: 90, stack: true})]),
    RCTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 520, {size: 100, color: 'accent'})]),
  ],
});

export const rizRecette = variant({
  id: 'riz-recette', timings: r4, ...RIZ, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE PETIT-DÉJ DE\nPRISE DE MASSE', 0, {size: 160, stack: true}), ST('NOTE BIEN 📝', r('note'), 560, {size: 130})]},
    CUT(r('Cinquante') - 0.08, [{label: '50 G DE CRÈME DE RIZ', at: r('Cinquante')}, {label: '30 G DE WHEY', at: r('trente')},
      {label: '200 ML DE LAIT', at: r('deux')}]),
    B(r('tu') - 0.08, [ST('TU CHAUFFES', r('chauffes'), 290, {size: 140, color: 'accent'}), ST('TU MÉLANGES', r('mélanges'), 450, {size: 140}),
      ST('ÇA ÉPAISSIT', r('épaissit'), 610, {size: 140, color: 'accent'})]),
    B(r('et') - 0.08, [T1('UN BOL\nDE MALADE 🔥', r('bol'), {size: 190, impact: true})]),
    B(r('la', 2) - 0.08, [T1('CRÈME DE RIZ\nSAVEUR BISCUIT', r('crème', 2), {size: 170})]),
    RDEAL(r('deux', 2) - 0.08, r('deux', 2), r('deux', 2) + 0.25, r('deux', 2) + 0.6, [kw('2 KG · 66 DOSES', r('deux', 2), {y: 840, size: 90, stack: true})]),
    RCTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 520, {size: 100, color: 'accent'})]),
  ],
});

export const riz9000 = variant({
  id: 'riz-9000', timings: r5, ...RIZ, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('PRESQUE 9 000\nVENDUS', 0, {size: 200})]},
    RAVIS(r('quatre') - 0.08, r('quatre') + 0.1, r('quatre') - 0.05),
    B(r('La') - 0.08, [T1('CRÈME DE RIZ\nSAVEUR BISCUIT', r('crème'), {size: 170})]),
    NUTRI(r('vingt-trois') - 0.08, [{label: '23 G DE GLUCIDES', sub: 'par dose', at: r('vingt-trois')}, {label: '0 SUCRE', at: r('zéro')},
      {label: 'FAIBLE EN MATIÈRES GRASSES', at: r('faible')}]),
    B(r('parfaite') - 0.08, [T1('DANS TON SHAKER\nDE WHEY', r('shaker'), {size: 170})]),
    RDEAL(r('trente') - 0.08, r('trente'), r('trente') + 0.25, r('trente') + 0.55),
    RCTA(r, r('Black') - 0.08, [ST('BLACK FRIDAY', r('Black'), 500, {size: 130, color: 'accent'}), ST('LIVRAISON GRATUITE', r('livraison'), 640, {size: 90})]),
  ],
});
