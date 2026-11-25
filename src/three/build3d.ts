import {at as atWord} from '../lib/words';
import type {Timings, CharacterCue} from '../types';
import type {Shot3D, Video3DConfig} from './Video3D';
import type {Problem3D} from './Studio3D';

/** [mot repère, occurrence, texte, pastille?, options?] */
export type S = [string, number, string, string?, Partial<Shot3D>?];

export const build3d = (o: {
  id: string; timings: Timings; accent: string; pillColor?: string; productImage: string; productHeight?: number;
  problem: Problem3D; jacket?: string; shots: S[];
  price: {word: string; nth?: number; now: string; old?: string; pills: string[]}; click?: string;
}): Video3DConfig => {
  const w = o.timings.words;
  const r = (word: string, nth = 1) => atWord(w, word, nth);
  const shots: Shot3D[] = o.shots.map(([word, nth, text, pill, opt], i) => ({at: i === 0 ? 0 : r(word, nth) - 0.05, text, pill, ...(opt ?? {})}));
  shots.forEach((s, i) => {
    if (i > 0 && !(s.at > shots[i - 1].at + 0.3)) throw new Error(`${o.id} : plan ${i + 1} « ${s.text} » trop proche ou dans le désordre (${s.at.toFixed(2)} s)`);
  });
  const priceAt = r(o.price.word, o.price.nth ?? 1) - 0.05;
  const clickAt = r(o.click ?? 'Clique') - 0.05;
  if (!(priceAt > shots[shots.length - 1].at + 0.3 && clickAt > priceAt + 0.5)) throw new Error(`${o.id} : prix / clique dans le désordre`);
  const cues: CharacterCue[] = [{action: 'present', at: shots[1]?.at ?? 1}, {action: 'shock', at: priceAt}, {action: 'point', at: clickAt}, {action: 'hop', at: clickAt + 1.2}];
  shots.forEach((s, i) => { if (i > 1 && i % 3 === 0) cues.push({action: i % 2 ? 'present' : 'point', at: s.at + 0.1}); });
  cues.sort((a, b) => a.at - b.at);
  return {
    id: o.id, accent: o.accent, pillColor: o.pillColor, productImage: o.productImage, productHeight: o.productHeight,
    problem: o.problem, voice: `videos/${o.id}/voice.mp3`, music: `videos/${o.id}/music.wav`, timings: o.timings,
    shots, price: {at: priceAt, now: o.price.now, old: o.price.old, pills: o.price.pills}, clickAt, jacket: o.jacket, cues,
  };
};
