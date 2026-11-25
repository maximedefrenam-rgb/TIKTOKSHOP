import tGen from '../../public/videos/novoma-genoux/timings.json';
import t28 from '../../public/videos/novoma-28000/timings.json';
import t3 from '../../public/videos/novoma-3en1/timings.json';
import {variant, kw, JACKETS} from '../../src/lib/variant';

const P = {accent: '#7FE0CF', productImage: 'videos/novoma-donne/produit.png'};
type R = (w: string, n?: number) => number;
const COUPE = (r: R, from: number, n = 2) => ({kind: 'cutaway' as const, from, openAt: from + 0.1, items: [
  {label: 'COLLAGÈNE HYDROLYSÉ', sub: 'Naticol®', at: r('collagène', n)},
  {label: 'ACIDE HYALURONIQUE', at: r('acide')},
  {label: 'VITAMINE C', at: r('vitamine')},
]});
const VITC = (r: R) => kw('La vitamine C contribue à la formation normale de collagène', r('vitamine', 2), {y: 690, size: 34, small: true, stack: true});
const AVIS = (r: R, from: number, soldAt: number, ratingAt: number) => ({kind: 'reviews' as const, from, rating: 4.7, reviews: 86, sold: 28400, soldAt, ratingAt});
const CTA = (r: R, from: number) => ({kind: 'cta' as const, from, arrowAt: r('panier'),
  keywords: [kw('BLACK FRIDAY\n4,98 € · -58 %', from + 0.05, {y: 520, size: 110, color: 'accent', stack: true})]});

export const genoux = variant({
  id: 'novoma-genoux', timings: tGen, ...P, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('CRAC ! CRAC !', r('genoux'), {y: 300, size: 200, color: 'alert', impact: true}),
      kw('PLUS FORT QUE\nTA PLAYLIST ?!', r('playlist'), {y: 300, size: 150}),
    ]},
    COUPE(r, r('Collagène') - 0.08),
    {kind: 'benefit', from: r('pour') - 0.08, keywords: [
      kw('CONFORT\nARTICULAIRE', r('confort'), {y: 290, size: 130, color: 'accent', stack: true}),
      kw('HYDRATATION DE LA PEAU', r("l'hydratation"), {y: 480, size: 90, stack: true}),
      kw('QUALITÉ DES CHEVEUX', r('qualité'), {y: 590, size: 90, stack: true}),
      VITC(r),
    ]},
    AVIS(r, r('vingt-huit') - 0.08, r('vingt-huit'), r('quatre')),
    CTA(r, r('panier') - 0.1),
  ],
});

export const n28000 = variant({
  id: 'novoma-28000', timings: t28, ...P, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('WESH ?!', r('wesh'), {y: 300, size: 220, color: 'accent', impact: true}),
      kw('28 400 PERSONNES\nONT CRAQUÉ', r('vingt-huit'), {y: 300, size: 140}),
    ]},
    AVIS(r, r('Collagène') - 0.08, r('Collagène'), r('quatre')),
    COUPE(r, r('collagène', 2) - 0.08),
    {kind: 'benefit', from: r('pour', 2) - 0.08, keywords: [
      kw('HYDRATATION\nDE LA PEAU', r("l'hydratation"), {y: 290, size: 120, color: 'accent', stack: true}),
      kw('QUALITÉ DES CHEVEUX', r('qualité'), {y: 480, size: 90, stack: true}),
      kw('CONFORT ARTICULAIRE', r('confort'), {y: 590, size: 90, stack: true}),
      VITC(r),
    ]},
    CTA(r, r('soixante') - 0.08),
  ],
});

export const troisEn1 = variant({
  id: 'novoma-3en1', timings: t3, ...P, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('TA PEAU', r('peau'), {y: 250, size: 140, color: 'accent', stack: true}),
      kw('TES CHEVEUX', r('cheveux'), {y: 400, size: 140, stack: true}),
      kw('TES ARTICULATIONS', r('articulations'), {y: 550, size: 120, color: 'accent', stack: true}),
      kw('1 SEUL SACHET ?!', r('seul'), {y: 720, size: 130, impact: true, stack: true}),
    ]},
    {kind: 'benefit', from: r('Collagène') - 0.08, keywords: [
      kw('HYDRATATION\nDE LA PEAU', r('hydratation'), {y: 290, size: 120, color: 'accent', stack: true}),
      kw('QUALITÉ DES CHEVEUX', r('qualité'), {y: 480, size: 90, stack: true}),
      kw('CONFORT ARTICULAIRE', r('confort'), {y: 590, size: 90, stack: true}),
    ]},
    {...COUPE(r, r('collagène', 2) - 0.08), keywords: [VITC(r)]},
    AVIS(r, r('deux') - 0.08, r('vingt-huit'), r('deux') + 0.1),
    CTA(r, r('panier') - 0.1),
  ],
});
