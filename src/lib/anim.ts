import {spring, interpolate, Easing} from 'remotion';
import {BRAND} from '../brand';

/** Spring maison : énergique avec un léger dépassement. */
export const POP = {damping: 11, stiffness: 170, mass: 0.7} as const;
export const SNAP = {damping: 14, stiffness: 260, mass: 0.5} as const;

type SpringCfg = {damping: number; stiffness: number; mass: number};
export const sp = (frame: number, startFrame: number, config: SpringCfg = POP) =>
  spring({frame: frame - startFrame, fps: BRAND.video.fps, config});

export const s2f = (s: number) => Math.round(s * BRAND.video.fps);

export const lin = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const easeOut = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const resolveColor = (c: 'accent' | 'white' | 'alert' | undefined, accent: string) =>
  c === 'alert' ? BRAND.colors.alert : c === 'white' ? BRAND.colors.text : c === 'accent' ? accent : BRAND.colors.text;

/** Hash déterministe → [0,1) */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
