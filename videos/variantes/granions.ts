import tSha from '../../public/videos/granions-shaker/timings.json';
import tAth from '../../public/videos/granions-athletes/timings.json';
import tShp from '../../public/videos/granions-shampoing/timings.json';
import t80 from '../../public/videos/granions-80cts/timings.json';
import {variant, kw, JACKETS, WARN_COMPLEMENT} from '../../src/lib/variant';

type R = (w: string, n?: number) => number;
const COL = {accent: '#1FA3B5', productScale: 0.8};
const CHX = {accent: '#3B6BFF', productScale: 0.8};
const VITC = (r: R) => kw('La vitamine C contribue à la formation\nnormale de collagène', r('contribue'), {y: 690, size: 34, small: true, stack: true});
const WARN = (from: number) => kw(WARN_COMPLEMENT, from + 0.05, {y: 700, size: 30, small: true, stack: true});
const AVIS_COL = (r: R, from: number) => ({kind: 'reviews' as const, from, rating: 4.5, reviews: 178, sold: 1440, ratingAt: r('quatre') + 0.1, soldAt: r('étoiles') + 0.2});
const AVIS_CHX = (r: R, from: number) => ({kind: 'reviews' as const, from, rating: 4.7, reviews: 81, sold: 709, ratingAt: r('quatre') + 0.1, soldAt: r('étoiles') + 0.2});

export const shaker = variant({
  id: 'granions-shaker', timings: tSha, ...COL, productImage: 'videos/granions-shaker/produit.png', jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('10 G DE COLLAGÈNE\nDANS TON SHAKER', r('dix'), {y: 290, size: 120, color: 'accent'}),
      kw('SANS AUCUN GOÛT ?!', r('goût'), {y: 500, size: 120, impact: true, stack: true}),
    ]},
    {kind: 'benefit', from: r('Granions') - 0.08, keywords: [
      kw('GOÛT NEUTRE', r('neutre'), {y: 300, size: 160, color: 'accent', impact: true}),
    ]},
    {kind: 'cutaway', from: r('collagène', 3) - 0.08, openAt: r('collagène', 3) + 0.1, items: [
      {label: 'COLLAGÈNE MARIN', sub: 'type I · hydrolysé', at: r('collagène', 3)},
      {label: '< 2 000 DALTONS', sub: 'bas poids moléculaire', at: r('bas')},
      {label: 'VITAMINE C', at: r('vitamine')},
    ], keywords: [VITC(r)]},
    {kind: 'benefit', from: r('zéro') - 0.08, keywords: [
      kw('0 SUCRE AJOUTÉ', r('zéro'), {y: 290, size: 120, color: 'accent', stack: true}),
      kw('0 ÉDULCORANT', r('zéro', 2), {y: 440, size: 120, stack: true}),
      kw('0 LACTOSE', r('zéro', 3), {y: 590, size: 120, stack: true}),
    ]},
    AVIS_COL(r, r('quatre') - 0.08),
    {kind: 'cta', from: r('vingt-sept') - 0.08, arrowAt: r('panier'), keywords: [
      kw('27,90 €\n25 JOURS', r('vingt-sept'), {y: 500, size: 120, color: 'accent', stack: true}), WARN(r('vingt-sept'))]},
  ],
});

export const athletes = variant({
  id: 'granions-athletes', timings: tAth, ...COL, productImage: 'videos/granions-athletes/produit.png', jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('LES ATHLÈTES PROS\nPRENNENT QUOI ?!', r('prennent'), {y: 300, size: 140, color: 'accent'}),
    ]},
    {kind: 'benefit', from: r('Granions') - 0.08, keywords: [
      kw('TESTÉ & RECOMMANDÉ\nPAR DES ATHLÈTES PROS', r('testé'), {y: 300, size: 100, color: 'accent', stack: true}),
      kw('selon la marque', r('selon'), {y: 470, size: 40, small: true, stack: true}),
    ]},
    {kind: 'cutaway', from: r('Collagène') - 0.08, openAt: r('Collagène') + 0.1, items: [
      {label: 'COLLAGÈNE MARIN', sub: '10 g / jour · type I', at: r('dix')},
      {label: '< 2 000 DALTONS', sub: 'bas poids moléculaire', at: r('bas')},
      {label: 'VITAMINE C', at: r('vitamine')},
    ], keywords: [VITC(r)]},
    {kind: 'price', from: r('vingt-sept') - 0.08, price: 27.9, doses: 25, divLabel: 'JOURS', unitLabel: 'PAR JOUR',
      priceAt: r('vingt-sept'), dividerAt: r('vingt-cinq'), resultAt: r('euro')},
    {kind: 'cta', from: r('boutique') - 0.08, arrowAt: r('panier'), keywords: [
      kw('BOUTIQUE OFFICIELLE', r('boutique'), {y: 500, size: 110, color: 'accent', stack: true}), WARN(r('boutique'))]},
  ],
});

