/**
 * DÉMO INTERNE du modèle (produit factice, voix muette, timings simulés).
 * Sert uniquement à tester ShopVideo.tsx — ne jamais publier.
 * Utilise les 7 types de scènes pour servir d'exemple aux vraies vidéos.
 */
import timings from '../../public/videos/demo-modele/timings.json';
import {at, end} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;

export const config: VideoConfig = {
  id: 'demo-modele',
  version: 1,
  format: 'idee-recue',
  accent: '#FFD60A',
  productImage: 'videos/demo-modele/produit.svg',
  voice: 'videos/demo-modele/voice.mp3',
  music: 'videos/demo-modele/music.wav',
  timings,
  character: {
    cues: [
      {action: 'shock', at: at(w, 'grossir')},
      {action: 'slam', at: at(w, 'Faux')},
      {action: 'shock', at: at(w, 'centimes')},
      {action: 'point', at: at(w, 'Dedans')},
      {action: 'faint', at: at(w, 'performance')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'fonce')},
    ],
  },
  scenes: [
    {kind: 'hook', from: 0, to: at(w, 'Faux'),
      keywords: [{text: 'LA CRÉATINE', at: at(w, 'La')}, {text: 'ÇA FAIT GROSSIR ?', at: at(w, 'grossir'), color: 'accent'}]},
    {kind: 'myth', from: at(w, 'Faux'), to: at(w, 'Trente'), statement: 'ÇA FAIT GROSSIR', crossAt: at(w, 'Faux') + 0.2},
    {kind: 'price', from: at(w, 'Trente'), to: at(w, 'Dedans'), price: 30, doses: 100,
      priceAt: at(w, 'euros'), dividerAt: at(w, 'cent'), resultAt: at(w, 'centimes')},
    {kind: 'cutaway', from: at(w, 'Dedans'), to: at(w, 'augmente'), openAt: at(w, 'Dedans') + 0.4,
      items: [{label: '3 G', sub: 'de créatine', at: at(w, 'trois')}, {label: '100 %', sub: 'pure', at: at(w, 'pure')}],
      keywords: [{text: "RIEN D'AUTRE", at: at(w, 'rien'), color: 'white', size: 110}]},
    {kind: 'compare', from: at(w, 'augmente'), to: at(w, 'courts'), title: 'PRIX / DOSE', at: at(w, 'augmente') + 0.2,
      rows: [{label: 'Moyenne du marché', value: 0.45, display: '0,45 €'}, {label: 'Ce produit', value: 0.3, display: '0,30 €', highlight: true}]},
    {kind: 'benefit', from: at(w, 'courts'), to: at(w, 'Le'),
      keywords: [{text: 'PERFORMANCE', at: at(w, 'courts'), color: 'accent', stack: true}, {text: 'EFFORTS COURTS\n& INTENSES', at: at(w, 'intenses'), size: 110, stack: true}]},
    {kind: 'cta', from: at(w, 'Le'), to: timings.durationSec + 0.5, arrowAt: at(w, 'panier'),
      keywords: [{text: 'FONCE', at: at(w, 'fonce'), color: 'accent', impact: true, y: 560}]},
  ],
};
