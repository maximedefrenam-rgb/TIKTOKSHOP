/**
 * Medicube toner pads — vidéo A « Points noirs » (avant/après en ouverture → ingrédients → bénéfices fiche → avis → Black Friday).
 * Voix : prise 1, 25,9 s. Avant/après = image d'illustration fournie par l'utilisateur, mentionnée comme telle à l'écran.
 */
import timings from '../../public/videos/medicube-points-noirs/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/medicube-points-noirs/';

const S1 = at(w, 'niacinamide') - 0.08;
const S2 = at(w, 'pour') - 0.08;
const S3 = at(w, 'Plus') - 0.08;
const S4 = at(w, 'et', 3) - 0.08;
const S5 = at(w, 'panier') - 0.08;

export const config: VideoConfig = {
  id: 'medicube-points-noirs',
  version: 1,
  format: 'idee-recue',
  accent: '#FF6B5A',
  productImage: D + 'produit.png',
  productScale: 0.5,
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'slam', at: at(w, 'putains')},
      {action: 'present', at: at(w, 'Medicube')},
      {action: 'point', at: at(w, 'niacinamide')},
      {action: 'faint', at: at(w, 'éclat'), duration: 0.8},
      {action: 'hop', at: at(w, 'quatre')},
      {action: 'slam', at: at(w, 'vingt-trois')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'beforeAfter', from: 0, to: S1, image: D + 'nez.png', revealAt: at(w, 'Medicube'),
      keywords: [
        {text: "T'EN AS PAS MARRE", at: at(w, "T'en"), until: at(w, 'putains') - 0.04, y: 230, size: 110},
        {text: 'DE TES P*TAINS DE\nPOINTS NOIRS ?!', at: at(w, 'putains'), until: at(w, 'Medicube') - 0.04, y: 230, size: 100, color: 'alert'},
        {text: 'MEDICUBE', at: at(w, 'Medicube'), until: at(w, 'quatrièmes') - 0.04, y: 230, size: 150, color: 'accent'},
        {text: '4E AU CLASSEMENT\nDES MEILLEURS AVIS', at: at(w, 'quatrièmes'), y: 230, size: 100, color: 'accent'},
      ],
    },
    {
      kind: 'cutaway', from: S1, to: S2, openAt: at(w, 'niacinamide'),
      items: [
        {label: 'NIACINAMIDE', sub: '2 %', at: at(w, 'niacinamide')},
        {label: 'VITAMINE C', at: at(w, 'vitamine')},
        {label: 'ACIDE SUCCINIQUE', at: at(w, 'acide')},
        {label: 'PANTHÉNOL', at: at(w, 'panthénol')},
      ],
      keywords: [{text: 'UN PAD SUR TA FACE', at: at(w, 'tu'), y: 810, size: 85, color: 'accent', stack: true}],
    },
    {
      kind: 'benefit', from: S2, to: S3,
      keywords: [
        {text: 'PORES NETS', at: at(w, 'pores'), y: 290, size: 150, color: 'accent', stack: true},
        {text: 'MOINS DE MARQUES\nPOST-IMPERFECTIONS', at: at(w, 'moins'), y: 470, size: 90, stack: true},
        {text: 'ÉCLAT DE MALADE', at: at(w, 'éclat'), y: 640, size: 100, stack: true},
        {text: 'EFFET GLASS SKIN', at: at(w, "l'effet"), y: 790, size: 110, color: 'accent', stack: true},
      ],
    },
    {kind: 'reviews', from: S3, to: S4, rating: 4.6, reviews: 169, sold: 2565, soldAt: at(w, 'Plus'), ratingAt: at(w, 'quatre')},
    {
      kind: 'deal', from: S4, to: S5, badge: 'BLACK FRIDAY', oldPrice: 29.99, newPrice: 23.99, discount: 'COUPONS',
      badgeAt: at(w, 'Black'), strikeAt: at(w, 'dès'), newAt: at(w, 'vingt-trois'),
      keywords: [
        {text: 'dès 23,99 € avec les coupons (selon le set)', at: at(w, 'vingt-trois'), y: 775, size: 36, small: true, stack: true},
        {text: 'CADEAU OFFERT', at: at(w, 'cadeau'), y: 870, size: 100, color: 'accent'},
        {text: "JUSQU'AU 30 NOV.", at: at(w, "jusqu'au"), y: 870, size: 100, color: 'accent'},
      ],
    },
    {
      kind: 'cta', from: S5, to: T, arrowAt: at(w, 'panier'),
      keywords: [{text: "BLACK FRIDAY\nJUSQU'AU 30 NOV.", at: S5, y: 520, size: 110, color: 'accent', stack: true}],
    },
  ],
};
