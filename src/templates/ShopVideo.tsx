import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {BRAND} from '../brand';
import {Background, Grain} from '../components/Background';
import {CameraShake, SceneWrap, type TransitionKind} from '../components/Camera';
import {AudioLayer} from '../components/AudioLayer';
import {Character} from '../components/Character';
import {ProductLift} from '../components/Product';
import {
  HookScene, PriceScene, MythScene, CutawayScene, CompareScene, BenefitScene, CtaScene,
} from '../components/Scenes';
import {DosesScene, MuscleScene, PowerScene, FlavorsScene, DealScene, UsageScene, BeforeAfterScene, ReviewsScene, PhotoScene} from '../components/Scenes2';
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
    case 'photo': return <PhotoScene scene={scene} cfg={cfg} offset={offset} />;
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
    <ProductLift.Provider value={cfg.priceTag ? 75 : 0}>
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
        {cfg.priceTag && <PriceTag cfg={cfg} />}
        {cfg.character && <Host cfg={cfg} />}
      </CameraShake>
      <Grain />
      <AudioLayer cfg={cfg} durationInFrames={durationInFrames} />
    </AbsoluteFill>
    </ProductLift.Provider>
  );
};

const SceneFrame: React.FC<{start: number; dur: number; T: number; enter: TransitionKind; exit: TransitionKind; children: React.ReactNode}> = ({
  dur, T, enter, exit, children,
}) => {
  const frame = useCurrentFrame();
  return <SceneWrap frame={frame} duration={dur} T={T} enter={enter} exit={exit}>{children}</SceneWrap>;
};

/** Pastille de prix permanente (sous le produit, hors des 250 px du bas et des 150 px de droite). */
const PriceTag: React.FC<{cfg: VideoConfig}> = ({cfg}) => {
  const frame = useCurrentFrame();
  const tag = cfg.priceTag!;
  const hideIn = tag.hideIn ?? ['price', 'deal', 'cta', 'reviews', 'cutaway', 'photo', 'doses', 'compare'];
  let vis = 1;
  cfg.scenes.forEach((s) => {
    if (!hideIn.includes(s.kind)) return;
    const f0 = s2f(s.from), f1 = s2f(s.to);
    if (frame >= f0 - 5 && frame <= f1 + 5) vis = Math.min(vis, Math.max(Math.min(1, (f0 - frame) / 5), Math.min(1, (frame - f1) / 5)));
  });
  vis = Math.max(0, vis);
  if (vis <= 0.01) return null;
  const pop = frame < 2 ? 1 : 1 + Math.max(0, 1 - Math.abs(frame - 10) / 6) * 0.08;
  return (
    <div style={{position: 'absolute', left: 690, top: 1622, transform: `translate(-50%, -50%) rotate(-3deg) scale(${vis * pop})`, opacity: vis,
      background: cfg.accent, borderRadius: 22, padding: '4px 26px 6px', border: '5px solid #0B0B0F', boxShadow: `0 12px 40px rgba(0,0,0,0.7), 0 0 30px ${cfg.accent}66`,
      textAlign: 'center', whiteSpace: 'nowrap', maxWidth: 470}}>
      <div style={{fontFamily: BRAND.fonts.title, fontSize: Math.min(54, 400 / (tag.text.length * 0.5)), lineHeight: 1.05, color: '#0B0B0F'}}>{tag.text}</div>
      {tag.sub && <div style={{fontFamily: BRAND.fonts.body, fontWeight: 800, fontSize: Math.min(28, 400 / (tag.sub.length * 0.6)), lineHeight: 1.1, color: '#0B0B0F'}}>{tag.sub}</div>}
    </div>
  );
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
