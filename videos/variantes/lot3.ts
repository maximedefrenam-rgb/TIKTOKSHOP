/**
 * Lot du 27/11 : 5 vidéos × les 3 produits qui vendent (ZAP, Novoma, créatine OstroVit), angle prix choc,
 * règles visuelles 1–9 (cf. lot2.ts).
 */
import tZ1 from '../../public/videos/zap-ouatte/timings.json';
import tZ2 from '../../public/videos/zap-cafe-bar/timings.json';
import tZ3 from '../../public/videos/zap-calcul/timings.json';
import tZ4 from '../../public/videos/zap-seances/timings.json';
import tZ5 from '../../public/videos/zap-blackfriday/timings.json';
import tN1 from '../../public/videos/novoma-ouatte/timings.json';
import tN2 from '../../public/videos/novoma-mois/timings.json';
import tN3 from '../../public/videos/novoma-58/timings.json';
import tN4 from '../../public/videos/novoma-kebab/timings.json';
import tN5 from '../../public/videos/novoma-28k/timings.json';
import tC1 from '../../public/videos/creatine-ouatte/timings.json';
import tC2 from '../../public/videos/creatine-moyenne/timings.json';
import tC3 from '../../public/videos/creatine-gouts2/timings.json';
import tC4 from '../../public/videos/creatine-566/timings.json';
import tC5 from '../../public/videos/creatine-centdoses/timings.json';
import {variant, kw, JACKETS, WARN_CAFEINE} from '../../src/lib/variant';

type R = (w: string, n?: number) => number;
type K = ReturnType<typeof kw>;
const B = (from: number, keywords: K[]) => ({kind: 'benefit' as const, from, keywords});
const PH = (from: number, image: string, keywords: K[] = []) => ({kind: 'photo' as const, from, image, keywords});
const CUT = (from: number, items: {label: string; sub?: string; at: number}[], keywords: K[] = []) =>
  ({kind: 'cutaway' as const, from, openAt: from + 0.1, style: 'lid' as const, items, keywords});
const CTA = (r: R, from: number, keywords: K[] = []) => ({kind: 'cta' as const, from, arrowAt: r('panier'), keywords});
const WARN = (text: string, at: number) => kw(text, at, {y: 600, size: 30, small: true, stack: true});
const T1 = (text: string, at: number, o: Record<string, unknown> = {}) => kw(text, at, {y: text.includes('\n') ? 340 : 300, size: 140, color: 'accent', ...o});
const ST = (text: string, at: number, y: number, o = {}) => kw(text, at, {y, size: 110, stack: true, ...o});

/* ------------------------------------------------------------------ ZAP */
const ZAP = {accent: '#F0465A', productImage: 'videos/zap-cerise-noire-duo/produit.png', productScale: 0.84,
  priceTag: {text: '10,16 € · -32 %', sub: '36 SACHETS · LIVRAISON GRATUITE'}};
const ZDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 14.9, newPrice: 10.16, discount: '-32 %', badgeAt, strikeAt, newAt, keywords});
const EXPR = (from: number, zapAt: number, exprAt: number) => ({kind: 'compare' as const, from, title: 'CAFÉINE PAR DOSE', at: zapAt, rows: [
  {label: 'ZAP (1 sachet)', value: 100, display: '100 MG', highlight: true, at: zapAt},
  {label: 'Expresso (repère EFSA)', value: 80, display: '≈ 80 MG', at: exprAt}]});
const MG = (at: number) => T1('100 MG\nDE CAFÉINE', at, {size: 160, impact: true});
const ZWARN = (at: number) => WARN(WARN_CAFEINE, at);
const ZLIV = (r: R) => CTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 480, {size: 90, color: 'accent'}), ZWARN(r('livraison'))]);

export const zapOuatte = variant({
  id: 'zap-ouatte', timings: tZ1, ...ZAP, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('0,28 €\nLE SACHET ?!', 0, {size: 190})]},
    ZDEAL(r('ZAP') - 0.08, r('ZAP'), r('au'), r('dix'), [kw('36 SACHETS', r('trente-six'), {y: 840, size: 90, stack: true})]),
    B(r('moins') - 0.08, [T1('-32 %', r('moins'), {size: 280, impact: true})]),
    B(r('cent', 2) - 0.08, [MG(r('cent', 2))]),
    EXPR(r('plus') - 0.08, r('plus'), r('expresso')),
    CUT(r('tu') - 0.08, [{label: 'CAFÉINE', sub: '100 mg', at: r('tu')}, {label: 'L-THÉANINE · VITAMINES B', at: r('lèvre')}],
      [kw("T'ES DANS TA ZONE", r('zone'), {y: 560, size: 100, color: 'white', stack: true})]),
    B(r('prix') - 0.08, [T1("PRIX LE PLUS BAS\nDE L'ANNÉE", r('prix'), {size: 130, impact: true, stack: true}), ST('LIVRAISON GRATUITE', r('livraison'), 580, {size: 100})]),
    CTA(r, r('panier') - 0.1, [ST('10,16 € AU LIEU DE 14,90 €', r('panier'), 490, {size: 80, color: 'accent'}), ZWARN(r('panier'))]),
  ],
});

