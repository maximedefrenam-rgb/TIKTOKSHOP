import tPrix from '../../public/videos/meelito-prix/timings.json';
import tRein from '../../public/videos/meelito-rein/timings.json';
import {variant, kw, JACKETS} from '../../src/lib/variant';

const P = {accent: '#FF9F1C', productScale: 0.9};
const AVIS = (from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.5, reviews: 5800, sold: 63400, ratingAt, soldAt});

export const prix = variant({
  id: 'meelito-prix', timings: tPrix, ...P, productImage: 'videos/meelito-prix/produit.png', jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('6 PIÈCES\n21 € ?!', r('Six'), {y: 300, size: 170, color: 'accent'}),
      kw('QUI A VALIDÉ\nCE PRIX ?!', r('validé'), {y: 300, size: 140, color: 'alert', impact: true}),
    ]},
    {kind: 'cutaway', from: r('Le') - 0.08, openAt: r('Le') + 0.1, items: [
      {label: 'SAVON + FILET', at: r('savon')},
      {label: 'NETTOYANT MOUSSANT', at: r('nettoyant')},
      {label: 'HUILE · MASQUE PEEL-OFF', at: r('huile')},
      {label: 'CRÈME', at: r('crème')},
    ]},
    {kind: 'benefit', from: r('curcuma', 2) - 0.08, keywords: [
      kw('CURCUMA · ACIDE KOJIQUE', r('curcuma', 2), {y: 250, size: 85, color: 'accent', stack: true}),
      kw('VITAMINE C · ACIDE HYALURONIQUE', r('vitamine'), {y: 350, size: 62, stack: true}),
      kw('NETTOYAGE EN PROFONDEUR', r('nettoyage'), {y: 460, size: 72, stack: true}),
      kw('TEINT PLUS UNIFORME', r('teint'), {y: 550, size: 72, stack: true}),
      kw('PEAU HYDRATÉE', r('peau'), {y: 640, size: 72, stack: true}),
      kw('selon la marque', r('selon'), {y: 720, size: 36, small: true, stack: true}),
    ]},
    AVIS(r('plus', 2) - 0.08, r('quatre') + 0.1, r('soixante-trois')),
    {kind: 'cta', from: r('quatre', 2) - 0.08, arrowAt: r('panier'), keywords: [
      kw('4,35 € LA PIÈCE', r('quatre', 2), {y: 500, size: 120, color: 'accent', stack: true}),
      kw('BLACK FRIDAY · 21,75 € LE KIT', r('Black'), {y: 650, size: 70, stack: true}),
    ]},
  ],
});

export const rein = variant({
  id: 'meelito-rein', timings: tRein, ...P, productImage: 'videos/meelito-rein/produit.png', jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('TA ROUTINE SKINCARE', r('routine'), {y: 280, size: 120}),
      kw('TE COÛTE UN REIN ?!', r('rein'), {y: 450, size: 140, color: 'alert', impact: true, stack: true}),
    ]},
    {kind: 'price', from: r('Regarde') - 0.08, price: 21.75, doses: 6, divLabel: 'PIÈCES', unitLabel: 'LA PIÈCE',
      priceAt: r('kit'), dividerAt: r('six'), resultAt: r('soixante-quinze')},
    {kind: 'cutaway', from: r('le') - 0.08, openAt: r('le') + 0.1, items: [
      {label: 'SAVON', at: r('savon')},
      {label: 'NETTOYANT + BROSSE', at: r('nettoyant')},
      {label: 'HUILE · CRÈME', at: r("l'huile")},
      {label: 'MASQUE PEEL-OFF', sub: 'à la vitamine C', at: r('masque')},
    ]},
    {kind: 'benefit', from: r('avec', 2) - 0.08, keywords: [
      kw('ACIDE KOJIQUE', r("l'acide"), {y: 300, size: 140, color: 'accent', stack: true}),
      kw('POUR UNIFIER LE TEINT', r('unifier'), {y: 470, size: 100, stack: true}),
      kw('selon la marque', r('selon'), {y: 580, size: 40, small: true, stack: true}),
    ]},
    AVIS(r('soixante-trois') - 0.08, r('quatre'), r('soixante-trois') + 0.1),
    {kind: 'cta', from: r('Black') - 0.08, arrowAt: r('panier'), keywords: [
      kw('BLACK FRIDAY\n21,75 € LE KIT', r('Black'), {y: 520, size: 110, color: 'accent', stack: true})]},
  ],
});
