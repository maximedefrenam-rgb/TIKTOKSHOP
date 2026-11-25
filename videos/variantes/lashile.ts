import tCasse from '../../public/videos/lashile-casse/timings.json';
import tMeuf from '../../public/videos/lashile-meuf/timings.json';
import tBonb from '../../public/videos/lashile-bonbons/timings.json';
import {variant, kw, JACKETS} from '../../src/lib/variant';

const P = {accent: '#F95259', productImage: 'videos/lashile-fleurs/produit.png'};
type R = (w: string, n?: number) => number;
const INGR = (r: R, from: number, extra: ReturnType<typeof kw>[] = []) => ({kind: 'cutaway' as const, from, openAt: from + 0.1, items: [
  {label: 'BIOTINE', at: r('biotine')}, {label: 'ZINC', at: r('zinc')}, {label: 'VITAMINE B6', at: r('vitamine')}, {label: 'PRÊLE', at: r('prêle')},
], keywords: extra});
const CTA = (r: R, from: number, extra: ReturnType<typeof kw>[] = []) => ({kind: 'cta' as const, from, arrowAt: r('panier'),
  keywords: [kw('24,90 €', from + 0.05, {y: 520, size: 150, color: 'accent', stack: true}), ...extra]});

export const casse = variant({
  id: 'lashile-casse', timings: tCasse, ...P, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'myth', from: 0, statement: 'TES CHEVEUX\nCASSENT ?', crossAt: r('attachez'), verdict: 'STOP',
      keywords: [kw('LES FILLES !', r('Les'), {y: 830, size: 100, color: 'accent', stack: true})]},
    {kind: 'benefit', from: r('Good') - 0.08, keywords: [
      kw('GOOD HAIR', r('Good'), {y: 280, size: 150, color: 'accent', stack: true}),
      kw('GUMMIES VÉGANES', r('gummies'), {y: 450, size: 100, stack: true}),
      kw('POUSSE & FORTIFICATION', r('pousse'), {y: 570, size: 85, color: 'accent', stack: true}),
    ]},
    {kind: 'compare', from: r('dans') - 0.08, title: 'ÉTUDE CLINIQUE · 84 JOURS', at: r('moins'), rows: [
      {label: 'Fourches (constaté chez 90 % des utilisatrices)', value: 37, display: '-37 %', highlight: true, at: r('moins')},
      {label: 'Fortification : amélioration constatée', value: 90, display: '90 %', highlight: true, at: r('quatre-vingt-dix')},
    ]},
    INGR(r, r('biotine') - 0.08),
    CTA(r, r('vingt-quatre') - 0.08),
  ],
});

export const meuf = variant({
  id: 'lashile-meuf', timings: tMeuf, ...P, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('TA MEUF ET\nSES FOURCHES ?', r('meuf'), {y: 300, size: 150}),
      kw('RÈGLE LE PROBLÈME', r('Règle'), {y: 300, size: 140, color: 'accent', impact: true}),
    ]},
    {kind: 'reviews', from: r('Offre-lui') - 0.08, rating: 4.6, reviews: 229, sold: 2684, soldAt: r('deux'), ratingAt: r('quatre'),
      keywords: [kw('OFFRE-LUI ÇA', r('Offre-lui'), {y: 200, size: 110, color: 'accent'})]},
    {kind: 'compare', from: r('dans') - 0.15, title: 'ÉTUDE CLINIQUE · 84 JOURS', at: r('moins'), rows: [
      {label: 'Fourches (constaté chez 90 % des utilisatrices)', value: 37, display: '-37 %', highlight: true, at: r('moins')},
    ]},
    INGR(r, r('Biotine') - 0.08, [kw('CHEVEUX SUBLIMES', r('SUBLIMES'), {y: 760, size: 90, color: 'accent', stack: true})]),
    CTA(r, r('cadeau') - 0.08, [kw('CADEAU DE NOËL\nRÉGLÉ', r('cadeau'), {y: 700, size: 90, stack: true})]),
  ],
});

export const bonbons = variant({
  id: 'lashile-bonbons', timings: tBonb, ...P, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('WESH ?!', r('wesh'), {y: 300, size: 220, color: 'accent', impact: true}),
      kw('DES BONBONS POUR\nTES CHEVEUX ?!', r('bonbons'), {y: 300, size: 140}),
    ]},
    INGR(r, r('Good') - 0.08, [kw('POUSSE & FORTIFICATION', r('pousse'), {y: 760, size: 85, color: 'accent', stack: true})]),
    {kind: 'compare', from: r('dans') - 0.08, title: 'ÉTUDE CLINIQUE · 84 JOURS', at: r('quatre-vingt-dix-sept'), rows: [
      {label: 'Longueur : amélioration constatée', value: 97, display: '97 %', highlight: true, at: r('quatre-vingt-dix-sept')},
    ]},
    {kind: 'benefit', from: r('gummies') - 0.3, keywords: [
      kw('GUMMIES VÉGANES', r('gummies'), {y: 300, size: 130, color: 'accent', stack: true}),
      kw("EN FORME D'ÉTOILE", r('étoile'), {y: 470, size: 110, stack: true}),
    ]},
    CTA(r, r('vingt-quatre') - 0.08),
  ],
});
