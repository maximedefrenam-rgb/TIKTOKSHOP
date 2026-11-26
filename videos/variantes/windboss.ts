import tRes from '../../public/videos/windboss-resine/timings.json';
import tCts from '../../public/videos/windboss-centimes/timings.json';
import {variant, kw, JACKETS, WARN_COMPLEMENT} from '../../src/lib/variant';

const P = {accent: '#D4AF6A', productScale: 0.8};
type R = (w: string, n?: number) => number;
const AVIS = (r: R, from: number, ratingAt: number, soldAt: number) => ({kind: 'reviews' as const, from, rating: 4.1, reviews: 829, sold: 10300, ratingAt, soldAt});
const CTA = (r: R, from: number) => ({kind: 'cta' as const, from, arrowAt: r('panier'), keywords: [
  kw('BLACK FRIDAY\n-20 % DÈS 25 €', r('moins'), {y: 520, size: 110, color: 'accent', stack: true}),
  kw(WARN_COMPLEMENT, from + 0.05, {y: 680, size: 30, small: true, stack: true}),
]});

export const resine = variant({
  id: 'windboss-resine', timings: tRes, ...P, productImage: 'videos/windboss-resine/produit.png', jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('ARRÊTE DE GALÉRER !', r('Arrête'), {y: 280, size: 130, color: 'alert'}),
      kw('TA RÉSINE QUI\nCOLLE PARTOUT ?!', r('résine'), {y: 470, size: 120, impact: true, stack: true}),
    ]},
    {kind: 'benefit', from: r('WindBoss') - 0.08, keywords: [
      kw('EN BONBONS', r('bonbons'), {y: 290, size: 170, color: 'accent', impact: true, stack: true}),
      kw('EMBALLÉS\nUN PAR UN', r('emballés'), {y: 500, size: 120, stack: true}),
    ]},
    {kind: 'cutaway', from: r('deux') - 0.08, openAt: r('deux') + 0.1, items: [
      {label: '2 BONBONS / JOUR', at: r('deux')},
      {label: 'SHILAJIT', sub: '≈ 3 000 mg en poudre*', at: r('trois')},
      {label: 'ASHWAGANDHA', at: r('ashwagandha')},
      {label: 'GINGEMBRE · GINSENG', at: r('gingembre')},
    ], keywords: [kw("*équivalent selon la marque (300 mg d'extrait 10:1)", r('selon'), {y: 830, size: 32, small: true, stack: true})]},
    {kind: 'benefit', from: r('zéro') - 0.08, keywords: [
      kw('0 SUCRE AJOUTÉ', r('zéro'), {y: 290, size: 130, color: 'accent', stack: true}),
      kw('VÉGAN', r('vegan'), {y: 450, size: 120, stack: true}),
      kw('SANS GÉLATINE', r('sans'), {y: 590, size: 110, stack: true}),
    ]},
    AVIS(r, r('plus') - 0.08, r('plus') + 0.1, r('dix')),
    CTA(r, r('Black') - 0.3),
  ],
});

export const centimes = variant({
  id: 'windboss-centimes', timings: tCts, ...P, productImage: 'videos/windboss-centimes/produit.png', jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('WESH ?!', r('Wesh'), {y: 300, size: 220, color: 'accent', impact: true}),
      kw('0,63 € / JOUR\nLE SHILAJIT ?!', r('soixante-trois'), {y: 300, size: 150}),
    ]},
    {kind: 'price', from: r('Les') - 0.08, price: 18.98, doses: 30, divLabel: 'JOURS', unitLabel: 'PAR JOUR',
      priceAt: r('dix-huit'), dividerAt: r('trente'), resultAt: r('jours')},
    {kind: 'cutaway', from: r('dedans') - 0.08, openAt: r('dedans') + 0.1, items: [
      {label: 'SHILAJIT', at: r('shilajit', 2)},
      {label: 'ASHWAGANDHA', at: r('ashwagandha')},
      {label: 'MUSLI NOIR', at: r('musli')},
      {label: 'GOKSHURA', at: r('gokshura')},
    ]},
    {kind: 'benefit', from: r('et') - 0.08, keywords: [
      kw('ÇA SE MANGE\nCOMME UN BONBON', r('mange'), {y: 300, size: 120, color: 'accent', stack: true}),
      kw('0 SUCRE AJOUTÉ', r('zéro'), {y: 500, size: 110, stack: true}),
    ]},
    AVIS(r, r('quatre') - 0.08, r('quatre') + 0.1, r('dix')),
    CTA(r, r('moins') - 0.08),
  ],
});
