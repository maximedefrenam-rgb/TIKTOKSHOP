/**
 * Lot du 27/11 (2) : 30 vidéos prix choc — 5 ZAP, 5 Novoma, 5 créatine, 5 medicube, 4 Nuclever, 3 Meelito, 3 Topdon.
 * Règles visuelles 1–9 (cf. lot2.ts / lot3.ts). Prix Black Friday (fiches au 25–27/11).
 */
import {variant, kw, JACKETS, WARN_CAFEINE, WARN_NUCLEVER} from '../../src/lib/variant';
import zPoches from '../../public/videos/zap-poches/timings.json';
import zCours from '../../public/videos/zap-cours/timings.json';
import zReunion from '../../public/videos/zap-reunion/timings.json';
import zDeux from '../../public/videos/zap-deuxboites/timings.json';
import zCerise from '../../public/videos/zap-cerise/timings.json';
import nGel from '../../public/videos/novoma-gelule/timings.json';
import nOnze from '../../public/videos/novoma-onze/timings.json';
import nDeux from '../../public/videos/novoma-deux/timings.json';
import nDern from '../../public/videos/novoma-derniers/timings.json';
import nEt from '../../public/videos/novoma-etoiles/timings.json';
import cTrois from '../../public/videos/creatine-troismois/timings.json';
import cOff from '../../public/videos/creatine-officielle/timings.json';
import cSer from '../../public/videos/creatine-series/timings.json';
import cCinq from '../../public/videos/creatine-cinqgouts/timings.json';
import cPote from '../../public/videos/creatine-pote/timings.json';
import mOu from '../../public/videos/medicube-ouatte/timings.json';
import mCh from '../../public/videos/medicube-choisis/timings.json';
import mAv from '../../public/videos/medicube-avis/timings.json';
import mCa from '../../public/videos/medicube-cadeau/timings.json';
import mMa from '../../public/videos/medicube-matin/timings.json';
import u70 from '../../public/videos/nuclever-70cts/timings.json';
import uPb from '../../public/videos/nuclever-prixbas/timings.json';
import uLu from '../../public/videos/nuclever-lundi/timings.json';
import uDe from '../../public/videos/nuclever-deuxieme/timings.json';
import eOu from '../../public/videos/meelito-ouatte/timings.json';
import e63 from '../../public/videos/meelito-63k/timings.json';
import eCo from '../../public/videos/meelito-copine/timings.json';
import tOu from '../../public/videos/topdon-ouatte/timings.json';
import tCt from '../../public/videos/topdon-ct/timings.json';
import tAi from '../../public/videos/topdon-airbag/timings.json';

type R = (w: string, n?: number) => number;
type K = ReturnType<typeof kw>;
type It = {label: string; sub?: string; at: number};
const B = (from: number, keywords: K[]) => ({kind: 'benefit' as const, from, keywords});
const PH = (from: number, image: string, keywords: K[] = []) => ({kind: 'photo' as const, from, image, keywords});
const CUT = (from: number, items: It[], style: 'lid' | 'zoom' = 'lid', keywords: K[] = []) =>
  ({kind: 'cutaway' as const, from, openAt: from + 0.1, style, items, keywords});
const CTA = (r: R, from: number, keywords: K[] = []) => ({kind: 'cta' as const, from, arrowAt: r('panier'), keywords});
const WARN = (text: string, at: number) => kw(text, at, {y: 600, size: 30, small: true, stack: true});
const T1 = (text: string, at: number, o: Record<string, unknown> = {}) => kw(text, at, {y: text.includes('\n') ? 340 : 300, size: 140, color: 'accent', ...o});
const ST = (text: string, at: number, y: number, o = {}) => kw(text, at, {y, size: 110, stack: true, ...o});
const SELON = (at: number, y: number) => kw('selon la marque', at, {y, size: 40, small: true, stack: true});

/* ------------------------------------------------------------------ ZAP */
const ZAP = {accent: '#F0465A', productImage: 'videos/zap-cerise-noire-duo/produit.png', productScale: 0.84,
  priceTag: {text: '10,16 € · -32 %', sub: '36 SACHETS · LIVRAISON GRATUITE'}};
const ZDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 14.9, newPrice: 10.16, discount: '-32 %', badgeAt, strikeAt, newAt, keywords});
const EXPR = (from: number, zapAt: number, exprAt: number) => ({kind: 'compare' as const, from, title: 'CAFÉINE PAR DOSE', at: zapAt, rows: [
  {label: 'ZAP (1 sachet)', value: 100, display: '100 MG', highlight: true, at: zapAt},
  {label: 'Expresso (repère EFSA)', value: 80, display: '≈ 80 MG', at: exprAt}]});
const MG = (at: number) => T1('100 MG\nDE CAFÉINE', at, {size: 160, impact: true});
const ZLIV = (r: R) => CTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 480, {size: 90, color: 'accent'}), WARN(WARN_CAFEINE, r('livraison'))]);
const S36 = (at: number) => kw('36 SACHETS', at, {y: 840, size: 90, stack: true});

