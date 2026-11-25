import tPoub from '../../public/videos/zap-poubelle/timings.json';
import tCardio from '../../public/videos/zap-cardio/timings.json';
import tPoche from '../../public/videos/zap-poche/timings.json';
import {variant, kw, JACKETS, WARN_CAFEINE} from '../../src/lib/variant';

const P = {accent: '#F0465A', productImage: 'videos/zap-cerise-noire-duo/produit.png', productScale: 0.74};
type R = (w: string, n?: number) => number;
const EXPRESSO = (r: R, from: number, extra = [] as ReturnType<typeof kw>[]) => ({
  kind: 'compare' as const, from, title: '100 MG DE CAFÉINE', at: r('cent'), rows: [
    {label: '1 sachet ZAP', value: 100, display: '100 MG', highlight: true, at: r('cent')},
    {label: 'Un expresso (≈ 80 mg)', value: 80, display: '80 MG', at: r('expresso') - 0.3},
  ], keywords: extra,
});
const INGR = (r: R, from: number) => ({kind: 'cutaway' as const, from, openAt: from + 0.1, items: [
  {label: 'L-THÉANINE', at: r('elle-théanine')},
  {label: 'VITAMINES B', at: r('vitamines')},
  {label: 'CERISE NOIRE', at: r('cerise')},
]});
const CTA = (r: R) => ({kind: 'cta' as const, from: r('trente-six') - 0.1, arrowAt: r('panier'), keywords: [
  kw('36 SACHETS', r('trente-six'), {y: 500, size: 130, color: 'accent', stack: true}),
  kw(WARN_CAFEINE, r('trente-six'), {y: 645, size: 34, small: true, stack: true}),
]});

export const poubelle = variant({
  id: 'zap-poubelle', timings: tPoub, ...P, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'myth', from: 0, statement: 'TON CAFÉ À\n2 BALLES ?', crossAt: r('Poubelle'), verdict: 'POUBELLE'},
    EXPRESSO(r, r('Un') - 0.08, [kw('SOUS LA LÈVRE, DISCRET', r('lèvre'), {y: 1010, size: 85, color: 'accent', stack: true})]),
    {kind: 'power', from: r("l'énergie") - 0.08, fillFrom: r("l'énergie"), fillTo: r('zone'), dumbbells: [],
      keywords: [kw("L'ÉNERGIE\nQUI MONTE", r("l'énergie"), {y: 270, size: 150, color: 'accent', stack: true}),
        kw('DANS TA ZONE', r('zone'), {y: 560, size: 110, stack: true})]},
    INGR(r, r('avec') - 0.08),
    {kind: 'benefit', from: r('moins') - 0.3, keywords: [kw("MOINS CHER\nQU'UN CAFÉ", r('moins'), {y: 330, size: 160, color: 'accent', impact: true, stack: true})]},
    CTA(r),
  ],
});

export const cardio = variant({
  id: 'zap-cardio', timings: tCardio, ...P, jacket: JACKETS[1], format: 'comparatif',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw("6 H DU MAT'", r('Six'), {y: 300, size: 190, color: 'accent'}),
      kw('CARDIO À JEUN', r('cardio'), {y: 300, size: 170}),
      kw('MODE ZOMBIE ?!', r('zombie'), {y: 300, size: 180, color: 'alert', impact: true}),
    ]},
    EXPRESSO(r, r('Un') - 0.08, [kw('SOUS LA LÈVRE', r('lèvre'), {y: 1010, size: 90, color: 'accent', stack: true})]),
    {kind: 'power', from: r("l'énergie") - 0.08, fillFrom: r("l'énergie"), fillTo: r('séance'), dumbbells: [r('séance')],
      keywords: [kw("L'ÉNERGIE\nQUI DÉBARQUE", r("l'énergie"), {y: 270, size: 150, color: 'accent', stack: true}),
        kw("C'EST PARTI\nPOUR LA SÉANCE", r('parti'), {y: 560, size: 100, stack: true})]},
    {kind: 'benefit', from: r('pas') - 0.08, keywords: [
      kw('PAS DE CAFÉ\nÀ PRÉPARER', r('pas'), {y: 280, size: 120, stack: true}),
      kw('PAS DE CANETTE', r('pas', 2), {y: 470, size: 120, color: 'alert', stack: true}),
      kw('ÇA TIENT DANS\nTA POCHE', r('poche'), {y: 640, size: 110, color: 'accent', stack: true}),
    ]},
    INGR(r, r('elle-théanine') - 0.08),
    CTA(r),
  ],
});

export const poche = variant({
  id: 'zap-poche', timings: tPoche, ...P, jacket: JACKETS[2],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('WESH ?!', r('wesh'), {y: 300, size: 220, color: 'accent', impact: true}),
      kw("L'ÉNERGIE\nD'UN EXPRESSO", r("l'énergie"), {y: 300, size: 150}),
      kw('DANS TA POCHE ?!', r('poche'), {y: 300, size: 160, color: 'accent', impact: true}),
    ]},
    EXPRESSO(r, r('ZAP') - 0.08, [kw('SOUS LA LÈVRE, DISCRET', r('lèvre'), {y: 1010, size: 85, color: 'accent', stack: true})]),
    {kind: 'usage', from: r('avant') - 0.08, leftLabel: 'AVANT LA SÉANCE', rightLabel: 'SESSION GTA 6', leftAt: r('avant'), rightAt: r('session'),
      keywords: [kw('AU TAF AUSSI', r('taf'), {y: 300, size: 120, color: 'accent', stack: true})]},
    {kind: 'benefit', from: r('moins') - 0.3, keywords: [kw("MOINS CHER QU'UN\nCAFÉ AU BAR", r('moins'), {y: 330, size: 140, color: 'accent', impact: true, stack: true})]},
    INGR(r, r('elle-théanine') - 0.08),
    CTA(r),
  ],
});
