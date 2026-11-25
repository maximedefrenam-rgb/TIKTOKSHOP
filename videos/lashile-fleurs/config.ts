/**
 * Lashilé Good Hair — vidéo A « Fleurs » (cadeau de Noël pour sa meuf). Voix : prise 1, 26,1 s.
 * Promesses : uniquement celles de la fiche / de l'emballage (N°1 des ventes, pousse & fortification, cheveux sublimes,
 * étude clinique de la marque avec ses conditions).
 */
import timings from '../../public/videos/lashile-fleurs/timings.json';
import {at} from '../../src/lib/words';
import type {VideoConfig} from '../../src/types';

const w = timings.words;
const T = timings.durationSec + 0.5;
const D = 'videos/lashile-fleurs/';

const S1 = at(w, 'Offre-lui') - 0.08;
const S2 = at(w, 'biotine') - 0.08;
const S3 = at(w, 'et', 3) - 0.08;
const S4 = at(w, 'bonbons') - 0.2; // « des » apparaît 6 fois : on cale sur « bonbons »

export const config: VideoConfig = {
  id: 'lashile-fleurs',
  version: 1,
  format: 'idee-recue',
  accent: '#F95259',
  productImage: D + 'produit.png',
  voice: D + 'voice.mp3',
  music: D + 'music.wav',
  timings,
  character: {
    cues: [
      {action: 'slam', at: at(w, 'crèvent')},
      {action: 'present', at: at(w, 'Offre-lui')},
      {action: 'faint', at: at(w, 'SUBLIMES'), duration: 0.8},
      {action: 'point', at: at(w, 'biotine')},
      {action: 'shock', at: at(w, 'plus')},
      {action: 'slam', at: at(w, 'moins')},
      {action: 'hop', at: at(w, 'kiffer')},
      {action: 'present', at: at(w, 'panier')},
      {action: 'hop', at: at(w, 'FONCE')},
    ],
  },
  scenes: [
    {
      kind: 'myth', from: 0, to: S1, statement: 'DES FLEURS\nPOUR TA MEUF ?', crossAt: at(w, 'crèvent'), verdict: 'STOP',
      keywords: [{text: 'ÇA CRÈVE EN 3 JOURS', at: at(w, 'trois'), y: 830, size: 85, color: 'accent', stack: true}],
    },
    {
      kind: 'benefit', from: S1, to: S2,
      keywords: [
        {text: 'OFFRE-LUI ÇA', at: at(w, 'Offre-lui'), y: 280, size: 140, color: 'accent', stack: true},
        {text: 'N°1 DES VENTES\nEN FRANCE', at: at(w, 'numéro'), y: 470, size: 105, stack: true},
        {text: 'CHEVEUX SUBLIMES', at: at(w, 'SUBLIMES'), y: 650, size: 95, color: 'accent', stack: true},
      ],
    },
    {
      kind: 'cutaway', from: S2, to: S3, openAt: at(w, 'biotine'),
      items: [
        {label: 'BIOTINE', at: at(w, 'biotine')},
        {label: 'ZINC', at: at(w, 'zinc')},
        {label: 'VITAMINE B6', at: at(w, 'vitamine')},
        {label: 'PRÊLE', at: at(w, 'prêle')},
      ],
      keywords: [{text: 'POUSSE & FORTIFICATION', at: at(w, 'pousse'), y: 810, size: 80, color: 'accent', stack: true}],
    },
    {
      kind: 'compare', from: S3, to: S4, title: 'ÉTUDE CLINIQUE · 84 JOURS', at: at(w, 'plus'),
      rows: [
        {label: 'Volume (constaté chez 55 % des utilisatrices)', value: 20, display: '+20 %', highlight: true, at: at(w, 'plus')},
        {label: 'Fourches (constaté chez 90 % des utilisatrices)', value: 37, display: '-37 %', highlight: true, at: at(w, 'moins')},
      ],
    },
    {
      kind: 'cta', from: S4, to: T, arrowAt: at(w, 'panier'),
      keywords: [
        {text: 'BONBONS VÉGANES\nTROP BONS', at: at(w, 'bonbons'), y: 500, size: 100, color: 'accent'},
        {text: 'NOËL DANS 1 MOIS\n24,90 €', at: at(w, 'Noël'), y: 500, size: 110, color: 'accent'},
      ],
    },
  ],
};
