import tOre from '../../public/videos/nuclever-oreiller/timings.json';
import tStr from '../../public/videos/nuclever-stress/timings.json';
import t55 from '../../public/videos/nuclever-55000/timings.json';
import {variant, kw, JACKETS, WARN_NUCLEVER} from '../../src/lib/variant';

const P = {accent: '#D8759A', productImage: 'videos/nuclever-sommeil/produit.png'};
type R = (w: string, n?: number) => number;
const AVIS = (r: R, from: number, soldAt: number, ratingAt: number, rankAt: number) => ({kind: 'reviews' as const, from,
  rating: 4.5, reviews: 3900, sold: 55000, rank: '2E AU CLASSEMENT DES VENTES', soldAt, ratingAt, rankAt});
const FATIGUE = (r: R, from: number) => kw('LE MAGNÉSIUM CONTRIBUE\nÀ RÉDUIRE LA FATIGUE', from + 0.1, {y: 300, size: 95, color: 'accent', stack: true});
const CTA = (r: R, from: number, extra: ReturnType<typeof kw>[] = []) => ({kind: 'cta' as const, from, arrowAt: r('panier'), keywords: [
  ...extra, kw(WARN_NUCLEVER, from + 0.05, {y: 640, size: 32, small: true, stack: true}),
]});

export const oreiller = variant({
  id: 'nuclever-oreiller', timings: tOre, ...P, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw("TON CERVEAU\nÀ 200 À L'HEURE ?!", r('cerveau'), {y: 300, size: 150, color: 'accent'}),
      kw("SUR L'OREILLER", r("l'oreiller"), {y: 520, size: 120, impact: true, stack: true}),
    ]},
    {kind: 'cutaway', from: r('Nuclever') - 0.08, openAt: r('Nuclever') + 0.1, items: [
      {label: 'ASHWAGANDHA', sub: '300 mg · stress', at: r('ashwagandha')},
      {label: 'L-THÉANINE', sub: '400 mg · calme', at: r('elle-théanine')},
      {label: 'MAGNÉSIUM', sub: '100 mg · sommeil', at: r('magnésium')},
      {label: 'VITAMINE D', sub: '1000 UI · humeur', at: r('vitamine')},
    ]},
    {kind: 'benefit', from: r('magnésium', 2) - 0.15, keywords: [FATIGUE(r, r('magnésium', 2) - 0.15)]},
    AVIS(r, r('cinquante-cinq') - 0.08, r('cinquante-cinq'), r('quatre'), r('étoiles')),
    CTA(r, r('sachet') - 0.15, [kw('1 SACHET / JOUR\nDANS L\'EAU', r('sachet'), {y: 500, size: 110, color: 'accent', stack: true})]),
  ],
});

export const stress = variant({
  id: 'nuclever-stress', timings: tStr, ...P, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('STRESS AU TAF', r('taf'), {y: 250, size: 120, stack: true}),
      kw('STRESS EN COUPLE', r('couple'), {y: 390, size: 120, stack: true}),
      kw('STRESS À LA SALLE', r('salle'), {y: 530, size: 120, stack: true}),
      kw('ÇA SUFFIT !', r('suffit'), {y: 720, size: 170, color: 'alert', impact: true, stack: true}),
    ]},
    {kind: 'benefit', from: r('Nuclever') - 0.08, keywords: [
      kw('CORTISOL MANAGER', r('Nuclever'), {y: 290, size: 130, color: 'accent', stack: true}),
      kw('STRESS · ANXIÉTÉ\nREPOS · HUMEUR', r('anxiété'), {y: 480, size: 110, stack: true}),
    ]},
    {kind: 'cutaway', from: r('trois') - 0.08, openAt: r('trois'), items: [
      {label: 'ASHWAGANDHA', sub: '300 mg', at: r('trois')},
      {label: 'L-THÉANINE', sub: '400 mg', at: r('quatre')},
      {label: 'MAGNÉSIUM', sub: '100 mg', at: r('magnésium')},
      {label: 'VITAMINE D', sub: '1000 UI', at: r('vitamine')},
    ]},
    {kind: 'power', from: r('magnésium', 2) - 0.15, fillFrom: r('magnésium', 2), fillTo: r('normale'),
      dumbbells: [r('fatigue'), r('fonction'), r('normale')], keywords: [
        FATIGUE(r, r('magnésium', 2) - 0.15),
        kw("VITAMINE D : MAINTIEN D'UNE\nFONCTION MUSCULAIRE NORMALE", r('vitamine', 2), {y: 500, size: 80, stack: true}),
      ]},
    CTA(r, r('cinquante-cinq') - 0.08, [kw('55 000 VENDUS', r('cinquante-cinq'), {y: 500, size: 130, color: 'accent', stack: true})]),
  ],
});

export const n55000 = variant({
  id: 'nuclever-55000', timings: t55, ...P, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('WESH ?!', r('wesh'), {y: 300, size: 220, color: 'accent', impact: true}),
      kw('55 000 PERSONNES\nONT CRAQUÉ', r('cinquante-cinq'), {y: 300, size: 140}),
    ]},
    AVIS(r, r('Nuclever') - 0.08, r('Nuclever') + 0.1, r('quatre'), r('deuxième')),
    {kind: 'cutaway', from: r('Ashwagandha') - 0.08, openAt: r('Ashwagandha'), items: [
      {label: 'ASHWAGANDHA', sub: '300 mg · stress', at: r('Ashwagandha')},
      {label: 'L-THÉANINE', sub: '400 mg · calme', at: r('elle-théanine')},
      {label: 'MAGNÉSIUM', sub: '100 mg · sommeil', at: r('magnésium')},
    ]},
    {kind: 'benefit', from: r('magnésium', 2) - 0.15, keywords: [
      FATIGUE(r, r('magnésium', 2) - 0.15),
      kw('3 GOÛTS', r('trois'), {y: 480, size: 150, color: 'accent', stack: true}),
      kw('FRAMBOISE-CITRON · LITCHI-FRAISE\nPÊCHE BLANCHE', r('framboise'), {y: 620, size: 60, stack: true}),
    ]},
    CTA(r, r('panier') - 0.1),
  ],
});
