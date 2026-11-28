/**
 * Lot du 28/11 : ZAP menthe verte DUO (150 mg) ×5, medicube set de 3 toner pads ×5, medicube duo bleu + rouge ×5.
 * Fiches au 28/11 (captures produits/zap-menthe-duo, produits/medicube-toner-pads/capture-*-prix-28-11.png).
 * Medicube = cosmétique : bénéfices attribués (« selon la marque »). Duo medicube < 30 € : livraison payante → jamais « gratuite ».
 */
import {variant, kw, JACKETS} from '../../src/lib/variant';
import z1 from '../../public/videos/zapm-150/timings.json';
import z2 from '../../public/videos/zapm-40cts/timings.json';
import z3 from '../../public/videos/zapm-cerise/timings.json';
import z4 from '../../public/videos/zapm-seance/timings.json';
import z5 from '../../public/videos/zapm-deux/timings.json';
import t1 from '../../public/videos/trio-ouatte/timings.json';
import t2 from '../../public/videos/trio-complete/timings.json';
import t3 from '../../public/videos/trio-210/timings.json';
import t4 from '../../public/videos/trio-noel/timings.json';
import t5 from '../../public/videos/trio-plusbas/timings.json';
import d1 from '../../public/videos/duo-ouatte/timings.json';
import d2 from '../../public/videos/duo-bleurouge/timings.json';
import d3 from '../../public/videos/duo-17cts/timings.json';
import d4 from '../../public/videos/duo-pores/timings.json';
import d5 from '../../public/videos/duo-20/timings.json';

type R = (w: string, n?: number) => number;
type K = ReturnType<typeof kw>;
type It = {label: string; sub?: string; at: number};
const B = (from: number, keywords: K[]) => ({kind: 'benefit' as const, from, keywords});
const CUT = (from: number, items: It[], style: 'lid' | 'zoom' = 'lid', keywords: K[] = []) =>
  ({kind: 'cutaway' as const, from, openAt: from + 0.1, style, items, keywords});
const T1 = (text: string, at: number, o: Record<string, unknown> = {}) => kw(text, at, {y: text.includes('\n') ? 340 : 300, size: 140, color: 'accent', ...o});
const ST = (text: string, at: number, y: number, o = {}) => kw(text, at, {y, size: 110, stack: true, ...o});
const SM = (text: string, at: number, y: number) => kw(text, at, {y, size: 34, small: true, stack: true});
const SELON = (at: number, y: number) => kw('selon la marque', at, {y, size: 40, small: true, stack: true});
/** CTA : lignes empilées sous le bouton panier, puis mention éventuelle. */
const CTA = (r: R, from: number, lines: [string, number][], warn?: string) => ({kind: 'cta' as const, from, arrowAt: r('panier'), keywords: [
  ...lines.map(([t, at], i) => kw(t, at, {y: 480 + i * 100, size: 90, stack: true, color: i ? 'white' : 'accent'})),
  ...(warn ? [kw(warn, from + 0.05, {y: 500 + lines.length * 100, size: 30, small: true, stack: true})] : [])]});

/* ------------------------------------------------------------------ ZAP MENTHE VERTE (150 mg) */
const WARN150 = 'Contient de la caféine (150 mg/sachet).\nDéconseillé aux enfants et aux femmes\nenceintes ou allaitantes.';
const ZAP = {accent: '#5CC46A', productImage: 'videos/zapm-150/produit.png', productScale: 0.44,
  priceTag: {text: '14,37 € · 36 SACHETS', sub: '0,40 € LE SACHET · LIVRAISON GRATUITE'}};
const ZDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 15.13, newPrice: 14.37, discount: '-5 %', badgeAt, strikeAt, newAt, keywords});
const EXPR2 = (from: number, zapAt: number, exprAt: number) => ({kind: 'compare' as const, from, title: 'CAFÉINE', at: zapAt, rows: [
  {label: 'ZAP menthe (1 sachet)', value: 150, display: '150 MG', highlight: true, at: zapAt},
  {label: '2 expressos (repère EFSA)', value: 160, display: '≈ 160 MG', at: exprAt}]});
const ZCUT = (from: number, items: It[]) => CUT(from, items, 'zoom');

