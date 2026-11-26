/**
 * Lot du 26/11 (2) : 3 vidéos × ZAP, Nuclever, Meelito, Novoma, Topdon, avec les règles visuelles 1–9 de CLAUDE.md
 * (image 0 déjà remplie, pastille de prix, plans de ~2 s, coupe « zoom » pour appareil / kit, photo d'usage).
 */
import tZ1 from '../../public/videos/zap-stagiaire/timings.json';
import tZ2 from '../../public/videos/zap-preworkout/timings.json';
import tZ3 from '../../public/videos/zap-sac/timings.json';
import tN1 from '../../public/videos/nuclever-dimanche/timings.json';
import tN2 from '../../public/videos/nuclever-gouts/timings.json';
import tN3 from '../../public/videos/nuclever-55k/timings.json';
import tM1 from '../../public/videos/meelito-noel/timings.json';
import tM2 from '../../public/videos/meelito-masque/timings.json';
import tM3 from '../../public/videos/meelito-etapes/timings.json';
import tV1 from '../../public/videos/novoma-trente/timings.json';
import tV2 from '../../public/videos/novoma-duo/timings.json';
import tV3 from '../../public/videos/novoma-17cts/timings.json';
import tT1 from '../../public/videos/topdon-occasion/timings.json';
import tT2 from '../../public/videos/topdon-garagiste/timings.json';
import tT3 from '../../public/videos/topdon-daron/timings.json';
import {variant, kw, JACKETS, WARN_CAFEINE, WARN_NUCLEVER} from '../../src/lib/variant';

type R = (w: string, n?: number) => number;
type K = ReturnType<typeof kw>;
const B = (from: number, keywords: K[]) => ({kind: 'benefit' as const, from, keywords});
const PH = (from: number, image: string, keywords: K[] = []) => ({kind: 'photo' as const, from, image, keywords});
const CUT = (from: number, items: {label: string; sub?: string; at: number}[], style: 'lid' | 'zoom' = 'lid', keywords: K[] = []) =>
  ({kind: 'cutaway' as const, from, openAt: from + 0.1, style, items, keywords});
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

export const zapStagiaire = variant({
  id: 'zap-stagiaire', timings: tZ1, ...ZAP, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('36 SACHETS\nPOUR 10 BALLES ?!', 0, {size: 160}),
      kw('QUI A VALIDÉ\nCE PRIX ?!', r('validé'), {y: 300, size: 150, color: 'alert', impact: true})]},
    ZDEAL(r('ZAP') - 0.08, r('ZAP'), r('quatorze'), r('dix', 2)),
    {kind: 'price', from: r('ça') - 0.08, price: 10.16, doses: 36, divLabel: 'SACHETS', unitLabel: 'LE SACHET',
      priceAt: r('ça'), dividerAt: r('fait'), resultAt: r('vingt-huit')},
    B(r('et') - 0.08, [T1('100 MG\nDE CAFÉINE', r('cent'), {size: 160, impact: true})]),
    EXPR(r('plus') - 0.08, r('plus'), r('expresso')),
    CUT(r('avec') - 0.08, [{label: 'CAFÉINE', sub: '100 mg', at: r('avec')}, {label: 'L-THÉANINE', at: r('elle-théanine')}, {label: 'VITAMINES B', at: r('vitamines')}]),
    B(r('tu') - 0.08, [T1('SOUS LA LÈVRE', r('glisses'), {size: 150}), ST("T'ES DANS TA ZONE", r('zone'), 480)]),
    B(r('prix', 2) - 0.08, [T1('PRIX LE PLUS BAS\nEN 2026', r('prix', 2), {size: 130, impact: true}), ST('LIVRAISON GRATUITE', r('livraison'), 500, {size: 100})]),
    CTA(r, r('panier') - 0.1, [ST('10,16 € AU LIEU DE 14,90 €', r('panier'), 490, {size: 80, color: 'accent'}), WARN(WARN_CAFEINE, r('panier'))]),
  ],
});

