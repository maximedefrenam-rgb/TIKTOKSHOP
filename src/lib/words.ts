import type {Word} from '../types';

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9']/g, '');

/**
 * Début (en s) de la n-ième occurrence d'un mot dans la voix.
 * Ex. : at(timings.words, 'creatine') ou at(timings.words, 'dose', 2).
 * Lève une erreur si le mot est absent, pour ne jamais caler une anim au hasard.
 */
export const at = (words: Word[], query: string, nth = 1, which: 'start' | 'end' = 'start'): number => {
  const q = normalize(query);
  let count = 0;
  for (const w of words) {
    const n = normalize(w.word);
    if (n === q || n.startsWith(q + "'") || (!q.includes("'") && n.endsWith("'" + q))) {
      count++;
      if (count === nth) return w[which];
    }
  }
  throw new Error(`Mot « ${query} » (occurrence ${nth}) introuvable dans les timings`);
};

export const end = (words: Word[], query: string, nth = 1) => at(words, query, nth, 'end');