export const zapPoches = variant({
  id: 'zap-poches', timings: zPoches, ...ZAP, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('0,28 €', 0, {size: 280, stack: true}), ST('AU FOND DE TES POCHES', r('fond'), 520, {size: 100})]},
    B(r("C'est") - 0.08, [T1("LE PRIX\nD'UN SACHET ZAP", r("C'est"), {size: 150})]),
    B(r('cent') - 0.08, [MG(r('cent'))]),
    EXPR(r('plus') - 0.08, r('plus'), r('expresso')),
    CUT(r('elle-théanine') - 0.1, [{label: 'L-THÉANINE', at: r('elle-théanine')}, {label: 'VITAMINES B', at: r('vitamines')}, {label: 'CERISE NOIRE', at: r('goût')}]),
    ZDEAL(r('trente-six') - 0.08, r('trente-six'), r('quatorze'), r('dix'), [S36(r('trente-six'))]),
    ZLIV(r),
  ],
});

export const zapCours = variant({
  id: 'zap-cours', timings: zCours, ...ZAP, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('8 H DE COURS', 0, {size: 200, stack: true}),
      ST('ET LA SALLE\nCE SOIR ?!', r('salle'), 540, {size: 140, color: 'alert', impact: true})]},
    B(r('Un') - 0.08, [T1('1 SACHET\nSOUS LA LÈVRE', r('sachet'), {size: 160})]),
    CUT(r('cent') - 0.08, [{label: 'CAFÉINE', sub: '100 mg', at: r('cent')}, {label: 'L-THÉANINE · VITAMINES B', at: r('caféine')}],
      'lid', [kw("T'ES DANS TA ZONE", r('zone'), {y: 560, size: 100, color: 'white', stack: true})]),
    B(r('vingt-huit') - 0.08, [T1('0,28 €\nLE SACHET', r('vingt-huit'), {size: 200, impact: true})]),
    B(r('dix') - 0.08, [T1('10,16 €\nLES 36', r('dix'), {size: 200})]),
    B(r('ça') - 0.08, [T1('ÇA TIENT DANS\nTA TROUSSE', r('tient'), {size: 160})]),
    ZDEAL(r('moins') - 0.08, r('moins'), r('trente-deux'), r('pour'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [WARN(WARN_CAFEINE, r('panier'))]),
  ],
});

export const zapReunion = variant({
  id: 'zap-reunion', timings: zReunion, ...ZAP, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('RÉUNION À 14 H', 0, {size: 190, stack: true}),
      ST('TON CERVEAU EST\nRESTÉ AU SELF ?!', r('cerveau'), 540, {size: 120, color: 'alert', impact: true})]},
    B(r('Glisse') - 0.08, [ST('SOUS LA LÈVRE', r('sous'), 300, {size: 150, color: 'accent'}), ST('DISCRET', r('discret'), 480, {size: 170})]),
    CUT(r('cent') - 0.08, [{label: 'CAFÉINE', sub: '100 mg', at: r('cent')}, {label: 'L-THÉANINE', at: r('elle-théanine')}, {label: 'VITAMINES B', at: r('vitamines')}]),
    {kind: 'price', from: r('trente-six') - 0.08, price: 10.16, doses: 36, divLabel: 'SACHETS', unitLabel: 'LE SACHET',
      priceAt: r('trente-six'), dividerAt: r('dix'), resultAt: r('vingt-huit')},
    ZLIV(r),
  ],
});

export const zapDeuxBoites = variant({
  id: 'zap-deuxboites', timings: zDeux, ...ZAP, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('2 BOÎTES\nPOUR 10 BALLES ?!', 0, {size: 170}),
      kw('QUI A VALIDÉ\nCE PRIX ?!', r('validé'), {y: 340, size: 150, color: 'alert', impact: true})]},
    B(r('Le') - 0.08, [T1('LE DUO ZAP', r('duo'), {size: 190, stack: true}), ST('2 × 18 SACHETS', r('deux', 2), 500, {size: 140})]),
    ZDEAL(r('dix', 2) - 0.08, r('dix', 2), r('quatorze'), r('quatre-vingt-dix')),
    CUT(r('cent') - 0.08, [{label: 'CAFÉINE', sub: '100 mg / sachet', at: r('cent')}, {label: 'L-THÉANINE · VITAMINES B', at: r('sachet')}]),
    EXPR(r('plus') - 0.08, r('plus'), r('expresso')),
    B(r('une') - 0.08, [ST('1 BOÎTE POUR LA SALLE', r('une'), 300, {size: 110, color: 'accent'}), ST('1 POUR LE TAF', r('une', 2), 450, {size: 140})]),
    ZLIV(r),
  ],
});

export const zapCerise = variant({
  id: 'zap-cerise', timings: zCerise, ...ZAP, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('DE LA CAFÉINE\nGOÛT CERISE NOIRE ?!', 0, {size: 140})]},
    B(r('ZAP') - 0.08, [T1('UN SACHET\nSOUS LA LÈVRE', r('sachet'), {size: 160})]),
    CUT(r('cent') - 0.08, [{label: 'CAFÉINE', sub: '100 mg', at: r('cent')}, {label: 'L-THÉANINE', at: r('elle-théanine')},
      {label: 'VITAMINES B', at: r('vitamines')}, {label: 'FABRIQUÉ EN SUÈDE', at: r('fabriqué')}]),
    ZDEAL(r('trente-six') - 0.08, r('trente-six'), r('quatorze'), r('quatre-vingt-dix'), [S36(r('trente-six'))]),
    B(r('vingt-huit') - 0.08, [T1('0,28 €\nLE SACHET', r('vingt-huit'), {size: 200, impact: true})]),
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
const NBF = (r: R) => B(r('Black') - 0.08, [T1("BLACK FRIDAY\nJUSQU'AU 30/11", r('Black'), {size: 150, impact: true})]);
const NCTA = (r: R) => CTA(r, r('panier') - 0.1, [ST('4,98 € AU LIEU DE 11,77 €', r('panier'), 520, {size: 85, color: 'accent'})]);
const J30 = (r: R, w: string) => CTA(r, r(w) - 0.08, [ST("JUSQU'AU 30/11", r(w), 520, {size: 130, color: 'accent'})]);

