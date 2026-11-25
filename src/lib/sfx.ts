import {BRAND} from '../brand';
import type {SfxCue, VideoConfig} from '../types';

const clampVol = (v: number) => Math.min(BRAND.mix.sfxMax, Math.max(BRAND.mix.sfxMin, v));

/** Effets automatiques déduits des scènes + effets manuels, dédoublonnés. */
export const buildSfx = (cfg: VideoConfig): SfxCue[] => {
  const cues: SfxCue[] = [];
  const tr = BRAND.transitionFrames / BRAND.video.fps;
  if (cfg.autoSfx !== false) {
    cfg.scenes.forEach((s, i) => {
      if (i > 0 && s.transition !== 'none') cues.push({name: 'whoosh', at: s.from - tr * 0.75, volume: 0.4});
      for (const k of s.keywords ?? []) {
        cues.push(k.impact ? {name: 'impact', at: k.at, volume: 0.5} : {name: 'pop', at: k.at, volume: 0.32});
      }
      switch (s.kind) {
        case 'hook':
          cues.push({name: 'impact', at: Math.max(0, s.from + 0.05), volume: 0.5});
          break;
        case 'price':
          cues.push({name: 'pop', at: s.priceAt, volume: 0.35});
          cues.push({name: 'tick', at: s.dividerAt, volume: 0.4});
          cues.push({name: 'ding', at: s.resultAt, volume: 0.5});
          break;
        case 'myth':
          cues.push({name: 'impact', at: s.crossAt, volume: 0.55});
          break;
        case 'cutaway':
          cues.push({name: 'riser', at: Math.max(s.from, s.openAt - 1.55), volume: 0.32});
          cues.push({name: 'impact', at: s.openAt, volume: 0.5});
          s.items.forEach((it) => cues.push({name: 'pop', at: it.at, volume: 0.35}));
          break;
        case 'compare':
          s.rows.forEach((r, j) => cues.push({name: 'tick', at: r.at ?? s.at + j * 0.25, volume: 0.4}));
          break;
        case 'doses':
          cues.push({name: 'tick', at: s.weightAt, volume: 0.4});
          cues.push({name: 'ding', at: s.priceAt, volume: 0.4});
          cues.push({name: 'tick', at: s.divideAt, volume: 0.4});
          cues.push({name: 'riser', at: Math.max(s.from, s.resultAt - 1.55), volume: 0.3});
          cues.push({name: 'impact', at: s.resultAt, volume: 0.5});
          for (let k = 0; k < 6; k++) cues.push({name: 'pop', at: s.resultAt + 0.2 + k * 0.22, volume: 0.3});
          break;
        case 'muscle':
          for (let k = 0; k < 4; k++) cues.push({name: 'pop', at: s.waterAt + k * 0.2, volume: 0.3});
          cues.push({name: 'whoosh', at: s.inMuscleAt - 0.1, volume: 0.35});
          s.syllables.forEach((y, k) => cues.push(k === s.syllables.length - 1 ? {name: 'impact', at: y.at, volume: 0.5} : {name: 'tick', at: y.at, volume: 0.45}));
          cues.push({name: 'impact', at: s.fatCrossAt, volume: 0.5});
          break;
        case 'power':
          cues.push({name: 'riser', at: Math.max(s.from, s.fillTo - 1.6), volume: 0.35});
          cues.push({name: 'ding', at: s.fillTo, volume: 0.45});
          s.dumbbells.forEach((t) => cues.push({name: 'pop', at: t, volume: 0.4}));
          if (s.snowAt !== undefined) cues.push({name: 'ding', at: s.snowAt, volume: 0.3});
          break;
        case 'flavors':
          s.images.slice(0, 4).forEach((_, k) => cues.push({name: 'whoosh', at: s.spreadAt + k * 0.1, volume: 0.3}));
          break;
        case 'deal':
          cues.push({name: 'pop', at: s.badgeAt, volume: 0.4});
          cues.push({name: 'impact', at: s.strikeAt, volume: 0.5});
          cues.push({name: 'ding', at: s.newAt, volume: 0.5});
          break;
        case 'usage':
          cues.push({name: 'pop', at: s.leftAt, volume: 0.4});
          cues.push({name: 'pop', at: s.rightAt, volume: 0.4});
          if (s.crossAt !== undefined) cues.push({name: 'impact', at: s.crossAt, volume: 0.5});
          break;
        case 'beforeAfter':
          if (s.stopAt !== undefined) cues.push({name: 'impact', at: s.stopAt, volume: 0.5});
          if (s.revealAt !== undefined) { cues.push({name: 'whoosh', at: s.revealAt - 0.1, volume: 0.4}); cues.push({name: 'ding', at: s.revealAt + 0.45, volume: 0.4}); }
          break;
        case 'reviews':
          cues.push({name: 'pop', at: s.ratingAt, volume: 0.4});
          cues.push({name: 'tick', at: s.soldAt, volume: 0.4});
          if (s.rankAt !== undefined) cues.push({name: 'ding', at: s.rankAt, volume: 0.4});
          break;
        case 'cta':
          cues.push({name: 'ding', at: s.arrowAt ?? s.from + 0.3, volume: 0.4});
          break;
      }
    });
  }
  if (cfg.autoSfx !== false) {
    for (const c of cfg.character?.cues ?? []) {
      if (c.action === 'slam') cues.push({name: 'impact', at: c.at + 0.13, volume: 0.55});
      if (c.action === 'shock') cues.push({name: 'pop', at: c.at, volume: 0.45});
      if (c.action === 'faint') cues.push({name: 'ding', at: c.at + 0.2, volume: 0.3});
    }
  }
  cues.push(...(cfg.sfx ?? []));
  const sorted = cues
    .filter((c) => c.at >= 0 && c.at < cfg.timings.durationSec + BRAND.video.tailSec)
    .map((c) => ({...c, volume: clampVol(c.volume ?? 0.4)}))
    .sort((a, b) => a.at - b.at);
  // un même effet à moins de 0,12 s d'intervalle = doublon ; et un pop sur un impact est inutile
  return sorted.filter((c, i) => {
    return !sorted.some(
      (o, j) =>
        j !== i &&
        Math.abs(o.at - c.at) < 0.12 &&
        ((o.name === c.name && j < i) || (c.name === 'pop' && (o.name === 'impact' || o.name === 'ding'))),
    );
  });
};

/** Instants des impacts → secousse de caméra. */
export const impactTimes = (cfg: VideoConfig): number[] =>
  buildSfx(cfg)
    .filter((c) => c.name === 'impact')
    .map((c) => c.at);
