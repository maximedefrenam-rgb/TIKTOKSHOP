import t1 from '../public/videos/nuclever3d-3h/timings.json';
import t2 from '../public/videos/nuclever3d-fatigue/timings.json';
import t3 from '../public/videos/nuclever3d-stress/timings.json';
import {build3d} from '../src/three/build3d';
const P = {accent: '#E0749B', pillColor: '#FFFFFF', productImage: 'videos/nuclever-sommeil/produit.png', productHeight: 2.5};
const PRIX = {pills: ['prix le plus bas 2026', 'livraison gratuite']};
export const troisH = build3d({id: 'nuclever3d-3h', timings: t1, ...P, problem: 'clock', jacket: '#FF2E88',
  shots: [['', 1, "3 H DU MAT'", 'frérot ?'], ['plafond', 1, 'PLAFOND', 'tu fixes encore le', {view: 'problem'}],
    ['Nuclever', 1, 'NUCLEVER', 'cortisol manager'], ['sachet', 1, '1 SACHET', 'par jour', {view: 'close'}], ['Magnésium', 1, 'MAGNÉSIUM', 'pour le sommeil'],
    ['L-théanine', 1, 'L-THÉANINE', 'pour le calme', {view: 'open'}], ['fatigue', 1, 'FATIGUE', 'le magnésium contribue à la réduire'],
    ['Cinquante-cinq', 1, '55 000', 'vendus', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Vingt', now: '20,92 €', ...PRIX}});
export const fatigue = build3d({id: 'nuclever3d-fatigue', timings: t2, ...P, problem: 'battery', jacket: '#2E7BFF',
  shots: [['', 1, 'CREVÉ', 'avant la salle, frérot ?', {color: 'alert'}], ['Regarde', 1, 'REGARDE ÇA', 'nuclever', {view: 'problem'}],
    ['fatigue', 1, 'FATIGUE', 'le magnésium contribue à la réduire'], ['musculaire', 1, 'MUSCLES', 'vitamine D · fonction normale', {view: 'close'}],
    ['Trois', 1, '300 MG', "d'ashwagandha"], ['quatre', 1, '400 MG', 'de L-théanine', {view: 'open'}],
    ['Quatre', 2, '4,5 ★', '3 900 avis', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Vingt', now: '20,92 €', ...PRIX}});
export const stress = build3d({id: 'nuclever3d-stress', timings: t3, ...P, problem: 'check', jacket: '#FFB800',
  shots: [['', 1, 'STRESS', 'au taf, frérot ?', {color: 'alert'}], ['suffit', 1, 'ÇA SUFFIT', 'prends ça', {view: 'problem'}],
    ['Nuclever', 1, 'NUCLEVER', 'cortisol manager'], ['deuxième', 1, '2E', 'au classement des ventes', {view: 'close'}],
    ['Ashwagandha', 1, 'ASHWAGANDHA', 'pour le stress'], ['GMP', 1, 'GMP', 'certifié', {view: 'open'}],
    ['édulcorant', 1, 'ÉDULCORANT', 'artificiel', {crossed: true}], ['Trois', 1, '3', 'goûts au choix', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Vingt', now: '20,92 €', ...PRIX}});