export const novGelule = variant({
  id: 'novoma-gelule', timings: nGel, ...NOV, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('MOINS DE 9 CTS\nLA GÉLULE ?!', 0, {size: 170})]},
    NDEAL(r('Novoma') - 0.08, r('Novoma'), r('onze'), r('quatre'), [kw('60 GÉLULES', r('soixante'), {y: 840, size: 90, stack: true})]),
    NCOUPE(r, r('collagène', 2) - 0.08, 2),
    B(r('la', 2) - 0.08, [VITC(r('la', 2))]),
    NBF(r),
    NCTA(r),
  ],
});

export const novOnze = variant({
  id: 'novoma-onze', timings: nOnze, ...NOV, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TON COLLAGÈNE\nÀ 11 BALLES ?!', 0, {size: 170})]},
    B(r('Arrête') - 0.08, [kw('ARRÊTE !', r('Arrête'), {y: 300, size: 230, color: 'alert', impact: true})]),
    NDEAL(r('il') - 0.08, r('il'), r('il') + 0.3, r('quatre')),
    B(r('moins') - 0.08, [T1('-58 %', r('moins'), {size: 280, impact: true})]),
    NCOUPE(r, r('collagène', 3) - 0.08, 3),
    B(r('la') - 0.08, [VITC(r('la'))]),
    J30(r, "jusqu'au"),
  ],
});

export const novDeux = variant({
  id: 'novoma-deux', timings: nDeux, ...NOV, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1("2 GÉLULES PAR JOUR\nET C'EST TOUT", 0, {size: 140})]},
    B(r('Novoma') - 0.08, [T1('60 GÉLULES\n1 MOIS', r('soixante'), {size: 180})]),
    {kind: 'price', from: r('quatre') - 0.08, price: 4.98, doses: 30, divLabel: 'JOURS', unitLabel: 'PAR JOUR',
      priceAt: r('quatre'), dividerAt: r('quatre-vingt-dix-huit') + 0.4, resultAt: r('dix-sept')},
    NCOUPE(r, r('collagène', 2) - 0.08, 2),
    B(r('la') - 0.08, [VITC(r('la'))]),
    NBF(r),
    NCTA(r),
  ],
});

export const novDerniers = variant({
  id: 'novoma-derniers', timings: nDern, ...NOV, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('-58 % SUR LE COLLAGÈNE\nBIENTÔT FINI !', 0, {size: 120})]},
    NDEAL(r('Novoma') - 0.08, r('Novoma'), r('onze'), r('quatre')),
    B(r("jusqu'au") - 0.08, [T1("JUSQU'AU 30/11\nSEULEMENT", r("jusqu'au"), {size: 170, impact: true})]),
    NCOUPE(r, r('collagène', 3) - 0.08, 3),
    B(r('la') - 0.08, [VITC(r('la'))]),
    B(r('après') - 0.08, [T1("APRÈS,\nC'EST TROP TARD", r('après'), {size: 170, color: 'alert'})]),
    NCTA(r),
  ],
});

export const novEtoiles = variant({
  id: 'novoma-etoiles', timings: nEt, ...NOV, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('4,7 ÉTOILES\n28 000 VENDUS', 0, {size: 160}),
      kw('À 4,98 € ?!', r('quatre', 2), {y: 340, size: 210, color: 'accent', impact: true})]},
    NDEAL(r('Novoma') - 0.08, r('Novoma'), r('onze'), r('soixante-dix-sept') + 0.3),
    NCOUPE(r, r('collagène', 2) - 0.08, 2),
    B(r('la') - 0.08, [VITC(r('la'))]),
    PH(r('et', 2) - 0.08, 'videos/photos/novoma.jpg', [
      kw('EN DUO', r('duo'), {y: 250, size: 120, color: 'accent', stack: true}),
      kw('LIVRAISON OFFERTE', r('livraison'), {y: 370, size: 100, impact: true, stack: true})]),
    J30(r, "jusqu'au"),
  ],
});

/* ------------------------------------------------------------------ CRÉATINE */
const CRE = {accent: '#F7D417', productImage: 'videos/creatine-ostrovit-citron/produit.png',
  priceTag: {text: '4,99 € · 100 DOSES', sub: 'MOINS DE 5 CTS LA DOSE'}};
