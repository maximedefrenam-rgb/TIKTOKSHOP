/**
 * Vitavea autobronzant bêta-carotène — vidéo n°1 (problème trash + promo + en coupe).
 * Voix : prise 2 (Simon, eleven_v3 Natural), resserrée à 23,8 s.
 * Allégations : uniquement les mentions de l'emballage / de la fiche, mot pour mot.
 */
import timings from '../../public/videos/vitavea-autobronzant/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/vitavea-autobronzant/';

const S1 = at(w, 'Autobronzant') - 0.08;
const S2 = at(w, 'Tu') - 0.08;
const S3 = at(w, 'Une') - 0.08;
const S4 = at(w, 'Hâle') - 0.08;
const S5 = at(w, 'Black') - 0.08;

export const config: VideoConfig = {
  id: 'vitavea-autobronzant',
  version: 1,
  format: 'prix-choc',
  accent: '#F0B45A',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'CUL')},
      {action: 'slam', at: at(w, 'putain')},
      {action: 'point', at: at(w, 'six')},
      {action: 'faint', at: at(w, 'Maldives'), duration: 0.9},
      {action: 'shock', at: at(w, 'Guingamp')},
      {action: 'present', at: at(w, 'soixante')},
      {action: 'point', at: at(w, 'Hâle')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'ARRÊTE !', at: at(w, 'Arrête'), until: at(w, 'blanc') - 0.04, y: 330, size: 190},
        {text: 'BLANC COMME\nUN CUL', at: at(w, 'blanc'), y: 360, size: 170, impact: true, stack: true},
      ],
    },
    {
      kind: 'deal', from: S1, to: S2, badge: 'BLACK FRIDAY', oldPrice: 13.89, newPrice: 6.4, discount: '-54 %',
      badgeAt: at(w, 'Autobronzant'), newAt: at(w, 'six'), strikeAt: at(w, 'moins'),
      keywords: [{text: 'LIVRAISON GRATUITE', at: at(w, 'livraison'), y: 840, size: 100, stack: true}],
    },
    {
      kind: 'usage', from: S2, to: S3,
      leftLabel: 'LES MALDIVES ?', rightLabel: 'GUINGAMP', leftIcon: 'palm', rightIcon: 'rain',
      leftAt: at(w, 'Maldives'), rightAt: at(w, 'Guingamp'),
      keywords: [{text: 'FAIRE CROIRE QUE\nTU RENTRES DE…', at: at(w, 'Tu'), y: 280, size: 110, stack: true}],
    },
    {
      kind: 'cutaway', from: S3, to: S4, openAt: at(w, 'Une') + 0.1,
      items: [
        {label: '1 GÉLULE', sub: 'par jour', at: at(w, 'Une')},
        {label: 'BÊTA-CAROTÈNE', at: at(w, 'bêta-carotène')},
        {label: '60 GÉLULES', sub: '2 mois de cure', at: at(w, 'soixante')},
        {label: 'FABRIQUÉ', sub: 'en France', at: at(w, 'fabriqué')},
      ],
      keywords: [{text: '< 0,11 € / JOUR', at: at(w, 'même'), y: 800, size: 100, color: 'accent', stack: true}],
    },
    {
      kind: 'benefit', from: S4, to: S5,
      keywords: [
        {text: 'HÂLE NATUREL\n& UNIFORME', at: at(w, 'Hâle'), y: 300, size: 130, color: 'accent', stack: true},
        {text: 'SANS SOLEIL', at: at(w, 'sans'), y: 490, size: 120, stack: true},
        {text: 'Effets visibles dès le 1er mois de cure', at: at(w, 'effets'), y: 600, size: 42, small: true, stack: true},
      ],
    },
    {
      kind: 'cta', from: S5, to: T, arrowAt: at(w, 'panier'),
      keywords: [{text: "BLACK FRIDAY\nJUSQU'AU 30 NOV.", at: at(w, 'Black'), y: 530, size: 110, color: 'accent', stack: true}],
    },
  ],
};