export const zapPreworkout = variant({
  id: 'zap-preworkout', timings: tZ2, ...ZAP, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [kw('TON PRÉ-WORKOUT ?', 0, {y: 280, size: 140, stack: true}),
      ST('LE DOSER', r('doser'), 440, {color: 'accent'}), ST('LE SHAKER', r('shaker'), 570, {color: 'accent'})]},
    B(r('et') - 0.08, [kw('1 LITRE DE\nFLOTTE ?!', r('litre'), {y: 320, size: 170, color: 'alert', impact: true})]),
    B(r('Avec') - 0.08, [T1('1 SACHET\nSOUS LA LÈVRE', r('sachet'), {impact: true}), ST("T'ES DANS TA ZONE", r('zone'), 520, {size: 100})]),
    EXPR(r('cent') - 0.08, r('cent'), r('expresso')),
    CUT(r('elle-théanine') - 0.1, [{label: 'L-THÉANINE', at: r('elle-théanine')}, {label: 'VITAMINES B', at: r('vitamines')}, {label: 'GOÛT CERISE NOIRE', at: r('goût')}]),
    {kind: 'price', from: r('trente-six') - 0.08, price: 10.16, doses: 36, divLabel: 'SACHETS', unitLabel: 'LA SÉANCE',
      priceAt: r('trente-six'), dividerAt: r('dix'), resultAt: r('vingt-huit')},
    ZDEAL(r('moins') - 0.08, r('moins'), r('trente-deux'), r('pour', 2), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [WARN(WARN_CAFEINE, r('panier'))]),
  ],
});

export const zapSac = variant({
  id: 'zap-sac', timings: tZ3, ...ZAP, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('DANS MON SAC\nDE SALLE ?!', 0, {size: 160})]},
    B(r('ma') - 0.08, [ST('MA GOURDE', r('gourde'), 300, {size: 140}), ST('MA SERVIETTE', r('serviette'), 460, {size: 140})]),
    B(r('et') - 0.08, [kw('ET ÇA !', r('ÇA'), {y: 330, size: 240, color: 'accent', impact: true})]),
    B(r('ZAP') - 0.08, [ST('SACHETS ÉNERGÉTIQUES', r('sachets'), 290, {color: 'accent'}), ST('FABRIQUÉ EN SUÈDE', r('fabriqués'), 440, {size: 100})]),
    CUT(r('cent') - 0.08, [{label: 'CAFÉINE', sub: '100 mg / sachet', at: r('cent')}]),
    EXPR(r('plus') - 0.08, r('plus'), r('expresso')),
    B(r('zéro') - 0.08, [ST('0 CAFÉ À PRÉPARER', r('zéro'), 300), ST('0 CANETTE', r('zéro', 2), 440)]),
    B(r('ça', 2) - 0.08, [T1('ÇA TIENT DANS\nTA POCHE', r('tient'), {size: 150, impact: true})]),
    ZDEAL(r('trente-six') - 0.08, r('trente-six'), r('quatorze'), r('dix'), [kw('36 SACHETS', r('trente-six'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('livraison') - 0.08, [ST('LIVRAISON GRATUITE', r('livraison'), 480, {size: 90, color: 'accent'}), WARN(WARN_CAFEINE, r('livraison'))]),
  ],
});

/* ------------------------------------------------------------------ NUCLEVER */
const NUC = {accent: '#D8759A', productImage: 'videos/nuclever-sommeil/produit.png', productScale: 1.1,
  priceTag: {text: '0,70 € / JOUR', sub: '20,92 € · 30 SACHETS'}};
const NCUT = (r: R, from: number, n4 = true) => CUT(from, [
  {label: 'ASHWAGANDHA', sub: '300 mg', at: r('ashwagandha')}, {label: 'L-THÉANINE', sub: '400 mg', at: r('elle-théanine')},
  ...(n4 ? [{label: 'MAGNÉSIUM', sub: '100 mg', at: r('magnésium')}, {label: 'VITAMINE D', sub: '1000 UI', at: r('vitamine')}] : [])]);