const G = 'videos/creatine-ostrovit-citron/';
const GOUTS = [G + 'gout-naturel.png', G + 'gout-pomme-verte.png', G + 'gout-mangue.png', G + 'gout-melon.png'];
const ALLEG = (r: R, from: number, n = 1) => ({
  kind: 'power' as const, from, fillFrom: from + 0.1, fillTo: r('répétés', n), dumbbells: [r('courts', n), r('intenses', n), r('répétés', n)],
  keywords: [
    kw('3 G DE CRÉATINE PAR JOUR', from + 0.05, {y: 240, size: 100, stack: true}),
    kw('AUGMENTENT LA\nPERFORMANCE PHYSIQUE', r('performance'), {y: 410, size: 100, color: 'accent', stack: true}),
    kw("LORS D'EXERCICES COURTS,\nINTENSES ET RÉPÉTÉS", r('courts', n), {y: 590, size: 80, stack: true}),
  ],
});
const CCTA = (r: R, text = '4,99 € · 100 DOSES') => CTA(r, r('panier') - 0.1, [ST(text, r('panier'), 520, {size: 110, color: 'accent'})]);
const MOY = (r: R, from: number, at: number, oAt: number) => ({kind: 'compare' as const, from, title: 'PRIX DES 300 G', at, rows: [
  {label: 'Moyenne du marché*', value: 22.67, display: '22,67 €', at}, {label: 'OstroVit', value: 4.99, display: '4,99 €', highlight: true, at: oAt}],
  keywords: [kw('*moyenne de 6 prix relevés en ligne le 24/11 (300 g)', at + 0.3, {y: 1020, size: 30, small: true, stack: true})]});

export const creTroisMois = variant({
  id: 'creatine-troismois', timings: cTrois, ...CRE, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('+ DE 3 MOIS\nPOUR - DE 5 € ?!', 0, {size: 170})]},
    {kind: 'doses', from: r('OstroVit') - 0.08, weight: 300, dose: 3, price: 4.99, count: 100,
      weightAt: r('trois', 2), priceAt: r('quatre'), divideAt: r('trois', 3), resultAt: r('cent'), hideCalcAt: r('quatre') + 0.9},
    CUT(r('monohydrate') - 0.08, [{label: 'MONOHYDRATE', at: r('monohydrate')}, {label: 'ULTRA MICRONISÉE', sub: '200 mesh', at: r('ultra')}]),
    ALLEG(r, r('trois', 4) - 0.08),
    CCTA(r),
  ],
});

export const creOfficielle = variant({
  id: 'creatine-officielle', timings: cOff, ...CRE, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('BOUTIQUE OFFICIELLE\nVÉRIFIÉE PAR TIKTOK', 0, {size: 120})]},
    B(r('et') - 0.08, [T1('4,99 €', r('quatre'), {size: 260, impact: true})]),
    B(r('trois') - 0.08, [ST('300 G', r('trois'), 300, {size: 160, color: 'accent'}), ST('100 DOSES', r('cent'), 480, {size: 170})]),
    B(r('même') - 0.08, [T1('MÊME PAS 5 CTS\nLA DOSE', r('même'), {size: 170})]),
    CUT(r('ultra') - 0.08, [{label: 'MONOHYDRATE', at: r('ultra')}, {label: 'ULTRA MICRONISÉE', sub: '200 mesh', at: r('micronisée')}]),
    ALLEG(r, r('trois', 2) - 0.08),
    CCTA(r),
  ],
});

export const creSeries = variant({
  id: 'creatine-series', timings: cSer, ...CRE, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('COURTS · INTENSES\nRÉPÉTÉS', 0, {size: 170}),
      kw('ÇA TE RAPPELLE\nPAS TES SÉANCES ?!', r('rappelle'), {y: 340, size: 140, color: 'white'})]},
    ALLEG(r, r('Trois') - 0.08, 2),
    B(r('et', 2) - 0.08, [ST('OSTROVIT 300 G', r('OstroVit'), 300, {size: 140, color: 'accent'}), ST('4,99 €', r('quatre'), 490, {size: 200, impact: true})]),
    CUT(r('même') - 0.08, [{label: '100 DOSES', sub: '< 5 cts la dose', at: r('même')}, {label: '5 GOÛTS', at: r('cinq', 2)}]),
    CCTA(r),
  ],
});

export const creCinqGouts = variant({
  id: 'creatine-cinqgouts', timings: cCinq, ...CRE, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LES 5 GOÛTS\nPOUR - DE 20 € ?!', 0, {size: 170})]},
    {kind: 'flavors', from: r('OstroVit') - 0.08, spreadAt: r('cinq', 2), images: GOUTS, keywords: [
      kw('5 SACHETS À 4,99 €', r('cinq', 2), {y: 330, size: 110, color: 'accent', stack: true})]},
    B(r('et') - 0.08, [ST('OFFRE -5 €\nAU-DELÀ DE 20 €', r("l'offre"), 300, {size: 130, color: 'accent'}),
      ST('= 19,95 € LES 5', r('dix-neuf'), 485, {size: 150, impact: true}),
      kw("selon l'offre en cours sur la fiche", r('dix-neuf'), {y: 570, size: 34, small: true, stack: true})]),
    CUT(r('citron') - 0.08, [{label: 'CITRON · MANGUE', at: r('citron')}, {label: 'MELON', at: r('melon')},
      {label: 'POMME VERTE', at: r('pomme')}, {label: 'NATURE', at: r('nature')}]),
    ALLEG(r, r('trois') - 0.08),
    CCTA(r, '5 GOÛTS · 4,99 € LE SACHET'),
  ],
});

