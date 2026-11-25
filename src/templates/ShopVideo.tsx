import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {BRAND} from '../brand';
import {Background, Grain} from '../components/Background';
import {CameraShake, SceneWrap, type TransitionKind} from '../components/Camera';
import {AudioLayer} from '../components/AudioLayer';
import {Character} from '../components/Character';
import {
  HookScene, PriceScene, MythScene, CutawayScene, CompareScene, BenefitScene, CtaScene,
} from '../components/Scenes';
import {DosesScene, MuscleScene, PowerScene, FlavorsScene, DealScene, UsageScene, BeforeAfterScene, ReviewsScene} from '../components/Scenes2';
import {impactTimes} from '../lib/sfx';
import {s2f} from '../lib/anim';
import type {Scene, VideoConfig} from '../types';

const renderScene = (scene: Scene, cfg: VideoConfig, offset: number) => {
  switch (scene.kind) {
    case 'hook': return <HookScene scene={scene} cfg={cfg} offset={offset} />;
    case 'price': return <PriceScene scene={scene} cfg={cfg} offset={offset} />;
    case 'myth': return <MythScene scene={scene} cfg={cfg} offset={offset} />;
    case 'cutaway': return <CutawayScene scene={scene} cfg={cfg} offset={offset} />;
    case 'compare': return <CompareScene scene={scene} cfg={cfg} offset={offset} />;
    case 'benefit': return <BenefitScene scene={scene} cfg={cfg} offset={offset} />;
    case 'cta': return <CtaScene scene={scene} cfg={cfg} offset={offset} />;
    case 'doses': return <DosesScene scene={scene} cfg={cfg} offset={offset} />;
    case 'muscle': return <MuscleScene scene={scene} cfg={cfg} offset={offset} />;
    case 'power': return <PowerScene scene={scene} cfg={cfg} offset={offset} />;
    case 'flavors': return <FlavorsScene scene={scene} cfg={cfg} offset={offset} />;
    case 'deal': return <DealScene scene={scene} cfg={cfg} offset={offset} />;
    case 'usage': return <UsageScene scene={scene} cfg={cfg} offset={offset} />;
    case 'beforeAfter': return <BeforeAfterScene scene={scene} cfg={cfg} offset={offset} />;
    case 'reviews': return <ReviewsScene scene={scene} cfg={cfg} offset={offset} />;
  }
};

const transitionOf = (scenes: Scene[], i: number): TransitionKind => {
  if (i <= 0 || i >= scenes.length) return 'none';
  return scenes[i].transition ?? (i % 2 ? 'whip' : 'zoom');
};

/** Modèle réutilisable de toutes les vidéos du compte. */
export const ShopVideo: React.FC<{config: VideoConfig}> = ({config: cfg}) => {
  const {durationInFrames} = useVideoConfig();
  const T = BRAND.transitionFrames;
  const half = Math.floor(T / 2);
  return (
    <AbsoluteFill style={{backgroundColor: BRAND.colors.bg, overflow: 'hidden'}}>
      <Background accent={cfg.accent} />
      <CameraShake impacts={impactTimes(cfg)}>
        {cfg.scenes.map((scene, i) => {
          const last = i === cfg.scenes.length - 1;
          const enter = transitionOf(cfg.scenes, i);
          const exit = transitionOf(cfg.scenes, i + 1);
          const start = Math.max(0, s2f(scene.from) - (enter !== 'none' ? half : 0));
          const stop = last ? durationInFrames : s2f(scene.to) + (exit !== 'none' ? T - half : 0);
          const dur = Math.max(1, stop - start);
          return (
            <Sequence key={i} from={start} durationInFrames={dur} name={`${i + 1}. ${scene.kind}`}>
              <SceneFrame start={start} dur={dur} T={T} enter={enter} exit={last ? 'none' : exit}>
                {renderScene(scene, cfg, start)}
              </SceneFrame>
            </Sequence>
          );
        })}
        {cfg.character && <Host cfg={cfg} />}
      </CameraShake>
      <Grain />
      <AudioLayer cfg={cfg} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};

const SceneFrame: React.FC<{start: number; dur: number; T: number; enter: TransitionKind; exit: TransitionKind; children: React.ReactNode}> = ({
  dur, T, enter, exit, children,
}) => {
  const frame = useCurrentFrame();
  return <SceneWrap frame={frame} duration={dur} T={T} enter={enter} exit={exit}>{children}</SceneWrap>;
};

/** Le présentateur reste à l'écran d'une scène à l'autre (en bas à gauche) et s'éclipse si demandé. */
const Host: React.FC<{cfg: VideoConfig}> = ({cfg}) => {
  const frame = useCurrentFrame();
  const ch = cfg.character!;
  const hidden = ch.hiddenInScenes ?? [];
  // visibilité lissée : sortie / entrée par la gauche
  let vis = 1;
  cfg.scenes.forEach((s, i) => {
    const f0 = s2f(s.from), f1 = s2f(s.to);
    if (hidden.includes(i) && frame >= f0 - 4 && frame <= f1 + 4) {
      vis = Math.min(vis, Math.max(Math.min(1, (f0 + 4 - frame) / 8), Math.min(1, (frame - f1 + 4) / 8)));
    }
  });
  if (vis <= 0.01) return null;
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translateX(${(1 - vis) * -520}px)`}}>
      <Character cues={ch.cues} words={cfg.timings.words} x={215} y={1905} scale={0.68} jacket={ch.jacket} enterAt={2} />
    </div>
  );
};

export const durationFrames = (cfg: VideoConfig) =>
  Math.ceil((cfg.timings.durationSec + BRAND.video.tailSec) * BRAND.video.fps);
