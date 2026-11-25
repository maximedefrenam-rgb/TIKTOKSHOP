/**
 * Lashilé Good Hair — vidéo B « Hello mes baddies » (cible féminine). Voix : prise 1, 26,8 s.
 * Promesses : uniquement celles de la fiche / de l'emballage, étude clinique de la marque avec ses conditions.
 */
import timings from '../../public/videos/lashile-baddies/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/lashile-baddies/';

const S1 = at(w, 'Good') - 0.08;
const S2 = at(w, 'et') - 0.08;
const S3 = at(w, 'Biotine') - 0.08;
const S4 = at(w, 'et', 5) - 0.08;

export const config: VideoConfig = {
  id: 'lashile-baddies',
  version: 1,
  format: 'prix-choc',
  accent: '#F95259',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'hop', at: at(w, 'Hello')},
      {action: 'present', at: at(w, 'Good')},
      {action: 'point', at: at(w, 'plus')},
      {action: 'shock', at: at(w, 'quatre-vingt-dix-sept')},
      {action: 'slam', at: at(w, 'moins')},
      {action: 'present', at: at(w, 'Biotine')},
      {action: 'faint', at: at(w, 'SUBLIMES'), duration: 0.8},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'cours')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'HELLO\nMES BADDIES', at: at(w, 'Hello'), y: 320, size: 160, color: 'accent', stack: true},
        {text: "REGARDEZ CE QUE\nJ'AI TROUVÉ", at: at(w, 'regardez'), y: 600, size: 100, stack: true},
      ],
    },
    {
      kind: 'benefit', from: S1, to: S2,
      keywords: [
        {text: 'GOOD HAIR', at: at(w, 'Good'), y: 270, size: 140, color: 'accent', stack: true},
        {text: 'N°1 DES VENTES\nEN FRANCE', at: at(w, 'numéro'), y: 460, size: 105, stack: true},
        {text: '+ DE 2 600 VENDUS', at: at(w, 'plus'), y: 640, size: 90, color: 'accent', stack: true},
      ],
    },
    {
      kind: 'compare', from: S2, to: S3, title: 'ÉTUDE CLINIQUE · 84 JOURS', at: at(w, 'quatre-vingt-dix-sept'),
      rows: [
        {label: 'Longueur : amélioration constatée', value: 97, display: '97 %', highlight: true, at: at(w, 'quatre-vingt-dix-sept')},
        {label: 'Fourches (constaté chez 90 % des utilisatrices)', value: 37, display: '-37 %', highlight: true, at: at(w, 'moins')},
      ],
    },
    {
      kind: 'cutaway', from: S3, to: S4, openAt: at(w, 'Biotine'),
      items: [
        {label: 'BIOTINE', at: at(w, 'Biotine')},
        {label: 'ZINC', at: at(w, 'zinc')},
        {label: 'VITAMINE B6', at: at(w, 'vitamine')},
        {label: 'PRÊLE', at: at(w, 'prêle')},
      ],
      keywords: [{text: 'CHEVEUX SUBLIMES', at: at(w, 'SUBLIMES'), y: 810, size: 95, color: 'accent', stack: true}],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: 'BONBONS VÉGANES\nTROP BONS', at: at(w, 'bonbons'), y: 500, size: 100, color: 'accent'},
        {text: 'POUR NOËL\nOU POUR TOI · 24,90 €', at: at(w, 'Noël'), y: 500, size: 95, color: 'accent'},
      ],
    },
  ],
};