export const zapCafeBar = variant({
  id: 'zap-cafe-bar', timings: tZ2, ...ZAP, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TON FRIC AU\nCAFÉ DU COIN ?!', 0, {size: 160})]},
    {kind: 'price', from: r('Avec') - 0.08, price: 10.16, doses: 36, divLabel: 'SACHETS', unitLabel: 'LE SACHET',
      priceAt: r('ZAP'), dividerAt: r("c'est"), resultAt: r('vingt-huit')},
    B(r('cent') - 0.08, [MG(r('cent'))]),
    EXPR(r('plus') - 0.08, r('plus'), r('expresso')),
    CUT(r('elle-théanine') - 0.1, [{label: 'L-THÉANINE', at: r('elle-théanine')}, {label: 'VITAMINES B', at: r('vitamines')}, {label: 'CERISE NOIRE', at: r('goût')}]),
    B(r('zéro') - 0.08, [ST('0 TASSE', r('zéro'), 300, {size: 170, color: 'accent'}), ST("0 FILE D'ATTENTE", r('zéro', 2), 480, {size: 120})]),
    ZDEAL(r('trente-six') - 0.08, r('trente-six'), r('dix'), r('seize'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [ZWARN(r('panier'))]),
  ],
});

export const zapCalcul = variant({
  id: 'zap-calcul', timings: tZ3, ...ZAP, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('ON FAIT LE\nCALCUL ?', 0, {size: 180})]},
    {kind: 'price', from: r('Dix') - 0.08, price: 10.16, doses: 36, divLabel: 'SACHETS', unitLabel: 'LE SACHET',
      priceAt: r('Dix'), dividerAt: r('divisé'), resultAt: r('vingt-huit')},
    B(r('et') - 0.08, [MG(r('cent'))]),
    EXPR(r('plus') - 0.08, r('plus'), r('expresso')),
    CUT(r('elle-théanine') - 0.1, [{label: 'L-THÉANINE', at: r('elle-théanine')}, {label: 'VITAMINES B', at: r('vitamines')},
      {label: 'FABRIQUÉ EN SUÈDE', at: r('fabriqué')}, {label: 'CERISE NOIRE', at: r('goût')}]),
    ZDEAL(r('moins') - 0.08, r('moins'), r('trente-deux'), r('pour', 2), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [ZWARN(r('panier'))]),
  ],
});

export const zapSeances = variant({
  id: 'zap-seances', timings: tZ4, ...ZAP, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('36 SÉANCES\nPOUR 10 BALLES ?!', 0, {size: 160}),
      kw('QUI A VALIDÉ\nCE PRIX ?!', r('validé'), {y: 300, size: 150, color: 'alert', impact: true})]},
    B(r('Un') - 0.08, [T1('1 SACHET\nAVANT TA SÉANCE', r('sachet'), {size: 140, stack: true}), ST('36 DANS LE DUO', r('trente-six', 2), 580, {size: 120})]),
    ZDEAL(r('dix', 2) - 0.08, r('dix', 2), r('quatorze'), r('quatre-vingt-dix')),
    B(r('vingt-huit') - 0.08, [T1('0,28 €\nLA SÉANCE', r('vingt-huit'), {size: 200, impact: true})]),
    CUT(r('cent') - 0.08, [{label: 'CAFÉINE', sub: '100 mg', at: r('cent')}, {label: 'L-THÉANINE · VITAMINES B', at: r('caféine')}]),
    EXPR(r('plus') - 0.08, r('plus'), r('expresso')),
    B(r('et', 2) - 0.08, [T1('ÇA TIENT DANS\nTA POCHE', r('tient'), {size: 160})]),
    ZLIV(r),
  ],
});

