import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {s2f} from '../lib/anim';

/** Petite secousse de caméra sur les impacts (amortie en ~10 images). */
export const CameraShake: React.FC<{impacts: number[]; children: React.ReactNode}> = ({impacts, children}) => {
  const frame = useCurrentFrame();
  let x = 0, y = 0, r = 0, s = 1;
  impacts.forEach((t, i) => {
    const d = frame - s2f(t);
    if (d < 0 || d > 10) return;
    const amp = Math.pow(1 - d / 10, 2);
    x += 20 * amp * noise2D('sx' + i, frame * 0.8, 0);
    y += 20 * amp * noise2D('sy' + i, frame * 0.8, 5);
    r += 0.7 * amp * noise2D('sr' + i, frame * 0.8, 9);
    s += 0.035 * amp;
  });
  return <AbsoluteFill style={{transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`}}>{children}</AbsoluteFill>;
};

export type TransitionKind = 'whip' | 'zoom' | 'none';

/** Entrée / sortie de scène : whip pan ou zoom traversant (T images, 6 à 10). */
export const SceneWrap: React.FC<{
  frame: number; duration: number; T: number; enter: TransitionKind; exit: TransitionKind; children: React.ReactNode;
}> = ({frame, duration, T, enter, exit, children}) => {
  let tx = 0, sc = 1, op = 1, blur = 0;
  if (enter !== 'none' && frame < T) {
    const p = frame / T;
    const e = 1 - Math.pow(1 - p, 3);
    if (enter === 'whip') { tx += (1 - e) * 1150; blur += (1 - e) * 28; }
    else { sc *= 0.55 + 0.45 * e; op *= Math.min(1, p * 1.6); blur += (1 - e) * 14; }
  }
  if (exit !== 'none' && frame > duration - T) {
    const p = Math.min(1, (frame - (duration - T)) / T);
    const e = p * p * p;
    if (exit === 'whip') { tx -= e * 1150; blur += e * 28; }
    else { sc *= 1 + e * 2.8; op *= 1 - e; blur += e * 12; }
  }
  return (
    <AbsoluteFill style={{transform: `translateX(${tx}px) scale(${sc})`, opacity: op, filter: blur > 0.5 ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};
