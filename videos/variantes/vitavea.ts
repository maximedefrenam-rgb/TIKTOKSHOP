import tFant from '../../public/videos/vitavea-fantome/timings.json';
import tDubai from '../../public/videos/vitavea-dubai/timings.json';
import tUv from '../../public/videos/vitavea-uv/timings.json';
import {variant, kw, JACKETS} from '../../src/lib/variant';

const P = {accent: '#F0B45A', productImage: 'videos/vitavea-autobronzant/produit.png'};
type R = (w: string, n?: number) => number;
const BENEF = (r: R, from: number) => ({kind: 'benefit' as const, from, keywords: [
  kw('HÂLE NATUREL\n& UNIFORME', r('hâle'), {y: 290, size: 130, color: 'accent', stack: true}),
  kw('SANS SOLEIL', r('sans'), {y: 480, size: 120, stack: true}),
  kw('Effets visibles dès le 1er mois de cure', r('effets'), {y: 590, size: 42, small: true, stack: true}),
]});
const GEL = (r: R, from: number) => ({kind: 'cutaway' as const, from, openAt: from + 0.1, items: [
  {label: '1 GÉLULE', sub: 'par jour', at: r('une')},
  {label: 'BÊTA-CAROTÈNE', at: r('bêta-carotène')},
]});
const DEAL = (r: R, from: number, extra: ReturnType<typeof kw>[] = []) => ({
  kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 13.89, newPrice: 6.4, discount: '-54 %',
  badgeAt: from + 0.05, strikeAt: from + 0.35, newAt: from + 0.6,
  keywords: [kw('60 GÉLULES · 2 MOIS', r('soixante'), {y: 840, size: 90, stack: true}), ...extra],
});
const CTA = (r: R) => ({kind: 'cta' as const, from: r('panier') - 0.1, arrowAt: r('panier'),
  keywords: [kw('FABRIQUÉ EN FRANCE', r('panier'), {y: 520, size: 110, color: 'accent', stack: true})]});

export const fantome = variant({
  id: 'vitavea-fantome', timings: tFant, ...P, jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'myth', from: 0, statement: "LE TEINT D'UN\nFANTÔME ?", crossAt: r('malade'), verdict: 'STOP',
      keywords: [kw('MÊME TA MÈRE\nS\'INQUIÈTE', r('mère'), {y: 830, size: 80, color: 'accent', stack: true})]},
    GEL(r, r('Autobronzant') - 0.08),
    BENEF(r, r('hâle') - 0.08),
    DEAL(r, r('soixante') - 0.08),
    CTA(r),
  ],
});

export const dubai = variant({
  id: 'vitavea-dubai', timings: tDubai, ...P, jacket: JACKETS[1], format: 'idee-recue',
  build: (r) => [
    {kind: 'usage', from: 0, leftLabel: 'EUX : DUBAÏ', rightLabel: 'TOI : YAOURT', leftIcon: 'palm', rightIcon: 'rain',
      leftAt: r('Dubaï'), rightAt: r('yaourt'),
      keywords: [kw('TES POTES\nRENTRENT DE…', r('potes'), {y: 280, size: 110, stack: true})]},
    BENEF(r, r('Autobronzant') - 0.08),
    GEL(r, r('une') - 0.08),
    DEAL(r, r('soixante') - 0.08, [kw("PAS BESOIN\nDE BILLET D'AVION", r('billet'), {y: 840, size: 90, color: 'accent'})]),
    CTA(r),
  ],
});

export const uv = variant({
  id: 'vitavea-uv', timings: tUv, ...P, jacket: JACKETS[2], format: 'idee-recue',
  build: (r) => [
    {kind: 'myth', from: 0, statement: 'CRAMER SOUS\nLES UV ?', crossAt: r('malheureux'), verdict: 'STOP'},
    BENEF(r, r('Vitavea') - 0.08),
    GEL(r, r('une') - 0.08),
    DEAL(r, r('tous') - 0.08, [kw('TOUS TYPES DE PEAU', r('tous'), {y: 840, size: 90, color: 'accent'})]),
    CTA(r),
  ],
});