export const zapBlackFriday = variant({
  id: 'zap-blackfriday', timings: tZ5, ...ZAP, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('BLACK FRIDAY\n-32 %', 0, {size: 200}),
      kw('FAUT PAS\nTRAÎNER !', r('faut'), {y: 340, size: 170, color: 'alert', impact: true})]},
    ZDEAL(r('Dix') - 0.08, r('Dix'), r('quatorze'), r('quatre-vingt-dix'), [kw('36 SACHETS', r('trente-six'), {y: 840, size: 90, stack: true})]),
    B(r('prix') - 0.08, [T1("PRIX LE PLUS BAS\nDE L'ANNÉE", r('prix'), {size: 130, impact: true})]),
    CUT(r('cent', 2) - 0.08, [{label: 'CAFÉINE', sub: '100 mg', at: r('cent', 2)}, {label: 'L-THÉANINE', at: r('elle-théanine')},
      {label: 'VITAMINES B', at: r('vitamines')}, {label: 'CERISE NOIRE', at: r('cerise')}]),
    B(r('sous') - 0.08, [ST('SOUS LA LÈVRE', r('sous'), 300, {size: 150, color: 'accent'}), ST('DISCRET', r('discret'), 480, {size: 160})]),
    ZLIV(r),
  ],
});

/* ------------------------------------------------------------------ NOVOMA */
const NOV = {accent: '#7FE0CF', productImage: 'videos/novoma-donne/produit.png', productScale: 1.1,
  priceTag: {text: '4,98 € · -58 %', sub: "BLACK FRIDAY JUSQU'AU 30/11"}};
const NDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 11.77, newPrice: 4.98, discount: '-58 %', badgeAt, strikeAt, newAt, keywords});
const NCOUPE = (r: R, from: number, n: number) => CUT(from, [{label: 'COLLAGÈNE HYDROLYSÉ', sub: 'Naticol®', at: r('collagène', n)},
  {label: 'ACIDE HYALURONIQUE', at: r('acide')}, {label: 'VITAMINE C', at: r('vitamine')}]);
const VITC = (at: number) => kw('LA VITAMINE C CONTRIBUE\nÀ LA FORMATION NORMALE\nDE COLLAGÈNE', at, {y: 330, size: 85, color: 'accent'});
const VAVIS = (from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.7, reviews: 86, sold: 28400, ratingAt, soldAt});
const J30 = (r: R, w: string) => CTA(r, r(w) - 0.08, [ST("JUSQU'AU 30/11", r(w), 520, {size: 130, color: 'accent'})]);

export const novOuatte = variant({
  id: 'novoma-ouatte', timings: tN1, ...NOV, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE COLLAGÈNE\nÀ 4,98 € ?!', 0, {size: 170})]},
    NDEAL(r('Novoma') - 0.08, r('Novoma'), r('onze'), r('soixante-dix-sept') + 0.4),
    B(r('là') - 0.08, [T1('-58 %', r('moins'), {size: 280, impact: true})]),
    NCOUPE(r, r('collagène', 2) - 0.08, 2),
    B(r('la', 2) - 0.08, [VITC(r('la', 2))]),
    VAVIS(r('vingt-huit') - 0.08, r('vingt-huit') + 0.1, r('vingt-huit')),
    J30(r, "jusqu'au"),
  ],
});

export const novMois = variant({
  id: 'novoma-mois', timings: tN2, ...NOV, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('1 MOIS DE COLLAGÈNE\nPOUR - DE 5 € ?!', 0, {size: 130}),
      kw('QUI A VALIDÉ\nCE PRIX ?!', r('validé'), {y: 340, size: 150, color: 'alert', impact: true})]},
    {kind: 'price', from: r('Novoma') - 0.08, price: 4.98, doses: 30, divLabel: 'JOURS', unitLabel: 'PAR JOUR',
      priceAt: r('quatre'), dividerAt: r('quatre-vingt-dix-huit') + 0.4, resultAt: r('dix-sept')},
    NCOUPE(r, r('collagène', 3) - 0.08, 3),
    B(r('la') - 0.08, [VITC(r('la'))]),
    VAVIS(r('quatre', 2) - 0.08, r('quatre', 2) + 0.1, r('étoiles')),
    B(r('Black') - 0.08, [T1("BLACK FRIDAY\nJUSQU'AU 30/11", r('Black'), {size: 150, impact: true})]),
    CTA(r, r('panier') - 0.1, [ST('4,98 € AU LIEU DE 11,77 €', r('panier'), 520, {size: 85, color: 'accent'})]),
  ],
});