export const crePote = variant({
  id: 'creatine-pote', timings: cPote, ...CRE, jacket: JACKETS[2], format: 'comparatif',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TON POTE PAIE\n20 BALLES ?!', 0, {size: 170})]},
    MOY(r, r('toi', 2) - 0.08, r('toi', 2), r('quatre')),
    B(r('même') - 0.08, [T1('MÊME PAS 5 CTS\nLA DOSE', r('même'), {size: 170, impact: true})]),
    CUT(r('monohydrate') - 0.08, [{label: 'MONOHYDRATE', at: r('monohydrate')}, {label: 'ULTRA MICRONISÉE', sub: '200 mesh', at: r('ultra')},
      {label: 'SANS ADDITIFS SUCRANTS', at: r('sans')}]),
    ALLEG(r, r('trois', 2) - 0.08),
    CCTA(r),
  ],
});

/* ------------------------------------------------------------------ MEDICUBE (cosmétique) */
const MED = {accent: '#FF6B5A', productImage: 'videos/medicube-points-noirs/produit.png', productScale: 0.5,
  priceTag: {text: 'DÈS 23,99 €', sub: 'AVEC COUPONS · BLACK FRIDAY'}};
const MDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number) => ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY',
  oldPrice: 29.99, newPrice: 23.99, discount: 'COUPONS', badgeAt, strikeAt, newAt,
  keywords: [kw('dès 23,99 € avec les coupons (selon le set)', newAt, {y: 830, size: 36, small: true, stack: true})]});
const MCUT = (r: R, from: number) => CUT(from, [{label: 'NIACINAMIDE', sub: '2 %', at: r('niacinamide')}, {label: 'VITAMINE C', at: r('vitamine')},
  {label: 'ACIDE SUCCINIQUE', at: r('acide')}]);
const MAVIS = (from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.6, reviews: 169, sold: 2565, ratingAt, soldAt});

export const medOuatte = variant({
  id: 'medicube-ouatte', timings: mOu, ...MED, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TONER PADS CORÉENS\nDÈS 23,99 € ?!', 0, {size: 130})]},
    MDEAL(r('Medicube') - 0.08, r('Medicube'), r('coupons'), r('coupons') + 0.3),
    MCUT(r, r('niacinamide') - 0.08),
    B(r('pour') - 0.08, [ST('PORES NETS', r('pores'), 290, {size: 160, color: 'accent'}), ST('EFFET GLASS SKIN', r("l'effet"), 470, {size: 130}), SELON(r('selon'), 580)]),
    MAVIS(r('quatre') - 0.08, r('quatre') + 0.1, r('étoiles')),
    J30(r, "jusqu'au"),
  ],
});

export const medChoisis = variant({
  id: 'medicube-choisis', timings: mCh, ...MED, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('VITAMINE C, PEELING\nOU ZÉRO PORE ?', 0, {size: 130}),
      kw("C'EST TOI\nQUI CHOISIS !", r('choisis'), {y: 340, size: 170, color: 'accent', impact: true})]},
    B(r('Medicube') - 0.08, [T1('MIX & MATCH', r('Mix'), {size: 190, stack: true}), ST('COMPOSE TON SET', r('composes'), 480, {size: 130})]),
    CUT(r('soixante-dix') - 0.08, [{label: '70 PADS', sub: 'par pot', at: r('soixante-dix')}, {label: 'VITA C · PEELING · ZÉRO PORE', at: r('pot')}]),
    B(r('pores') - 0.08, [ST('PORES NETS', r('pores'), 270, {size: 140, color: 'accent'}), ST('MOINS DE MARQUES\nPOST-IMPERFECTIONS', r('moins'), 460, {size: 85}),
      ST('ÉCLAT', r('éclat'), 640, {size: 140, color: 'accent'}), SELON(r('selon'), 735)]),
    MDEAL(r('dès') - 0.08, r('dès'), r('coupons'), r('vingt-trois') + 0.3),
    CTA(r, r('Black') - 0.08, [ST('BLACK FRIDAY', r('Black'), 520, {size: 140, color: 'accent'})]),
  ],
});

export const medAvis = variant({
  id: 'medicube-avis', timings: mAv, ...MED, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('2 500 VENDUS\n4,6 ÉTOILES', 0, {size: 170})]},
    B(r('Les') - 0.08, [T1('TONER PADS\nMEDICUBE', r('toner'), {size: 170})]),
    B(r('le') - 0.08, [T1("LE PAD CORÉEN\nQUE TOUT LE MONDE\nS'ARRACHE", r('pad'), {size: 120})]),
    MCUT(r, r('niacinamide') - 0.08),
    B(r("l'effet") - 0.08, [T1('EFFET GLASS SKIN', r("l'effet"), {size: 150, stack: true}), SELON(r('selon'), 450)]),
    MDEAL(r('dès') - 0.08, r('dès'), r('coupons'), r('vingt-trois') + 0.3),
    CTA(r, r('panier') - 0.1, [ST('DÈS 23,99 €\nAVEC LES COUPONS', r('panier'), 540, {size: 100, color: 'accent'})]),
  ],
});

