/**
 * Karacare Hair Boost — vidéo A « Casquette » (mecs, cheveux qui se clairsèment). Voix : prise 1, 26 s.
 * Jamais de promesse de soigner la calvitie. Affirmations de la marque attribuées (« selon la marque », 3 mois).
 */
import timings from '../../public/videos/karacare-casquette/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/karacare-casquette/';

const S1 = at(w, 'Tes') - 0.08;
const S2 = at(w, 'Karacare') - 0.08;
const S3 = at(w, 'zinc') - 0.08;
const S4 = at(w, 'et', 3) - 0.08; // « et selon la marque »
const S5 = at(w, 'Deux', 2) - 0.08; // le 1er « deux » est dans « deux mille vingt-six »

export const config: VideoConfig = {
  id: 'karacare-casquette',
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
      {action: 'slam', at: at(w, 'Arrête')},
      {action: 'shock', at: at(w, 'vent')},
      {action: 'shock', at: at(w, 'brille')},
      {action: 'present', at: at(w, 'Karacare')},
      {action: 'hop', at: at(w, 'soixante')},
      {action: 'point', at: at(w, 'zinc')},
      {action: 'faint', at: at(w, 'douze'), duration: 0.8},
      {action: 'slam', at: at(w, 'moins')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'ARRÊTE !', at: at(w, 'Arrête'), until: at(w, 'casquette') - 0.04, y: 300, size: 220, color: 'alert', impact: true},
        {text: 'TE PLANQUER\nSOUS TA CASQUETTE ?', at: at(w, 'casquette'), y: 300, size: 120, stack: true},
        {text: 'DÈS QU\'IL Y A DU VENT', at: at(w, 'vent'), y: 510, size: 100, color: 'accent', impact: true, stack: true},
      ],
    },
    {
      kind: 'myth', from: S1, to: S2, statement: 'CHEVEUX QUI\nSE CLAIRSÈMENT ?', crossAt: at(w, 'photos'), verdict: 'STOP',
      keywords: [{text: 'LE CRÂNE QUI BRILLE\nSUR LES PHOTOS ?', at: at(w, 'brille'), y: 830, size: 80, color: 'accent', stack: true}],
    },
    {
      kind: 'reviews', from: S2, to: S3, sold: 60000, soldLabel: 'CLIENTS', rank: 'ÉLU PRODUIT DE L\'ANNÉE 2026',
      ratingAt: S2 + 0.05, soldAt: at(w, 'soixante'), rankAt: at(w, 'élu'),
      keywords: [{text: 'selon la marque', at: at(w, 'clients'), y: 560, size: 34, small: true, stack: true}],
    },
    {
      kind: 'cutaway', from: S3, to: S4, openAt: at(w, 'zinc'),
      items: [
        {label: 'ZINC', at: at(w, 'zinc')},
        {label: 'BIOTINE', at: at(w, 'biotine')},
        {label: 'VITAMINE B6', at: at(w, 'vitamine')},
        {label: '11 VITAMINES', sub: '& minéraux', at: at(w, 'onze')},
      ],
      keywords: [{text: 'POUSSE · FORCE · VOLUME', at: at(w, 'pousse'), y: 810, size: 85, color: 'accent', stack: true}],
    },
    {
      kind: 'benefit', from: S4, to: S5,
      keywords: [
        {text: "JUSQU'À", at: at(w, "jusqu'à"), y: 250, size: 110, stack: true},
        {text: '12 CM', at: at(w, 'douze'), y: 430, size: 280, color: 'accent', impact: true, stack: true},
        {text: 'DE POUSSE EN 3 MOIS', at: at(w, 'pousse', 2), y: 620, size: 95, stack: true},
        {text: 'selon la marque (cure de 3 mois)', at: at(w, 'pousse', 2), y: 710, size: 36, small: true, stack: true},
      ],
    },
    {
      kind: 'cta', from: S5, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: '2 GUMMIES / JOUR', at: at(w, 'Deux', 2), until: at(w, 'moins') - 0.04, y: 500, size: 110, color: 'accent'},
        {text: '< 1 € PAR JOUR', at: at(w, 'moins'), until: at(w, 'livraison') - 0.04, y: 500, size: 130, color: 'accent', impact: true},
        {text: 'LIVRAISON GRATUITE', at: at(w, 'livraison'), y: 500, size: 110, color: 'accent'},
      ],
    },
  ],
};