export const nov58 = variant({
  id: 'novoma-58', timings: tN3, ...NOV, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('-58 %\nSUR LE COLLAGÈNE', 0, {size: 170})]},
    NDEAL(r('Onze') - 0.08, r('Onze'), r('barré'), r('quatre')),
    B(r('le', 2) - 0.08, [T1('LE PRIX LE PLUS BAS\nSUR 30 JOURS', r('prix'), {size: 130, impact: true})]),
    B(r('Novoma') - 0.08, [T1('NOVOMA\nCOLLAGÈNE MARIN', r('Novoma'), {size: 150})]),
    NCOUPE(r, r('collagène', 3) - 0.08, 3),
    B(r('la') - 0.08, [VITC(r('la'))]),
    VAVIS(r('vingt-huit') - 0.08, r('vingt-huit') + 0.15, r('vingt-huit')),
    J30(r, 'fonce'),
  ],
});

export const novKebab = variant({
  id: 'novoma-kebab', timings: tN4, ...NOV, jacket: JACKETS[2], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TON KEBAB PLUS CHER\nQUE TON COLLAGÈNE ?!', 0, {size: 120})]},
    NDEAL(r('Novoma') - 0.08, r('Novoma'), r('onze'), r('quatre'), [kw('60 GÉLULES · 1 MOIS', r('soixante'), {y: 840, size: 80, stack: true})]),
    NCOUPE(r, r('collagène', 3) - 0.08, 3),
    B(r('la') - 0.08, [VITC(r('la'))]),
    VAVIS(r('quatre', 2) - 0.08, r('quatre', 2) + 0.1, r('étoiles')),
    CTA(r, r('Black') - 0.08, [ST("BLACK FRIDAY\nJUSQU'AU 30/11", r('Black'), 540, {size: 100, color: 'accent'})]),
  ],
});

export const nov28k = variant({
  id: 'novoma-28k', timings: tN5, ...NOV, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('28 400 PERSONNES\nONT CRAQUÉ', 0, {size: 150})]},
    VAVIS(r('Novoma') - 0.08, r('quatre'), r('Novoma') + 0.1),
    NDEAL(r('quatre', 2) - 0.08, r('quatre', 2), r('onze'), r('quatre', 2) + 0.3),
    NCOUPE(r, r('collagène', 2) - 0.08, 2),
    B(r('la') - 0.08, [VITC(r('la'))]),
    PH(r('et', 2) - 0.08, 'videos/photos/novoma.jpg', [
      kw('EN DUO', r('duo'), {y: 250, size: 120, color: 'accent', stack: true}),
      kw('LIVRAISON OFFERTE', r('livraison'), {y: 370, size: 100, impact: true, stack: true})]),
    J30(r, "jusqu'au"),
  ],
});

/* ------------------------------------------------------------------ CRÉATINE OSTROVIT */
const CRE = {accent: '#F7D417', productImage: 'videos/creatine-ostrovit-citron/produit.png',
  priceTag: {text: '4,99 € · 100 DOSES', sub: 'MOINS DE 5 CTS LA DOSE'}};
const G = 'videos/creatine-ostrovit-citron/';
const GOUTS = [G + 'gout-naturel.png', G + 'gout-pomme-verte.png', G + 'gout-mangue.png', G + 'gout-melon.png'];
const ALLEG = (r: R, from: number) => ({
  kind: 'power' as const, from, fillFrom: from + 0.1, fillTo: r('répétés'), dumbbells: [r('courts'), r('intenses'), r('répétés')],
  keywords: [
    kw('3 G DE CRÉATINE PAR JOUR', from + 0.05, {y: 240, size: 100, stack: true}),
    kw('AUGMENTENT LA\nPERFORMANCE PHYSIQUE', r('performance'), {y: 410, size: 100, color: 'accent', stack: true}),
    kw("LORS D'EXERCICES COURTS,\nINTENSES ET RÉPÉTÉS", r('courts'), {y: 590, size: 80, stack: true}),
  ],
});
const CCTA = (r: R) => CTA(r, r('panier') - 0.1, [ST('4,99 € · 100 DOSES', r('panier'), 520, {size: 110, color: 'accent'})]);
const MICRO = (r: R, from: number, extra: {label: string; sub?: string; at: number}[] = []) =>
  CUT(from, [{label: 'MONOHYDRATE', at: r('monohydrate')}, {label: 'ULTRA MICRONISÉE', sub: '200 mesh', at: r('ultra')}, ...extra]);

export const creOuatte = variant({
  id: 'creatine-ouatte', timings: tC1, ...CRE, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('MÊME PAS 5 CTS\nLA DOSE ?!', 0, {size: 170})]},
    B(r('OstroVit') - 0.08, [ST('300 G', r('trois'), 300, {size: 170, color: 'accent'}), ST('4,99 €', r('quatre'), 500, {size: 200, impact: true})]),
    B(r('cent') - 0.08, [T1('100 DOSES\nDE 3 G', r('cent'), {size: 180, impact: true})]),
    MICRO(r, r('monohydrate') - 0.08),
    ALLEG(r, r('trois', 3) - 0.08),
    B(r('garde') - 0.08, [T1('GARDE TON FRIC\nPOUR TON POULET-RIZ', r('garde'), {size: 130})]),
    CCTA(r),
  ],
});

