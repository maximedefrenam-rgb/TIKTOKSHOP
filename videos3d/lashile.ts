import t1 from '../public/videos/lashile3d-casse/timings.json';
import t2 from '../public/videos/lashile3d-fleurs/timings.json';
import t3 from '../public/videos/lashile3d-pousse/timings.json';
import {build3d} from '../src/three/build3d';
const P = {accent: '#F95259', pillColor: '#FFFFFF', productImage: 'videos/lashile-fleurs/produit.png', productHeight: 2.4};
const PRIX = {pills: ['60 gummies', 'livraison offerte dès 50 €']};
export const casse = build3d({id: 'lashile3d-casse', timings: t1, ...P, problem: 'check', jacket: '#FF2E88',
  shots: [['', 1, 'CASSENT', 'frérot ?', {over: 'SES CHEVEUX', color: 'alert'}], ['Prends', 1, 'PRENDS ÇA', 'good hair', {view: 'problem'}],
    ['Good', 1, 'GOOD HAIR', '2 gummies / jour'], ['Biotine', 1, 'BIOTINE', 'zinc · B6 · prêle', {view: 'close'}],
    ['moins', 1, '-37 %', 'de fourches · étude'], ['neuf', 1, '9 SUR 10', 'utilisatrices'],
    ['gélatine', 1, 'GÉLATINE', '100 % vegan', {crossed: true}], ['deux', 2, '2 689', 'vendus', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Vingt-quatre', now: '24,90 €', ...PRIX}});
export const fleurs = build3d({id: 'lashile3d-fleurs', timings: t2, ...P, problem: 'tag', jacket: '#2E7BFF',
  shots: [['', 1, 'FLEURS', 'pour Noël, frérot ?', {over: 'DES'}], ['mortes', 1, '3 JOURS', 'et elles sont mortes', {view: 'problem', color: 'alert'}],
    ['Offre-lui', 1, 'OFFRE-LUI ÇA', 'good hair'], ['sublimes', 1, 'SUBLIMES', 'des cheveux', {view: 'close'}],
    ['Biotine', 1, 'BIOTINE', '+ zinc'], ['Plus', 1, '+20 %', 'de volume · étude', {view: 'open'}],
    ['Quatre', 1, '4,6 ★', '229 avis', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Vingt-quatre', now: '24,90 €', ...PRIX}});
export const pousse = build3d({id: 'lashile3d-pousse', timings: t3, ...P, problem: 'clock', jacket: '#FFB800',
  shots: [['', 1, 'AU RALENTI', 'frérot ?', {over: 'TES CHEVEUX POUSSENT'}], ['Regarde', 1, 'REGARDE ÇA', 'good hair', {view: 'problem'}],
    ['pousse', 1, 'POUSSE', '+ fortification'], ['Deux', 1, '2 GUMMIES', 'par jour', {view: 'close'}], ['tutti', 1, 'TUTTI FRUTTI', 'le goût'],
    ['quatre-vingt-dix-sept', 1, '97 %', 'cheveux plus longs · étude', {view: 'open'}], ['gélatine', 1, 'GÉLATINE', 'vegan', {crossed: true}],
    ['deux', 2, '2 689', 'vendus', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Vingt-quatre', now: '24,90 €', ...PRIX}});