export const zapm150 = variant({
  id: 'zapm-150', timings: z1, ...ZAP, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('150 MG DE CAFÉINE\nDANS 1 SACHET ?!', 0, {size: 140})]},
    B(r('Le') - 0.08, [T1('NOUVEAU ZAP\nMENTHE VERTE 🌿', r('ZAP'), {size: 170})]),
    EXPR2(r("c'est") - 0.08, r("c'est"), r('expressos')),
    ZCUT(r('avec') - 0.08, [{label: 'L-THÉANINE', at: r('avec')}, {label: 'VITAMINES B', at: r('vitamines')}, {label: 'FABRIQUÉ EN SUÈDE', at: r('fabriqué')}]),
    B(r('tu') - 0.08, [ST('SOUS LA LÈVRE', r('cales'), 300, {size: 150, color: 'accent'}), ST('GOÛT MENTHE FRAIS', r('goût'), 470, {size: 120})]),
    ZDEAL(r('trente-six') - 0.08, r('trente-six'), r('trente-six') + 0.25, r('quatorze'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('Black') - 0.08, [["BLACK FRIDAY · JUSQU'AU 30/11", r('Black')]], WARN150),
  ],
});

export const zapm40 = variant({
  id: 'zapm-40cts', timings: z2, ...ZAP, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('0,40 €\nLE SACHET ?!', 0, {size: 220, stack: true}), ST('150 MG DE CAFÉINE', r('cent'), 620, {size: 110, color: 'white'})]},
    B(r('ZAP') - 0.08, [T1('ZAP MENTHE VERTE\nLE DUO', r('ZAP'), {size: 160})]),
    {kind: 'price', from: r('quatorze') - 0.08, price: 14.37, doses: 36, divLabel: 'SACHETS', unitLabel: 'LE SACHET',
      priceAt: r('quatorze'), dividerAt: r('divisé'), resultAt: r('même')},
    B(r('moins') - 0.08, [T1("MOINS CHER QU'UN\nCAFÉ EN TERRASSE ☕", r('moins'), {size: 140, impact: true})]),
    CTA(r, r('livraison') - 0.08, [['LIVRAISON GRATUITE', r('livraison')], ['LE PLUS BAS SUR 30 JOURS', r('prix')]], WARN150),
  ],
});

export const zapmCerise = variant({
  id: 'zapm-cerise', timings: z3, ...ZAP, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('T’AS KIFFÉ\nLA CERISE NOIRE ?', 0, {size: 170}),
      kw('ATTENDS LA\nMENTHE VERTE 🌿', r('Attends'), {y: 340, size: 170, color: 'white', impact: true})]},
    {kind: 'compare' as const, from: r('ZAP') - 0.08, title: 'CAFÉINE PAR SACHET', at: r('cent'), rows: [
      {label: 'ZAP menthe verte', value: 150, display: '150 MG', highlight: true, at: r('cent')},
      {label: 'ZAP cerise noire', value: 100, display: '100 MG', at: r('plus')}]},
    ZCUT(r('elle-théanine') - 0.1, [{label: 'L-THÉANINE', at: r('elle-théanine')}, {label: 'VITAMINES B', at: r('vitamines')}, {label: 'GOÛT FRAIS', at: r('goût')}]),
    B(r('discret') - 0.08, [T1('DISCRET\nSOUS LA LÈVRE', r('discret'), {size: 180})]),
    ZDEAL(r('trente-six') - 0.08, r('trente-six'), r('trente-six') + 0.25, r('quatorze'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [["BLACK FRIDAY · JUSQU'AU 30/11", r('panier')]], WARN150),
  ],
});

export const zapmSeance = variant({
  id: 'zapm-seance', timings: z4, ...ZAP, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1("7 H DU MAT'\nMODE ZOMBIE ?! 🧟", 0, {size: 170})]},
    B(r('Un') - 0.08, [T1('1 SACHET\nSOUS LA LÈVRE', r('sachet'), {size: 180})]),
    EXPR2(r('cent') - 0.08, r('cent'), r('expressos')),
    ZCUT(r('avec') - 0.08, [{label: 'L-THÉANINE', at: r('avec')}, {label: 'VITAMINES B', at: r('vitamines')}]),
    B(r('zéro') - 0.08, [ST('0 CAFÉ À PRÉPARER', r('zéro'), 300, {size: 120, color: 'accent'}), ST('ÇA TIENT DANS\nTA POCHE', r('tient'), 490, {size: 130})]),
    ZDEAL(r('trente-six') - 0.08, r('trente-six'), r('trente-six') + 0.25, r('quatorze'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [["BLACK FRIDAY · JUSQU'AU 30/11", r('panier')]], WARN150),
  ],
});

