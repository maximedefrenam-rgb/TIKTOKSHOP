import tNez from '../../public/videos/medicube-ton-nez/timings.json';
import tCor from '../../public/videos/medicube-coreenne/timings.json';
import tMir from '../../public/videos/medicube-miroir/timings.json';
import {variant, kw, JACKETS} from '../../src/lib/variant';

const P = {accent: '#FF6B5A', productImage: 'videos/medicube-points-noirs/produit.png', productScale: 0.5};
const NEZ = 'videos/medicube-points-noirs/nez.png';
type R = (w: string, n?: number) => number;
const INGR = (r: R, from: number, panthenol = true) => ({kind: 'cutaway' as const, from, openAt: from + 0.1, items: [
  {label: 'NIACINAMIDE', sub: '2 %', at: r('niacinamide')}, {label: 'VITAMINE C', at: r('vitamine')},
  {label: 'ACIDE SUCCINIQUE', at: r('acide')}, ...(panthenol ? [{label: 'PANTHÉNOL', at: r('panthénol')}] : []),
]});
const BENEF = (r: R, from: number, eclat = true) => ({kind: 'benefit' as const, from, keywords: [
  kw('PORES NETS', r('pores'), {y: 280, size: 150, color: 'accent', stack: true}),
  kw('MOINS DE MARQUES\nPOST-IMPERFECTIONS', r('marques'), {y: 470, size: 90, stack: true}),
  ...(eclat ? [kw('ÉCLAT DE MALADE', r('éclat'), {y: 630, size: 100, stack: true})] : []),
  kw('EFFET GLASS SKIN', r("l'effet"), {y: eclat ? 780 : 630, size: 110, color: 'accent', stack: true}),
]});
const AVIS = (r: R, from: number, soldAt: number, ratingAt: number, rankAt: number) => ({kind: 'reviews' as const, from,
  rating: 4.6, reviews: 169, sold: 2565, rank: '4E AU CLASSEMENT DES MEILLEURS AVIS', soldAt, ratingAt, rankAt});
const CTA = (r: R) => ({kind: 'cta' as const, from: r('panier') - 0.1, arrowAt: r('panier'), keywords: [
  kw("BLACK FRIDAY\nDÈS 23,99 €", r('panier'), {y: 520, size: 110, color: 'accent', stack: true}),
  kw('avec les coupons, selon le set', r('panier'), {y: 650, size: 36, small: true, stack: true}),
]});

export const tonNez = variant({
  id: 'medicube-ton-nez', timings: tNez, ...P, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'beforeAfter', from: 0, image: NEZ, revealAt: r('Medicube'),
      keywords: [kw("CE NEZ, C'EST\nLE TIEN ?!", r('nez'), {y: 230, size: 110, color: 'alert'})]},
    {kind: 'benefit', from: r('tu') - 0.08, keywords: [
      kw('UN PAD SUR TA FACE', r('pad'), {y: 300, size: 110, stack: true}),
      kw('PORES NETS', r('pores'), {y: 470, size: 160, color: 'accent', impact: true, stack: true}),
    ]},
    INGR(r, r('Niacinamide') - 0.08),
    {kind: 'benefit', from: r('moins') - 0.08, keywords: [
      kw('MOINS DE MARQUES\nPOST-IMPERFECTIONS', r('moins'), {y: 290, size: 95, stack: true}),
      kw('ÉCLAT DE MALADE', r('éclat'), {y: 470, size: 110, color: 'accent', stack: true}),
      kw('EFFET GLASS SKIN', r("l'effet"), {y: 620, size: 120, color: 'accent', stack: true}),
    ]},
    AVIS(r, r('plus') - 0.08, r('plus'), r('quatre'), r('étoiles')),
    CTA(r),
  ],
});

export const coreenne = variant({
  id: 'medicube-coreenne', timings: tCor, ...P, jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('LA ROUTINE\nCORÉENNE', r('routine'), {y: 290, size: 170, color: 'accent'}),
      kw('EN 1 SEULE ÉTAPE', r('seule'), {y: 500, size: 120, impact: true, stack: true}),
    ]},
    {...INGR(r, r('toner') - 0.15, false), keywords: [kw('UN PAD SUR TA FACE', r('pad'), {y: 760, size: 90, color: 'accent', stack: true})]},
    BENEF(r, r('pour') - 0.08, false),
    AVIS(r, r('quatrièmes') - 0.08, r('plus'), r('quatre'), r('quatrièmes')),
    CTA(r),
  ],
});

export const miroir = variant({
  id: 'medicube-miroir', timings: tMir, ...P, jacket: JACKETS[2], format: 'idee-recue',
  build: (r) => [
    {kind: 'beforeAfter', from: 0, image: NEZ, stopAt: r('malheureux'),
      keywords: [kw('ARRÊTE DE PERCER\nTES POINTS NOIRS !', r('Arrête'), {y: 230, size: 100, color: 'alert'})]},
    INGR(r, r('toner') - 0.15),
    BENEF(r, r('pour') - 0.08),
    AVIS(r, r('plus') - 0.08, r('plus'), r('quatre'), r('quatrièmes')),
    CTA(r),
  ],
});
