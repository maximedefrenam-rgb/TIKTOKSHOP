/**
 * Lot du 28/11 (2) — « tout le reste des crédits » : 48 vidéos construites par blocs (src/lib/blocks.ts).
 * ZAP menthe ×10, ZAP cerise ×6 (prix actuel non vérifié → aucun montant), Nuclever ×8, medicube set de 3 ×5 + duo ×5,
 * Topdon ×7 (motion 1,8 : objet large), Pack Force Nutrimea ×7 (créatine ET collagène).
 * Urgence réelle : Black Friday du 11 au 30 novembre (fiches ZAP menthe, medicube, Topdon, Nutrimea). Nuclever : pas de date.
 */
import {kw, WARN_CAFEINE, WARN_NUCLEVER} from '../../src/lib/variant';
import type {Anchor, Block, SceneFn} from '../../src/lib/blocks';

type K = ReturnType<typeof kw>;
type O = Record<string, unknown>;
const T1 = (text: string, at: number, o: O = {}) => kw(text, at, {y: text.includes('\n') ? 340 : 300, size: 140, color: 'accent', ...o});
const ST = (text: string, at: number, y: number, o: O = {}) => kw(text, at, {y, size: 110, stack: true, ...o});
const SM = (text: string, at: number, y: number) => kw(text, at, {y, size: 34, small: true, stack: true});
const B = (say: string, scene?: SceneFn): Block => ({say, scene});

/* ------------------------------------------------------------------ scènes génériques */
const hook = (text: string, size = 160, sub?: string): SceneFn => () => ({kind: 'hook', from: 0, keywords: [
  T1(text, 0, {size, stack: !!sub}), ...(sub ? [SM(sub, 0.1, text.includes('\n') ? 520 : 420)] : [])]});
const hook2 = (text: string, size: number, t2: string, w2: string, o2: O = {}): SceneFn => (a) => ({kind: 'hook', from: 0, keywords: [
  T1(text, 0, {size, stack: true, y: 300}), ST(t2, a(w2), 650, {size: 120, color: 'white', impact: true, ...o2})]});
const big = (text: string, size = 170, o: O = {}, extra: (a: Anchor) => K[] = () => []): SceneFn => (a, t0) => ({kind: 'benefit', keywords: [
  T1(text, t0, {size, impact: true, stack: true, ...o}), ...extra(a)]});
const two = (t1: string, t2: string, w2: string, s1 = 150, s2 = 130, extra: (a: Anchor) => K[] = () => []): SceneFn => (a, t0) => ({kind: 'benefit', keywords: [
  ST(t1, t0, 290, {size: s1, color: 'accent'}), ST(t2, a(w2), t2.includes('\n') ? 500 : 470, {size: s2}), ...extra(a)]});
const three = (items: [string, string, number?][], extra: (a: Anchor) => K[] = () => []): SceneFn => (a) => ({kind: 'benefit', keywords: [
  ...items.map(([t, w, s], i) => ST(t, a(w), 260 + i * 150, {size: s ?? 120, color: i % 2 ? 'white' : 'accent'})), ...extra(a)]});
const cut = (items: [string, string | undefined, string][], style: 'lid' | 'zoom' = 'zoom', extra: (a: Anchor) => K[] = () => []): SceneFn => (a, t0) => ({
  kind: 'cutaway', openAt: t0 + 0.1, style, items: items.map(([label, sub, w]) => ({label, sub, at: a(w)})), keywords: extra(a)});
const deal = (oldPrice: number, newPrice: number, discount: string) => (extra: (a: Anchor) => K[] = () => []): SceneFn => (a, t0) => ({
  kind: 'deal', badge: 'BLACK FRIDAY', oldPrice, newPrice, discount, badgeAt: t0, strikeAt: t0 + 0.3, newAt: t0 + 0.6, keywords: extra(a)});
const price = (p: number, doses: number, divLabel: string, unitLabel: string, wDiv: string, wRes: string, extra: (a: Anchor) => K[] = () => []): SceneFn => (a, t0) => ({
  kind: 'price', price: p, doses, divLabel, unitLabel, priceAt: t0, dividerAt: a(wDiv), resultAt: a(wRes), keywords: extra(a)});
const cmp = (title: string, rows: [string, number, string, boolean, string][]): SceneFn => (a) => ({kind: 'compare', title, at: a(rows[0][4]),
  rows: rows.map(([label, value, display, highlight, w]) => ({label, value, display, highlight, at: a(w)}))});
const avis = (rating: number, reviews: number, sold: number, wR: string, wS: string, soldLabel?: string): SceneFn => (a) => ({
  kind: 'reviews', rating, reviews, sold, ratingAt: a(wR), soldAt: a(wS), ...(soldLabel ? {soldLabel} : {})});
const photo = (image: string, t1: string, w1: string, t2?: string, w2?: string, extra: (a: Anchor) => K[] = () => []): SceneFn => (a) => ({kind: 'photo', image, keywords: [
  kw(t1, a(w1), {y: 250, size: 110, color: 'accent', stack: true}), ...(t2 && w2 ? [kw(t2, a(w2), {y: 365, size: 85, stack: true})] : []), ...extra(a)]});
const cta = (lines: [string, string][], warn?: string): SceneFn => (a, t0) => ({kind: 'cta', arrowAt: a('panier'), keywords: [
  ...lines.map(([t, w], i) => kw(t, a(w), {y: 480 + i * 100, size: 90, stack: true, color: i ? 'white' : 'accent'})),
  ...(warn ? [kw(warn, t0 + 0.05, {y: 500 + lines.length * 100, size: 30, small: true, stack: true})] : [])]});
const SELON = (w: string, y = 460) => (a: Anchor) => [SM('selon la marque', a(w), y)];

/* ------------------------------------------------------------------ produits */
export const PRODUCTS = {
  zapm: {accent: '#5CC46A', productImage: 'videos/zapm-150/produit.png', productScale: 0.44,
    priceTag: {text: '14,37 € · 36 SACHETS', sub: '0,40 € LE SACHET · LIVRAISON GRATUITE'}},
  zapc: {accent: '#F0465A', productImage: 'videos/zap-cerise-noire-duo/produit.png', productScale: 0.84,
    priceTag: {text: '36 SACHETS · 100 MG', sub: 'GOÛT CERISE NOIRE'}},
  nuc: {accent: '#D8759A', productImage: 'videos/nuclever-sommeil/produit.png', productScale: 1.1,
    priceTag: {text: '0,70 € / JOUR', sub: '20,92 € · 30 SACHETS'}},
  trio: {accent: '#FF6B5A', productImage: 'videos/trio-ouatte/produit.png', productScale: 0.82,
    priceTag: {text: '44,00 € · -12 %', sub: '35,20 € AVEC COUPONS'}},
  duo: {accent: '#4A8CFF', productImage: 'videos/duo-ouatte/produit.png', productScale: 0.52,
    priceTag: {text: '29,99 € · -20 %', sub: '23,99 € AVEC COUPONS'}},
  top: {accent: '#2E8BFF', productImage: 'videos/topdon-voyant/produit.png', productScale: 0.98, motion: 1.8,
    priceTag: {text: '189,99 € · -9 %', sub: "BLACK FRIDAY JUSQU'AU 30/11"}},
  pack: {accent: '#E8323C', productImage: 'videos/pack-duo/produit.png', productScale: 0.85,
    priceTag: {text: '45,90 € · -22 %', sub: 'CRÉATINE + COLLAGÈNE'}},
} as const;
export type ProductKey = keyof typeof PRODUCTS;

