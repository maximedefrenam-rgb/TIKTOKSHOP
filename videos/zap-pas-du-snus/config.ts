/**
 * ZAP sachets énergétiques cerise noire DUO — vidéo n°2 « C'est pas du snus » (idée reçue + prix + en coupe).
 * Voix : prise 1 (Creative), resserrée à 23,5 s. Aucune allégation d'effet de la caféine.
 */
import timings from '../../public/videos/zap-pas-du-snus/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/zap-pas-du-snus/';

const S1 = at(w, "C'est") - 0.08;
const S2 = at(w, 'Caféine', 2) - 0.08;
const S3 = at(w, 'Avant') - 0.08;
const S4 = at(w, 'Trente-six') - 0.08;

export const config: VideoConfig = {
  id: 'zap-pas-du-snus',
  version: 1,
  format: 'idee-recue',
  accent: '#F0465A',
  productImage: D + 'produit.png',
  productScale: 0.74,
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'WSH')},
      {action: 'slam', at: at(w, 'ZÉRO')},
      {action: 'point', at: at(w, 'cent')},
      {action: 'faint', at: at(w, 'centimes'), duration: 0.9},
      {action: 'present', at: at(w, 'Caféine', 2)},
      {action: 'hop', at: at(w, 'session')},
      {action: 'shock', at: at(w, 'testament')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'myth', from: 0, to: S1, statement: 'TU PRENDS\nDU SNUS ?!', crossAt: at(w, 'ZÉRO'),
      keywords: [
        {text: 'WSH ?!', at: at(w, 'WSH'), until: at(w, 'ZÉRO') - 0.05, y: 220, size: 150, color: 'accent', impact: true},
        {text: '0 NICOTINE · 0 TABAC', at: at(w, 'nicotine'), y: 830, size: 90, color: 'accent', stack: true},
      ],
    },
    {
      kind: 'price', from: S1, to: S2, price: 10.16, doses: 36, unitLabel: 'LE SACHET', divLabel: 'SACHETS',
      priceAt: at(w, 'Black'), dividerAt: at(w, 'vingt-huit'), resultAt: at(w, 'centimes'),
      keywords: [
        {text: '100 MG DE CAFÉINE', at: at(w, 'cent'), y: 200, size: 100},
        {text: 'BLACK FRIDAY', at: at(w, 'Black'), y: 200, size: 100, color: 'accent'},
        {text: 'LIVRAISON GRATUITE', at: at(w, 'livraison'), y: 200, size: 100},
      ],
    },
    {
      kind: 'cutaway', from: S2, to: S3, openAt: at(w, 'Caféine', 2),
      items: [
        {label: 'CAFÉINE', sub: '100 mg', at: at(w, 'Caféine', 2)},
        {label: 'L-THÉANINE', at: at(w, 'elle-théanine')},
        {label: 'VITAMINES B', sub: 'cerise noire', at: at(w, 'vitamines')},
        {label: 'FABRIQUÉ', sub: 'en Suède', at: at(w, 'fabriqué')},
      ],
      keywords: [{text: 'SOUS LA LÈVRE, DISCRET', at: at(w, 'sous'), y: 815, size: 80, color: 'accent', stack: true}],
    },
    {
      kind: 'usage', from: S3, to: S4,
      leftLabel: 'AVANT LA SÉANCE', rightLabel: 'SESSION GTA 6',
      leftAt: at(w, 'séance'), rightAt: at(w, 'session'),
      keywords: [{text: 'RIP TA MACHINE\nÀ CAFÉ', at: at(w, 'machine'), y: 290, size: 130, color: 'accent', stack: true}],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: '36 SACHETS = 10,16 €', at: at(w, 'Trente-six'), y: 500, size: 110, color: 'accent', stack: true},
        {text: 'Contient de la caféine (100 mg/sachet).\nDéconseillé aux enfants et aux femmes\nenceintes ou allaitantes.',
          at: at(w, 'Trente-six'), y: 645, size: 34, small: true, stack: true},
      ],
    },
  ],
};
