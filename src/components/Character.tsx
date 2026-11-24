import React from 'react';
import {useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {BRAND} from '../brand';
import {sp, s2f, lin} from '../lib/anim';
import type {CharacterAction, CharacterCue, Word} from '../types';

/**
 * Le présentateur du compte : cartoon 2D flat, contours épais, clairement fictif.
 * Veste à paillettes, chemise ouverte, chaîne en or, banane gominée, sourire immense
 * avec étincelle sur les dents, micro rétro à la main.
 * Dessiné dans un repère 500 x 900 (pieds en bas au centre : 250, 890).
 */

const OUT = '#0B0B0F';
const SW = 8;
const SKIN = '#F4B58A';
const SKIN_SH = '#D9926A';
const HAIR = '#2B1A12';
const GOLD = '#FFC93C';
const PANTS = '#1C1C28';

const ACTION_LEN: Record<CharacterAction, number> = {
  point: 1.6, shock: 1.3, faint: 2.2, slam: 1.0, hop: 0.6, present: 1.6,
};

const shade = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v * k)));
  return `rgb(${c((n >> 16) & 255)}, ${c((n >> 8) & 255)}, ${c(n & 255)})`;
};

/** Ouverture de bouche (0–1) calée sur les mots de la voix. */
const mouthOpen = (words: Word[], t: number) => {
  const w = words.find((x) => t >= x.start && t <= x.end);
  if (!w) return 0;
  const syll = Math.max(1, Math.round(w.word.length / 2.6));
  const p = (t - w.start) / Math.max(0.05, w.end - w.start);
  return 0.25 + 0.75 * Math.abs(Math.sin(Math.PI * p * syll));
};

/** Arm drawn as a thick outlined stroke. */
const Limb: React.FC<{d: string; color: string; width: number}> = ({d, color, width}) => (
  <>
    <path d={d} stroke={OUT} strokeWidth={width + SW * 2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

const Sparkle: React.FC<{x: number; y: number; s: number; color?: string}> = ({x, y, s, color = '#FFFFFF'}) =>
  s <= 0.01 ? null : (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -22 C3 -6 6 -3 22 0 C6 3 3 6 0 22 C-3 6 -6 3 -22 0 C-6 -3 -3 -6 0 -22 Z"
      fill={color} stroke={OUT} strokeWidth={3}
    />
  );

const Heart: React.FC<{x: number; y: number; s: number; o: number}> = ({x, y, s, o}) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} opacity={o}
    d="M0 12 C-22 -4 -14 -22 0 -10 C14 -22 22 -4 0 12 Z" fill="#FF3B6B" stroke={OUT} strokeWidth={3} />
);

type Props = {
  cues: CharacterCue[];
  words: Word[];
  /** position des pieds (px, repère vidéo) */
  x: number;
  y: number;
  scale: number;
  jacket?: string;
  /** image (absolue) d'entrée en scène */
  enterAt?: number;
  offset?: number;
  flip?: boolean;
};