/* ------------------------------------------------------------------ ZAP menthe (150 mg) */
const WARN150 = 'Contient de la caféine (150 mg/sachet).\nDéconseillé aux enfants et aux femmes\nenceintes ou allaitantes.';
const ZMDEAL = deal(15.13, 14.37, '-5 %');
const ZMCMP = (w1: string, w2: string) => cmp('CAFÉINE', [['ZAP menthe (1 sachet)', 150, '150 MG', true, w1], ['2 expressos (repère EFSA)', 160, '≈ 160 MG', false, w2]]);
const ZMING = cut([['L-THÉANINE', undefined, 'elle-théanine'], ['VITAMINES B', undefined, 'vitamines']]);

/* ------------------------------------------------------------------ ZAP cerise (100 mg) — sans montant */
const ZCCMP = (w1: string, w2: string) => cmp('CAFÉINE PAR DOSE', [['ZAP cerise (1 sachet)', 100, '100 MG', true, w1], ['Expresso (repère EFSA)', 80, '≈ 80 MG', false, w2]]);

/* ------------------------------------------------------------------ Nuclever */
const NCUT = cut([['ASHWAGANDHA', '300 mg', 'ashwagandha'], ['L-THÉANINE', '400 mg', 'elle-théanine'], ['MAGNÉSIUM', '100 mg', 'magnésium'], ['VITAMINE D', '1000 UI', 'vitamine']], 'lid');
const FATIGUE = big('LE MAGNÉSIUM CONTRIBUE\nÀ RÉDUIRE LA FATIGUE', 95);
const PSY = big('LE MAGNÉSIUM CONTRIBUE\nÀ DES FONCTIONS\nPSYCHOLOGIQUES NORMALES', 85);
const VITD = big("LA VITAMINE D CONTRIBUE\nAU MAINTIEN D'UNE FONCTION\nMUSCULAIRE NORMALE", 80);
const NAVIS = (wR: string, wS: string) => avis(4.5, 3900, 55000, wR, wS);

/* ------------------------------------------------------------------ medicube */
const TDEAL = deal(49.99, 44, '-12 %');
const T3 = (a: string, b: string, c: string) => cut([['DEEP VITA C', 'vitamine C · niacinamide', a], ['ZERO PORE', 'AHA · BHA · panthénol', b], ['RED PEELING', 'acide succinique', c]]);
const DDEAL = deal(37.5, 29.99, '-20 %');
const D2 = (a: string, b: string, extra: (x: Anchor) => K[] = () => []) => cut([['ZERO PORE PAD', 'AHA · BHA · panthénol', a], ['RED PEELING PAD', 'acide succinique', b]], 'zoom', extra);

/* ------------------------------------------------------------------ Topdon */
const TPHOTO = 'videos/photos/topdon.jpg';
const TDEAL2 = deal(209, 189.99, '-9 %');
const SYS4 = cut([['MOTEUR', undefined, 'moteur'], ['BOÎTE', undefined, 'boîte'], ['AIRBAG', undefined, 'airbag'], ['ABS', undefined, 'ABS']]);

/* ------------------------------------------------------------------ Pack Force Nutrimea */
const WARN_PACK = 'Compléments alimentaires. Déconseillés aux femmes enceintes ou allaitantes et aux enfants.\nNe pas dépasser la dose journalière indiquée.';
const CREA = 'videos/photos/nutrimea-creatine.jpg';
const COLL = 'videos/photos/nutrimea-collagene.jpg';
const PDEAL = deal(58.8, 45.9, '-22 %');
const ALLEG: SceneFn = (a, t0) => ({kind: 'power', fillFrom: t0 + 0.1, fillTo: a('répétés'), dumbbells: [a('courts'), a('intenses'), a('répétés')], keywords: [
  kw('3 G DE CRÉATINE PAR JOUR', t0 + 0.05, {y: 240, size: 100, stack: true}),
  kw('AUGMENTENT LA\nPERFORMANCE PHYSIQUE', a('performance'), {y: 410, size: 100, color: 'accent', stack: true}),
  kw("LORS D'EXERCICES COURTS,\nINTENSES ET RÉPÉTÉS", a('courts'), {y: 590, size: 80, stack: true})]});
const ALLEG_SAY = "[serious] trois grammes de créatine par jour augmentent la performance physique lors d'exercices courts, intenses et répétés,";

