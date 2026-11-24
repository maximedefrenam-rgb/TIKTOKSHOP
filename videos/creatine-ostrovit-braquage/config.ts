/**
 * Créatine OstroVit citron — vidéo n°2 « Braquage » (comparatif de prix vs moyenne du marché).
 * Moyenne relevée le 24/11/2026 sur 6 offres françaises (voir produits/creatine-ostrovit-citron/infos.md) :
 * 22,67 € les 300 g. Aucune marque nommée. Voix : prise 1 (Creative), resserrée à 29,1 s.
 */
import timings from '../../public/videos/creatine-ostrovit-braquage/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/creatine-ostrovit-braquage/';

const S1 = at(w, 'En') - 0.08;
const S2 = at(w, 'Et', 2) - 0.08; // le 1er « et » est dans « quatre fois et demie »
const S3 = at(w, 'Trois', 3) - 0.08;
const S4 = at(w, 'Le') - 0.08;

export const config: VideoConfig = {
  id: 'creatine-ostrovit-braquage',
  version: 1,
  format: 'comparatif',
  accent: '#F7D417',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'CINQ')},
      {action: 'slam', at: at(w, 'BRAQUER')},
      {action: 'point', at: at(w, 'celle-là')},
      {action: 'faint', at: at(w, 'putain'), duration: 1.0},
      {action: 'present', at: at(w, 'monohydrate')},
      {action: 'point', at: at(w, 'performance')},
      {action: 'hop', at: at(w, 'merci')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: '+ DE 0,05 €\nLA DOSE ?', at: at(w, 'plus'), until: at(w, 'BRAQUER') - 0.04, y: 330, size: 150, color: 'accent'},
        {text: 'BRAQUÉ !', at: at(w, 'BRAQUER'), y: 340, size: 230, color: 'alert', impact: true, stack: true},
      ],
    },
    {
      kind: 'compare', from: S1, to: S2, title: 'PRIX DES 300 G', at: at(w, 'plus', 2),
      rows: [
        {label: 'Moyenne du marché', value: 22.67, display: '22,67 €', at: at(w, 'plus', 2)},
        {label: 'Celle-là', value: 4.99, display: '4,99 €', highlight: true, at: at(w, 'quatre')},
      ],
      keywords: [{text: '4,5× MOINS CHER', at: at(w, 'quatre', 2), y: 1010, size: 130, color: 'accent', impact: true, stack: true}],
    },
    {
      kind: 'cutaway', from: S2, to: S3, openAt: at(w, 'monohydrate'),
      items: [
        {label: 'MONOHYDRATE', at: at(w, 'monohydrate')},
        {label: '200 MESH', sub: 'ultra micronisée', at: at(w, 'deux')},
        {label: 'POUDRE FINE', sub: 'se mélange direct', at: at(w, 'poudre')},
        {label: '100 DOSES', sub: 'de 3 g', at: at(w, 'cent')},
      ],
      keywords: [{text: 'PAS DE LA M*RDE', at: at(w, 'pas'), until: at(w, 'monohydrate') - 0.04, y: 330, size: 140, color: 'accent'}],
    },
    {
      kind: 'power', from: S3, to: S4,
      fillFrom: at(w, 'performance'), fillTo: at(w, 'répétés'),
      dumbbells: [at(w, 'courts'), at(w, 'intenses'), at(w, 'répétés')],
      keywords: [
        {text: '3 G PAR JOUR', at: at(w, 'Trois', 3), until: at(w, 'ta', 2) - 0.05, y: 240, size: 120},
        {text: 'PERFORMANCE PHYSIQUE', at: at(w, 'performance'), until: at(w, 'ta', 2) - 0.05, y: 400, size: 110, color: 'accent'},
        {text: 'EXERCICES COURTS,\nINTENSES ET RÉPÉTÉS', at: at(w, 'courts'), until: at(w, 'ta', 2) - 0.05, y: 570, size: 80},
        {text: 'TA DERNIÈRE SÉRIE\nTE DIRA MERCI', at: at(w, 'ta', 2), y: 420, size: 130, stack: true},
      ],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [{text: 'LE RESTE DE TON FRIC ?\nPOULET-RIZ', at: at(w, 'Le'), y: 530, size: 100, color: 'accent', stack: true}],
    },
  ],
};
