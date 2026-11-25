/**
 * Novoma collagène marin — vidéo A « C'est donné » (stupéfaction prix → en coupe → promo → bénéfices fiche → urgence).
 * Voix : prise 1 (Creative), resserrée à 22,9 s. Bénéfices : mentions de la fiche + allégation UE vitamine C.
 */
import timings from '../../public/videos/novoma-donne/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/novoma-donne/';

const S1 = at(w, 'Collagène') - 0.08;
const S2 = at(w, 'au') - 0.08;
const S3 = at(w, 'Hydratation') - 0.08;
const S4 = at(w, 'Prends-en') - 0.08;

export const config: VideoConfig = {
  id: 'novoma-donne',
  version: 2,
  format: 'prix-choc',
  accent: '#7FE0CF',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'wesh')},
      {action: 'faint', at: at(w, 'DONNÉ'), duration: 0.8},
      {action: 'present', at: at(w, 'Collagène')},
      {action: 'slam', at: at(w, 'moins')},
      {action: 'point', at: at(w, 'Hydratation')},
      {action: 'hop', at: at(w, 'Prends-en')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'WSH ?!', at: at(w, 'wesh'), until: at(w, 'quatre') - 0.04, y: 320, size: 220, color: 'accent', impact: true},
        {text: '4,98 €', at: at(w, 'quatre'), y: 330, size: 280, color: 'accent', impact: true, stack: true},
        {text: "C'EST DONNÉ !", at: at(w, 'DONNÉ'), y: 590, size: 140, stack: true},
      ],
    },
    {
      kind: 'cutaway', from: S1, to: S2, openAt: at(w, 'Collagène'),
      items: [
        {label: 'COLLAGÈNE MARIN', sub: 'Naticol®', at: at(w, 'Collagène')},
        {label: 'ACIDE HYALURONIQUE', at: at(w, 'acide')},
        {label: 'VITAMINE C', at: at(w, 'vitamine')},
        {label: '60 GÉLULES', sub: '1 mois de cure', at: at(w, 'soixante')},
      ],
    },
    {
      kind: 'deal', from: S2, to: S3, badge: 'BLACK FRIDAY', oldPrice: 11.77, newPrice: 4.98, discount: '-58 %',
      badgeAt: S2 + 0.05, newAt: S2 + 0.15, strikeAt: at(w, 'moins'),
    },
    {
      kind: 'benefit', from: S3, to: S4,
      keywords: [
        {text: 'HYDRATATION\nDE LA PEAU', at: at(w, 'Hydratation'), y: 280, size: 120, color: 'accent', stack: true},
        {text: 'QUALITÉ DES CHEVEUX', at: at(w, 'qualité'), y: 460, size: 100, stack: true},
        {text: 'CONFORT ARTICULAIRE', at: at(w, 'confort'), y: 570, size: 100, stack: true},
        {text: 'La vitamine C contribue à la formation normale de collagène', at: at(w, 'vitamine', 2), y: 665, size: 34, small: true, stack: true},
      ],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: '2 SACHETS =\nLIVRAISON OFFERTE', at: at(w, 'Prends-en'), y: 500, size: 100, color: 'accent'},
        {text: "BLACK FRIDAY\nJUSQU'AU 30 NOV.", at: at(w, 'Black'), y: 500, size: 110, color: 'accent'},
      ],
    },
  ],
};
