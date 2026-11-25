/**
 * Vitavea autobronzant — vidéo n°2 « Promo de malade » (promo d'abord, puis problème, résultat, arguments, urgence réelle).
 * Voix : prise 1 (Creative), resserrée à 25,2 s.
 * Allégations : mentions de l'emballage / de la fiche uniquement, mot pour mot.
 */
import timings from '../../public/videos/vitavea-promo/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/vitavea-promo/';

const S1 = at(w, 'Arrête') - 0.08;
const S2 = at(w, 'hâle') - 0.08;
const S3 = at(w, 'Une') - 0.08;
const S4 = at(w, 'Black') - 0.08;

export const config: VideoConfig = {
  id: 'vitavea-promo',
  version: 1,
  format: 'prix-choc',
  accent: '#F0B45A',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'PROMO')},
      {action: 'point', at: at(w, 'six')},
      {action: 'slam', at: at(w, 'CINQUANTE-QUATRE')},
      {action: 'shock', at: at(w, 'CUL')},
      {action: 'present', at: at(w, 'hâle')},
      {action: 'present', at: at(w, 'soixante')},
      {action: 'faint', at: at(w, 'centimes'), duration: 0.9},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'deal', from: 0, to: S1, badge: 'PROMO DE MALADE', oldPrice: 13.89, newPrice: 6.4, discount: '-54 %',
      badgeAt: at(w, 'PROMO'), newAt: at(w, 'six'), strikeAt: at(w, 'moins'),
      keywords: [{text: 'LIVRAISON GRATUITE', at: at(w, 'livraison'), y: 840, size: 100, stack: true}],
    },
    {
      kind: 'myth', from: S1, to: S2, statement: 'BLANC COMME\nUN CUL', crossAt: at(w, 'CUL'), verdict: 'STOP',
      keywords: [{text: 'TON BRONZAGE SE BARRE ?', at: at(w, 'bronzage'), y: 800, size: 80, color: 'accent', stack: true}],
    },
    {
      kind: 'benefit', from: S2, to: S3,
      keywords: [
        {text: 'HÂLE NATUREL\n& UNIFORME', at: at(w, 'hâle'), y: 300, size: 130, color: 'accent', stack: true},
        {text: 'SANS SOLEIL', at: at(w, 'sans'), y: 490, size: 120, stack: true},
        {text: 'Effets visibles dès le 1er mois de cure', at: at(w, 'effets'), y: 600, size: 42, small: true, stack: true},
      ],
    },
    {
      kind: 'cutaway', from: S3, to: S4, openAt: at(w, 'Une') + 0.1,
      items: [
        {label: '1 GÉLULE', sub: 'par jour', at: at(w, 'Une')},
        {label: 'BÊTA-CAROTÈNE', at: at(w, 'bêta-carotène')},
        {label: '60 GÉLULES', sub: '2 mois de cure', at: at(w, 'soixante')},
        {label: 'FABRIQUÉ', sub: 'en France', at: at(w, 'fabriqué')},
      ],
      keywords: [{text: '< 0,11 € / JOUR', at: at(w, 'même'), y: 810, size: 100, color: 'accent', stack: true}],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [{text: "BLACK FRIDAY\nJUSQU'AU 30 NOV.", at: at(w, 'Black'), y: 530, size: 110, color: 'accent', stack: true}],
    },
  ],
};
