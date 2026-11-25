import React, {Suspense} from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadMont} from '@remotion/google-fonts/Montserrat';
import {Studio3D, type Problem3D, type View3D} from './Studio3D';
import {Character} from '../components/Character';
import {sp, SNAP} from '../lib/anim';
import type {CharacterCue, SfxCue, Timings} from '../types';

const mont = loadMont('normal', {weights: ['800', '900'], subsets: ['latin', 'latin-ext']});
const FONT = mont.fontFamily;

export type Shot3D = {
  at: number;
  text: string;
  pill?: string;
  /** petit mot au-dessus du grand (« TU LE », « DÈS QUE ») */
  over?: string;
  color?: 'white' | 'accent' | 'alert';
  view?: View3D;
  crossed?: boolean;
};

export type Video3DConfig = {
  id: string;
  accent: string;
  pillColor?: string;
  productImage: string;
  productHeight?: number;
  problem: Problem3D;
  voice: string;
  music: string;
  timings: Timings;
  shots: Shot3D[];
  price: {at: number; now: string; old?: string; pills: string[]};
  clickAt: number;
  jacket?: string;
  cues?: CharacterCue[];
};

export const HOLD = 3; // « CLIQUE sur le panier » tenu 3 s
/** le prix reste au moins 1,5 s à l'écran avant « CLIQUE » */
export const clickVisual = (c: Video3DConfig) => Math.max(c.clickAt, c.price.at + 1.5);
export const durationFrames3D = (c: Video3DConfig) => Math.ceil(Math.max(c.timings.durationSec + 0.3, clickVisual(c) + HOLD) * 30);

const Cart: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{verticalAlign: '-12%', marginRight: size * 0.25}}>
    <path d="M2.5 3.5h2.6l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2l1.6-6.8H6.3" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9.5" cy="20" r="1.7" fill={color} /><circle cx="17" cy="20" r="1.7" fill={color} />
  </svg>
);

const Pill: React.FC<{text: string; bg: string; color?: string; size?: number}> = ({text, bg, color = '#0B0B0F', size: size0 = 42}) => {
  const size = Math.min(size0, 820 / (text.length * 0.66));
  return (
  <div style={{display: 'inline-block', background: bg, color, fontFamily: FONT, fontWeight: 900, fontSize: size, lineHeight: 1.15,
    padding: '2px 22px', borderRadius: 999, textTransform: 'uppercase', whiteSpace: 'nowrap'}}>{text}</div>
  );
};

const Headline: React.FC<{shot: Shot3D; start: number; accent: string; pillColor: string}> = ({shot, start, accent, pillColor}) => {
  const f = useCurrentFrame();
  const pin = sp(f, start, SNAP);
  const color = shot.color === 'accent' ? accent : shot.color === 'alert' ? '#FF4B3A' : '#FFFFFF';
  const big = /\d/.test(shot.text) && !shot.color ? accent : color;
  const longest = Math.max(...shot.text.split('\n').map((l) => l.length), 3);
  const size = Math.min(230, 860 / (longest * 0.66));
  return (
    <div style={{position: 'absolute', left: 70, right: 150, top: 170, display: 'flex', flexDirection: 'column', alignItems: 'center',
      transform: `scale(${0.85 + 0.15 * pin})`, opacity: Math.min(1, pin * 2)}}>
      {shot.over && <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 58, color: '#fff', lineHeight: 1}}>{shot.over}</div>}
      <div style={{position: 'relative', fontFamily: FONT, fontWeight: 900, fontSize: size, lineHeight: 1.02, color: big, textAlign: 'center',
        textTransform: 'uppercase', letterSpacing: -2, textShadow: '0 8px 40px rgba(0,0,0,0.7)', whiteSpace: 'pre-line'}}>
        {shot.text}
        {shot.crossed && (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', inset: '-6% -4%', width: '108%', height: '112%'}}>
            <line x1="4" y1="10" x2="96" y2="90" stroke="#FF3B30" strokeWidth="7" strokeLinecap="round" />
            <line x1="96" y1="10" x2="4" y2="90" stroke="#FF3B30" strokeWidth="7" strokeLinecap="round" />
          </svg>
        )}
      </div>
      {shot.pill && <div style={{marginTop: 12, transform: `scale(${sp(f, start + 3)})`}}><Pill text={shot.pill} bg={pillColor} size={54} /></div>}
    </div>
  );
};

