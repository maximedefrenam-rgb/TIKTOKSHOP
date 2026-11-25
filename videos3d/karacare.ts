import t1 from '../public/videos/karacare3d-casquette/timings.json';
import t2 from '../public/videos/karacare3d-12cm/timings.json';
import t3 from '../public/videos/karacare3d-elu/timings.json';
import {build3d} from '../src/three/build3d';
const P = {accent: '#E03541', pillColor: '#FFFFFF', productImage: 'videos/karacare-casquette/produit.png', productHeight: 2.2};
const PRIX = {pills: ['2 mois de cure', 'livraison gratuite']};
export const casquette = build3d({id: 'karacare3d-casquette', timings: t1, ...P, problem: 'check', jacket: '#FF2E88',
  shots: [['', 1, 'CASQUETTE', 'frérot ?', {over: 'TOUJOURS SOUS TA'}], ['Regarde', 1, 'REGARDE ÇA', 'hair boost', {view: 'problem'}],
    ['Karacare', 1, 'KARACARE', 'hair boost'], ['onze', 1, '11', 'vitamines et minéraux', {view: 'close'}], ['zinc', 1, 'ZINC', 'biotine · B6'],
    ['pousse', 1, 'POUSSE', 'force · volume', {view: 'open'}], ['Élu', 1, 'ÉLU', "produit de l'année 2026"],
    ['soixante', 1, '+60 000', 'clientes · selon la marque', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Cinquante-six', now: '56,81 €', ...PRIX}});
export const douze = build3d({id: 'karacare3d-12cm', timings: t2, ...P, problem: 'clock', jacket: '#2E7BFF',
  shots: [['', 1, 'DES SIÈCLES', 'frérot ?', {over: 'TES CHEVEUX METTENT'}], ['Prends', 1, 'PRENDS ÇA', 'hair boost', {view: 'problem'}],
    ['framboise', 1, 'FRAMBOISE', 'gummies goût'], ['douze', 1, '12 CM', "jusqu'à · selon la marque", {view: 'close'}],
    ['trois', 1, '3 MOIS', 'avec la cure'], ['Zinc', 1, 'ZINC', 'biotine · B6', {view: 'open'}], ['gluten', 1, 'GLUTEN', '100 % vegan', {crossed: true}],
    ['Europe', 1, 'EUROPE', 'fabriqué en', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Moins', now: '0,95 €', pills: ['par jour · 56,81 € les 2 mois', 'livraison gratuite']}});
export const elu = build3d({id: 'karacare3d-elu', timings: t3, ...P, problem: 'tag', jacket: '#FFB800',
  shots: [['', 1, 'ÉLU', "produit de l'année 2026", {color: 'accent'}], ['jamais', 1, 'JAMAIS', 'entendu parler, frérot ?', {view: 'problem'}],
    ['Karacare', 1, 'HAIR BOOST', 'karacare'], ['soixante', 1, '+60 000', 'clientes · selon la marque', {view: 'close'}],
    ['Onze', 1, '11', 'vitamines et minéraux'], ['pousse', 1, 'POUSSE', 'force · volume', {view: 'open'}],
    ['cent', 1, '120', 'gummies · 2 flacons', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Cinquante-six', now: '56,81 €', ...PRIX}});
