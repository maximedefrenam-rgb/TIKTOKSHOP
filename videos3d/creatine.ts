import t1 from '../public/videos/creatine3d-serie/timings.json';
import t2 from '../public/videos/creatine3d-5cts/timings.json';
import t3 from '../public/videos/creatine3d-gouts/timings.json';
import {build3d} from '../src/three/build3d';
const P = {accent: '#F7D417', pillColor: '#F7D417', productImage: 'videos/creatine-ostrovit-citron/produit.png', productHeight: 2.5};
const PRIX = {old: '5,41 €', pills: ['300 g · 100 doses', 'boutique officielle']};
export const serie = build3d({id: 'creatine3d-serie', timings: t1, ...P, problem: 'battery', jacket: '#FF2E88',
  shots: [['', 1, 'LÂCHES', 'à la dernière série ?', {over: 'FRÉROT, TU', color: 'alert'}], ['Regarde', 1, 'REGARDE ÇA', 'créatine', {view: 'problem'}],
    ['OstroVit', 1, 'OSTROVIT', 'monohydrate'], ['micronisée', 1, 'MICRONISÉE', 'ultra', {view: 'close'}],
    ['performance', 1, 'PERFORMANCE', '3 g / jour · efforts courts'], ['répétés', 1, 'RÉPÉTÉS', 'intenses et', {view: 'open'}],
    ['cent', 1, '100', 'doses'], ['Cinq', 1, '5', 'goûts au choix', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Quatre', nth: 2, now: '4,99 €', ...PRIX}});
export const cinq = build3d({id: 'creatine3d-5cts', timings: t2, ...P, problem: 'tag', jacket: '#2E7BFF',
  shots: [['', 1, '< 5 CTS', 'la dose, frérot', {color: 'accent'}], ['Regarde', 1, 'REGARDE ÇA', 'ostrovit', {view: 'problem'}],
    ['trois', 1, '300 G', 'monohydrate'], ['cent', 1, '100', 'doses de 3 g', {view: 'close'}], ['micronisée', 1, 'MICRONISÉE', 'se mélange direct'],
    ['performance', 1, 'PERFORMANCE', '3 g / jour', {view: 'open'}], ['répétés', 1, 'RÉPÉTÉS', 'efforts courts, intenses', {view: 'stack'}],
    ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Quatre', now: '4,99 €', ...PRIX}});
export const gouts = build3d({id: 'creatine3d-gouts', timings: t3, ...P, problem: 'check', jacket: '#FFB800',
  shots: [['', 1, 'PLÂTRE', 'ta créatine, frérot ?', {over: 'UN GOÛT DE', color: 'alert'}], ['Prends', 1, 'PRENDS ÇA', 'ostrovit', {view: 'problem'}],
    ['citron', 1, 'CITRON', 'mangue · melon'], ['pomme', 1, 'POMME VERTE', 'ou nature', {view: 'close'}], ['Trois', 1, '300 G', '100 doses'],
    ['performance', 1, 'PERFORMANCE', '3 g / jour', {view: 'open'}], ['répétés', 1, 'RÉPÉTÉS', 'efforts courts, intenses'],
    ['Cinq', 1, '540', 'vendus', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Quatre', now: '4,99 €', ...PRIX}});