export const creMoyenne = variant({
  id: 'creatine-moyenne', timings: tC2, ...CRE, jacket: JACKETS[2], format: 'comparatif',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('22 BALLES LE POT\nEN MOYENNE ?!', 0, {size: 160})]},
    {kind: 'compare', from: r('Celle-là') - 0.08, title: 'PRIX DES 300 G', at: r('Celle-là'), rows: [
      {label: 'Moyenne du marché*', value: 22.67, display: '22,67 €', at: r('Celle-là')},
      {label: 'OstroVit', value: 4.99, display: '4,99 €', highlight: true, at: r('quatre')}],
      keywords: [kw('*moyenne de 6 prix relevés en ligne le 24/11 (300 g)', r('Celle-là') + 0.3, {y: 1020, size: 30, small: true, stack: true})]},
    B(r('plus') - 0.08, [T1('+ DE 4×\nMOINS CHER', r('plus'), {size: 190, impact: true})]),
    MICRO(r, r('monohydrate') - 0.08, [{label: '100 DOSES', at: r('cent')}]),
    ALLEG(r, r('trois', 2) - 0.08),
    CTA(r, r('boutique') - 0.08, [ST('BOUTIQUE OFFICIELLE', r('boutique'), 520, {size: 110, color: 'accent'})]),
  ],
});

export const creGouts2 = variant({
  id: 'creatine-gouts2', timings: tC3, ...CRE, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TA CRÉATINE A UN\nGOÛT DE PLÂTRE ?!', 0, {size: 140})]},
    {kind: 'flavors', from: r('OstroVit') - 0.08, spreadAt: r('mangue'), images: GOUTS, keywords: [
      kw('CITRON · MANGUE · MELON\nPOMME VERTE · NATURE', r('citron'), {y: 330, size: 90, color: 'accent', stack: true})]},
    CUT(r('sans') - 0.08, [{label: 'SANS ADDITIFS SUCRANTS', at: r('sans')}, {label: 'ULTRA MICRONISÉE', sub: '200 mesh', at: r('ultra')}]),
    B(r('cent') - 0.08, [T1('100 DOSES\n4,99 €', r('cent'), {size: 190, impact: true})]),
    ALLEG(r, r('trois') - 0.08),
    CTA(r, r('choisis') - 0.08, [ST('CHOISIS TON GOÛT', r('choisis'), 520, {size: 120, color: 'accent'})]),
  ],
});

export const cre566 = variant({
  id: 'creatine-566', timings: tC4, ...CRE, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('566 VENDUS\n4,5 ÉTOILES', 0, {size: 180})]},
    {kind: 'reviews', from: r('et') - 0.08, rating: 4.5, reviews: 28, sold: 566, ratingAt: r('et'), soldAt: r('connais')},
    B(r('La') - 0.08, [ST('OSTROVIT 300 G', r('OstroVit'), 300, {size: 140, color: 'accent'}), ST('4,99 €', r('quatre', 2), 490, {size: 200, impact: true})]),
    B(r('même') - 0.08, [T1('MÊME PAS 5 CTS\nLA DOSE', r('même'), {size: 170, impact: true})]),
    MICRO(r, r('monohydrate') - 0.08, [{label: 'SANS ADDITIFS SUCRANTS', at: r('sans')}]),
    ALLEG(r, r('trois', 2) - 0.08),
    CCTA(r),
  ],
});

export const creCentDoses = variant({
  id: 'creatine-centdoses', timings: tC5, ...CRE, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('100 DOSES\n< 5 BALLES ?!', 0, {size: 190})]},
    {kind: 'doses', from: r('OstroVit') - 0.08, weight: 300, dose: 3, price: 4.99, count: 100,
      weightAt: r('trois'), priceAt: r('quatre'), divideAt: r('trois', 2), resultAt: r('cent', 2), hideCalcAt: r('quatre') + 0.9},
    B(r('ultra') - 0.08, [ST('ULTRA MICRONISÉE', r('ultra'), 300, {size: 130, color: 'accent'}), ST('5 GOÛTS', r('cinq', 2), 480, {size: 170})]),
    ALLEG(r, r('trois', 3) - 0.08),
    CCTA(r),
  ],
});