const NAVIS = (from: number, ratingAt: number, soldAt: number, rankAt?: number) => ({kind: 'reviews' as const, from, rating: 4.5, reviews: 3900, sold: 55000,
  ratingAt, soldAt, ...(rankAt !== undefined ? {rank: '2E AU CLASSEMENT DES VENTES', rankAt} : {})});
const NCTA = (r: R) => CTA(r, r('panier') - 0.1, [WARN(WARN_NUCLEVER, r('panier'))]);

export const nucDimanche = variant({
  id: 'nuclever-dimanche', timings: tN1, ...NUC, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('DIMANCHE SOIR…', 0, {size: 160, stack: true}),
      ST('LA BOULE AU VENTRE\nPOUR LUNDI ?!', r('boule'), 500, {impact: true})]},
    B(r('Regarde') - 0.08, [T1('CORTISOL MANAGER', r('Nuclever'), {size: 130})]),
    B(r('un') - 0.08, [T1('1 SACHET / JOUR\nDANS TON EAU', r('un'), {size: 130, impact: true})]),
    NCUT(r, r('ashwagandha') - 0.08),
    B(r('le') - 0.08, [T1('LE MAGNÉSIUM CONTRIBUE\nÀ DES FONCTIONS\nPSYCHOLOGIQUES NORMALES', r('le'), {size: 85})]),
    B(r('et', 3) - 0.08, [T1('ET À RÉDUIRE\nLA FATIGUE', r('réduire'), {size: 140})]),
    NAVIS(r('cinquante-cinq') - 0.08, r('quatre'), r('cinquante-cinq')),
    B(r('soixante-dix') - 0.08, [T1('0,70 €\nPAR JOUR', r('soixante-dix'), {size: 170, impact: true}), ST('LIVRAISON GRATUITE', r('livraison'), 520, {size: 100})]),
    NCTA(r),
  ],
});

export const nucGouts = variant({
  id: 'nuclever-gouts', timings: tN2, ...NUC, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('UN COMPLÉMENT\nGOÛT LITCHI-FRAISE ?!', 0, {size: 130})]},
    B(r('Nuclever') - 0.08, [T1('CORTISOL MANAGER', r('Nuclever'), {size: 130}), ST('3 GOÛTS', r('trois'), 470, {size: 150, impact: true})]),
    PH(r('framboise-citron') - 0.08, 'videos/photos/nuclever.jpg', [
      kw('FRAMBOISE-CITRON', r('framboise-citron'), {y: 250, size: 90, color: 'accent', stack: true}),
      kw('LITCHI-FRAISE', r('litchi-fraise', 2), {y: 360, size: 90, stack: true})]),
    B(r('et') - 0.08, [T1('PÊCHE BLANCHE', r('pêche'), {size: 150})]),
    NCUT(r, r('dedans') - 0.08, false),
    B(r('magnésium') - 0.08, [ST('MAGNÉSIUM', r('magnésium'), 300, {size: 150, color: 'accent'}), ST('VITAMINE D', r('vitamine'), 470, {size: 150})]),
    B(r('la') - 0.08, [T1("LA VITAMINE D CONTRIBUE\nAU MAINTIEN D'UNE FONCTION\nMUSCULAIRE NORMALE", r('la'), {size: 80})]),
    NAVIS(r('cinquante-cinq') - 0.08, r('cinquante-cinq') + 0.15, r('cinquante-cinq'), r('deuxième')),
    B(r('vingt') - 0.08, [T1('20,92 €\nLE MOIS', r('vingt'), {size: 160, impact: true}), ST('LIVRAISON GRATUITE', r('livraison'), 520, {size: 100})]),
    NCTA(r),
  ],
});

