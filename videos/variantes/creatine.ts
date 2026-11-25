import tCoach from '../../public/videos/creatine-coach/timings.json';
import tKebab from '../../public/videos/creatine-kebab/timings.json';
import tSerie from '../../public/videos/creatine-serie/timings.json';
import {variant, kw, JACKETS} from '../../src/lib/variant';

const P = {accent: '#F7D417', productImage: 'videos/creatine-ostrovit-citron/produit.png'};
const G = 'videos/creatine-ostrovit-citron/';
const GOUTS = [G + 'gout-naturel.png', G + 'gout-pomme-verte.png', G + 'gout-mangue.png', G + 'gout-melon.png'];
const ALLEG = (r: (w: string, n?: number) => number, from: number) => ({
  kind: 'power' as const, from, fillFrom: from + 0.1, fillTo: r('répétés'), dumbbells: [r('courts'), r('intenses'), r('répétés')],
  keywords: [
    kw('3 G PAR JOUR', from + 0.05, {y: 240, size: 120}),
    kw('PERFORMANCE PHYSIQUE', r('performance'), {y: 400, size: 110, color: 'accent', stack: true}),
    kw('EXERCICES COURTS,\nINTENSES ET RÉPÉTÉS', r('courts'), {y: 570, size: 80, stack: true}),
  ],
});

export const coach = variant({
  id: 'creatine-coach', timings: tCoach, ...P, jacket: JACKETS[0], format: 'comparatif', faint: (r) => r('kebab'),
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('TON COACH ?', r('coach'), {y: 300, size: 170}),
      kw('30 BALLES ?!', r('trente'), {y: 300, size: 200, color: 'alert', impact: true}),
      kw('IL SE FOUT\nDE TA GUEULE', r('fout'), {y: 300, size: 150, color: 'accent'}),
    ]},
    {kind: 'compare', from: r('La') - 0.08, title: 'PRIX DES 300 G', at: r('moyenne'), rows: [
      {label: 'Moyenne du marché', value: 22.67, display: '22,67 €', at: r('moyenne')},
      {label: 'OstroVit', value: 4.99, display: '4,99 €', highlight: true, at: r('OstroVit')},
    ], keywords: [kw('UN PRIX DE KEBAB', r('kebab'), {y: 1010, size: 120, color: 'accent', impact: true, stack: true})]},
    {kind: 'cutaway', from: r('Monohydrate') - 0.08, openAt: r('Monohydrate'), items: [
      {label: 'MONOHYDRATE', sub: 'ultra micronisée', at: r('Monohydrate')},
      {label: '100 DOSES', sub: 'de 3 g', at: r('cent')},
      {label: '5 GOÛTS', sub: 'au choix', at: r('cinq')},
    ]},
    ALLEG(r, r('trois', 3) - 0.08),
    {kind: 'cta', from: r('panier') - 0.1, arrowAt: r('panier')},
  ],
});

export const kebab = variant({
  id: 'creatine-kebab', timings: tKebab, ...P, jacket: JACKETS[1], faint: (r) => r('samouraï'),
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('WESH ?!', r('wesh'), {y: 300, size: 220, color: 'accent', impact: true}),
      kw('100 DOSES', r('cent'), {y: 300, size: 200}),
      kw("POUR LE PRIX\nD'UN KEBAB ?!", r('kebab'), {y: 300, size: 150, color: 'accent', impact: true}),
    ]},
    {kind: 'doses', from: r('OstroVit') - 0.08, weight: 300, dose: 3, price: 4.99, count: 100,
      weightAt: r('trois'), priceAt: r('monohydrate'), divideAt: r('trois', 2), resultAt: r('cent', 2), hideCalcAt: r('même') - 0.05,
      keywords: [kw("MOINS CHER QU'UNE\nSAUCE SAMOURAÏ", r('même'), {y: 400, size: 130, color: 'accent', stack: true})]},
    ALLEG(r, r('trois', 3) - 0.08),
    {kind: 'flavors', from: r('cinq') - 0.15, spreadAt: r('citron'), images: GOUTS,
      keywords: [kw('5 GOÛTS', r('cinq'), {y: 330, size: 160, color: 'accent', stack: true})]},
    {kind: 'cta', from: r('panier') - 0.1, arrowAt: r('panier')},
  ],
});

export const serie = variant({
  id: 'creatine-serie', timings: tSerie, ...P, jacket: JACKETS[2], format: 'idee-recue', faint: (r) => r('ciné'),
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('TU LÂCHES À LA\nDERNIÈRE SÉRIE ?', r('lâches'), {y: 300, size: 150}),
      kw('STOP AUX EXCUSES', r('excuses'), {y: 300, size: 160, color: 'alert', impact: true}),
    ]},
    ALLEG(r, r('trois') - 0.08),
    {kind: 'cutaway', from: r('celle-là') - 0.12, openAt: r('OstroVit'), items: [
      {label: '300 G', at: r('trois', 2)},
      {label: 'MONOHYDRATE', sub: 'ultra micronisée', at: r('monohydrate')},
      {label: '100 DOSES', at: r('cent')},
    ], keywords: [kw("MOINS CHER QU'UNE\nPLACE DE CINÉ", r('moins'), {y: 760, size: 90, color: 'accent', stack: true})]},
    {kind: 'flavors', from: r('cinq') - 0.12, spreadAt: r('goûts'), images: GOUTS,
      keywords: [kw('5 GOÛTS AU CHOIX', r('cinq'), {y: 330, size: 140, color: 'accent', stack: true})]},
    {kind: 'cta', from: r('panier') - 0.1, arrowAt: r('panier')},
  ],
});