export const Character: React.FC<Props> = ({cues, words, x, y, scale, jacket = '#FF2E88', enterAt = 0, offset = 0, flip}) => {
  const frame = useCurrentFrame() + offset;
  const t = frame / BRAND.video.fps;

  // action en cours (la dernière commencée et pas encore finie)
  const active = [...cues].reverse().find((c) => t >= c.at && t < c.at + (c.duration ?? ACTION_LEN[c.action]));
  const act = active?.action;
  const a0 = active ? s2f(active.at) : 0;
  const aEnd = active ? s2f(active.at + (active.duration ?? ACTION_LEN[active.action])) : 0;
  // progression d'entrée / de retour au neutre
  const inP = active ? sp(frame, a0) : 0;
  const outP = active ? lin(frame, aEnd - 8, aEnd) : 0;
  const k = inP * (1 - outP);

  const talk = mouthOpen(words, t);
  const n = (s: string, sp_ = 0.6) => noise2D(s, t * sp_, 0);

  // ---- corps
  const enter = sp(frame, enterAt);
  let rot = n('br', 0.5) * 2.5; // léger balancement non périodique
  let bodyY = -Math.abs(talk) * 6;
  let squashY = 1;
  let jump = 0;
  if (act === 'faint') rot += 24 * k;
  if (act === 'shock') jump = -60 * Math.sin(Math.min(1, (frame - a0) / 12) * Math.PI);
  if (act === 'hop') jump = -45 * Math.sin(Math.min(1, (frame - a0) / 10) * Math.PI);
  if (act === 'slam') {
    const p = (frame - a0) / 6;
    squashY = 1 - 0.14 * k * Math.min(1, p);
    bodyY += 30 * k * Math.min(1, p);
  }

  // ---- bras droit (côté écran droit) : geste libre
  // angle de l'avant-bras ; 0 = vers le bas
  let armR = 35 + n('ar', 0.9) * 18 + talk * 10;
  if (act === 'point' || act === 'present') armR = 35 + (act === 'point' ? 75 : 95) * k + n('ar', 0.9) * 6;
  if (act === 'shock') armR = 35 + 130 * k;
  if (act === 'faint') armR = 35 + 120 * k;
  if (act === 'slam') armR = 35 + (frame - a0 < 4 ? 150 : -25) * k;
  const rad = (armR * Math.PI) / 180;
  const sx = 372, sy = 372; // épaule
  const ex = sx + Math.sin(rad * 0.55) * 95, ey = sy + Math.cos(rad * 0.55) * 95;
  const hx = ex + Math.sin(rad) * 95, hy = ey + Math.cos(rad) * 95;

  // ---- yeux
  const pop = act === 'shock' ? k : 0;
  const closed = act === 'faint' && k > 0.4;
  const blinkN = noise2D('blink', Math.floor(t * 3), 0);
  const blink = blinkN > 0.82 && !pop ? 0.15 : 1;

  // ---- bouche
  let open = talk;
  if (act === 'shock') open = Math.max(open, 0.95 * k);
  const mouthBottom = 292 + open * 44;

  // ---- étincelle des dents (pic à chaque cue + quelques éclats aléatoires)
  const glintT = cues.map((c) => frame - s2f(c.at) - 6).filter((d) => d >= 0 && d < 14)[0];
  const spark = glintT !== undefined ? Math.sin((glintT / 14) * Math.PI) * 1.1 : 0;

  const J = jacket;
  const Jd = shade(jacket, 0.72);
  const Jl = shade(jacket, 1.25);

  return (
    <div
      style={{
        position: 'absolute', left: x, top: y, width: 500, height: 900,
        transform: `translate(-50%, -100%) scale(${scale * (0.6 + 0.4 * enter)}) ${flip ? 'scaleX(-1)' : ''}`,
        transformOrigin: '50% 100%', opacity: lin(frame, enterAt, enterAt + 4),
      }}
    >
      <svg width={500} height={900} viewBox="0 0 500 900" style={{overflow: 'visible'}}>
        {/* ombre au sol */}
        <ellipse cx={250} cy={888} rx={150 - Math.abs(jump) * 0.8} ry={16} fill="rgba(0,0,0,0.55)" />
        <g transform={`translate(0 ${jump + bodyY}) rotate(${rot} 250 885) translate(250 885) scale(1 ${squashY}) translate(-250 -885)`}>
          {/* jambes + chaussures */}
          <path d="M178 610 L172 850 L238 850 L246 640 Z" fill={PANTS} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M322 610 L328 850 L262 850 L254 640 Z" fill={PANTS} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M160 846 Q160 822 200 822 L240 826 L246 866 L152 868 Z" fill="#F5F5F5" stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M340 846 Q340 822 300 822 L260 826 L254 866 L348 868 Z" fill="#F5F5F5" stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />

          {/* bras droit derrière le corps quand il est baissé */}
          <Limb d={`M${sx} ${sy} L${ex} ${ey} L${hx} ${hy}`} color={J} width={56} />
          <circle cx={hx} cy={hy} r={26} fill={SKIN} stroke={OUT} strokeWidth={SW} />
          {act === 'point' && k > 0.3 && (
            <path d={`M${hx} ${hy} l${Math.sin(rad) * 48} ${Math.cos(rad) * 48}`} stroke={OUT} strokeWidth={22} strokeLinecap="round" />
          )}
          {act === 'point' && k > 0.3 && (
            <path d={`M${hx} ${hy} l${Math.sin(rad) * 48} ${Math.cos(rad) * 48}`} stroke={SKIN} strokeWidth={12} strokeLinecap="round" />
          )}

          {/* torse : chemise ouverte + veste à paillettes */}
          <path d="M140 360 Q250 320 360 360 L380 640 Q250 666 120 640 Z" fill="#FFFFFF" stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M214 334 L286 334 L250 470 Z" fill={SKIN} />
          <path d="M214 334 L250 470" stroke={SKIN_SH} strokeWidth={3} />
          {/* chaîne en or */}
          <path d="M218 342 Q250 446 282 342" stroke={OUT} strokeWidth={13} fill="none" />
          <path d="M218 342 Q250 446 282 342" stroke={GOLD} strokeWidth={7} fill="none" />
          <circle cx={250} cy={400} r={13} fill={GOLD} stroke={OUT} strokeWidth={4} />
          <defs>
            <pattern id="seq" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="4.2" fill={Jl} />
              <circle cx="17" cy="17" r="4.2" fill={Jd} />
            </pattern>
          </defs>
          {/* pans de veste */}
          {[
            'M140 360 Q190 338 214 334 L236 520 L214 660 L118 640 Z',
            'M360 360 Q310 338 286 334 L264 520 L286 660 L382 640 Z',
          ].map((d, i) => (
            <g key={i}>
              <path d={d} fill={J} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
              <path d={d} fill="url(#seq)" opacity={0.65} />
            </g>
          ))}
          {/* revers */}
          <path d="M214 334 L196 420 L236 520" fill={Jd} stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
          <path d="M286 334 L304 420 L264 520" fill={Jd} stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
          {/* reflets de paillettes (aléatoires, non périodiques) */}
          {[[170, 450], [330, 480], [160, 580], [340, 600], [200, 520], [310, 410]].map(([px, py], i) => (
            <Sparkle key={i} x={px} y={py} s={Math.max(0, noise2D('sq' + i, t * 1.4, 0) - 0.35) * 0.9} />
          ))}

          {/* bras gauche + micro rétro */}
          <Limb d="M130 372 L108 470 L172 432" color={J} width={56} />
          <g transform={`rotate(${-8 + talk * 4} 182 424)`}>
            <rect x={172} y={330} width={22} height={110} rx={8} fill="#2A2A33" stroke={OUT} strokeWidth={6} />
            <rect x={160} y={300} width={46} height={18} rx={6} fill="#BFC3CC" stroke={OUT} strokeWidth={5} />
            <ellipse cx={183} cy={282} rx={34} ry={38} fill="#D9DCE3" stroke={OUT} strokeWidth={SW} />
            {[-18, -6, 6, 18].map((d) => (
              <line key={d} x1={183 + d} y1={252} x2={183 + d} y2={312} stroke="#8A8F9A" strokeWidth={3} />
            ))}
          </g>
          <circle cx={178} cy={428} r={27} fill={SKIN} stroke={OUT} strokeWidth={SW} />

          {/* cou + tête */}
          <rect x={222} y={290} width={56} height={52} fill={SKIN} stroke={OUT} strokeWidth={SW} />
          <ellipse cx={160} cy={222} rx={18} ry={26} fill={SKIN} stroke={OUT} strokeWidth={SW} />
          <ellipse cx={340} cy={222} rx={18} ry={26} fill={SKIN} stroke={OUT} strokeWidth={SW} />
          <path d="M162 200 Q160 112 250 108 Q340 112 338 200 L332 268 Q300 330 250 332 Q200 330 168 268 Z" fill={SKIN} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />

          {/* banane gominée */}
          <path d="M150 210 Q132 120 196 76 Q270 22 352 54 Q414 80 392 128 Q372 104 336 112 Q350 150 336 196 Q320 150 284 140 Q236 132 196 150 Q166 168 150 210 Z"
            fill={HAIR} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M200 92 Q262 48 334 66" stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.85} />
          <path d="M214 118 Q262 92 316 98" stroke="#FFFFFF" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5} />

          {/* sourcils */}
          <path d={`M188 ${176 - pop * 22} Q212 ${162 - pop * 30} 236 ${174 - pop * 22}`} stroke={OUT} strokeWidth={12} fill="none" strokeLinecap="round" />
          <path d={`M264 ${174 - pop * 22} Q288 ${162 - pop * 30} 312 ${176 - pop * 22}`} stroke={OUT} strokeWidth={12} fill="none" strokeLinecap="round" />

          {/* yeux (sortent de leurs orbites sur « shock ») */}
          {[212, 288].map((cx, i) =>
            closed ? (
              <path key={i} d={`M${cx - 20} 212 Q${cx} 226 ${cx + 20} 212`} stroke={OUT} strokeWidth={8} fill="none" strokeLinecap="round" />
            ) : (
              <g key={i} transform={`translate(${cx} 212) translate(${(i ? 1 : -1) * pop * 26} ${pop * 34}) scale(${1 + pop * 1.5} ${(1 + pop * 1.5) * blink})`}>
                <ellipse rx={22} ry={27} fill="#FFFFFF" stroke={OUT} strokeWidth={SW / (1 + pop)} />
                <circle cx={4 * (i ? -1 : 1) * (act === 'point' ? -2 : 1)} cy={2} r={10 - pop * 4} fill={OUT} />
                <circle cx={7} cy={-6} r={3.5} fill="#FFFFFF" />
              </g>
            ),
          )}
          {/* nez */}
          <path d="M250 222 Q262 250 246 256" stroke={SKIN_SH} strokeWidth={7} fill="none" strokeLinecap="round" />

          {/* sourire immense */}
          <path d={`M182 270 Q250 284 318 270 Q300 ${mouthBottom} 250 ${mouthBottom + 6} Q200 ${mouthBottom} 182 270 Z`}
            fill="#7A0F23" stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
          <path d={`M190 273 Q250 286 310 273 L306 ${290 + open * 6} Q250 ${300 + open * 6} 194 ${290 + open * 6} Z`} fill="#FFFFFF" stroke={OUT} strokeWidth={3} />
          {[218, 250, 282].map((tx) => <line key={tx} x1={tx} y1={277} x2={tx} y2={291 + open * 6} stroke="#D5D5D5" strokeWidth={2.5} />)}
          {open > 0.45 && <ellipse cx={250} cy={mouthBottom - 8} rx={26} ry={10 * open} fill="#E0475F" />}
          <Sparkle x={300} y={276} s={spark} />
        </g>

        {/* cœurs quand il s'évanouit de bonheur */}
        {act === 'faint' &&
          [0, 1, 2].map((i) => {
            const d = frame - a0 - 6 - i * 7;
            if (d < 0) return null;
            return <Heart key={i} x={250 + (i - 1) * 70 + Math.sin(d / 6 + i) * 10} y={120 - d * 4} s={1.6 + i * 0.3} o={Math.max(0, 1 - d / 40) * (1 - outP)} />;
          })}
        {/* étoiles du choc au sol */}
        {act === 'slam' && frame - a0 >= 4 &&
          [0, 1, 2, 3].map((i) => {
            const d = frame - a0 - 4;
            const ang = Math.PI + (i / 3) * Math.PI;
            return <Sparkle key={i} x={hx + Math.cos(ang) * d * 9} y={880 + Math.sin(ang) * d * 6} s={Math.max(0, 1.2 - d / 12)} color={GOLD} />;
          })}
      </svg>
    </div>
  );
};
