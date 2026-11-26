/**
 * Construction compacte d'une vidéo « variante » :
 *  - les scènes n'ont qu'un `from` (le `to` = début de la scène suivante, ou fin de la voix + 0,5 s) ;
 *  - garde-fous : scènes strictement croissantes, mots-clés à l'intérieur de leur scène (sinon erreur explicite,
 *    ce qui attrape le piège des mots répétés « deux », « et », « pour »…) ;
 *  - réactions du présentateur générées automatiquement (choc sur l'accroche, frappe sur les impacts,
 *    présentation à chaque nouvelle scène, panier, petit saut final).
 */
import {at as atWord} from './words';
import type {CharacterCue, Keyword, Scene, Timings, VideoConfig} from '../types';

type R = (word: string, nth?: number) => number;
type KwOpts = Omit<Keyword, 'text' | 'at'>;
export type SceneSpec = Record<string, unknown> & {kind: Scene['kind']; from: number; keywords?: Keyword[]};

export const kw = (text: string, at: number, opts: KwOpts = {}): Keyword => ({text, at, ...opts});

export const variant = (o: {
  id: string;
  timings: Timings;
  accent: string;
  productImage: string;
  productScale?: number;
  jacket?: string;
  format?: VideoConfig['format'];
  priceTag?: VideoConfig['priceTag'];
  /** mot sur lequel le présentateur s'évanouit de bonheur (optionnel) */
  faint?: (r: R) => number;
  build: (r: R) => SceneSpec[];
}): VideoConfig => {
  const w = o.timings.words;
  const r: R = (word, nth = 1) => atWord(w, word, nth);
  const T = o.timings.durationSec + 0.5;
  const specs = o.build(r);
  // règle visuelle n°1 : le premier mot-clé (chiffre / phrase choc) est déjà affiché à l'image 0
  const k0 = specs[0]?.keywords?.[0];
  if (k0) { k0.at = 0; k0.instant = true; }

  const scenes = specs.map((s, i) => ({...s, to: i < specs.length - 1 ? specs[i + 1].from : T})) as unknown as Scene[];
  scenes.forEach((s, i) => {
    if (!(s.to > s.from + 0.4)) throw new Error(`${o.id} : scène ${i + 1} (${s.kind}) trop courte ou dans le désordre (${s.from.toFixed(2)} → ${s.to.toFixed(2)})`);
    for (const k of s.keywords ?? []) {
      if (k.at < s.from - 0.35 || k.at > s.to + 0.05) {
        throw new Error(`${o.id} : mot-clé « ${k.text} » à ${k.at.toFixed(2)} s hors de sa scène ${i + 1} (${s.from.toFixed(2)} → ${s.to.toFixed(2)}) : mauvaise occurrence ?`);
      }
    }
  });

  // réactions automatiques du présentateur
  const cues: CharacterCue[] = [];
  const first = scenes[0].keywords?.[0];
  if (first) cues.push({action: 'shock', at: first.at});
  scenes.forEach((s, i) => {
    if (i > 0) cues.push({action: i % 2 ? 'present' : 'point', at: s.from + 0.15});
    for (const k of s.keywords ?? []) if (k.impact && k !== first) cues.push({action: 'slam', at: k.at});
  });
  if (o.faint) cues.push({action: 'faint', at: o.faint(r), duration: 0.8});
  const panier = w.find((x) => x.word.toLowerCase().startsWith('panier'));
  if (panier) cues.push({action: 'present', at: panier.start});
  cues.push({action: 'hop', at: w[w.length - 1].start});
  cues.sort((a, b) => a.at - b.at);
  const clean = cues.filter((c, i) => i === 0 || c.at - cues[i - 1].at > 0.6 || c.action === 'faint');

  return {
    id: o.id,
    version: 1,
    format: o.format ?? 'prix-choc',
    accent: o.accent,
    productImage: o.productImage,
    productScale: o.productScale,
    priceTag: o.priceTag,
    voice: `videos/${o.id}/voice.mp3`,
    music: `videos/${o.id}/music.wav`,
    timings: o.timings,
    character: {cues: clean, jacket: o.jacket},
    scenes,
  };
};

export const JACKETS = ['#FF2E88', '#2E7BFF', '#FFB800'] as const;
export const WARN_CAFEINE = 'Contient de la caféine (100 mg/sachet).\nDéconseillé aux enfants et aux femmes\nenceintes ou allaitantes.';
export const WARN_NUCLEVER = "Déconseillé aux femmes enceintes ou allaitantes et aux enfants.\nVoir précautions d'emploi sur l'emballage.";
export const WARN_COMPLEMENT = "Complément alimentaire. Ne remplace pas une alimentation variée et équilibrée.\nVoir précautions d'emploi sur l'emballage.";