const PriceCard: React.FC<{price: Video3DConfig['price']; start: number; accent: string}> = ({price, start, accent}) => {
  const f = useCurrentFrame();
  const p = sp(f, start, SNAP);
  return (
    <div style={{position: 'absolute', left: 70, right: 150, top: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      transform: `scale(${0.8 + 0.2 * p})`, opacity: Math.min(1, p * 2)}}>
      {price.old && <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 52, color: '#ff6b5a', textDecoration: 'line-through'}}>{price.old}</div>}
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 190, lineHeight: 1, color: '#fff', letterSpacing: -4, textShadow: `0 0 50px ${accent}66`}}>{price.now}</div>
      {price.pills.map((t, i) => (
        <div key={i} style={{transform: `scale(${sp(f, start + 4 + i * 3)})`}}><Pill text={t} bg={i === 0 ? '#FFFFFF' : accent} size={38} /></div>
      ))}
      <div style={{marginTop: 18, transform: `scale(${sp(f, start + 10)})`, background: '#FE6A1A', color: '#fff', fontFamily: FONT, fontWeight: 900,
        fontSize: 54, padding: '14px 44px', borderRadius: 22, boxShadow: '0 12px 40px #FE6A1A88'}}><Cart size={54} color="#fff" />AJOUTE AU PANIER</div>
    </div>
  );
};

const ClickCard: React.FC<{start: number; pillColor: string}> = ({start, pillColor}) => {
  const f = useCurrentFrame();
  const p = sp(f, start, SNAP);
  const pulse = 1 + 0.06 * Math.max(0, Math.sin(((f - start) / 30) * Math.PI * 2)) * Math.min(1, (f - start) / 10);
  return (
    <div style={{position: 'absolute', left: 70, right: 150, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      transform: `scale(${0.85 + 0.15 * p})`, opacity: Math.min(1, p * 2)}}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 150, color: '#fff', lineHeight: 1, letterSpacing: -3}}>CLIQUE</div>
      <Pill text="sur le panier" bg={pillColor} size={52} />
      <div style={{transform: `scale(${pulse})`, marginTop: 10, background: pillColor, color: '#0B0B0F', fontFamily: FONT, fontWeight: 900,
        fontSize: 46, padding: '10px 36px', borderRadius: 999, boxShadow: `0 0 40px ${pillColor}`}}><Cart size={46} color="#0B0B0F" />PANIER</div>
    </div>
  );
};

/** Modèle 3D : studio noir, mot géant + pastille, produit gros en bas, présentateur sur le côté. */
export const Video3D: React.FC<{config: Video3DConfig}> = ({config: c}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const pillColor = c.pillColor ?? c.accent;
  const priceF = Math.round(c.price.at * 30);
  const clickF = Math.round(clickVisual(c) * 30);

  // plans : mots-clés, puis prix, puis CLIQUE ; les 4 dernières images reviennent sur l'image 0 (boucle)
  type Seg = {start: number; end: number; view: View3D; shot?: Shot3D; kind: 'shot' | 'price' | 'click' | 'loop'};
  const segs: Seg[] = c.shots.map((s, i) => ({
    start: Math.round(s.at * 30),
    end: Math.round((i < c.shots.length - 1 ? c.shots[i + 1].at : c.price.at) * 30),
    view: s.view ?? (i === 0 ? 'problem' : 'product'), shot: s, kind: 'shot' as const,
  }));
  segs[0].start = 0;
  segs.push({start: priceF, end: clickF, view: 'price', kind: 'price'});
  segs.push({start: clickF, end: durationInFrames - 4, view: 'cta', kind: 'click'});
  segs.push({start: durationInFrames - 4, end: durationInFrames, view: 'problem', kind: 'loop'});
  const idx = Math.max(0, segs.findIndex((s) => f >= s.start && f < s.end));
  const seg = segs[idx];
  const productShots = segs.slice(0, idx + 1).filter((s) => s.view !== 'problem').length;

  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse 90% 60% at 50% 38%, #141a3a 0%, #070912 60%, #030308 100%)'}}>
      <Suspense fallback={null}>
        <Studio3D shot={{start: seg.start, end: seg.end, view: seg.view, preset: productShots}} accent={c.accent}
          productImage={c.productImage} productHeight={c.productHeight} problem={c.problem} />
      </Suspense>
      {seg.kind === 'shot' && seg.shot && <Headline key={idx} shot={seg.shot} start={seg.start} accent={c.accent} pillColor={pillColor} />}
      {seg.kind === 'price' && <PriceCard price={c.price} start={seg.start} accent={c.accent} />}
      {seg.kind === 'click' && <ClickCard start={seg.start} pillColor={pillColor} />}
      {seg.kind === 'loop' && segs[0].shot && <Headline shot={segs[0].shot} start={0} accent={c.accent} pillColor={pillColor} />}
      {seg.kind !== 'loop' && seg.view !== 'problem' && (
        <div style={{position: 'absolute', inset: 0}}>
          <Character cues={c.cues ?? []} words={c.timings.words} x={150} y={1905} scale={0.42} jacket={c.jacket} enterAt={2} />
        </div>
      )}
      <Audio src={staticFile(c.voice)} />
      <Audio src={staticFile(c.music)} volume={0.1} />
      {(c.shots.map((s) => s.at).concat([c.price.at, clickVisual(c)])).map((t, i) => (
        <Sequence key={i} from={Math.round(t * 30)} layout="none">
          <Audio src={staticFile(i === c.shots.length ? 'sfx/ding.wav' : i === 0 ? 'sfx/impact.wav' : 'sfx/whoosh.wav')} volume={i === 0 ? 0.45 : 0.3} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