export const nuc55k = variant({
  id: 'nuclever-55k', timings: tN3, ...NUC, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('55 000 VENDUS', 0, {size: 170, stack: true}), ST('0,70 € / JOUR ?!', r('soixante-dix'), 480, {size: 150, impact: true})]},
    B(r('Le') - 0.08, [T1('CORTISOL MANAGER', r('Cortisol'), {size: 130})]),
    {kind: 'price', from: r('vingt') - 0.08, price: 20.92, doses: 30, divLabel: 'SACHETS', unitLabel: 'PAR JOUR',
      priceAt: r('vingt'), dividerAt: r('trente'), resultAt: r('un')},
    NCUT(r, r('trois') - 0.08, false),
    B(r('magnésium') - 0.08, [ST('MAGNÉSIUM', r('magnésium'), 300, {size: 150, color: 'accent'}), ST('VITAMINE D', r('vitamine'), 470, {size: 150})]),
    B(r('le', 2) - 0.08, [T1('LE MAGNÉSIUM CONTRIBUE\nÀ RÉDUIRE LA FATIGUE', r('le', 2), {size: 95})]),
    NAVIS(r('quatre', 2) - 0.08, r('quatre', 2) + 0.1, r('presque')),
    B(r('livraison') - 0.08, [T1('LIVRAISON\nGRATUITE', r('livraison'), {size: 170, impact: true})]),
    NCTA(r),
  ],
});

/* ------------------------------------------------------------------ MEELITO (kit → coupe « zoom ») */
const MEE = {accent: '#FF9F1C', productImage: 'videos/meelito-prix/produit.png', productScale: 1.0,
  priceTag: {text: '21,75 € LE KIT', sub: '6 PIÈCES · BLACK FRIDAY'}};
const MAVIS = (from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.5, reviews: 5800, sold: 63400, ratingAt, soldAt});
const SELON = (at: number, y: number) => kw('selon la marque', at, {y, size: 40, small: true, stack: true});

export const meeNoel = variant({
  id: 'meelito-noel', timings: tM1, ...MEE, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('QUOI OFFRIR À TA\nSŒUR POUR NOËL ?!', 0, {size: 130})]},
    B(r('Ce') - 0.08, [ST('KIT AU CURCUMA', r('kit'), 300, {size: 130, color: 'accent'}), ST('6 PIÈCES', r('six'), 470, {size: 160, impact: true})]),
    CUT(r('savon') - 0.08, [{label: 'SAVON', at: r('savon')}, {label: 'NETTOYANT', at: r('nettoyant')}, {label: 'MASQUE PEEL-OFF', at: r('masque')}, {label: 'HUILE · CRÈME', at: r('huile')}], 'zoom'),
    B(r('acide') - 0.08, [ST('ACIDE KOJIQUE', r('kojique'), 290, {size: 140, color: 'accent'}), ST('VITAMINE C', r('vitamine'), 450, {size: 130})]),
    B(r('pour', 2) - 0.08, [T1('TEINT PLUS\nUNIFORME', r('teint'), {size: 150, stack: true}), SELON(r('selon'), 560)]),
    MAVIS(r('soixante-trois') - 0.08, r('quatre'), r('soixante-trois')),
    B(r('vingt') - 0.08, [T1('21,75 €\nLE KIT', r('vingt'), {size: 170, impact: true})]),
    CTA(r, r('panier') - 0.1, [ST('BLACK FRIDAY', r('panier'), 520, {color: 'accent'})]),
  ],
});