export const SPECS: Record<string, {p: ProductKey; jacket: number; blocks: Block[]}> = {
  /* ============================== ZAP MENTHE ×10 */
  'zapm-dimanche': {p: 'zapm', jacket: 0, blocks: [
    B("[shouting] Le Black Friday chez ZAP se termine dimanche, attention !", hook('BLACK FRIDAY\nFINI DIMANCHE ⏳', 170)),
    B('[excited] ZAP menthe verte, cent cinquante milligrammes de caféine par sachet,', two('ZAP MENTHE VERTE', '150 MG / SACHET', 'cent')),
    B('[amazed] presque deux expressos,', ZMCMP('presque', 'expressos')),
    B('[shouting] quatorze euros trente-sept au lieu de quinze treize,', ZMDEAL()),
    B('[enthusiastic] trente-six sachets, livraison gratuite, panier orange, FONCE !', cta([['36 SACHETS', 'trente-six'], ['LIVRAISON GRATUITE', 'livraison']], WARN150)),
  ]},
  'zapm-2expressos': {p: 'zapm', jacket: 1, blocks: [
    B('[amazed] Deux expressos dans un seul sachet, wesh ?!', hook('2 EXPRESSOS\nDANS 1 SACHET ?!', 170)),
    B('[excited] Le ZAP menthe verte, cent cinquante milligrammes de caféine,', ZMCMP('cent', 'caféine')),
    B('[enthusiastic] elle-théanine, vitamines B, tu le cales sous la lèvre,', cut([['L-THÉANINE', undefined, 'elle-théanine'], ['VITAMINES B', undefined, 'vitamines'], ['SOUS LA LÈVRE', undefined, 'cales']])),
    B('[shouting] quarante centimes le sachet,', big('0,40 €\nLE SACHET', 210)),
    B("[shouting] Black Friday jusqu'à dimanche, panier orange, FONCE !", cta([["BLACK FRIDAY · JUSQU'À DIMANCHE", 'Black']], WARN150)),
  ]},
  'zapm-terrasse': {p: 'zapm', jacket: 2, blocks: [
    B('[sarcastic] Tu payes encore ton café en terrasse tous les matins ?!', hook('TU PAYES ENCORE TON\nCAFÉ EN TERRASSE ?!', 130)),
    B('[excited] ZAP menthe verte, quarante centimes le sachet,', big('0,40 €\nLE SACHET', 210)),
    B('[amazed] cent cinquante milligrammes de caféine, presque deux expressos,', ZMCMP('cent', 'expressos')),
    B("[mischievously] zéro tasse, zéro file d'attente,", two('0 TASSE', "0 FILE D'ATTENTE", 'file', 170, 120)),
    B('[shouting] quatorze trente-sept au lieu de quinze treize,', ZMDEAL()),
    B('[shouting] livraison gratuite, panier orange, FONCE !', cta([['LIVRAISON GRATUITE', 'livraison']], WARN150)),
  ]},
  'zapm-legday': {p: 'zapm', jacket: 0, blocks: [
    B("[shouting] Leg day à sept heures du mat', et t'es encore au lit ?!", hook("LEG DAY À 7 H\nET T'ES AU LIT ?!", 160)),
    B('[excited] Un sachet ZAP menthe sous la lèvre,', big('1 SACHET\nSOUS LA LÈVRE', 180)),
    B('[amazed] cent cinquante milligrammes de caféine, presque deux expressos,', ZMCMP('cent', 'expressos')),
    B('[enthusiastic] elle-théanine et vitamines B,', ZMING),
    B("[shouting] quarante centimes le sachet, Black Friday jusqu'à dimanche, panier orange, FONCE !", cta([['0,40 € LE SACHET', 'quarante'], ["BLACK FRIDAY · JUSQU'À DIMANCHE", 'Black']], WARN150)),
  ]},
  'zapm-partiels': {p: 'zapm', jacket: 1, blocks: [
    B("[sarcastic] Tes partiels arrivent et t'es à plat dès dix heures ?!", hook('PARTIELS + À PLAT\nDÈS 10 H ?!', 150)),
    B('[excited] Glisse un ZAP menthe sous la lèvre, discret,', two('ZAP MENTHE', 'DISCRET 🤫', 'discret', 170, 150)),
    B('[amazed] cent cinquante milligrammes de caféine par sachet,', big('150 MG\nPAR SACHET', 200)),
    B('[enthusiastic] quatorze trente-sept les trente-six sachets, ça fait quarante centimes,', price(14.37, 36, 'SACHETS', 'LE SACHET', 'trente-six', 'quarante')),
    B("[shouting] livraison gratuite, jusqu'à dimanche, panier orange, FONCE !", cta([['LIVRAISON GRATUITE', 'livraison'], ["BLACK FRIDAY JUSQU'À DIMANCHE", "jusqu'à"]], WARN150)),
  ]},
  'zapm-trajet': {p: 'zapm', jacket: 2, blocks: [
    B("[excited] Une heure de trajet avant la salle, et t'as zéro énergie ?!", hook('1 H DE TRAJET\nAVANT LA SALLE ?!', 160)),
    B('[enthusiastic] ZAP menthe verte, ça tient dans ta poche,', two('ZAP MENTHE VERTE', 'ÇA TIENT DANS TA POCHE', 'tient', 140, 100)),
    B('[amazed] un sachet, cent cinquante milligrammes de caféine,', big('150 MG\nDE CAFÉINE', 200)),
    B('[shouting] quatorze euros trente-sept au lieu de quinze treize,', ZMDEAL()),
    B("[shouting] livraison gratuite, jusqu'à dimanche, panier orange, FONCE !", cta([['LIVRAISON GRATUITE', 'livraison'], ["JUSQU'À DIMANCHE 30/11", "jusqu'à"]], WARN150)),
  ]},
  'zapm-72': {p: 'zapm', jacket: 0, blocks: [
    B('[mischievously] Astuce, prends deux duos ZAP menthe !', hook('ASTUCE 💡\nPRENDS 2 DUOS', 170)),
    B("[excited] au-delà de vingt-cinq euros, c'est moins vingt pour cent,", big('-20 % AU-DELÀ\nDE 25 €', 170, {}, (a) => [SM("selon l'offre affichée sur la fiche", a('moins'), 520)])),
    B('[amazed] soixante-douze sachets pour environ vingt-trois euros,', two('72 SACHETS', '≈ 23 €', 'environ', 170, 210)),
    B('[enthusiastic] cent cinquante milligrammes de caféine chacun,', big('150 MG\nCHACUN', 200)),
    B("[shouting] jusqu'à dimanche trente novembre, panier orange, FONCE !", cta([["JUSQU'AU 30/11", "jusqu'à"]], WARN150)),
  ]},
  'zapm-frais': {p: 'zapm', jacket: 1, blocks: [
    B('[amazed] Le goût menthe verte, et cent cinquante milligrammes de caféine ?!', hook('MENTHE VERTE 🌿\n150 MG ?!', 180)),
    B('[enthusiastic] ZAP, fabriqué en Suède, avec elle-théanine et vitamines B,', cut([['FABRIQUÉ EN SUÈDE', undefined, 'fabriqué'], ['L-THÉANINE', undefined, 'elle-théanine'], ['VITAMINES B', undefined, 'vitamines']])),
    B('[excited] presque deux expressos dans un sachet,', ZMCMP('presque', 'expressos')),
    B('[shouting] quarante centimes le sachet, livraison gratuite, panier orange, FONCE !', cta([['0,40 € LE SACHET', 'quarante'], ['LIVRAISON GRATUITE', 'livraison']], WARN150)),
  ]},
  'zapm-valide': {p: 'zapm', jacket: 2, blocks: [
    B('[shouting] Quarante centimes le sachet de caféine, mais qui a validé ?!', hook('0,40 € LE SACHET\nQUI A VALIDÉ ?!', 150)),
    B('[excited] ZAP menthe verte, le duo, trente-six sachets,', two('ZAP MENTHE · DUO', '36 SACHETS', 'trente-six', 140, 170)),
    B('[amazed] quatorze trente-sept au lieu de quinze treize,', ZMDEAL()),
    B('[enthusiastic] le prix le plus bas sur trente jours,', big('LE PLUS BAS\nSUR 30 JOURS', 180)),
    B("[shouting] Black Friday jusqu'à dimanche, panier orange, FONCE !", cta([["BLACK FRIDAY · JUSQU'À DIMANCHE", 'Black']], WARN150)),
  ]},
  'zapm-jogging': {p: 'zapm', jacket: 0, blocks: [
    B('[excited] Ta pré-séance tient dans ta poche de jogging !', hook('TA PRÉ-SÉANCE DANS\nTA POCHE 🏃', 150)),
    B('[enthusiastic] un sachet ZAP menthe, cent cinquante milligrammes de caféine,', two('1 SACHET ZAP', '150 MG', 'cent', 160, 200)),
    B('[mischievously] zéro shaker, zéro poudre partout,', two('0 SHAKER', '0 POUDRE PARTOUT', 'poudre', 170, 120)),
    B('[amazed] quarante centimes la séance,', big('0,40 €\nLA SÉANCE', 210)),
    B("[shouting] livraison gratuite, jusqu'à dimanche, panier orange, FONCE !", cta([['LIVRAISON GRATUITE', 'livraison'], ["JUSQU'À DIMANCHE 30/11", "jusqu'à"]], WARN150)),
  ]},

  /* ============================== ZAP CERISE ×6 (aucun montant : prix actuel non vérifié) */
  'zapc-gout': {p: 'zapc', jacket: 1, blocks: [
    B('[amazed] De la caféine au goût cerise noire, t’as déjà testé ?!', hook('CAFÉINE GOÛT\nCERISE NOIRE 🍒', 170)),
    B('[excited] ZAP, un sachet sous la lèvre,', big('1 SACHET\nSOUS LA LÈVRE', 180)),
    B("[enthusiastic] cent milligrammes de caféine, plus qu'un expresso,", ZCCMP('cent', 'expresso')),
    B('[mischievously] elle-théanine, vitamines B, fabriqué en Suède,', cut([['L-THÉANINE', undefined, 'elle-théanine'], ['VITAMINES B', undefined, 'vitamines'], ['FABRIQUÉ EN SUÈDE', undefined, 'fabriqué']])),
    B('[shouting] trente-six sachets dans le duo, panier orange, FONCE !', cta([['36 SACHETS DANS LE DUO', 'trente-six']], WARN_CAFEINE)),
  ]},
  'zapc-camp': {p: 'zapc', jacket: 2, blocks: [
    B("[excited] Cerise noire ou menthe verte, c'est quoi ton camp ?!", hook('CERISE 🍒 OU\nMENTHE 🌿 ?', 180)),
    B('[enthusiastic] la cerise, cent milligrammes par sachet,', big('CERISE NOIRE\n100 MG', 180)),
    B('[amazed] la menthe, cent cinquante milligrammes,', big('MENTHE VERTE\n150 MG', 180, {color: 'white'})),
    B('[mischievously] dis-moi ton camp en commentaire,', big('TON CAMP ?\nEN COMMENTAIRE 👇', 150)),
    B('[shouting] la cerise, trente-six sachets, panier orange, FONCE !', cta([['ZAP CERISE · 36 SACHETS', 'trente-six']], WARN_CAFEINE)),
  ]},
  'zapc-reveil': {p: 'zapc', jacket: 0, blocks: [
    B("[sarcastic] Ton réveil sonne, et t'as déjà envie de te recoucher ?!", hook("TON RÉVEIL SONNE\nET T'ES DÉJÀ KO ?!", 150)),
    B('[excited] Un ZAP cerise noire sous la lèvre,', big('1 ZAP CERISE\nSOUS LA LÈVRE', 170)),
    B("[amazed] cent milligrammes de caféine, plus qu'un expresso,", ZCCMP('cent', 'expresso')),
    B('[enthusiastic] et zéro café à préparer,', big('0 CAFÉ\nÀ PRÉPARER', 190)),
    B('[shouting] trente-six sachets, panier orange, FONCE !', cta([['36 SACHETS', 'trente-six']], WARN_CAFEINE)),
  ]},
  'zapc-shaker': {p: 'zapc', jacket: 1, blocks: [
    B('[shouting] Avant ta séance, oublie le shaker !', hook('AVANT TA SÉANCE ?\nOUBLIE LE SHAKER', 150)),
    B("[excited] Un sachet ZAP cerise noire, et t'es dans ta zone,", two('1 SACHET ZAP', "T'ES DANS TA ZONE", 'zone', 160, 120)),
    B('[amazed] cent milligrammes de caféine par sachet,', big('100 MG\nPAR SACHET', 200)),
    B('[enthusiastic] elle-théanine et vitamines B,', cut([['L-THÉANINE', undefined, 'elle-théanine'], ['VITAMINES B', undefined, 'vitamines']])),
    B('[shouting] trente-six sachets dans ta poche, panier orange, FONCE !', cta([['36 SACHETS', 'trente-six']], WARN_CAFEINE)),
  ]},
  'zapc-bureau': {p: 'zapc', jacket: 2, blocks: [
    B('[sarcastic] Quinze heures au bureau, et ton cerveau est en pause ?!', hook('15 H AU BUREAU\nCERVEAU EN PAUSE ?!', 150)),
    B('[mischievously] Un ZAP cerise noire, discret, sous la lèvre,', two('ZAP CERISE NOIRE', 'DISCRET 🤫', 'discret', 150, 150)),
    B("[amazed] cent milligrammes de caféine, plus qu'un expresso,", ZCCMP('cent', 'expresso')),
    B('[enthusiastic] et ça tient dans ta poche,', big('ÇA TIENT DANS\nTA POCHE', 180)),
    B('[shouting] trente-six sachets, panier orange, FONCE !', cta([['36 SACHETS', 'trente-six']], WARN_CAFEINE)),
  ]},
  'zapc-ouatte': {p: 'zapc', jacket: 0, blocks: [
    B('[shouting] Ouatte-de-fuck, cent milligrammes de caféine au goût cerise ?!', hook('100 MG DE CAFÉINE\nGOÛT CERISE ?!', 160)),
    B('[excited] ZAP, le duo, deux boîtes de dix-huit sachets,', two('LE DUO ZAP', '2 × 18 SACHETS', 'deux', 170, 150)),
    B("[amazed] plus qu'un expresso dans chaque sachet,", ZCCMP('plus', 'expresso')),
    B('[enthusiastic] fabriqué en Suède, elle-théanine, vitamines B,', cut([['FABRIQUÉ EN SUÈDE', undefined, 'fabriqué'], ['L-THÉANINE', undefined, 'elle-théanine'], ['VITAMINES B', undefined, 'vitamines']])),
    B('[shouting] cerise noire, panier orange, FONCE !', cta([['CERISE NOIRE 🍒', 'cerise']], WARN_CAFEINE)),
  ]},

  /* ============================== NUCLEVER ×8 */
  'nuc-plusbas': {p: 'nuc', jacket: 1, blocks: [
    B("[shouting] Le Cortisol Manager au prix le plus bas de l'année !", hook("PRIX LE PLUS BAS\nDE L'ANNÉE 🔥", 160)),
    B('[excited] Nuclever, vingt euros quatre-vingt-douze les trente sachets, soixante-dix centimes par jour,', price(20.92, 30, 'SACHETS', 'PAR JOUR', 'trente', 'soixante-dix')),
    B('[enthusiastic] ashwagandha, elle-théanine, magnésium, vitamine D,', NCUT),
    B('[serious] le magnésium contribue à réduire la fatigue,', FATIGUE),
    B('[shouting] livraison gratuite, panier orange, FONCE !', cta([['LIVRAISON GRATUITE', 'livraison']], WARN_NUCLEVER)),
  ]},
  'nuc-gourde': {p: 'nuc', jacket: 2, blocks: [
    B("[excited] Un sachet dans ta gourde, et c'est réglé !", hook('1 SACHET DANS\nTA GOURDE 💧', 170)),
    B('[enthusiastic] le Cortisol Manager de Nuclever, trois goûts,', two('CORTISOL MANAGER', '3 GOÛTS', 'trois', 130, 170)),
    B("[amazed] trois cents milligrammes d'ashwagandha, quatre cents de elle-théanine,", cut([['ASHWAGANDHA', '300 mg', 'ashwagandha'], ['L-THÉANINE', '400 mg', 'elle-théanine']], 'lid')),
    B("[serious] la vitamine D contribue au maintien d'une fonction musculaire normale,", VITD),
    B('[shouting] soixante-dix centimes par jour, panier orange, FONCE !', cta([['0,70 € PAR JOUR', 'soixante-dix']], WARN_NUCLEVER)),
  ]},
  'nuc-taf': {p: 'nuc', jacket: 0, blocks: [
    B('[sarcastic] Tes journées au taf te vident complètement ?!', hook('TES JOURNÉES AU TAF\nTE VIDENT ?!', 150)),
    B('[excited] Nuclever Cortisol Manager, un sachet par jour,', two('CORTISOL MANAGER', '1 SACHET / JOUR', 'sachet', 130, 140)),
    B('[serious] le magnésium contribue à réduire la fatigue,', FATIGUE),
    B('[amazed] cinquante-cinq mille vendus, quatre virgule cinq étoiles,', NAVIS('quatre', 'cinquante-cinq')),
    B('[shouting] vingt euros quatre-vingt-douze, livraison gratuite, panier orange, FONCE !', cta([['20,92 € LE MOIS', 'vingt'], ['LIVRAISON GRATUITE', 'livraison']], WARN_NUCLEVER)),
  ]},
  'nuc-routine': {p: 'nuc', jacket: 1, blocks: [
    B('[excited] Ma routine du soir, je te la montre !', hook('MA ROUTINE\nDU SOIR 🌙', 190)),
    B("[enthusiastic] un sachet de Cortisol Manager dans un verre d'eau,", big("1 SACHET\nDANS L'EAU", 190)),
    B('[amazed] goût litchi-fraise, framboise-citron ou pêche blanche,', two('3 GOÛTS', 'LITCHI-FRAISE · FRAMBOISE-CITRON\nPÊCHE BLANCHE', 'framboise-citron', 170, 60)),
    B('[serious] le magnésium contribue à des fonctions psychologiques normales,', PSY),
    B('[shouting] soixante-dix centimes par jour, livraison gratuite, panier orange, FONCE !', cta([['0,70 € PAR JOUR', 'soixante-dix'], ['LIVRAISON GRATUITE', 'livraison']], WARN_NUCLEVER)),
  ]},
  'nuc-etoi': {p: 'nuc', jacket: 2, blocks: [
    B("[amazed] Cinquante-cinq mille personnes l'ont pris, et toi ?!", hook('55 000 VENDUS\nET TOI ?!', 190)),
    B('[excited] le Cortisol Manager de Nuclever, quatre virgule cinq étoiles,', NAVIS('quatre', 'Cortisol')),
    B('[enthusiastic] ashwagandha, elle-théanine, magnésium, vitamine D,', NCUT),
    B('[serious] le magnésium contribue à réduire la fatigue,', FATIGUE),
    B("[shouting] prix le plus bas de l'année, panier orange, FONCE !", cta([["PRIX LE PLUS BAS DE L'ANNÉE", 'prix']], WARN_NUCLEVER)),
  ]},
  'nuc-valide': {p: 'nuc', jacket: 0, blocks: [
    B('[shouting] Soixante-dix centimes par jour, qui a validé ce prix ?!', hook('0,70 € PAR JOUR\nQUI A VALIDÉ ?!', 160)),
    B('[excited] Nuclever, trente sachets, vingt euros quatre-vingt-douze,', two('30 SACHETS', '20,92 €', 'vingt', 170, 210)),
    B('[enthusiastic] magnésium et vitamine D,', two('MAGNÉSIUM', 'VITAMINE D', 'vitamine', 170, 170)),
    B("[serious] la vitamine D contribue au maintien d'une fonction musculaire normale,", VITD),
    B('[shouting] livraison gratuite, panier orange, FONCE !', cta([['LIVRAISON GRATUITE', 'livraison']], WARN_NUCLEVER)),
  ]},
  'nuc-rince': {p: 'nuc', jacket: 1, blocks: [
    B("[sarcastic] Lundi, mardi, mercredi, et t'es déjà rincé ?!", hook('LUNDI, MARDI…\nDÉJÀ RINCÉ ?!', 170)),
    B('[excited] un sachet de Cortisol Manager par jour,', big('1 SACHET / JOUR', 170)),
    B('[serious] le magnésium contribue à réduire la fatigue,', FATIGUE),
    B('[amazed] trois goûts, et soixante-dix centimes par jour,', two('3 GOÛTS', '0,70 € / JOUR', 'soixante-dix', 170, 170)),
    B('[shouting] livraison gratuite, panier orange, FONCE !', cta([['LIVRAISON GRATUITE', 'livraison']], WARN_NUCLEVER)),
  ]},
  'nuc-enchaine': {p: 'nuc', jacket: 2, blocks: [
    B("[shouting] Salle, taf, études, t'enchaînes tout ?!", hook("SALLE, TAF, ÉTUDES\nT'ENCHAÎNES TOUT ?!", 150)),
    B('[excited] Nuclever Cortisol Manager, ashwagandha, elle-théanine, magnésium,', cut([['ASHWAGANDHA', '300 mg', 'ashwagandha'], ['L-THÉANINE', '400 mg', 'elle-théanine'], ['MAGNÉSIUM', '100 mg', 'magnésium']], 'lid')),
    B("[serious] la vitamine D contribue au maintien d'une fonction musculaire normale,", VITD),
    B('[amazed] cinquante-cinq mille vendus,', NAVIS('cinquante-cinq', 'cinquante-cinq')),
    B('[shouting] vingt euros quatre-vingt-douze le mois, panier orange, FONCE !', cta([['20,92 € LE MOIS', 'vingt']], WARN_NUCLEVER)),
  ]},

  /* ============================== MEDICUBE SET DE 3 ×5 */
  'trio-dimanche': {p: 'trio', jacket: 1, blocks: [
    B("[shouting] Le set Medicube à trente-cinq vingt, c'est fini dimanche !", hook('SET MEDICUBE\n35,20 € ⏳', 180, "avec les coupons · jusqu'au 30/11")),
    B('[excited] trois pots, Deep Vita C, Zero Pore et Red Peeling,', T3('Deep', 'Zero', 'Red')),
    B('[amazed] quarante-quatre euros au lieu de quarante-neuf quatre-vingt-dix-neuf,', TDEAL()),
    B('[enthusiastic] pores nets, éclat, selon la marque,', two('PORES NETS', 'ÉCLAT ✨', 'éclat', 170, 170, SELON('selon', 620))),
    B('[shouting] cadeau offert, livraison gratuite, panier orange, FONCE !', cta([['+ CADEAU OFFERT 🎁', 'cadeau'], ['LIVRAISON GRATUITE', 'livraison']])),
  ]},
  'trio-coreens': {p: 'trio', jacket: 2, blocks: [
    B('[excited] Trois toner pads coréens dans un seul set !', hook('3 TONER PADS\nCORÉENS 🇰🇷', 180)),
    B("[enthusiastic] la vitamine C, le Zero Pore aux AHA et BHA, et le peeling à l'acide succinique,", T3('vitamine', 'Zero', 'peeling')),
    B('[amazed] deux cent dix pads au total,', big('210 PADS', 230)),
    B('[shouting] trente-cinq vingt avec les coupons,', big('35,20 €\nAVEC COUPONS', 190)),
    B("[shouting] livraison gratuite, jusqu'au trente novembre, panier orange, FONCE !", cta([['LIVRAISON GRATUITE', 'livraison'], ["JUSQU'AU 30/11", "jusqu'au"]])),
  ]},
  'trio-coupons': {p: 'trio', jacket: 0, blocks: [
    B('[shouting] Ouatte-de-fuck, quarante-quatre euros, et trente-cinq vingt avec les coupons ?!', hook('44 € → 35,20 €\nAVEC COUPONS ?!', 160)),
    B('[excited] le set Medicube de trois toner pads,', big('SET DE 3\nTONER PADS', 180)),
    B('[enthusiastic] vitamine C, AHA, BHA, acide succinique,', cut([['VITAMINE C', undefined, 'vitamine'], ['AHA · BHA', undefined, 'AHA'], ['ACIDE SUCCINIQUE', undefined, 'acide']])),
    B('[mischievously] pour une peau nette, selon la marque,', big('PEAU NETTE ✨', 190, {}, SELON('selon', 440))),
    B("[shouting] prix le plus bas sur trente jours, jusqu'à dimanche, panier orange, FONCE !", cta([['LE PLUS BAS SUR 30 JOURS', 'prix'], ["JUSQU'À DIMANCHE 30/11", "jusqu'à"]])),
  ]},
  'trio-cadeau': {p: 'trio', jacket: 1, blocks: [
    B('[excited] Le cadeau de Noël, avec un cadeau offert dedans !', hook('UN CADEAU…\nAVEC UN CADEAU 🎁', 170)),
    B('[enthusiastic] le set Medicube, trois pots de soixante-dix pads,', two('SET MEDICUBE', '3 × 70 PADS', 'trois', 150, 180)),
    B('[amazed] Deep Vita C, Zero Pore, Red Peeling,', T3('Deep', 'Zero', 'Red')),
    B('[shouting] trente-cinq vingt avec les coupons, au lieu de quarante-neuf quatre-vingt-dix-neuf,', big('35,20 €\nAVEC COUPONS', 190, {}, (a) => [SM('au lieu de 49,99 €', a('quarante-neuf'), 520)])),
    B("[shouting] jusqu'au trente novembre, panier orange, FONCE !", cta([["JUSQU'AU 30/11", "jusqu'au"]])),
  ]},
  'trio-2700': {p: 'trio', jacket: 2, blocks: [
    B('[amazed] Deux mille sept cents vendus, quatre virgule six étoiles !', hook('2 700 VENDUS\n4,6 ⭐', 190)),
    B('[excited] le set de trois toner pads Medicube,', big('SET DE 3\nTONER PADS', 180)),
    B('[enthusiastic] pores, marques post-imperfections, éclat, selon la marque,', three([['PORES', 'pores', 150], ['MARQUES POST-IMPERFECTIONS', 'marques', 75], ['ÉCLAT ✨', 'éclat', 150]], SELON('selon', 650))),
    B('[shouting] quarante-quatre euros au lieu de quarante-neuf quatre-vingt-dix-neuf,', TDEAL()),
    B("[shouting] cadeau offert, Black Friday jusqu'à dimanche, panier orange, FONCE !", cta([['+ CADEAU OFFERT 🎁', 'cadeau'], ["JUSQU'À DIMANCHE 30/11", 'Black']])),
  ]},

  /* ============================== MEDICUBE DUO ×5 (livraison payante < 30 € : jamais « gratuite ») */
  'duo-dimanche': {p: 'duo', jacket: 0, blocks: [
    B("[shouting] Le duo Medicube à vingt-trois quatre-vingt-dix-neuf, ça s'arrête dimanche !", hook('DUO MEDICUBE\n23,99 € ⏳', 180, "avec les coupons · jusqu'au 30/11")),
    B('[excited] le Zero Pore et le Red Peeling,', D2('Zero', 'Red')),
    B('[amazed] vingt-neuf quatre-vingt-dix-neuf au lieu de trente-sept cinquante,', DDEAL()),
    B('[enthusiastic] pores nets, selon la marque,', big('PORES NETS', 200, {}, SELON('selon', 440))),
    B('[shouting] cadeau offert, panier orange, FONCE !', cta([['+ CADEAU OFFERT 🎁', 'cadeau']])),
  ]},
  'duo-pots': {p: 'duo', jacket: 1, blocks: [
    B("[excited] Le pot bleu, c'est le Zero Pore !", hook('LE POT BLEU 💙', 200)),
    B('[enthusiastic] AHA, BHA, panthénol et allantoïne,', cut([['AHA · BHA', undefined, 'AHA'], ['PANTHÉNOL', undefined, 'panthénol'], ['ALLANTOÏNE', undefined, 'allantoïne']])),
    B("[amazed] et le pot rouge, le Red Peeling, à l'acide succinique,", two('LE POT ROUGE ❤️', 'RED PEELING', 'Red', 150, 170)),
    B('[shouting] le duo à vingt-trois quatre-vingt-dix-neuf avec les coupons,', big('23,99 €\nAVEC COUPONS', 190)),
    B("[shouting] Black Friday jusqu'au trente, panier orange, FONCE !", cta([["BLACK FRIDAY · JUSQU'AU 30/11", 'Black']])),
  ]},
  'duo-attends': {p: 'duo', jacket: 2, blocks: [
    B('[sarcastic] Trente-sept cinquante le duo ? Non, attends !', hook('37,50 € ?\nATTENDS…', 190)),
    B('[shouting] moins vingt pour cent, vingt-neuf quatre-vingt-dix-neuf,', DDEAL()),
    B('[amazed] et vingt-trois quatre-vingt-dix-neuf avec les coupons,', big('23,99 €\nAVEC COUPONS', 190)),
    B('[enthusiastic] Zero Pore et Red Peeling, cent quarante pads,', D2('Zero', 'Red', (a) => [kw('140 PADS', a('cent'), {y: 600, size: 110, color: 'white', stack: true})])),
    B('[shouting] le plus bas sur trente jours, panier orange, FONCE !', cta([['LE PLUS BAS SUR 30 JOURS', 'plus']])),
  ]},
  'duo-glass': {p: 'duo', jacket: 0, blocks: [
    B("[excited] L'effet glass skin à la coréenne, selon la marque !", hook('EFFET GLASS SKIN\nÀ LA CORÉENNE ✨', 150, 'selon la marque')),
    B('[enthusiastic] le Zero Pore pour les pores,', two('ZERO PORE', 'POUR LES PORES', 'pores', 170, 120, SELON('pores', 600))),
    B('[enthusiastic] le Red Peeling pour les marques post-imperfections,', two('RED PEELING', 'MARQUES\nPOST-IMPERFECTIONS', 'marques', 170, 90, SELON('marques', 640))),
    B('[amazed] vingt-trois quatre-vingt-dix-neuf avec les coupons,', big('23,99 €\nAVEC COUPONS', 190)),
    B("[shouting] cadeau offert, jusqu'au trente novembre, panier orange, FONCE !", cta([['+ CADEAU OFFERT 🎁', 'cadeau'], ["JUSQU'AU 30/11", "jusqu'au"]])),
  ]},
  'duo-pad17': {p: 'duo', jacket: 1, blocks: [
    B("[shouting] Dix-sept centimes le pad coréen, c'est pas une blague !", hook('0,17 €\nLE PAD ?!', 220)),
    B('[excited] le duo Medicube, cent quarante pads,', two('DUO MEDICUBE', '140 PADS', 'cent', 150, 190)),
    B('[amazed] vingt-trois quatre-vingt-dix-neuf avec les coupons, divisé par cent quarante, ça fait dix-sept centimes,', price(23.99, 140, 'PADS', 'LE PAD', 'divisé', 'dix-sept', (a) => [SM('avec les coupons', a('coupons'), 240)])),
    B('[enthusiastic] Zero Pore et Red Peeling,', D2('Zero', 'Red')),
    B("[shouting] Black Friday jusqu'à dimanche, panier orange, FONCE !", cta([["BLACK FRIDAY · JUSQU'À DIMANCHE", 'Black']])),
  ]},

  /* ============================== TOPDON ×7 (motion 1,8) */
  'top-dimanche': {p: 'top', jacket: 0, blocks: [
    B("[shouting] La valise diag Topdon en promo, c'est fini dimanche !", hook('PROMO TOPDON\nFINIE DIMANCHE ⏳', 160)),
    B('[excited] la ArtiDiag six cents S,', big('ARTIDIAG\n600 S', 220)),
    B('[enthusiastic] moteur, boîte, airbag, ABS,', SYS4),
    B('[amazed] cent quatre-vingt-neuf quatre-vingt-dix-neuf au lieu de deux cent neuf,', TDEAL2()),
    B('[shouting] et cent cinquante et un avec les coupons,', big('151,99 €\nAVEC COUPONS', 190, {}, (a) => [SM('selon les coupons disponibles', a('coupons'), 520)])),
    B('[shouting] livraison gratuite, panier orange, FONCE !', cta([['LIVRAISON GRATUITE', 'livraison']])),
  ]},
  'top-efface': {p: 'top', jacket: 1, blocks: [
    B('[shouting] Voyant moteur allumé ? Branche, lis, efface !', hook('VOYANT ALLUMÉ ?\nBRANCHE · LIS · EFFACE', 130)),
    B('[excited] La Topdon se branche sur ta prise OBD,', photo(TPHOTO, 'SUR TA PRISE OBD', 'prise')),
    B('[enthusiastic] elle lit et efface les codes défaut,', big('LIT + EFFACE\nLES CODES', 190)),
    B('[amazed] écran cinq pouces, mises à jour gratuites à vie,', two('ÉCRAN 5 POUCES', 'MISES À JOUR\nGRATUITES À VIE', 'mises', 150, 110)),
    B('[shouting] cent quatre-vingt-neuf quatre-vingt-dix-neuf au lieu de deux cent neuf,', TDEAL2()),
    B("[shouting] Black Friday jusqu'au trente, livraison gratuite, panier orange, FONCE !", cta([["BLACK FRIDAY · JUSQU'AU 30/11", 'Black'], ['LIVRAISON GRATUITE', 'livraison']])),
  ]},
  'top-mainsvides': {p: 'top', jacket: 2, blocks: [
    B("[sarcastic] Tu vas voir une voiture d'occasion les mains vides ?!", hook("VOIR UNE OCCASION\nLES MAINS VIDES ?!", 150)),
    B('[excited] Prends la Topdon, tu lis les codes défaut,', photo(TPHOTO, 'LIS LES CODES DÉFAUT', 'codes')),
    B('[enthusiastic] moteur, boîte, airbag, ABS, données en temps réel,', cut([['MOTEUR · BOÎTE', undefined, 'moteur'], ['AIRBAG · ABS', undefined, 'airbag'], ['DONNÉES EN TEMPS RÉEL', undefined, 'données']])),
    B('[amazed] quatre virgule quatre étoiles,', avis(4.4, 189, 1690, 'quatre', 'étoiles')),
    B("[shouting] cent quatre-vingt-neuf quatre-vingt-dix-neuf, livraison gratuite, jusqu'au trente, panier orange, FONCE !", cta([['189,99 € AU LIEU DE 209 €', 'cent'], ['LIVRAISON GRATUITE', 'livraison']])),
  ]},
  'top-hiver': {p: 'top', jacket: 0, blocks: [
    B("[excited] L'hiver arrive, fais le check de ta caisse toi-même !", hook("L'HIVER ARRIVE ❄️\nCHECK TA CAISSE", 160)),
    B('[enthusiastic] la Topdon ArtiDiag six cents S,', big('TOPDON\nARTIDIAG 600 S', 170)),
    B("[amazed] lecture et effacement des codes, neuf services d'entretien,", two('LECTURE + EFFACEMENT', "9 SERVICES D'ENTRETIEN", 'neuf', 120, 100)),
    B('[shouting] cent cinquante et un quatre-vingt-dix-neuf avec les coupons,', big('151,99 €\nAVEC COUPONS', 190, {}, (a) => [SM('selon les coupons disponibles', a('coupons'), 520)])),
    B("[shouting] jusqu'au trente novembre, livraison gratuite, panier orange, FONCE !", cta([["JUSQU'AU 30/11", "jusqu'au"], ['LIVRAISON GRATUITE', 'livraison']])),
  ]},
  'top-daron': {p: 'top', jacket: 1, blocks: [
    B('[excited] Ton daron bricole sa caisse ? Voilà son cadeau !', hook('TON DARON BRICOLE ?\nSON CADEAU 🎁', 150)),
    B('[enthusiastic] la valise diag Topdon, avec sa sacoche,', two('VALISE DIAG TOPDON', '+ SACOCHE', 'sacoche', 130, 160)),
    B('[amazed] moteur, boîte, airbag, ABS,', SYS4),
    B('[shouting] cent quatre-vingt-neuf quatre-vingt-dix-neuf au lieu de deux cent neuf,', TDEAL2()),
    B('[shouting] livraison gratuite, panier orange, FONCE !', cta([['LIVRAISON GRATUITE', 'livraison']])),
  ]},
  'top-valide': {p: 'top', jacket: 2, blocks: [
    B('[shouting] Cent cinquante et un euros la valise diag, mais qui a validé ?!', hook('151 € LA VALISE ?!\nQUI A VALIDÉ ?!', 150, 'avec les coupons, selon les coupons disponibles')),
    B('[excited] Topdon ArtiDiag six cents S, normalement deux cent neuf,', TDEAL2()),
    B('[amazed] et avec les coupons, cent cinquante et un quatre-vingt-dix-neuf,', big('151,99 €\nAVEC COUPONS', 190)),
    B('[enthusiastic] mises à jour gratuites à vie,', big('MISES À JOUR\nGRATUITES À VIE', 160)),
    B("[shouting] Black Friday jusqu'au trente, panier orange, FONCE !", cta([["BLACK FRIDAY · JUSQU'AU 30/11", 'Black']])),
  ]},
  'top-ecran': {p: 'top', jacket: 0, blocks: [
    B("[excited] Regarde ce que t'as sur l'écran, wesh !", hook("REGARDE\nL'ÉCRAN 👀", 200)),
    B('[enthusiastic] codes défaut, données en temps réel, test du capteur oxygène,', cut([['CODES DÉFAUT', undefined, 'codes'], ['DONNÉES EN TEMPS RÉEL', undefined, 'données'], ['TEST CAPTEUR O2', undefined, 'test']])),
    B('[amazed] Android onze, écran cinq pouces,', two('ANDROID 11', 'ÉCRAN 5 POUCES', 'écran', 170, 150)),
    B('[shouting] cent quatre-vingt-neuf quatre-vingt-dix-neuf, moins neuf pour cent,', TDEAL2()),
    B("[shouting] livraison gratuite, jusqu'au trente novembre, panier orange, FONCE !", cta([['LIVRAISON GRATUITE', 'livraison'], ["JUSQU'AU 30/11", "jusqu'au"]])),
  ]},

  /* ============================== PACK FORCE NUTRIMEA ×7 (les DEUX produits) */
  'pack-findimanche': {p: 'pack', jacket: 1, blocks: [
    B("[shouting] Le pack créatine et collagène à ce prix, c'est jusqu'à dimanche !", hook("CRÉATINE + COLLAGÈNE\nJUSQU'À DIMANCHE ⏳", 130)),
    B('[excited] la créatine Creapure, cinq cents grammes,', photo(CREA, 'CRÉATINE CREAPURE®', 'créatine', '500 G · 144 DOSES', 'cinq')),
    B('[excited] et le collagène marin, quatre-vingt-dix gélules,', photo(COLL, '+ COLLAGÈNE MARIN', 'collagène', 'TYPE I · 90 GÉLULES', 'quatre-vingt-dix')),
    B('[shouting] quarante-cinq quatre-vingt-dix au lieu de cinquante-huit quatre-vingts,', PDEAL((a) => [kw('LES DEUX PRODUITS', a('cinquante-huit'), {y: 840, size: 90, stack: true})])),
    B('[shouting] livraison gratuite, panier orange, prends le pack !', cta([['LIVRAISON GRATUITE', 'livraison'], ["JUSQU'AU 30/11", 'panier']], WARN_PACK)),
  ]},
  'pack-colis': {p: 'pack', jacket: 2, blocks: [
    B('[excited] Deux produits, un seul colis, et moins vingt-deux pour cent !', hook('2 PRODUITS\n1 SEUL COLIS', 190)),
    B('[enthusiastic] la créatine monohydrate Creapure, cent pour cent pure,', photo(CREA, 'CRÉATINE CREAPURE®', 'créatine', '100 % PURE', 'cent')),
    B('[enthusiastic] le collagène marin type un, riche en vitamines C et E naturelles,', photo(COLL, 'COLLAGÈNE MARIN', 'collagène', 'TYPE I', 'type', (a) => [SM("selon l'emballage", a('vitamines'), 430)])),
    B(ALLEG_SAY, ALLEG),
    B('[shouting] quarante-cinq quatre-vingt-dix les deux, panier orange, FONCE !', cta([['45,90 € LES DEUX', 'quarante-cinq']], WARN_PACK)),
  ]},
  'pack-5880': {p: 'pack', jacket: 0, blocks: [
    B('[shouting] Quarante-cinq quatre-vingt-dix le pack de la salle, au lieu de cinquante-huit quatre-vingts !', hook('45,90 €\nAU LIEU DE 58,80 €', 170)),
    B('[excited] dedans, la créatine Creapure, testée antidopage,', photo(CREA, 'CRÉATINE CREAPURE®', 'créatine', 'TESTÉE ANTIDOPAGE', 'testée')),
    B('[excited] et le collagène marin type un,', photo(COLL, '+ COLLAGÈNE MARIN', 'collagène', 'TYPE I · 90 GÉLULES', 'type')),
    B(ALLEG_SAY, ALLEG),
    B('[shouting] le plus bas sur trente jours, livraison gratuite, panier orange, FONCE !', cta([['LE PLUS BAS SUR 30 JOURS', 'plus'], ['LIVRAISON GRATUITE', 'livraison']], WARN_PACK)),
  ]},
  'pack-stock': {p: 'pack', jacket: 1, blocks: [
    B("[shouting] Winter arc, ton stock de l'hiver dans un seul pack !", hook("WINTER ARC ❄️\nTON STOCK D'HIVER", 160)),
    B('[excited] cent quarante-quatre doses de créatine Creapure,', big('144 DOSES\nDE CRÉATINE', 190)),
    B('[excited] plus quatre-vingt-dix gélules de collagène marin,', big('+ 90 GÉLULES DE\nCOLLAGÈNE MARIN', 150, {color: 'white'})),
    B('[shouting] moins vingt-deux pour cent, quarante-cinq quatre-vingt-dix,', PDEAL()),
    B("[shouting] jusqu'au trente novembre, livraison gratuite, panier orange, FONCE !", cta([["JUSQU'AU 30/11", "jusqu'au"], ['LIVRAISON GRATUITE', 'livraison']], WARN_PACK)),
  ]},
  'pack-salle': {p: 'pack', jacket: 2, blocks: [
    B('[excited] Avant la salle, ta dose de créa, et tes gélules de collagène !', hook('CRÉA + COLLAGÈNE\nLE DUO DE LA SALLE', 140)),
    B(ALLEG_SAY, ALLEG),
    B('[enthusiastic] la créatine Creapure et le collagène marin de Nutrimea, marque française,', two('NUTRIMEA', 'MARQUE FRANÇAISE 🇫🇷', 'marque', 170, 120)),
    B('[amazed] quatre virgule six étoiles, presque cinq mille packs vendus,', avis(4.6, 347, 4835, 'quatre', 'presque', 'PACKS VENDUS')),
    B("[shouting] quarante-cinq quatre-vingt-dix, Black Friday jusqu'au trente, panier orange, FONCE !", cta([['45,90 € AU LIEU DE 58,80 €', 'quarante-cinq'], ["JUSQU'AU 30/11", 'Black']], WARN_PACK)),
  ]},
  'pack-potesalle': {p: 'pack', jacket: 0, blocks: [
    B('[excited] Ton pote vit à la salle ? Voilà son cadeau de Noël !', hook('TON POTE VIT\nÀ LA SALLE ? 🎁', 170)),
    B('[enthusiastic] le Pack Force Nutrimea, créatine Creapure,', photo(CREA, 'CRÉATINE CREAPURE®', 'créatine', '500 G', 'Creapure')),
    B('[enthusiastic] et collagène marin, quatre-vingt-dix gélules,', photo(COLL, '+ COLLAGÈNE MARIN', 'collagène', '90 GÉLULES', 'quatre-vingt-dix')),
    B('[shouting] quarante-cinq quatre-vingt-dix au lieu de cinquante-huit quatre-vingts,', PDEAL()),
    B('[shouting] livraison gratuite, panier orange, offre-lui le pack !', cta([['LIVRAISON GRATUITE', 'livraison'], ['OFFRE-LUI LE PACK 🎁', 'offre-lui']], WARN_PACK)),
  ]},
  'pack-separement': {p: 'pack', jacket: 1, blocks: [
    B('[sarcastic] Pourquoi payer la créatine et le collagène séparément ?!', hook('POURQUOI LES PAYER\nSÉPARÉMENT ?!', 150)),
    B('[excited] le Pack Force, les deux pour quarante-cinq quatre-vingt-dix,', two('PACK FORCE', '45,90 € LES DEUX', 'quarante-cinq', 170, 150)),
    B('[enthusiastic] créatine Creapure, vegan, sans gluten,', photo(CREA, 'CRÉATINE CREAPURE®', 'créatine', 'VEGAN · SANS GLUTEN', 'vegan')),
    B('[enthusiastic] collagène marin type un, sans lactose,', photo(COLL, 'COLLAGÈNE MARIN', 'collagène', 'TYPE I · SANS LACTOSE', 'type')),
    B('[shouting] moins vingt-deux pour cent, livraison gratuite, panier orange, FONCE !', cta([['-22 % · BLACK FRIDAY', 'moins'], ['LIVRAISON GRATUITE', 'livraison']], WARN_PACK)),
  ]},

  /* ============================== BONUS (reste des crédits) */
  'top-dernier': {p: 'top', jacket: 1, blocks: [
    B("[shouting] Derniers jours du Black Friday sur la Topdon !", hook('DERNIERS JOURS\nBLACK FRIDAY ⏳', 160)),
    B('[excited] moteur, boîte, airbag, ABS,', SYS4),
    B('[amazed] cent quatre-vingt-neuf quatre-vingt-dix-neuf au lieu de deux cent neuf,', TDEAL2()),
    B("[shouting] livraison gratuite, jusqu'au trente, panier orange, FONCE !", cta([['LIVRAISON GRATUITE', 'livraison'], ["JUSQU'AU 30/11", "jusqu'au"]])),
  ]},
  'top-garage3': {p: 'top', jacket: 2, blocks: [
    B('[sarcastic] Le garage veut te voir juste pour lire un code ?!', hook('LE GARAGE JUSTE\nPOUR LIRE UN CODE ?!', 140)),
    B('[excited] la Topdon le lit et l’efface, toute seule,', photo(TPHOTO, 'LIT + EFFACE LES CODES', 'lit')),
    B('[shouting] cent cinquante et un avec les coupons,', big('151,99 €\nAVEC COUPONS', 190, {}, (a) => [SM('selon les coupons disponibles', a('coupons'), 520)])),
    B('[shouting] livraison gratuite, panier orange, FONCE !', cta([['LIVRAISON GRATUITE', 'livraison']])),
  ]},
  'duo-dernier': {p: 'duo', jacket: 2, blocks: [
    B('[shouting] Le duo Medicube à moins vingt pour cent, derniers jours !', hook('DUO MEDICUBE -20 %\nDERNIERS JOURS ⏳', 140)),
    B('[excited] Zero Pore et Red Peeling,', D2('Zero', 'Red')),
    B('[amazed] vingt-trois quatre-vingt-dix-neuf avec les coupons,', big('23,99 €\nAVEC COUPONS', 190)),
    B("[shouting] cadeau offert, jusqu'au trente, panier orange, FONCE !", cta([['+ CADEAU OFFERT 🎁', 'cadeau'], ["JUSQU'AU 30/11", "jusqu'au"]])),
  ]},
  'zapm-dernier': {p: 'zapm', jacket: 2, blocks: [
    B('[shouting] Le ZAP menthe en Black Friday, plus que ce week-end !', hook('ZAP MENTHE\nBLACK FRIDAY ⏳', 170)),
    B('[amazed] cent cinquante milligrammes de caféine, quarante centimes le sachet,', two('150 MG', '0,40 € LE SACHET', 'quarante', 200, 150)),
    B('[shouting] livraison gratuite, jusqu’au trente novembre, panier orange, FONCE !', cta([['LIVRAISON GRATUITE', 'livraison'], ["JUSQU'AU 30/11", 'trente']], WARN150)),
  ]},
  'pack-dernier': {p: 'pack', jacket: 2, blocks: [
    B('[shouting] Créatine et collagène à moins vingt-deux pour cent, derniers jours !', hook('CRÉATINE + COLLAGÈNE\n-22 % · DERNIERS JOURS', 130)),
    B('[excited] créatine Creapure cinq cents grammes, collagène marin quatre-vingt-dix gélules,', cut([['CRÉATINE CREAPURE®', '500 g', 'créatine'], ['COLLAGÈNE MARIN', '90 gélules', 'collagène']])),
    B('[shouting] quarante-cinq quatre-vingt-dix les deux, livraison gratuite, panier orange, FONCE !', cta([['45,90 € LES DEUX', 'quarante-cinq'], ['LIVRAISON GRATUITE', 'livraison']], WARN_PACK)),
  ]},
};
