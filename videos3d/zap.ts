import t1 from '../public/videos/zap3d-h24/timings.json';
import t2 from '../public/videos/zap3d-7h/timings.json';
import t3 from '../public/videos/zap3d-canette/timings.json';
import {build3d} from '../src/three/build3d';
const P = {accent: '#E0245E', pillColor: '#2EE6C8', productImage: 'videos/zap-cerise-noire-duo/produit.png', productHeight: 2.3};
const PRIX = {old: '14,90 €', pills: ['-32 % Black Friday', 'livraison gratuite']};
export const h24 = build3d({id: 'zap3d-h24', timings: t1, ...P, problem: 'battery', jacket: '#FF2E88',
  shots: [['', 1, 'FATIGUÉ', 'frérot ?', {over: "T'ES H24"}], ['batterie', 1, '0 %', 'dès 10 h', {view: 'problem', color: 'alert'}],
    ['ZAP', 1, 'ZAP', 'cerise noire'], ['cent', 1, '100 MG', 'de caféine', {view: 'close'}], ['plus', 1, 'EXPRESSO', '+ fort', {over: "PLUS QU'UN"}],
    ['Zéro', 1, 'SUCRE', 'quasi 0 calorie', {crossed: true}], ['lèvre', 1, 'SOUS LA LÈVRE', 'discret', {view: 'open'}],
    ['séance', 1, 'SÉANCE', 'ou au taf', {over: 'AVANT TA'}], ['trente-six', 1, '36', 'sachets', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Dix', now: '10,16 €', ...PRIX}});
export const sept = build3d({id: 'zap3d-7h', timings: t2, ...P, problem: 'clock', jacket: '#2E7BFF',
  shots: [['', 1, '7 H', 'séance à 8 h', {over: 'RÉVEIL À'}], ['zombie', 1, 'ZOMBIE', 'frérot ?', {over: 'EN MODE', view: 'problem', color: 'alert'}],
    ['ZAP', 1, 'ZAP', 'sous la lèvre'], ['cent', 1, '100 MG', 'de caféine', {view: 'close'}], ['plus', 1, 'EXPRESSO', '+ fort', {over: "PLUS QU'UN"}],
    ['L-théanine', 1, 'L-THÉANINE', '+ vitamines B', {view: 'open'}], ['café', 1, 'CAFÉ', 'à préparer', {crossed: true}],
    ['poche', 1, 'POCHE', 'ça tient dans ta'], ['Quatre', 1, '4,4 ★', 'avis clients', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Vingt-huit', now: '0,28 €', pills: ['le sachet · 10,16 € les 36', 'livraison gratuite']}});
export const canette = build3d({id: 'zap3d-canette', timings: t3, ...P, problem: 'tag', jacket: '#FFB800',
  shots: [['', 1, 'CANETTES', '2 € par jour', {over: 'ARRÊTE LES', color: 'alert'}], ['Regarde', 1, 'REGARDE ÇA', 'frérot', {view: 'problem'}],
    ['ZAP', 1, 'ZAP', '36 sachets'], ['cent', 1, '100 MG', 'de caféine chacun', {view: 'close'}], ['zéro', 1, 'SUCRE', 'quasi 0 calorie', {crossed: true}],
    ['canette', 2, '35 G', 'de sucre dans une canette', {color: 'alert'}], ['lèvre', 1, 'SOUS LA LÈVRE', 'et réglé', {view: 'open'}],
    ['Suède', 1, 'SUÈDE', 'fabriqué en', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Vingt-huit', now: '0,28 €', pills: ['le sachet · 10,16 € les 36', 'livraison gratuite']}});
