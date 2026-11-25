/**
 * Karacare Hair Boost — vidéo B « Filles » (cheveux qui ne poussent pas). Voix : prise 1, 25,7 s.
 * Affirmations de la marque attribuées (« selon la marque », cure de 3 mois).
 */
import timings from '../../public/videos/karacare-filles/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/karacare-filles/';

const S1 = at(w, 'Plus') - 0.08;
const S2 = at(w, 'Concentré') - 0.08;
const S3 = at(w, 'et', 4) - 0.08; // « et selon la marque »
const S4 = at(w, 'Gummies') - 0.08;

export const config: VideoConfig = {
  id: 'karacare-filles',
  version: 1,
  format: 'idee-recue',
  accent: '#E03541',
  productImage: D + 'produit.png',
  productScale: 0.62,
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'hop', at: at(w, 'filles')},
      {action: 'shock', at: at(w, 'millimètre')},
      {action: 'present', at: at(w, 'Plus')},
      {action: 'slam', at: at(w, 'élu')},
      {action: 'point', at: at(w, 'zinc')},
      {action: 'faint', at: at(w, 'SUBLIMES'), duration: 0.8},
      {action: 'shock', at: at(w, 'douze')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'cours')},
    ],
  },
  scenes: [
    {
      kind: 'myth', from: 0, to: S1, statement: 'TES CHEVEUX\nNE POUSSENT PAS ?', crossAt: at(w, 'millimètre'), verdict: 'STOP',
      keywords: [
        {text: 'LES FILLES !', at: at(w, 'Les'), until: at(w, 'vous') - 0.04, y: 230, size: 130, color: 'accent', impact: true},
        {text: "PAS D'UN MILLIMÈTRE ?!", at: at(w, 'millimètre'), y: 830, size: 85, color: 'accent', stack: true},
      ],
    },
    {
      kind: 'reviews', from: S1, to: S2, sold: 60000, soldLabel: 'CLIENTES', rank: "ÉLU PRODUIT DE L'ANNÉE 2026",
      ratingAt: at(w, 'testé'), soldAt: at(w, 'Plus'), rankAt: at(w, 'élu'),
      keywords: [{text: 'selon la marque', at: at(w, 'clientes'), y: 560, size: 34, small: true, stack: true}],
    },
    {
      kind: 'cutaway', from: S2, to: S3, openAt: at(w, 'Concentré'),
      items: [
        {label: 'ZINC', at: at(w, 'zinc')},
        {label: 'BIOTINE', at: at(w, 'biotine')},
        {label: 'VITAMINE B6', at: at(w, 'vitamine')},
      ],
      keywords: [
        {text: 'POUSSE · FORCE · VOLUME', at: at(w, 'pousse'), y: 720, size: 85, color: 'accent', stack: true},
        {text: 'DES CHEVEUX SUBLIMES', at: at(w, 'SUBLIMES'), y: 820, size: 85, stack: true},
      ],
    },
    {
      kind: 'benefit', from: S3, to: S4,
      keywords: [
        {text: "JUSQU'À", at: at(w, "jusqu'à"), y: 250, size: 110, stack: true},
        {text: '12 CM', at: at(w, 'douze'), y: 430, size: 280, color: 'accent', impact: true, stack: true},
        {text: 'DE POUSSE', at: at(w, 'pousse', 2), y: 620, size: 110, stack: true},
        {text: 'selon la marque, avec la cure de 3 mois', at: at(w, 'cure'), y: 710, size: 36, small: true, stack: true},
      ],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: 'GOÛT MYRTILLE\nFRAMBOISE', at: at(w, 'Gummies'), until: at(w, 'deux', 3) - 0.04, y: 500, size: 110, color: 'accent'},
        {text: '2 MOIS DE CURE', at: at(w, 'deux', 3), until: at(w, 'livraison') - 0.04, y: 500, size: 120, color: 'accent'},
        {text: 'LIVRAISON GRATUITE', at: at(w, 'livraison'), y: 500, size: 110, color: 'accent', impact: true},
      ],
    },
  ],
};
