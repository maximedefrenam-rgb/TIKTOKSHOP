/**
 * ZAP sachets énergétiques cerise noire DUO — vidéo n°1 (prix choc + comparatif + promo).
 * Voix : prise 1 (Simon, eleven_v3 Creative), resserrée à 29,8 s.
 * Aucune allégation santé sur la caféine : uniquement des faits (100 mg, composition, prix) et des moments d'usage.
 */
import timings from '../../public/videos/zap-cerise-noire-duo/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/zap-cerise-noire-duo/';

const S1 = at(w, 'Cent') - 0.08;
const S2 = at(w, 'Black') - 0.08;
const S3 = at(w, 'Zéro') - 0.08;
const S4 = at(w, 'Avant') - 0.08;
const S5 = at(w, 'Trente-six') - 0.08;

export const config: VideoConfig = {
  id: 'zap-cerise-noire-duo',
  version: 1,
  format: 'prix-choc',
  accent: '#F0465A',
  productImage: D + 'produit.png',
  productScale: 0.74,
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'WHAT')},
      {action: 'faint', at: at(w, 'validé'), duration: 1.0},
      {action: 'point', at: at(w, 'PLUS')},
      {action: 'slam', at: at(w, 'moins')},
      {action: 'present', at: at(w, 'Caféine')},
      {action: 'hop', at: at(w, 'session')},
      {action: 'slam', at: at(w, 'putain')},
      {action: 'present', at: at(w, 'Panier')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'WTF ?!', at: at(w, 'WHAT'), until: at(w, 'Qui') - 0.04, y: 270, size: 200, impact: true},
        {text: 'QUI A VALIDÉ\nCE PRIX ?!', at: at(w, 'Qui'), y: 230, size: 100, stack: true},
        {text: '0,28 €', at: at(w, 'Vingt-huit'), y: 520, size: 290, color: 'accent', impact: true, stack: true},
        {text: 'LE SACHET', at: at(w, 'centimes'), y: 700, size: 100, stack: true},
      ],
    },
    {
      kind: 'compare', from: S1, to: S2, title: '100 MG DE CAFÉINE', at: at(w, 'PLUS'),
      rows: [
        {label: 'Un expresso (≈ 80 mg)', value: 80, display: '80 MG'},
        {label: '1 sachet ZAP', value: 100, display: '100 MG', highlight: true},
      ],
      keywords: [{text: 'TON CAFÉ AU BAR ≈ 2 €', at: at(w, 'café'), y: 1000, size: 90, color: 'alert'}],
    },
    {
      kind: 'deal', from: S2, to: S3, badge: 'BLACK FRIDAY', oldPrice: 14.9, newPrice: 10.16, discount: '-32 %',
      badgeAt: at(w, 'Black'), strikeAt: at(w, 'moins'), newAt: at(w, 'trente-deux'),
      keywords: [{text: 'LIVRAISON GRATUITE', at: at(w, 'livraison'), y: 840, size: 100, stack: true}],
    },
    {
      kind: 'cutaway', from: S3, to: S4, openAt: at(w, 'Zéro'),
      items: [
        {label: '0', sub: 'nicotine · 0 tabac', at: at(w, 'Zéro')},
        {label: 'CAFÉINE', sub: '100 mg', at: at(w, 'Caféine')},
        {label: 'L-THÉANINE', at: at(w, 'elle-théanine')},
        {label: 'VITAMINES B', sub: 'cerise noire', at: at(w, 'vitamines')},
      ],
      keywords: [{text: 'SOUS LA LÈVRE', at: at(w, 'Tu'), y: 790, size: 90, color: 'accent', stack: true}],
    },
    {
      kind: 'usage', from: S4, to: S5,
      leftLabel: 'AVANT LA SALLE', rightLabel: 'SESSION GTA 6',
      leftAt: at(w, 'Avant'), rightAt: at(w, 'session'), crossAt: at(w, 'canettes'),
      keywords: [{text: 'ARRÊTE LES\nCANETTES !', at: at(w, 'arrête'), y: 300, size: 140, color: 'accent', stack: true}],
    },
    {
      kind: 'cta', from: S5, to: T, arrowAt: at(w, 'Panier'),
      keywords: [
        {text: '36 SACHETS = 10,16 €', at: at(w, 'Trente-six'), y: 500, size: 110, color: 'accent', stack: true},
        {text: 'Contient de la caféine (100 mg/sachet).\nDéconseillé aux enfants et aux femmes\nenceintes ou allaitantes.',
          at: at(w, 'Trente-six'), y: 645, size: 34, small: true, stack: true},
      ],
    },
  ],
};