export const zapmDeux = variant({
  id: 'zapm-deux', timings: z5, ...ZAP, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('ASTUCE\nBLACK FRIDAY 💡', 0, {size: 200})]},
    B(r('Sur') - 0.08, [T1('-20 % AU-DELÀ\nDE 25 €', r('moins'), {size: 180, impact: true, stack: true}), SM("selon l'offre affichée sur la fiche", r('moins') + 0.2, 500)]),
    B(r('donc') - 0.08, [ST('2 DUOS MENTHE', r('deux'), 280, {size: 140, color: 'accent'}), ST('72 SACHETS', r('soixante-douze'), 440, {size: 150}),
      ST('≈ 23 €', r('vingt-trois'), 630, {size: 200, color: 'accent', impact: true})]),
    ZCUT(r('cent', 2) - 0.08, [{label: 'CAFÉINE', sub: '150 mg / sachet', at: r('cent', 2)}, {label: 'L-THÉANINE', at: r('elle-théanine')}, {label: 'VITAMINES B', at: r('vitamines')}]),
    CTA(r, r('livraison') - 0.08, [['LIVRAISON GRATUITE', r('livraison')], ["JUSQU'AU 30/11", r("jusqu'au")]], WARN150),
  ],
});

/* ------------------------------------------------------------------ MEDICUBE SET DE 3 (44 € / 35,20 € avec coupons) */
const TRIO = {accent: '#FF6B5A', productImage: 'videos/trio-ouatte/produit.png', productScale: 0.82,
  priceTag: {text: '44,00 € · -12 %', sub: '35,20 € AVEC COUPONS'}};
const TDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 49.99, newPrice: 44, discount: '-12 %', badgeAt, strikeAt, newAt, keywords});
const COUP = (at: number) => kw('35,20 € AVEC LES COUPONS', at, {y: 840, size: 80, color: 'accent', stack: true});
const T3 = (from: number, a: number, b: number, c: number, keywords: K[] = []) => CUT(from, [
  {label: 'DEEP VITA C', sub: 'vitamine C · niacinamide 2 %', at: a},
  {label: 'ZERO PORE', sub: 'AHA · BHA · panthénol', at: b},
  {label: 'RED PEELING', sub: 'acide succinique 0,5 %', at: c}], 'zoom', keywords);
const TAVIS = (from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.6, reviews: 178, sold: 2724, ratingAt, soldAt});

export const trioOuatte = variant({
  id: 'trio-ouatte', timings: t1, ...TRIO, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('3 POTS CORÉENS\nPOUR 35 BALLES ?!', 0, {size: 150, stack: true}), SM('avec les coupons', 0.1, 480)]},
    T3(r('Le') - 0.08, r('Deep'), r('Zero'), r('Peeling')),
    TDEAL(r('quarante-quatre') - 0.08, r('quarante-quatre'), r('quarante-neuf'), r('quarante-quatre') + 0.3, [COUP(r('trente-cinq', 2))]),
    B(r('pores') - 0.08, [ST('PORES NETS', r('pores'), 280, {size: 150, color: 'accent'}), ST('MOINS DE MARQUES\nPOST-IMPERFECTIONS', r('marques'), 460, {size: 85}),
      ST('ÉCLAT', r('éclat'), 630, {size: 150, color: 'accent'}), SELON(r('selon'), 725)]),
    CTA(r, r('livraison') - 0.08, [['LIVRAISON GRATUITE', r('livraison')], ['+ CADEAU OFFERT 🎁', r('cadeau')], ["BLACK FRIDAY · JUSQU'AU 30/11", r('Black')]]),
  ],
});

export const trioComplete = variant({
  id: 'trio-complete', timings: t2, ...TRIO, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('3 PADS QUI SE\nCOMPLÈTENT', 0, {size: 180})]},
    B(r('Le') - 0.08, [T1('DEEP VITA C', r('Deep'), {size: 180, stack: true}), ST('VITAMINE C · NIACINAMIDE', r('vitamine'), 470, {size: 85, color: 'white'})]),
    B(r('le', 2) - 0.08, [T1('ZERO PORE', r('Zero'), {size: 190, stack: true}), ST('AHA · BHA · PANTHÉNOL', r('AHA'), 470, {size: 95, color: 'white'})]),
    B(r('Red') - 0.15, [T1('RED PEELING', r('Red'), {size: 180, stack: true}), ST('ACIDE SUCCINIQUE · NIACINAMIDE', r('acide'), 470, {size: 75, color: 'white'})]),
    B(r('pour') - 0.08, [T1('EFFET GLASS SKIN ✨', r("l'effet"), {size: 150, stack: true}), SELON(r('selon'), 440)]),
    TDEAL(r('le', 4) - 0.08, r('set'), r('set') + 0.25, r('set') + 0.55, [COUP(r('trente-cinq'))]),
    CTA(r, r('livraison') - 0.08, [['LIVRAISON GRATUITE', r('livraison')]]),
  ],
});