export const shampoing = variant({
  id: 'granions-shampoing', timings: tShp, ...CHX, productImage: 'videos/granions-shampoing/produit.png', jacket: JACKETS[2], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('ARRÊTE DE CLAQUER\nTON FRIC', r('Arrête'), {y: 280, size: 130, color: 'alert'}),
      kw('DANS DES SHAMPOINGS\nMIRACLES !', r('shampoings'), {y: 510, size: 100, impact: true, stack: true}),
    ]},
    {kind: 'benefit', from: r('Granions') - 0.08, keywords: [
      kw('GUMMIES CHEVEUX\n4-EN-1', r('Gummies'), {y: 300, size: 130, color: 'accent', stack: true}),
      kw('2 GUMMIES / JOUR', r('deux'), {y: 520, size: 110, stack: true}),
    ]},
    {kind: 'cutaway', from: r('biotine') - 0.08, openAt: r('biotine') + 0.1, items: [
      {label: 'BIOTINE · ZINC · SÉLÉNIUM', at: r('biotine')},
      {label: 'CUIVRE', at: r('cuivre')},
      {label: 'KÉRATINE', sub: '110 mg', at: r('kératine')},
    ], keywords: [
      kw('Biotine, zinc et sélénium : maintien de cheveux normaux', r('maintien'), {y: 680, size: 32, small: true, stack: true}),
      kw('Cuivre : pigmentation normale des cheveux', r('pigmentation'), {y: 725, size: 32, small: true, stack: true}),
    ]},
    {kind: 'benefit', from: r('fabriqués') - 0.08, keywords: [
      kw('FABRIQUÉ\nEN FRANCE', r('fabriqués'), {y: 300, size: 150, color: 'accent', impact: true}),
    ]},
    AVIS_CHX(r, r('quatre') - 0.08),
    {kind: 'cta', from: r('vingt-trois') - 0.08, arrowAt: r('panier'), keywords: [
      kw('23,99 €\nLE MOIS', r('vingt-trois'), {y: 500, size: 120, color: 'accent', stack: true}), WARN(r('vingt-trois'))]},
  ],
});

export const cts80 = variant({
  id: 'granions-80cts', timings: t80, ...CHX, productImage: 'videos/granions-80cts/produit.png', jacket: JACKETS[0],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('WESH ?!', r('Wesh'), {y: 300, size: 220, color: 'accent', impact: true}),
      kw('0,80 € / JOUR\nPOUR TES CHEVEUX ?!', r('quatre-vingts'), {y: 300, size: 140}),
    ]},
    {kind: 'price', from: r('Les') - 0.08, price: 23.99, doses: 30, divLabel: 'JOURS', unitLabel: 'PAR JOUR',
      priceAt: r('vingt-trois'), dividerAt: r('deux'), resultAt: r('mois')},
    {kind: 'cutaway', from: r('dedans') - 0.08, openAt: r('dedans') + 0.1, items: [
      {label: 'KÉRATINE', at: r('kératine')},
      {label: 'BIOTINE', at: r('biotine')},
      {label: 'ZINC · SÉLÉNIUM · CUIVRE', at: r('zinc')},
      {label: '+ 5 VITAMINES', sub: 'B3 · B6 · B9 · B12 · E', at: r('cinq')},
    ]},
    {kind: 'benefit', from: r('biotine', 2) - 0.08, keywords: [
      kw('BIOTINE, ZINC ET SÉLÉNIUM\nCONTRIBUENT AU MAINTIEN\nDE CHEVEUX NORMAUX', r('biotine', 2), {y: 330, size: 80, color: 'accent', stack: true}),
      kw('FABRIQUÉ EN FRANCE', r('fabriqués'), {y: 580, size: 100, stack: true}),
    ]},
    AVIS_CHX(r, r('quatre') - 0.08),
    {kind: 'cta', from: r('panier') - 0.1, arrowAt: r('panier'), keywords: [
      kw('23,99 € LE MOIS', r('panier'), {y: 500, size: 110, color: 'accent', stack: true}), WARN(r('panier'))]},
  ],
});