export const meeMasque = variant({
  id: 'meelito-masque', timings: tM2, ...MEE, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1("UN MASQUE QUI\nS'ARRACHE D'UN COUP ?!", 0, {size: 120})]},
    B(r('Le') - 0.08, [ST('MASQUE PEEL-OFF', r('masque', 2), 300, {size: 130, color: 'accent'}), ST('À LA VITAMINE C', r('vitamine'), 460)]),
    PH(r('avec') - 0.08, 'videos/photos/meelito.jpg', [
      kw('CURCUMA · ACIDE KOJIQUE', r('curcuma', 2), {y: 250, size: 80, color: 'accent', stack: true}),
      kw('CALENDULA · MIEL', r('calendula'), {y: 350, size: 80, stack: true})]),
    B(r('nettoyage') - 0.08, [T1('NETTOYAGE EN\nPROFONDEUR', r('nettoyage'), {size: 150, impact: true, stack: true}), SELON(r('selon'), 560)]),
    CUT(r('et', 2) - 0.08, [{label: 'SAVON', at: r('savon')}, {label: 'NETTOYANT', at: r('nettoyant')}, {label: 'HUILE', at: r('huile')}, {label: 'CRÈME', at: r('crème')}], 'zoom'),
    MAVIS(r('plus') - 0.08, r('plus') + 0.1, r('soixante-trois')),
    B(r('vingt') - 0.08, [T1('21,75 €\nLES 6 PIÈCES', r('vingt'), {size: 160, impact: true})]),
    CTA(r, r('panier') - 0.1, [ST('BLACK FRIDAY', r('panier'), 520, {color: 'accent'})]),
  ],
});

export const meeEtapes = variant({
  id: 'meelito-etapes', timings: tM3, ...MEE, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('ROUTINE VISAGE\nEN 5 ÉTAPES', 0, {size: 150, stack: true}), ST('POUR 21 BALLES ?!', r('vingt'), 500, {size: 130, impact: true})]},
    CUT(r('Étape') - 0.08, [{label: 'ÉTAPE 1 · SAVON', at: r('Étape')}], 'zoom'),
    B(r('étape', 2) - 0.08, [T1('ÉTAPE 2\nNETTOYANT + BROSSE', r('étape', 2), {size: 120})]),
    B(r('étape', 3) - 0.08, [T1('ÉTAPE 3\nMASQUE PEEL-OFF', r('étape', 3), {size: 130})]),
    B(r('étape', 4) - 0.08, [T1('ÉTAPE 4\nHUILE', r('étape', 4), {size: 160})]),
    B(r('étape', 5) - 0.08, [T1('ÉTAPE 5\nCRÈME', r('étape', 5), {size: 160})]),
    B(r('acide') - 0.08, [ST('ACIDE KOJIQUE', r('acide'), 290, {size: 140, color: 'accent'}), ST('POUR UNIFIER LE TEINT', r('unifier'), 450, {size: 100}), SELON(r('selon'), 560)]),
    MAVIS(r('soixante-trois') - 0.08, r('quatre', 2), r('soixante-trois')),
    CTA(r, r('vingt', 2) - 0.08, [ST('21,75 € LE KIT', r('vingt', 2), 520, {size: 120, color: 'accent'})]),
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

export const novTrente = variant({
  id: 'novoma-trente', timings: tV1, ...NOV, jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE COLLAGÈNE\nÀ - DE 5 BALLES', 0, {size: 150}),
      kw("ÇA S'ARRÊTE\nLE 30 NOVEMBRE !", r("s'arrête"), {y: 300, size: 140, color: 'alert', impact: true})]},
    NDEAL(r('Novoma') - 0.08, r('Novoma'), r('onze'), r('quatre')),
    B(r('moins', 2) - 0.08, [T1('-58 %', r('moins', 2), {size: 280, impact: true})]),
    NCOUPE(r, r('collagène', 3) - 0.08, 3),
    B(r('la') - 0.08, [VITC(r('la'))]),
    VAVIS(r('vingt-huit') - 0.08, r('vingt-huit') + 0.1, r('vingt-huit')),
    CTA(r, r('fonce') - 0.08, [ST("JUSQU'AU 30/11", r('fonce'), 520, {size: 130, color: 'accent'})]),
  ],
});

