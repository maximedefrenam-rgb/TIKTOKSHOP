import React, {useMemo} from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {BRAND} from '../brand';
import {buildSfx} from '../lib/sfx';
import {s2f} from '../lib/anim';
import type {VideoConfig} from '../types';

/** Voix à 1, musique ~0,12 baissée à 0,07 quand la voix parle, effets 0,3–0,6. */
export const AudioLayer: React.FC<{cfg: VideoConfig; durationInFrames: number}> = ({cfg, durationInFrames}) => {
  const musicVol = useMemo(() => {
    const fps = BRAND.video.fps;
    const out: number[] = [];
    let v: number = BRAND.mix.music;
    for (let f = 0; f < durationInFrames; f++) {
      const t = f / fps;
      const speaking = cfg.timings.words.some((w) => t >= w.start - 0.1 && t <= w.end + 0.2);
      const target = speaking ? BRAND.mix.musicDucked : BRAND.mix.music;
      v += (target - v) * (target < v ? 0.35 : 0.12); // attaque rapide, relâche douce
      out.push(v);
    }
    return out;
  }, [cfg, durationInFrames]);

  const sfx = useMemo(() => buildSfx(cfg), [cfg]);

  return (
    <>
      <Audio src={staticFile(cfg.voice)} volume={BRAND.mix.voice} />
      <Audio src={staticFile(cfg.music)} volume={(f) => musicVol[Math.min(f, musicVol.length - 1)] ?? BRAND.mix.music} />
      {sfx.map((c, i) => (
        <Sequence key={i} from={s2f(c.at)} layout="none">
          <Audio src={staticFile(`sfx/${c.name}.wav`)} volume={c.volume} />
        </Sequence>
      ))}
    </>
  );
};