export const medCadeau = variant({
  id: 'medicube-cadeau', timings: mCa, ...MED, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('BLACK FRIDAY\n+ CADEAU OFFERT', 0, {size: 170})]},
    B(r('Les') - 0.08, [T1('TONER PADS\nCORÉENS', r('toner'), {size: 180, stack: true}), ST('SET MIX & MATCH', r('set'), 520, {size: 130})]),
    MDEAL(r('dès') - 0.08, r('dès'), r('coupons'), r('vingt-trois') + 0.3),
    B(r('prix') - 0.08, [T1('PRIX LE PLUS BAS\nSUR 30 JOURS', r('prix'), {size: 140, impact: true})]),
    MCUT(r, r('niacinamide') - 0.08),
    B(r('pour') - 0.08, [T1('PEAU NETTE', r('peau'), {size: 190, stack: true}), SELON(r('selon'), 450)]),
    J30(r, "jusqu'au"),
  ],
});

export const medMatin = variant({
  id: 'medicube-matin', timings: mMa, ...MED, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TA ROUTINE DU MATIN\nEN 30 SECONDES', 0, {size: 130})]},
    B(r('Un') - 0.08, [T1('1 PAD SUR TA FACE', r('toner'), {size: 150, stack: true}), ST("C'EST RÉGLÉ", r('réglé'), 470, {size: 170, color: 'accent', impact: true})]),
    MCUT(r, r('niacinamide') - 0.08),
    B(r('pores') - 0.08, [ST('PORES NETS', r('pores'), 290, {size: 160, color: 'accent'}), ST('ÉCLAT', r('éclat'), 460, {size: 160}), SELON(r('selon'), 560)]),
    B(r('soixante-dix') - 0.08, [T1('70 PADS\nPAR POT', r('soixante-dix'), {size: 190})]),
    MAVIS(r('quatre') - 0.08, r('quatre') + 0.1, r('étoiles')),
    MDEAL(r('dès') - 0.08, r('dès'), r('coupons'), r('vingt-trois') + 0.3),
    CTA(r, r('panier') - 0.1),
  ],
});

/* ------------------------------------------------------------------ NUCLEVER */
const NUC = {accent: '#D8759A', productImage: 'videos/nuclever-sommeil/produit.png', productScale: 1.1,
  priceTag: {text: '0,70 € / JOUR', sub: '20,92 € · 30 SACHETS'}};
const NCUT = (r: R, from: number) => CUT(from, [
  {label: 'ASHWAGANDHA', sub: '300 mg', at: r('ashwagandha')}, {label: 'L-THÉANINE', sub: '400 mg', at: r('elle-théanine')},
  {label: 'MAGNÉSIUM', sub: '100 mg', at: r('magnésium')}, {label: 'VITAMINE D', sub: '1000 UI', at: r('vitamine')}]);
const NAVIS = (from: number, ratingAt: number, soldAt: number, rankAt?: number) => ({kind: 'reviews' as const, from, rating: 4.5, reviews: 3900, sold: 55000,
  ratingAt, soldAt, ...(rankAt !== undefined ? {rank: '2E AU CLASSEMENT DES VENTES', rankAt} : {})});
const UCTA = (r: R) => CTA(r, r('panier') - 0.1, [WARN(WARN_NUCLEVER, r('panier'))]);
const FATIGUE = (at: number) => T1('LE MAGNÉSIUM CONTRIBUE\nÀ RÉDUIRE LA FATIGUE', at, {size: 95});

export const nuc70 = variant({
  id: 'nuclever-70cts', timings: u70, ...NUC, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('0,70 € / JOUR\nLE CORTISOL MANAGER ?!', 0, {size: 130})]},
    B(r('Nuclever') - 0.08, [ST('30 SACHETS', r('trente'), 300, {size: 160, color: 'accent'}), ST('20,92 €', r('vingt'), 490, {size: 200, impact: true})]),
    NCUT(r, r('ashwagandha') - 0.08),
    B(r('le', 2) - 0.08, [FATIGUE(r('le', 2))]),
    NAVIS(r('cinquante-cinq') - 0.08, r('quatre'), r('cinquante-cinq')),
    B(r('livraison') - 0.08, [T1('LIVRAISON\nGRATUITE', r('livraison'), {size: 180, impact: true})]),
    UCTA(r),
  ],
});

export const nucPrixBas = variant({
  id: 'nuclever-prixbas', timings: uPb, ...NUC, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1("PRIX LE PLUS BAS\nDE L'ANNÉE", 0, {size: 150})]},
    B(r('Nuclever') - 0.08, [T1('CORTISOL MANAGER', r('Nuclever'), {size: 130, stack: true}), ST('BLACK FRIDAY', r('Black'), 470, {size: 150, color: 'accent'})]),
    {kind: 'price', from: r('vingt') - 0.08, price: 20.92, doses: 30, divLabel: 'JOURS', unitLabel: 'PAR JOUR',
      priceAt: r('vingt'), dividerAt: r('mois'), resultAt: r('soixante-dix')},
    NCUT(r, r('ashwagandha') - 0.08),
    B(r('la') - 0.08, [T1("LA VITAMINE D CONTRIBUE\nAU MAINTIEN D'UNE FONCTION\nMUSCULAIRE NORMALE", r('la'), {size: 80})]),
    CTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 480, {size: 90, color: 'accent'}), WARN(WARN_NUCLEVER, r('livraison'))]),
  ],
});

