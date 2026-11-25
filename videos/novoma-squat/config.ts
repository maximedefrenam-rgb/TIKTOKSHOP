/**
 * Novoma collagène marin — vidéo B « Vieux parquet » (interpellation salle → promo + prix/jour → en coupe → bénéfices fiche → urgence).
 * Voix : prise 1 (Creative), resserrée à 23,1 s. Bénéfices : mentions de la fiche uniquement.
 */
import timings from '../../public/videos/novoma-squat/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/novoma-squat/';

const S1 = at(w, 'Collagène') - 0.08;
const S2 = at(w, 'Collagène', 2) - 0.08;
const S3 = at(w, 'pour') - 0.08;
const S4 = at(w, 'Tes') - 0.08;

export const config: VideoConfig = {
  id: 'novoma-squat',
  version: 1,
  format: 'prix-choc',
  accent: '#7FE0CF',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'craquer')},
      {action: 'slam', at: at(w, 'putain')},
      {action: 'point', at: at(w, 'quatre')},
      {action: 'faint', at: at(w, 'DONNÉ'), duration: 0.8},
      {action: 'present', at: at(w, 'Collagène', 2)},
      {action: 'point', at: at(w, 'confort')},
      {action: 'hop', at: at(w, 'Tes')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'CRAAAC !', at: at(w, 'craquer'), until: at(w, 'vieux') - 0.04, y: 330, size: 220, color: 'alert', impact: true},
        {text: 'COMME UN VIEUX\nPARQUET ?!', at: at(w, 'vieux'), y: 330, size: 140, stack: true},
        {text: 'À CHAQUE SQUAT', at: at(w, 'chaque'), y: 540, size: 110, color: 'accent', stack: true},
      ],
    },
    {
      kind: 'deal', from: S1, to: S2, badge: 'BLACK FRIDAY', oldPrice: 11.77, newPrice: 4.98, discount: '-58 %',
      badgeAt: at(w, 'Collagène'), newAt: at(w, 'quatre'), strikeAt: at(w, 'au'),
      keywords: [
        {text: '< 0,17 € / JOUR', at: at(w, 'même'), y: 840, size: 110},
        {text: "C'EST DONNÉ !", at: at(w, 'DONNÉ'), y: 840, size: 130, color: 'accent', impact: true},
      ],
    },
    {
      kind: 'cutaway', from: S2, to: S3, openAt: at(w, 'Collagène', 2),
      items: [
        {label: 'COLLAGÈNE HYDROLYSÉ', sub: 'Naticol®', at: at(w, 'Collagène', 2)},
        {label: 'ACIDE HYALURONIQUE', at: at(w, 'acide')},
        {label: 'VITAMINE C', at: at(w, 'vitamine')},
      ],
    },
    {
      kind: 'benefit', from: S3, to: S4,
      keywords: [
        {text: 'CONFORT\nARTICULAIRE', at: at(w, 'confort'), y: 290, size: 130, color: 'accent', stack: true},
        {text: 'HYDRATATION DE LA PEAU', at: at(w, "l'hydratation"), y: 490, size: 95, stack: true},
        {text: 'QUALITÉ DES CHEVEUX', at: at(w, 'qualité'), y: 610, size: 95, stack: true},
      ],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: 'TES GENOUX\nTE REMERCIENT', at: at(w, 'Tes'), y: 500, size: 110, color: 'accent'},
        {text: "BLACK FRIDAY\nJUSQU'AU 30 NOV.", at: at(w, 'Black'), y: 500, size: 110, color: 'accent'},
        {text: '2 SACHETS =\nLIVRAISON OFFERTE', at: at(w, 'deux'), y: 500, size: 100, color: 'accent'},
      ],
    },
  ],
};
