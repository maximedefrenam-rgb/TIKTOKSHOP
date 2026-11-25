/**
 * Nuclever Cortisol Manager — vidéo A « Cortisol face » (tendance TikTok → avis → en coupe → fatigue + peau selon la marque → prix/jour).
 * Voix : prise 1, 27,6 s. Pas de promesse de « dégonfler » le visage ; peau = attribuée à la marque.
 */
import timings from '../../public/videos/nuclever-cortisol-face/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/nuclever-cortisol-face/';

const S1 = at(w, 'Nuclever') - 0.08;
const S2 = at(w, 'Ashwagandha') - 0.08;
const S3 = at(w, 'magnésium', 2) - 0.15; // « le magnésium contribue »
const S4 = at(w, 'Black') - 0.08;
const S5 = at(w, 'panier') - 0.08;

export const config: VideoConfig = {
  id: 'nuclever-cortisol-face',
  version: 1,
  format: 'idee-recue',
  accent: '#D8759A',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'cortisol')},
      {action: 'slam', at: at(w, 'boursouflée')},
      {action: 'hop', at: at(w, 'influenceur')},
      {action: 'faint', at: at(w, 'stressé'), duration: 0.7},
      {action: 'present', at: at(w, 'Nuclever')},
      {action: 'shock', at: at(w, 'cinquante-cinq')},
      {action: 'point', at: at(w, 'Ashwagandha')},
      {action: 'present', at: at(w, 'visage')},
      {action: 'slam', at: at(w, 'soixante-dix')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'CORTISOL FACE ?!', at: at(w, 'cortisol'), y: 330, size: 170, color: 'accent', impact: true},
        {text: 'TÊTE TOUTE\nBOURSOUFLÉE ?', at: at(w, 'tête'), y: 330, size: 150},
        {text: "LA PEAU D'UN\nINFLUENCEUR ?", at: at(w, 'peau'), y: 330, size: 150, color: 'accent'},
        {text: '4 H DE SOMMEIL\n& STRESSÉ À FOND', at: at(w, 'dors'), y: 330, size: 130, color: 'alert', impact: true},
      ],
    },
    {
      kind: 'reviews', from: S1, to: S2, rating: 4.5, reviews: 3900, sold: 55000, rank: '2E AU CLASSEMENT DES VENTES',
      ratingAt: S1 + 0.1, soldAt: at(w, 'cinquante-cinq'), rankAt: at(w, 'deuxième'),
    },
    {
      kind: 'cutaway', from: S2, to: S3, openAt: at(w, 'Ashwagandha'),
      items: [
        {label: 'ASHWAGANDHA', sub: '300 mg · stress', at: at(w, 'Ashwagandha')},
        {label: 'L-THÉANINE', sub: '400 mg · calme', at: at(w, 'L-théanine')},
        {label: 'MAGNÉSIUM', sub: '100 mg · sommeil', at: at(w, 'magnésium')},
        {label: 'VITAMINE D', sub: '1000 UI · humeur', at: at(w, 'vitamine')},
      ],
    },
    {
      kind: 'benefit', from: S3, to: S4,
      keywords: [
        {text: 'LE MAGNÉSIUM CONTRIBUE\nÀ RÉDUIRE LA FATIGUE', at: S3 + 0.1, y: 290, size: 95, stack: true},
        {text: 'TA PEAU DU VISAGE\nTE DIT MERCI', at: at(w, 'peau', 2), y: 500, size: 120, color: 'accent', stack: true},
        {text: 'selon la marque', at: at(w, 'peau', 2), y: 640, size: 38, small: true, stack: true},
      ],
    },
    {
      kind: 'price', from: S4, to: S5, price: 20.92, doses: 30, divLabel: 'JOURS', unitLabel: 'PAR JOUR',
      priceAt: at(w, 'Black'), dividerAt: at(w, 'prix'), resultAt: at(w, 'soixante-dix'),
      keywords: [
        {text: 'BLACK FRIDAY', at: at(w, 'Black'), y: 200, size: 100, color: 'accent'},
        {text: "PRIX LE PLUS BAS DE L'ANNÉE", at: at(w, 'prix'), y: 200, size: 80, color: 'accent'},
        {text: 'LIVRAISON GRATUITE', at: at(w, 'livraison'), y: 200, size: 100},
      ],
    },
    {
      kind: 'cta', from: S5, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: '55 000 VENDUS', at: S5, y: 500, size: 120, color: 'accent', stack: true},
        {text: "Déconseillé aux femmes enceintes ou allaitantes et aux enfants.\nVoir précautions d'emploi sur l'emballage.", at: S5, y: 630, size: 32, small: true, stack: true},
      ],
    },
  ],
};