export const nucLundi = variant({
  id: 'nuclever-lundi', timings: uLu, ...NUC, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1("LUNDI, 6 H DU MAT'", 0, {size: 170, stack: true}),
      ST('DÉJÀ SOUS PRESSION ?!', r('sous'), 520, {size: 130, color: 'alert', impact: true})]},
    B(r('Nuclever') - 0.08, [T1('CORTISOL MANAGER', r('Nuclever'), {size: 130, stack: true}), ST('1 SACHET / JOUR\nDANS TON EAU', r('un'), 500, {size: 120})]),
    NCUT(r, r('ashwagandha') - 0.08),
    B(r('le') - 0.08, [T1('LE MAGNÉSIUM CONTRIBUE\nÀ DES FONCTIONS\nPSYCHOLOGIQUES NORMALES', r('le'), {size: 85})]),
    NAVIS(r('cinquante-cinq') - 0.08, r('cinquante-cinq') + 0.1, r('cinquante-cinq')),
    B(r('soixante-dix') - 0.08, [T1('0,70 €\nPAR JOUR', r('soixante-dix'), {size: 190, impact: true})]),
    UCTA(r),
  ],
});

export const nucDeuxieme = variant({
  id: 'nuclever-deuxieme', timings: uDe, ...NUC, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('2E AU CLASSEMENT\nDES VENTES', 0, {size: 160})]},
    NAVIS(r('Nuclever') - 0.08, r('quatre'), r('cinquante-cinq'), r('Nuclever') + 0.2),
    CUT(r('trois') - 0.08, [{label: 'ASHWAGANDHA', sub: '300 mg', at: r('trois')}, {label: 'MAGNÉSIUM', sub: '100 mg', at: r('magnésium')},
      {label: 'VITAMINE D', sub: '1000 UI', at: r('vitamine')}]),
    B(r('le', 2) - 0.08, [FATIGUE(r('le', 2))]),
    B(r('vingt') - 0.08, [T1('20,92 € LE MOIS', r('vingt'), {size: 150, stack: true}), ST('LIVRAISON GRATUITE', r('livraison'), 480, {size: 110, color: 'accent'})]),
    UCTA(r),
  ],
});

/* ------------------------------------------------------------------ MEELITO */
const MEE = {accent: '#FF9F1C', productImage: 'videos/meelito-prix/produit.png', productScale: 1.0,
  priceTag: {text: '21,75 € LE KIT', sub: '6 PIÈCES · BLACK FRIDAY'}};
const EAVIS = (from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.5, reviews: 5800, sold: 63400, ratingAt, soldAt});
const KIT = (r: R, from: number, n = 1) => CUT(from, [{label: 'SAVON', at: r('savon')}, {label: 'NETTOYANT', at: r('nettoyant')},
  {label: 'MASQUE PEEL-OFF', at: r('masque')}, {label: 'HUILE · CRÈME', at: r('huile', n)}], 'zoom');

export const meeOuatte = variant({
  id: 'meelito-ouatte', timings: eOu, ...MEE, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('4,35 € LA PIÈCE\nDE SKINCARE ?!', 0, {size: 150}),
      kw('prix unitaire affiché sur la fiche produit', 0.1, {y: 470, size: 36, small: true, stack: true})]},
    KIT(r, r('Le') - 0.08),
    B(r('vingt') - 0.08, [T1('21,75 €\nLE KIT', r('vingt'), {size: 190, impact: true})]),
    B(r('acide') - 0.08, [ST('ACIDE KOJIQUE · VITAMINE C', r('acide'), 290, {size: 90, color: 'accent'}), ST('TEINT PLUS UNIFORME', r('teint'), 420, {size: 110}), SELON(r('selon'), 520)]),
    EAVIS(r('soixante-trois') - 0.08, r('soixante-trois') + 0.2, r('soixante-trois')),
    CTA(r, r('Black') - 0.08, [ST('BLACK FRIDAY', r('Black'), 520, {size: 140, color: 'accent'})]),
  ],
});

export const mee63k = variant({
  id: 'meelito-63k', timings: e63, ...MEE, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('63 000 PERSONNES', 0, {size: 170, stack: true}),
      ST('PEUVENT PAS TOUTES\nAVOIR TORT !', r('peuvent'), 500, {size: 120, impact: true})]},
    EAVIS(r('Ce') - 0.08, r('quatre'), r('Ce') + 0.2),
    KIT(r, r('savon') - 0.08),
    B(r('acide') - 0.08, [ST('ACIDE KOJIQUE', r('acide'), 290, {size: 150, color: 'accent'}), ST('VITAMINE C', r('vitamine'), 460, {size: 150}), SELON(r('selon'), 560)]),
    B(r('vingt') - 0.08, [T1('21,75 €\nLE KIT', r('vingt'), {size: 190, impact: true})]),
    CTA(r, r('panier') - 0.1, [ST('BLACK FRIDAY', r('panier'), 520, {size: 140, color: 'accent'})]),
  ],
});

