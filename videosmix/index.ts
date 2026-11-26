import type {Video3DConfig} from '../src/three/Video3D';
import t1 from '../public/videos/mix-zap-h24/timings.json';
import {build3d} from '../src/three/build3d';

const ZAP = {accent: '#E0245E', pillColor: '#2EE6C8', productImage: 'videos/zap-cerise-noire-duo/produit.png', productHeight: 2.3};

export const VIDEOSMIX: Video3DConfig[] = [
  build3d({id: 'mix-zap-h24', timings: t1, ...ZAP, problem: 'battery', jacket: '#FF2E88',
    shots: [['', 1, 'FATIGUÉ', 'frérot ?', {over: "T'ES H24"}], ['batterie', 1, '0 %', 'dès 10 h', {view: 'problem', color: 'alert'}],
      ['ZAP', 1, 'ZAP', 'cerise noire'], ['cent', 1, '100 MG', 'de caféine', {view: 'close'}], ['PLUS', 1, 'EXPRESSO', '+ fort', {over: "PLUS QU'UN"}],
      ['zéro', 2, 'SUCRE', 'quasi 0 calorie', {crossed: true}], ['lèvre', 1, 'SOUS LA LÈVRE', 'discret', {view: 'open'}],
      ['séance', 1, 'SÉANCE', 'ou au taf', {over: 'AVANT TA'}], ['trente-six', 1, '36', 'sachets', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
    price: {word: 'Dix', now: '10,16 €', old: '14,90 €', pills: ['-32 % Black Friday', 'livraison gratuite']}}),
];
