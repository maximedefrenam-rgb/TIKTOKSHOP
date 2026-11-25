/**
 * Medicube toner pads — vidéo B « Promo de dingue » (Black Friday d'entrée → avis → STOP points noirs → ingrédients → bénéfices fiche).
 * Voix : prise 1, 23,5 s.
 */
import timings from '../../public/videos/medicube-promo/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/medicube-promo/';

const S1 = at(w, 'Plus') - 0.08;
const S2 = at(w, 'stop') - 0.12;
const S3 = at(w, 'niacinamide') - 0.08;
const S4 = at(w, 'des', 2) - 0.08;
const S5 = at(w, 'Black', 2) - 0.08;

export const config: VideoConfig = {
  id: 'medicube-promo',
  version: 1,
  format: 'prix-choc',
  accent: '#FF6B5A',
  productImage: D + 'produit.png',
  productScale: 0.5,
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'Wouah')},
      {action: 'slam', at: at(w, 'DINGUE')},
      {action: 'point', at: at(w, 'vingt-trois')},
      {action: 'faint', at: at(w, 'offert'), duration: 0.7},
      {action: 'hop', at: at(w, 'quatrièmes')},
      {action: 'slam', at: at(w, 'stop')},
      {action: 'present', at: at(w, 'niacinamide')},
      {action: 'point', at: at(w, 'pores')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'deal', from: 0, to: S1, badge: 'PROMO DE DINGUE', oldPrice: 29.99, newPrice: 23.99, discount: 'COUPONS',
      badgeAt: at(w, 'Wouah'), strikeAt: at(w, 'dès'), newAt: at(w, 'vingt-trois'),
      keywords: [
        {text: 'dès 23,99 € avec les coupons (selon le set)', at: at(w, 'vingt-trois'), y: 775, size: 36, small: true, stack: true},
        {text: 'BLACK FRIDAY', at: at(w, 'Black'), y: 880, size: 100, color: 'accent'},
        {text: 'CADEAU OFFERT', at: at(w, 'cadeau'), y: 880, size: 100, color: 'accent'},
      ],
    },
    {
      kind: 'reviews', from: S1, to: S2, rating: 4.6, reviews: 169, sold: 2565, rank: '4E AU CLASSEMENT DES MEILLEURS AVIS',
      soldAt: at(w, 'Plus'), ratingAt: at(w, 'quatre'), rankAt: at(w, 'quatrièmes'),
    },
    {
      kind: 'beforeAfter', from: S2, to: S3, image: D + 'nez.png', stopAt: at(w, 'stop'),
      keywords: [{text: 'STOP AUX POINTS NOIRS\n& AUX IMPERFECTIONS', at: at(w, 'stop'), y: 230, size: 100, color: 'alert', stack: true}],
    },
    {
      kind: 'cutaway', from: S3, to: S4, openAt: at(w, 'niacinamide'),
      items: [
        {label: 'NIACINAMIDE', sub: '2 %', at: at(w, 'niacinamide')},
        {label: 'VITAMINE C', at: at(w, 'vitamine')},
        {label: 'ACIDE SUCCINIQUE', at: at(w, 'acide')},
      ],
    },
    {
      kind: 'benefit', from: S4, to: S5,
      keywords: [
        {text: 'PORES NETS', at: at(w, 'pores'), y: 290, size: 150, color: 'accent', stack: true},
        {text: "DE L'ÉCLAT", at: at(w, "l'éclat"), y: 470, size: 120, stack: true},
        {text: 'EFFET GLASS SKIN', at: at(w, "l'effet"), y: 640, size: 110, color: 'accent', stack: true},
      ],
    },
    {
      kind: 'cta', from: S5, to: T, arrowAt: at(w, 'panier'),
      keywords: [{text: "BLACK FRIDAY\nJUSQU'AU 30 NOV.", at: S5, y: 520, size: 110, color: 'accent', stack: true}],
    },
  ],
};
