/**
 * ZAP cerise noire DUO — vidéo n°3 « Crevé » (interpellation → caféine vs expresso → énergie façon pub → en coupe → promo).
 * Voix : prise 1 (Creative), resserrée à 22,8 s. Sans aucun mot lié au tabac (restriction de la vidéo « snus »).
 */
import timings from '../../public/videos/zap-creve/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/zap-creve/';

const S1 = at(w, 'Un') - 0.08;
const S2 = at(w, "l'énergie") - 0.08;
const S3 = at(w, 'Elle-théanine') - 0.08;
const S4 = at(w, 'Et', 3) - 0.08;
const S5 = at(w, 'panier') - 0.08;

export const config: VideoConfig = {
  id: 'zap-creve',
  version: 1,
  format: 'comparatif',
  accent: '#F0465A',
  productImage: D + 'produit.png',
  productScale: 0.74,
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'slam', at: at(w, 'Bordel')},
      {action: 'faint', at: at(w, 'crevé'), duration: 0.6},
      {action: 'shock', at: at(w, 'skip')},
      {action: 'present', at: at(w, 'ZAP')},
      {action: 'point', at: at(w, 'plus')},
      {action: 'hop', at: at(w, "l'énergie")},
      {action: 'hop', at: at(w, 'partout')},
      {action: 'present', at: at(w, 'Elle-théanine')},
      {action: 'slam', at: at(w, 'moins')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'hook', from: 0, to: S1,
      keywords: [
        {text: 'BORDEL !', at: at(w, 'Bordel'), until: at(w, 'crevé') - 0.04, y: 300, size: 200, color: 'alert', impact: true},
        {text: 'TOUJOURS CREVÉ ?', at: at(w, 'crevé'), y: 300, size: 140, stack: true},
        {text: 'TU TE B.R. AU TAF ?', at: at(w, 'B'), y: 470, size: 110, color: 'accent', stack: true},
        {text: 'TU SKIP LA SALLE ?', at: at(w, 'skip'), y: 600, size: 100, stack: true},
      ],
    },
    {
      kind: 'compare', from: S1, to: S2, title: '100 MG DE CAFÉINE', at: at(w, 'cent'),
      rows: [
        {label: 'Un expresso (≈ 80 mg)', value: 80, display: '80 MG', at: at(w, 'plus')},
        {label: '1 sachet ZAP', value: 100, display: '100 MG', highlight: true, at: at(w, 'cent')},
      ],
      keywords: [{text: 'SOUS LA LÈVRE', at: at(w, 'sous'), y: 1010, size: 90, color: 'accent', stack: true}],
    },
    {
      kind: 'power', from: S2, to: S3,
      fillFrom: at(w, "l'énergie"), fillTo: at(w, 'zone'),
      dumbbells: [at(w, 'taf', 2), at(w, 'salle', 2), at(w, 'partout')],
      keywords: [
        {text: "L'ÉNERGIE\nQUI MONTE", at: at(w, "l'énergie"), y: 270, size: 150, color: 'accent', stack: true},
        {text: 'DANS TA ZONE', at: at(w, 'zone'), y: 560, size: 100, stack: true},
        {text: 'AU TAF · À LA SALLE · PARTOUT', at: at(w, 'taf', 2), y: 960, size: 70, stack: true},
      ],
    },
    {
      kind: 'cutaway', from: S3, to: S4, openAt: at(w, 'Elle-théanine'),
      items: [
        {label: 'L-THÉANINE', at: at(w, 'Elle-théanine')},
        {label: 'VITAMINES B', at: at(w, 'vitamines')},
        {label: 'GOÛT', sub: 'cerise noire', at: at(w, 'goût')},
      ],
      keywords: [{text: 'DISCRET, PERSONNE NE CAPTE', at: at(w, 'discret'), y: 760, size: 75, color: 'accent', stack: true}],
    },
    {
      kind: 'price', from: S4, to: S5, price: 10.16, doses: 36, unitLabel: 'LE SACHET', divLabel: 'SACHETS',
      priceAt: at(w, 'Black'), dividerAt: at(w, 'Friday'), resultAt: at(w, 'vingt-huit'),
      keywords: [
        {text: 'BLACK FRIDAY', at: at(w, 'Black'), y: 200, size: 100, color: 'accent'},
        {text: '-32 %', at: at(w, 'moins'), y: 200, size: 110, color: 'alert'},
        {text: 'LIVRAISON GRATUITE', at: at(w, 'livraison'), y: 200, size: 100},
      ],
    },
    {
      kind: 'cta', from: S5, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: '36 SACHETS = 10,16 €', at: S5, y: 500, size: 110, color: 'accent', stack: true},
        {text: 'Contient de la caféine (100 mg/sachet).\nDéconseillé aux enfants et aux femmes\nenceintes ou allaitantes.',
          at: S5, y: 645, size: 34, small: true, stack: true},
      ],
    },
  ],
};