export const trio210 = variant({
  id: 'trio-210', timings: t3, ...TRIO, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('210 PADS\nDANS 1 SET', 0, {size: 210})]},
    B(r('Trois') - 0.08, [T1('3 POTS\n× 70 PADS', r('Trois'), {size: 200})]),
    {kind: 'price', from: r('et') - 0.08, price: 35.2, doses: 210, divLabel: 'PADS', unitLabel: 'LE PAD',
      priceAt: r('trente-cinq'), dividerAt: r('ça'), resultAt: r('dix-sept'), keywords: [SM('avec les coupons', r('coupons'), 240)]},
    T3(r('vitamine') - 0.08, r('vitamine'), r('zéro'), r('peeling')),
    TAVIS(r('plus') - 0.08, r('quatre') + 0.1, r('plus') + 0.1),
    CTA(r, r('Black') - 0.08, [['BLACK FRIDAY', r('Black')], ['LIVRAISON GRATUITE', r('livraison')]]),
  ],
});

export const trioNoel = variant({
  id: 'trio-noel', timings: t4, ...TRIO, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE CADEAU DE NOËL\nPOUR TA COPINE 🎁', 0, {size: 130})]},
    T3(r('set') - 0.15, r('Deep'), r('Zero'), r('Red')),
    B(r('avec') - 0.08, [T1('+ CADEAU OFFERT', r('cadeau', 2), {size: 160, stack: true}), ST('LIVRÉ DU 2 AU 7 DÉC.', r('livré'), 470, {size: 110, color: 'white'}),
      SM('selon la fiche produit', r('livré') + 0.2, 560)]),
    TDEAL(r('quarante-quatre') - 0.08, r('quarante-quatre'), r('quarante-quatre') + 0.25, r('quarante-quatre') + 0.55, [COUP(r('trente-cinq'))]),
    B(r('prix') - 0.08, [T1('LE PLUS BAS\nSUR 30 JOURS', r('prix'), {size: 180, impact: true})]),
    CTA(r, r('livraison') - 0.08, [['LIVRAISON GRATUITE', r('livraison')]]),
  ],
});

export const trioPlusBas = variant({
  id: 'trio-plusbas', timings: t5, ...TRIO, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('PRIX LE PLUS BAS\nSUR 30 JOURS', 0, {size: 160})]},
    B(r('ça') - 0.08, [kw('ÇA SE RATE PAS !', r('rate'), {y: 320, size: 170, color: 'alert', impact: true})]),
    TDEAL(r('Trois') - 0.08, r('Trois'), r('barré'), r('quarante-quatre'), [COUP(r('trente-cinq'))]),
    T3(r('vitamine') - 0.08, r('vitamine'), r('AHA'), r('acide')),
    B(r('pour') - 0.08, [T1('PEAU NETTE', r('peau'), {size: 200, stack: true}), SELON(r('selon'), 440)]),
    TAVIS(r('quatre') - 0.08, r('quatre') + 0.1, r('quatre') - 0.05),
    CTA(r, r("jusqu'au") - 0.08, [["JUSQU'AU 30/11", r("jusqu'au")], ['LIVRAISON GRATUITE', r('livraison')]]),
  ],
});

/* ------------------------------------------------------------------ MEDICUBE DUO BLEU + ROUGE (29,99 € / 23,99 € avec coupons) */
const DUO = {accent: '#4A8CFF', productImage: 'videos/duo-ouatte/produit.png', productScale: 0.52,
  priceTag: {text: '29,99 € · -20 %', sub: '23,99 € AVEC COUPONS'}};
const DDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 37.5, newPrice: 29.99, discount: '-20 %', badgeAt, strikeAt, newAt, keywords});
const DCOUP = (at: number) => kw('23,99 € AVEC LES COUPONS', at, {y: 840, size: 80, color: 'accent', stack: true});
const D2 = (from: number, a: number, b: number, keywords: K[] = []) => CUT(from, [
  {label: 'ZERO PORE PAD', sub: 'AHA · BHA · panthénol', at: a},
  {label: 'RED PEELING PAD', sub: 'acide succinique', at: b}], 'zoom', keywords);
const DAVIS = (from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.6, reviews: 178, sold: 2724, ratingAt, soldAt});

