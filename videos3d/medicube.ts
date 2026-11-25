import t1 from '../public/videos/medicube3d-pores/timings.json';
import t2 from '../public/videos/medicube3d-promo/timings.json';
import t3 from '../public/videos/medicube3d-routine/timings.json';
import {build3d} from '../src/three/build3d';
const P = {accent: '#FF5A4E', pillColor: '#FFFFFF', productImage: 'videos/medicube-points-noirs/produit.png', productHeight: 1.75};
const PRIX = {old: '29,99 €', pills: ['avec coupons · selon le set', 'cadeau offert']};
export const pores = build3d({id: 'medicube3d-pores', timings: t1, ...P, problem: 'check', jacket: '#FF2E88',
  shots: [['', 1, 'PASSOIRE', 'frérot ?', {over: 'TES PORES =', color: 'alert'}], ['Regarde', 1, 'REGARDE ÇA', 'toner pads', {view: 'problem'}],
    ['Medicube', 1, 'MEDICUBE', '1 pad le soir'], ['Niacinamide', 1, 'NIACINAMIDE', 'AHA + BHA', {view: 'close'}],
    ['Élu', 1, 'ÉLU', 'meilleur pad exfoliant', {over: 'ACNE AWARDS'}], ['Sans', 1, 'PARFUM', 'ni colorant artificiel', {crossed: true}],
    ['Quatre', 1, '4,6 ★', '170 avis', {view: 'open'}], ['deux', 1, '2 581', 'vendus', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Dès', now: '20,99 €', ...PRIX}});
export const promo = build3d({id: 'medicube3d-promo', timings: t2, ...P, problem: 'tag', jacket: '#2E7BFF',
  shots: [['', 1, '-30 %', 'coupon skincare coréenne', {color: 'accent'}], ['Medicube', 1, 'MEDICUBE', 'toner pads', {view: 'problem'}],
    ['double', 1, 'DOUBLE FACE', 'texturé + doux'], ['exfolie', 1, 'EXFOLIE', "d'un côté", {view: 'close'}], ['hydrate', 1, 'HYDRATE', "de l'autre"],
    ['Pores', 1, 'GLASS SKIN', 'pores nets', {view: 'open'}], ['Cent', 1, '100 %', 'satisfaction · selon la marque'],
    ['Cadeau', 1, 'CADEAU', 'offert', {view: 'stack'}], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Dès', now: '20,99 €', ...PRIX}});
export const routine = build3d({id: 'medicube3d-routine', timings: t3, ...P, problem: 'clock', jacket: '#FFB800',
  shots: [['', 1, '10 ÉTAPES', 'frérot, oublie', {over: 'TA ROUTINE EN'}], ['pad', 1, '1 PAD', '1 geste', {view: 'problem'}],
    ['Medicube', 1, 'MEDICUBE', 'double face'], ['exfolie', 1, 'EXFOLIE', '+ hydrate', {view: 'close'}], ['Niacinamide', 1, 'NIACINAMIDE', "pour l'éclat"],
    ['sans', 1, 'PARFUM', 'artificiel', {crossed: true}], ['testé', 1, 'NON COMÉDOGÈNE', 'testé', {view: 'open'}],
    ['Soixante-dix', 1, '70', 'pads par pot', {view: 'stack'}], ['Quatre', 1, '4,6 ★', '170 avis'], ['prix', 1, 'LE PRIX ?']],
  price: {word: 'Dès', now: '20,99 €', ...PRIX}});