export const novDuo = variant({
  id: 'novoma-duo', timings: tV2, ...NOV, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('PRENDS-EN DEUX !', 0, {size: 170})]},
    B(r('Novoma') - 0.08, [T1('NOVOMA\nCOLLAGÈNE MARIN', r('Novoma'), {size: 140})]),
    PH(r("l'offre") - 0.08, 'videos/photos/novoma.jpg', [
      kw("L'OFFRE DUO", r("l'offre"), {y: 250, size: 110, color: 'accent', stack: true}),
      kw('LIVRAISON OFFERTE', r('livraison'), {y: 370, size: 100, impact: true, stack: true})]),
    NDEAL(r('et') - 0.08, r('et'), r('onze'), r('quatre'), [kw('LE SACHET DE 60 GÉLULES', r('sachet'), {y: 840, size: 70, stack: true})]),
    NCOUPE(r, r('collagène', 3) - 0.08, 3),
    B(r('la', 2) - 0.08, [VITC(r('la', 2))]),
    VAVIS(r('quatre', 2) - 0.08, r('quatre', 2) + 0.1, r('vingt-huit')),
    CTA(r, r('panier') - 0.1, [ST('OFFRE DUO\nLIVRAISON OFFERTE', r('panier'), 540, {size: 100, color: 'accent'})]),
  ],
});

export const nov17 = variant({
  id: 'novoma-17cts', timings: tV3, ...NOV, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('0,17 € / JOUR\nTON COLLAGÈNE ?!', 0, {size: 150})]},
    {kind: 'price', from: r('Novoma') - 0.08, price: 4.98, doses: 30, divLabel: 'JOURS', unitLabel: 'PAR JOUR',
      priceAt: r('quatre'), dividerAt: r('soixante'), resultAt: r('mois')},
    NCOUPE(r, r('collagène', 3) - 0.08, 3),
    B(r('la') - 0.08, [VITC(r('la'))]),
    VAVIS(r('quatre', 2) - 0.08, r('quatre', 2) + 0.1, r('vingt-huit')),
    B(r('Black') - 0.08, [T1("BLACK FRIDAY\nJUSQU'AU 30/11", r('Black'), {size: 140, impact: true})]),
    CTA(r, r('panier') - 0.1, [ST('4,98 € AU LIEU DE 11,77 €', r('panier'), 520, {size: 85, color: 'accent'})]),
  ],
});

/* ------------------------------------------------------------------ TOPDON (appareil → coupe « zoom ») */
const TOP = {accent: '#2E8BFF', productImage: 'videos/topdon-voyant/produit.png', productScale: 0.98,
  priceTag: {text: '189,99 € · -9 %', sub: "BLACK FRIDAY JUSQU'AU 30/11"}};
const TDEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: K[] = []) =>
  ({kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 209, newPrice: 189.99, discount: '-9 %', badgeAt, strikeAt, newAt, keywords});
const TPHOTO = 'videos/photos/topdon.jpg';

export const topOccasion = variant({
  id: 'topdon-occasion', timings: tT1, ...TOP, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1("VOITURE D'OCCASION\nSANS LA SCANNER ?!", 0, {size: 120}),
      kw("T'ES MALADE !", r('malade'), {y: 300, size: 190, color: 'alert', impact: true})]},
    PH(r('Branche') - 0.08, TPHOTO, [kw('BRANCHE LA TOPDON', r('Branche'), {y: 250, size: 120, color: 'accent'})]),
    CUT(r('tu', 2) - 0.08, [{label: 'LIT LES CODES DÉFAUT', at: r('lis')}, {label: 'MOTEUR · BOÎTE', at: r('moteur')}, {label: 'AIRBAG · ABS', at: r('airbag')}], 'zoom'),
    B(r('et') - 0.08, [T1('DONNÉES EN\nTEMPS RÉEL', r('données'), {size: 160, impact: true})]),
    B(r('tu', 3) - 0.08, [ST('TU VOIS CE QUI CLOCHE', r('vois'), 290), ST('AVANT DE SIGNER', r('AVANT'), 450, {size: 160, color: 'accent', impact: true})]),
    B(r('mises') - 0.08, [T1('MISES À JOUR\nGRATUITES À VIE', r('mises'), {size: 140})]),
    {kind: 'reviews', from: r('quatre') - 0.08, rating: 4.4, reviews: 189, sold: 1690, ratingAt: r('quatre') + 0.1, soldAt: r('étoiles')},
    TDEAL(r('cent') - 0.08, r('cent'), r('deux'), r('quatre-vingt-neuf'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [ST("BLACK FRIDAY\nJUSQU'AU 30/11", r('panier'), 540, {size: 100, color: 'accent'})]),
  ],
});

