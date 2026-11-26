import tVoy from '../../public/videos/topdon-voyant/timings.json';
import tCou from '../../public/videos/topdon-coupons/timings.json';
import {variant, kw, JACKETS} from '../../src/lib/variant';

const P = {accent: '#2E8BFF', productScale: 0.85};
type R = (w: string, n?: number) => number;
const DEAL = (from: number, badgeAt: number, strikeAt: number, newAt: number, keywords: ReturnType<typeof kw>[]) => ({
  kind: 'deal' as const, from, badge: 'BLACK FRIDAY', oldPrice: 209, newPrice: 189.99, discount: '-9 %', badgeAt, strikeAt, newAt, keywords});

export const voyant = variant({
  id: 'topdon-voyant', timings: tVoy, ...P, productImage: 'videos/topdon-voyant/produit.png', jacket: JACKETS[0], format: 'idee-recue',
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('VOYANT MOTEUR\nALLUMÉ ?!', r('voyant'), {y: 290, size: 150, color: 'alert'}),
      kw('TU CHIES DANS\nTON FROC ?!', r('chies'), {y: 520, size: 110, impact: true, stack: true}),
    ]},
    {kind: 'benefit', from: r('Branche') - 0.08, keywords: [
      kw('BRANCHE-LA SUR\nTA PRISE OBD', r('Branche'), {y: 300, size: 120, color: 'accent', stack: true}),
    ]},
    {kind: 'cutaway', from: r('elle') - 0.08, openAt: r('elle') + 0.1, items: [
      {label: 'LIT + EFFACE', sub: 'les codes défaut', at: r('lit')},
      {label: 'MOTEUR · BOÎTE', at: r('moteur', 2)},
      {label: 'AIRBAG · ABS', at: r('airbag')},
      {label: "9 FONCTIONS D'ENTRETIEN", at: r('neuf')},
    ]},
    {kind: 'benefit', from: r('tu', 2) - 0.08, keywords: [
      kw('TU SAIS CE QUI CLOCHE\nAVANT LE GARAGE', r('cloche'), {y: 300, size: 110, color: 'accent', stack: true}),
      kw('MISES À JOUR\nGRATUITES À VIE', r('mises'), {y: 530, size: 110, stack: true}),
    ]},
    DEAL(r('Black') - 0.08, r('Black'), r('deux'), r('quatre-vingt-neuf'), [kw('LIVRAISON GRATUITE', r('livraison'), {y: 840, size: 90, stack: true})]),
    {kind: 'cta', from: r('panier') - 0.1, arrowAt: r('panier'), keywords: [
      kw('189,99 €\nAU LIEU DE 209 €', r('panier'), {y: 520, size: 110, color: 'accent', stack: true})]},
  ],
});

export const coupons = variant({
  id: 'topdon-coupons', timings: tCou, ...P, productImage: 'videos/topdon-coupons/produit.png', jacket: JACKETS[1],
  build: (r) => [
    {kind: 'hook', from: 0, keywords: [
      kw('WESH ?!', r('Wesh'), {y: 300, size: 220, color: 'accent', impact: true}),
      kw('151 € LA VALISE\nDIAGNOSTIC ?!', r('cent'), {y: 300, size: 140}),
    ]},
    DEAL(r('la', 2) - 0.08, r('la', 2) + 0.05, r('deux'), r('quatre-vingt-neuf'), [
      kw('151,99 € AVEC LES COUPONS', r('coupons'), {y: 840, size: 80, color: 'accent', stack: true}),
      kw('selon les coupons disponibles', r('coupons'), {y: 930, size: 34, small: true, stack: true}),
    ]),
    {kind: 'cutaway', from: r('écran') - 0.08, openAt: r('écran') + 0.1, items: [
      {label: 'ÉCRAN 5 POUCES', at: r('écran')},
      {label: 'ANDROID 11', at: r('Android')},
      {label: 'MOTEUR · BOÎTE · AIRBAG · ABS', at: r('moteur')},
      {label: "9 SERVICES D'ENTRETIEN", at: r('services')},
    ]},
    {kind: 'benefit', from: r('mises') - 0.08, keywords: [
      kw('MISES À JOUR\nGRATUITES À VIE', r('mises'), {y: 300, size: 140, color: 'accent', impact: true}),
    ]},
    {kind: 'reviews', from: r('quatre') - 0.08, rating: 4.4, reviews: 189, sold: 1690, ratingAt: r('quatre') + 0.1, soldAt: r('étoiles')},
    {kind: 'cta', from: r('livraison') - 0.08, arrowAt: r('panier'), keywords: [
      kw('LIVRAISON GRATUITE', r('livraison'), {y: 520, size: 110, color: 'accent', stack: true})]},
  ],
});