export const meeCopine = variant({
  id: 'meelito-copine', timings: eCo, ...MEE, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('TA COPINE TE PIQUE\nTA CRÈME ?!', 0, {size: 140})]},
    B(r('Offre-lui') - 0.08, [T1('OFFRE-LUI\nSON KIT', r('Offre-lui'), {size: 190, stack: true}), ST('6 PIÈCES', r('six'), 520, {size: 160, color: 'accent'})]),
    KIT(r, r('savon') - 0.08),
    EAVIS(r('soixante-trois') - 0.08, r('quatre'), r('soixante-trois') + 0.1),
    B(r('vingt') - 0.08, [T1('21,75 €', r('vingt'), {size: 240, impact: true, stack: true}), ST('PARFAIT POUR NOËL', r('parfait'), 480, {size: 130, color: 'accent'})]),
    CTA(r, r('panier') - 0.1),
  ],
});

/* ------------------------------------------------------------------ TOPDON (appareil → coupe zoom) */
const TOP = {accent: '#2E8BFF', productImage: 'videos/topdon-voyant/produit.png', productScale: 0.98,
  priceTag: {text: '189,99 € · -9 %', sub: "BLACK FRIDAY JUSQU'AU 30/11"}};
const TDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 209, newPrice: 189.99, discount: '-9 %', badgeAt, strikeAt, newAt, keywords});
const TPHOTO = 'videos/photos/topdon.jpg';

export const topOuatte = variant({
  id: 'topdon-ouatte', timings: tOu, ...TOP, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('151 € LA VALISE DIAG\nAVEC LES COUPONS ?!', 0, {size: 120}),
      kw('selon les coupons disponibles', 0.1, {y: 470, size: 36, small: true, stack: true})]},
    TDEAL(r('Topdon') - 0.08, r('Topdon'), r('deux'), r('euros', 2), [kw('151,99 € AVEC LES COUPONS', r('euros', 2) + 0.3, {y: 840, size: 80, color: 'accent', stack: true})]),
    CUT(r('moteur') - 0.08, [{label: 'MOTEUR · BOÎTE', at: r('moteur')}, {label: 'AIRBAG · ABS', at: r('airbag')}, {label: "9 SERVICES D'ENTRETIEN", at: r('neuf', 2)}], 'zoom'),
    B(r('mises') - 0.08, [T1('MISES À JOUR\nGRATUITES À VIE', r('mises'), {size: 150, impact: true})]),
    CTA(r, r('Black') - 0.08, [ST("BLACK FRIDAY\nJUSQU'AU 30/11", r('Black'), 520, {size: 100, color: 'accent'}), ST('LIVRAISON GRATUITE', r('livraison'), 680, {size: 80})]),
  ],
});

export const topCt = variant({
  id: 'topdon-ct', timings: tCt, ...TOP, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('CONTRÔLE TECHNIQUE\nDANS UNE SEMAINE ?!', 0, {size: 120}),
      kw("ET T'AS AUCUNE IDÉE\nDE CE QUI CLOCHE ?!", r('aucune'), {y: 340, size: 110, color: 'alert'})]},
    PH(r('Branche') - 0.08, TPHOTO, [kw('BRANCHE LA TOPDON', r('Branche'), {y: 250, size: 120, color: 'accent'})]),
    CUT(r('tu') - 0.08, [{label: 'LIT LES CODES DÉFAUT', at: r('lis')}, {label: 'MOTEUR · BOÎTE', at: r('moteur')}, {label: 'AIRBAG · ABS', at: r('airbag')}], 'zoom'),
    B(r('et', 2) - 0.08, [ST("TU SAIS OÙ T'EN ES", r('sais'), 290, {size: 130}), ST("AVANT D'Y ALLER", r('AVANT'), 460, {size: 160, color: 'accent', impact: true})]),
    TDEAL(r('cent') - 0.08, r('cent'), r('deux'), r('quatre-vingt-neuf'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [ST("BLACK FRIDAY\nJUSQU'AU 30/11", r('panier'), 540, {size: 100, color: 'accent'})]),
  ],
});

export const topAirbag = variant({
  id: 'topdon-airbag', timings: tAi, ...TOP, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('VOYANT AIRBAG\nALLUMÉ ?!', 0, {size: 180, color: 'alert'}),
      kw('LE GARAGE :\nPAS AVANT 2 SEMAINES ?!', r('garage'), {y: 340, size: 120, color: 'white'})]},
    B(r('Topdon') - 0.08, [T1('TOPDON\nARTIDIAG 600 S', r('Topdon'), {size: 150})]),
    CUT(r('elle') - 0.08, [{label: 'LIT + EFFACE', sub: 'les codes', at: r('lit')}, {label: 'AIRBAG · ABS', at: r('airbag', 2)}, {label: 'MOTEUR · BOÎTE', at: r('moteur')}], 'zoom'),
    B(r('écran') - 0.08, [ST('ÉCRAN 5 POUCES', r('écran'), 290, {size: 140, color: 'accent'}), ST('MISES À JOUR\nGRATUITES À VIE', r('mises'), 470, {size: 120})]),
    TDEAL(r('cent') - 0.08, r('cent'), r('quatre-vingt-dix-neuf'), r('quatre-vingt-neuf'), [kw("BLACK FRIDAY JUSQU'AU 30/11", r('Black'), {y: 840, size: 70, stack: true})]),
    CTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 480, {size: 90, color: 'accent'})]),
  ],
});
