import tSal from '../../public/videos/karacare-salaire/timings.json';
import tPail from '../../public/videos/karacare-paille/timings.json';
import tElu from '../../public/videos/karacare-elu/timings.json';
import {variant, kw, JACKETS} from '../../src/lib/variant';

const P = {accent: '#E03541', productImage: 'videos/karacare-casquette/produit.png', productScale: 0.62};
type R = (w: string, n?: number) => number;
const INGR = (r: R, from: number, onze = true) => ({kind: 'cutaway' as const, from, openAt: from + 0.1, items: [
  {label: 'ZINC', at: r('zinc')}, {label: 'BIOTINE', at: r('biotine')}, {label: 'VITAMINE B6', at: r('vitamine', onze ? 1 : 2)},
  ...(onze ? [{label: '11 VITAMINES', sub: '& minéraux', at: r('onze')}] : []),
], keywords: [kw('POUSSE · FORCE · VOLUME', r('pousse'), {y: 810, size: 85, color: 'accent', stack: true})]});
const DOUZE = (r: R, from: number, note: string) => ({kind: 'benefit' as const, from, keywords: [
  kw("JUSQU'À", r("jusqu'à"), {y: 250, size: 110, stack: true}),
  kw('12 CM', r('douze'), {y: 430, size: 280, color: 'accent', impact: true, stack: true}),
  kw('DE POUSSE EN 3 MOIS', r('pousse', 2), {y: 620, size: 95, stack: true}),
  kw(note, r('pousse', 2), {y: 710, size: 36, small: true, stack: true}),
]});
const ELU = (r: R, from: number, soldAt: number, rankAt: number, label = 'CLIENTS') => ({kind: 'reviews' as const, from,
  sold: 60000, soldLabel: label, rank: "ÉLU PRODUIT DE L'ANNÉE 2026", soldAt, ratingAt: soldAt, rankAt,
  keywords: [kw('selon la marque', soldAt, {y: 560, size: 36, small: true, stack: true})]});
const CTA = (r: R, from: number) => ({kind: 'cta' as const, from, arrowAt: r('panier'),
  keywords: [kw('LIVRAISON GRATUITE', r('livraison'), {y: 510, size: 110, color: 'accent', stack: true})]});

export const salaire = variant({
  id: 'karacare-salaire', timings: tSal, ...P, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'myth', from: 0, statement: "TES CHEVEUX\nS'AFFINENT ?", crossAt: r('salaire'), verdict: 'STOP',
      keywords: [kw('TA CASQUETTE\nCACHE RIEN', r('casquette'), {y: 830, size: 80, color: 'accent', stack: true})]},
    INGR(r, r('Karacare') - 0.08),
    DOUZE(r, r('selon') - 0.15, 'selon la marque (cure de 3 mois)'),
    ELU(r, r('Élu') - 0.08, r('Élu') + 0.1, r('Élu')),
    CTA(r, r('panier') - 0.1),
  ],
});

export const paille = variant({
  id: 'karacare-paille', timings: tPail, ...P, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('HELLO\nMES BADDIES', r('Hello'), {y: 300, size: 160, color: 'accent'}),
      kw('TES POINTES\n= DE LA PAILLE ?!', r('paille'), {y: 300, size: 140, color: 'alert', impact: true}),
    ]},
    INGR(r, r('Karacare') - 0.08, false),
    DOUZE(r, r('selon') - 0.15, 'selon la marque, avec la cure de 3 mois'),
    ELU(r, r('Plus') - 0.08, r('soixante'), r('élu'), 'CLIENTES'),
    CTA(r, r('gummies') - 0.08),
  ],
});

export const elu = variant({
  id: 'karacare-elu', timings: tElu, ...P, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw("ÉLU PRODUIT\nDE L'ANNÉE 2026", r('Élu'), {y: 300, size: 150, color: 'accent'}),
      kw("ET T'EN AS JAMAIS\nENTENDU PARLER ?!", r('jamais'), {y: 300, size: 120, impact: true}),
    ]},
    {...ELU(r, r('Karacare') - 0.08, r('soixante'), r('Karacare') + 0.2)},
    INGR(r, r('zinc') - 0.08),
    DOUZE(r, r("jusqu'à") - 0.1, 'selon la marque (cure de 3 mois)'),
    CTA(r, r('deux', 2) - 0.08),
  ],
});
