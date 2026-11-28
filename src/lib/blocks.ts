/**
 * Vidéo construite par « blocs » : chaque bloc = un morceau de voix + la scène qui démarre sur son premier mot.
 * Les ancres a('mot') cherchent le mot DANS le bloc (l'occurrence globale est calculée automatiquement) :
 * plus de piège des mots répétés (« deux », « et », « le »…).
 */
import {normalize} from './words';
import {variant, type SceneSpec} from './variant';
import type {VideoConfig} from '../types';

export type Anchor = (word: string, n?: number) => number;
export type SceneFn = (a: Anchor, t0: number) => Record<string, unknown>;
export type Block = {say: string; scene?: SceneFn};

const strip = (s: string) => s.replace(/\[[^\]]*\]/g, ' ');
const toks = (s: string) => strip(s).split(/\s+/).filter((t) => normalize(t));
const hit = (n: string, q: string) => n === q || n.startsWith(q + "'") || (!q.includes("'") && n.endsWith("'" + q));

/** Texte complet envoyé à ElevenLabs. */
export const sayOf = (blocks: Block[]) => blocks.map((b) => b.say.trim()).join(' ');

type Opts = Omit<Parameters<typeof variant>[0], 'build'> & {blocks: Block[]};
export const fromBlocks = ({blocks, ...rest}: Opts): VideoConfig =>
  variant({
    ...rest,
    build: (r) => {
      const seen: string[] = [];
      const specs: SceneSpec[] = [];
      blocks.forEach((b, i) => {
        const before = [...seen];
        const a: Anchor = (word, n = 1) => {
          const q = normalize(word);
          return r(word, before.filter((t) => hit(t, q)).length + n);
        };
        const bt = toks(b.say);
        const t0 = i === 0 ? 0 : a(bt[0]);
        if (b.scene) {
          const s = b.scene(a, t0);
          specs.push({...s, from: (s.from as number | undefined) ?? (i === 0 ? 0 : t0 - 0.08)} as SceneSpec);
        }
        seen.push(...bt.map(normalize));
      });
      return specs;
    },
  });
