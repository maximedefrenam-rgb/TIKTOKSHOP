/**
 * Créatine OstroVit citron — vidéo n°1 (prix choc + idée reçue + en coupe).
 * Voix : prise 1 (Simon, eleven_v3 Creative), resserrée à 39,7 s.
 */
import timings from '../../public/videos/creatine-ostrovit-citron/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/creatine-ostrovit-citron/';

// frontières de scènes, calées sur la voix
const S1 = at(w, 'Trois') - 0.11; // « Trois cents grammes »
const S2 = at(w, 'Et') - 0.08; // « Et non, la créatine… »
const S3 = at(w, 'Si') - 0.08; // « Si la balance monte »
const S4 = at(w, 'Trois', 3) - 0.11; // « Trois grammes de créatine par jour »
const S5 = at(w, 'Petite') - 0.09; // « Petite astuce »
const S6 = at(w, "C'est", 3) - 0.09; // « C'est dans le panier orange »

export const config: VideoConfig = {
  id: 'creatine-ostrovit-citron',
  version: 1,
  format: 'prix-choc',
  accent: '#F7D417',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    hiddenInScenes: [3, 5],
    cues: [
      {action: 'shock', at: at(w, 'CINQ')},
      {action: 'point', at: at(w, 'Trois')},
      {action: 'faint', at: at(w, 'jamais'), duration: 1.3},
      {action: 'slam', at: at(w, 'PAS', 2)},
      {action: 'point', at: at(w, 'performance')},
      {action: 'hop', at: at(w, 'Parfait')},
      {action: 'present', at: at(w, 'panier')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'MÊME PAS', at: at(w, 'Même'), y: 260, size: 130, stack: true},
        {text: '0,05 €', at: at(w, 'CINQ'), y: 440, size: 300, color: 'accent', impact: true, stack: true},
        {text: 'LA DOSE', at: at(w, 'dose'), y: 630, size: 110, stack: true},
      ],
    },
    {
      kind: 'doses', from: S1, to: S2,
      weight: 300, dose: 3, price: 4.99, count: 100,
      weightAt: at(w, 'Trois'), priceAt: at(w, 'quatre'), divideAt: at(w, 'trois', 2), resultAt: at(w, 'CENT'),
      hideCalcAt: at(w, 'moins') - 0.1,
      keywords: [{text: 'MOINS CHER ?\nJAMAIS VU !', at: at(w, 'moins'), y: 400, size: 150, color: 'accent', stack: true}],
    },
    {kind: 'myth', from: S2, to: S3, statement: 'LA CRÉATINE\nFAIT GROSSIR', crossAt: at(w, 'PAS', 2)},
    {
      kind: 'muscle', from: S3, to: S4,
      waterAt: at(w, "l'eau"), inMuscleAt: at(w, 'DANS'), fatCrossAt: at(w, 'Pas', 3),
      syllables: [
        {text: 'IN', at: at(w, 'In')}, {text: 'TRA', at: at(w, 'tra')}, {text: 'MUS', at: at(w, 'mus')},
        {text: 'CU', at: at(w, 'cu')}, {text: 'LAIRE', at: at(w, 'laire')},
      ],
      syllablesUntil: at(w, 'Pas', 3) - 0.05,
      keywords: [
        {text: 'LA BALANCE MONTE ?', at: at(w, 'balance'), until: at(w, "l'eau") - 0.05, y: 300, size: 120},
        {text: "C'EST DE L'EAU", at: at(w, "l'eau"), until: at(w, 'In') - 0.05, y: 300, size: 130},
        {text: 'DANS LE MUSCLE', at: at(w, 'DANS'), until: at(w, 'In') - 0.05, y: 460, size: 130, color: 'accent'},
        {text: 'PAS SOUS LA PEAU', at: at(w, 'Pas', 3), y: 300, size: 120, stack: true},
        {text: 'PAS DANS LE BIDE !', at: at(w, 'pas', 4), y: 460, size: 130, color: 'accent', stack: true},
      ],
    },
    {
      kind: 'power', from: S4, to: S5,
      fillFrom: at(w, 'performance'), fillTo: at(w, 'répétés'),
      dumbbells: [at(w, 'courts'), at(w, 'intenses'), at(w, 'répétés')],
      snowAt: at(w, 'hiver'),
      keywords: [
        {text: '3 G PAR JOUR', at: at(w, 'Trois', 3), until: at(w, 'Parfait') - 0.05, y: 240, size: 120},
        {text: 'PERFORMANCE PHYSIQUE', at: at(w, 'performance'), until: at(w, 'Parfait') - 0.05, y: 400, size: 110, color: 'accent'},
        {text: 'EXERCICES COURTS,\nINTENSES ET RÉPÉTÉS', at: at(w, 'courts'), until: at(w, 'Parfait') - 0.05, y: 570, size: 80},
        {text: 'PARFAIT POUR\nCET HIVER', at: at(w, 'Parfait'), y: 420, size: 140, stack: true},
      ],
    },
    {
      kind: 'flavors', from: S5, to: S6, spreadAt: at(w, 'DEUX'),
      images: [D + 'gout-naturel.png', D + 'gout-pomme-verte.png', D + 'gout-mangue.png', D + 'gout-melon.png'],
      keywords: [
        {text: 'PRENDS 2 GOÛTS', at: at(w, 'prends'), y: 300, size: 140, color: 'accent', stack: true},
        {text: '= LIVRAISON OFFERTE', at: at(w, 'livraison'), y: 460, size: 110, stack: true},
        {text: 'commande de plus de 5 €', at: at(w, 'offerte'), y: 565, size: 44, small: true, stack: true},
      ],
    },
    {kind: 'cta', from: S6, to: T, arrowAt: at(w, 'panier')},
  ],
};