export const duoOuatte = variant({
  id: 'duo-ouatte', timings: d1, ...DUO, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE DUO MEDICUBE\nÀ 23,99 € ?!', 0, {size: 160, stack: true}), SM('avec les coupons', 0.1, 480)]},
    D2(r('le', 2) - 0.08, r('bleu'), r('rouge')),
    B(r('pores') - 0.08, [ST('PORES NETS', r('pores'), 290, {size: 160, color: 'accent'}), ST('MOINS DE MARQUES\nPOST-IMPERFECTIONS', r('marques'), 480, {size: 85}),
      SELON(r('selon'), 590)]),
    DDEAL(r('vingt-neuf') - 0.08, r('vingt-neuf'), r('trente-sept'), r('vingt-neuf') + 0.3, [DCOUP(r('vingt-trois', 2))]),
    CTA(r, r('Black') - 0.08, [["BLACK FRIDAY · JUSQU'AU 30/11", r('Black')]]),
  ],
});

export const duoBleuRouge = variant({
  id: 'duo-bleurouge', timings: d2, ...DUO, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE BLEU\n+ LE ROUGE', 0, {size: 200, stack: true}), ST("C'EST LE DUO\nQUI PART ! 🔥", r('duo'), 700, {size: 110, color: 'white'})]},
    D2(r('Zero') - 0.08, r('Zero'), r('Red'), [SELON(r('selon'), 600)]),
    B(r('soixante-dix') - 0.08, [T1('70 PADS\nPAR POT', r('soixante-dix'), {size: 200})]),
    DDEAL(r('moins') - 0.08, r('moins'), r('moins') + 0.25, r('vingt-neuf'), [DCOUP(r('vingt-trois'))]),
    CTA(r, r('plus') - 0.08, [['+ CADEAU OFFERT 🎁', r('cadeau')], ["BLACK FRIDAY · JUSQU'AU 30/11", r('panier')]]),
  ],
});

export const duo17 = variant({
  id: 'duo-17cts', timings: d3, ...DUO, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('0,17 €\nLE PAD CORÉEN ?!', 0, {size: 200})]},
    {kind: 'price', from: r('le', 2) - 0.08, price: 23.99, doses: 140, divLabel: 'PADS', unitLabel: 'LE PAD',
      priceAt: r('vingt-trois'), dividerAt: r('avec'), resultAt: r('coupons') + 0.15,
      keywords: [kw('DUO · 140 PADS', r('cent'), {y: 380, size: 130, color: 'accent', until: r('vingt-trois') - 0.05}), SM('avec les coupons', r('coupons'), 240)]},
    D2(r('le', 3) - 0.08, r('Zero'), r('Peeling')),
    B(r("l'effet") - 0.08, [T1('EFFET GLASS SKIN ✨', r("l'effet"), {size: 150, stack: true}), SELON(r('selon'), 440)]),
    DAVIS(r('quatre') - 0.08, r('quatre') + 0.1, r('plus')),
    CTA(r, r('Black') - 0.08, [["BLACK FRIDAY · JUSQU'AU 30/11", r('Black')]]),
  ],
});

export const duoPores = variant({
  id: 'duo-pores', timings: d4, ...DUO, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TES PORES SE VOIENT\nÀ 3 MÈTRES ?!', 0, {size: 130})]},
    D2(r('Le') - 0.08, r('Zero'), r('Peeling')),
    B(r('des') - 0.08, [T1('PORES NETS', r('pores', 2), {size: 200, stack: true}), SELON(r('selon'), 440)]),
    B(r('un') - 0.08, [ST('1 PAD', r('pad', 2), 300, {size: 180, color: 'accent'}), ST('1 GESTE', r('geste'), 490, {size: 180}),
      ST("C'EST RÉGLÉ", r('réglé'), 660, {size: 140, color: 'accent', impact: true})]),
    DDEAL(r('vingt-neuf') - 0.08, r('vingt-neuf'), r('trente-sept'), r('vingt-neuf') + 0.3),
    CTA(r, r('panier') - 0.1, [["BLACK FRIDAY · JUSQU'AU 30/11", r('panier')]]),
  ],
});

export const duo20 = variant({
  id: 'duo-20', timings: d5, ...DUO, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('-20 % SUR LE\nDUO MEDICUBE', 0, {size: 170, stack: true}), ST('LE PLUS BAS\nSUR 30 JOURS', r('prix'), 620, {size: 110, color: 'white'})]},
    DDEAL(r('Trente-sept') - 0.08, r('Trente-sept'), r('barré'), r('vingt-neuf'), [DCOUP(r('vingt-trois'))]),
    D2(r('Zero') - 0.08, r('Zero'), r('Red'), [kw('140 PADS', r('cent', 2), {y: 600, size: 110, color: 'white', stack: true})]),
    CTA(r, r('cadeau') - 0.08, [['+ CADEAU OFFERT 🎁', r('cadeau')], ["BLACK FRIDAY · JUSQU'AU 30/11", r('Black')]]),
  ],
});