export const topGaragiste = variant({
  id: 'topdon-garagiste', timings: tT2, ...TOP, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE GARAGISTE BRANCHE\nSA VALISE 2 MINUTES', 0, {size: 110, stack: true}),
      ST('ET IL TE FACTURE ?!', r('facture'), 500, {size: 130, color: 'alert', impact: true})]},
    B(r('Maintenant') - 0.08, [T1("LA VALISE,\nC'EST TOI QUI L'AS", r('valise', 2), {size: 140, impact: true})]),
    PH(r('Topdon') - 0.08, TPHOTO, [kw('TOPDON ARTIDIAG 600 S', r('Topdon'), {y: 250, size: 110, color: 'accent'})]),
    CUT(r('écran') - 0.08, [{label: 'ÉCRAN 5 POUCES', at: r('écran')}, {label: 'LECTURE + EFFACEMENT', sub: 'des codes', at: r('lecture')}], 'zoom'),
    B(r('quatre') - 0.08, [ST('4 SYSTÈMES', r('quatre'), 290, {size: 150, color: 'accent'}), ST("9 SERVICES D'ENTRETIEN", r('neuf'), 450, {size: 100})]),
    B(r('mises') - 0.08, [T1('MISES À JOUR\nGRATUITES À VIE', r('mises'), {size: 140})]),
    TDEAL(r('Black') - 0.08, r('Black'), r('trente'), r('cent')),
    B(r('et', 3) - 0.08, [T1('151,99 €\nAVEC LES COUPONS', r('cent', 2), {size: 140, impact: true, stack: true}),
      kw('selon les coupons disponibles', r('coupons'), {y: 470, size: 36, small: true, stack: true})]),
    CTA(r, r('panier') - 0.1, [ST('LIVRAISON GRATUITE', r('panier'), 520, {color: 'accent'})]),
  ],
});

export const topDaron = variant({
  id: 'topdon-daron', timings: tT3, ...TOP, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [T1('LE CADEAU DE NOËL\nPOUR TON DARON', 0, {size: 120, stack: true}), ST('QUI BRICOLE SA CAISSE !', r('bricole'), 480, {size: 100})]},
    B(r('La') - 0.08, [T1('TOPDON\nARTIDIAG 600 S', r('Topdon'), {size: 140})]),
    PH(r('il') - 0.08, TPHOTO, [kw('SUR LA PRISE OBD', r('prise'), {y: 250, size: 120, color: 'accent'})]),
    CUT(r('il', 2) - 0.08, [{label: 'LIT + EFFACE', sub: 'les codes défaut', at: r('lit')}], 'zoom'),
    B(r('moteur') - 0.08, [ST('MOTEUR', r('moteur'), 280, {size: 130, color: 'accent'}), ST('BOÎTE', r('boîte'), 420, {size: 130}),
      ST('AIRBAG', r('airbag'), 560, {size: 130, color: 'accent'}), ST('ABS', r('ABS'), 700, {size: 130})]),
    B(r('avec') - 0.08, [ST('SACOCHE DE RANGEMENT', r('sacoche'), 290), ST('MISES À JOUR\nGRATUITES À VIE', r('mises'), 470, {size: 120, color: 'accent'})]),
    TDEAL(r('cent') - 0.08, r('cent'), r('deux'), r('quatre-vingt-neuf'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    CTA(r, r('panier') - 0.1, [ST("BLACK FRIDAY\nJUSQU'AU 30/11", r('panier'), 540, {size: 100, color: 'accent'})]),
  ],
});
