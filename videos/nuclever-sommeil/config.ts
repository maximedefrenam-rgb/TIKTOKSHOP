/**
 * Nuclever Cortisol Manager — vidéo B « 3 h du mat' » (sommeil + séance jambes → avis → en coupe → allégations UE → CTA).
 * Voix : prise 1, 22,9 s. Allégations : magnésium/fatigue, vitamine D/fonction musculaire (doses du verso ≥ 15 % VNR).
 */
import timings from '../../public/videos/nuclever-sommeil/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/nuclever-sommeil/';

const S1 = at(w, 'Nuclever') - 0.08;
const S2 = at(w, 'Magnésium') - 0.08;
const S3 = at(w, 'magnésium', 2) - 0.15; // « le magnésium contribue »
const S4 = at(w, 'Un') - 0.08;

export const config: VideoConfig = {
  id: 'nuclever-sommeil',
  version: 1,
  format: 'idee-recue',
  accent: '#D8759A',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'trois')},
      {action: 'faint', at: at(w, 'journée'), duration: 0.7},
      {action: 'slam', at: at(w, 'jambes')},
      {action: 'present', at: at(w, 'Nuclever')},
      {action: 'hop', at: at(w, 'étoiles')},
      {action: 'point', at: at(w, 'Magnésium')},
      {action: 'point', at: at(w, 'musculaire')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: "3 H DU MAT' ?!", at: at(w, 'trois'), y: 320, size: 190, color: 'accent', impact: true},
        {text: 'TU FIXES\nLE PLAFOND ?', at: at(w, 'fixes'), y: 320, size: 160},
        {text: 'DEMAIN :\nSÉANCE JAMBES', at: at(w, 'demain'), y: 320, size: 150, color: 'alert', impact: true},
      ],
    },
    {
      kind: 'reviews', from: S1, to: S2, rating: 4.5, reviews: 3900, sold: 55000, rank: '2E AU CLASSEMENT DES VENTES',
      ratingAt: at(w, 'quatre'), soldAt: S1 + 0.1, rankAt: at(w, 'avis'),
    },
    {
      kind: 'cutaway', from: S2, to: S3, openAt: at(w, 'Magnésium'),
      items: [
        {label: 'MAGNÉSIUM', sub: '100 mg · sommeil', at: at(w, 'Magnésium')},
        {label: 'L-THÉANINE', sub: '400 mg · calme', at: at(w, 'L-théanine')},
        {label: 'ASHWAGANDHA', sub: '300 mg · stress', at: at(w, 'ashwagandha')},
      ],
    },
    {
      kind: 'power', from: S3, to: S4, fillFrom: S3 + 0.1, fillTo: at(w, 'normale'),
      dumbbells: [at(w, 'fatigue'), at(w, 'fonction'), at(w, 'normale')],
      keywords: [
        {text: 'LE MAGNÉSIUM CONTRIBUE\nÀ RÉDUIRE LA FATIGUE', at: S3 + 0.1, y: 290, size: 95, color: 'accent', stack: true},
        {text: 'VITAMINE D : MAINTIEN D\'UNE\nFONCTION MUSCULAIRE NORMALE', at: at(w, 'vitamine'), y: 500, size: 80, stack: true},
      ],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: '1 SACHET / JOUR\nDANS L\'EAU', at: at(w, 'Un'), until: at(w, 'Black') - 0.04, y: 500, size: 110, color: 'accent'},
        {text: 'BLACK FRIDAY\nLIVRAISON GRATUITE', at: at(w, 'Black'), y: 500, size: 110, color: 'accent', stack: true},
        {text: "Déconseillé aux femmes enceintes ou allaitantes et aux enfants.\nVoir précautions d'emploi sur l'emballage.", at: at(w, 'Black'), y: 650, size: 32, small: true, stack: true},
      ],
    },
  ],
};
