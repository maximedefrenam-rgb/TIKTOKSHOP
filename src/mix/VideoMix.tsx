import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BRAND, SAFE_CX, SAFE_W} from '../brand';
import {Background, Grain} from '../components/Background';
import {Product} from '../components/Product';
import {Character} from '../components/Character';
import {sp, SNAP, lin, easeOut} from '../lib/anim';
import {clickVisual, durationFrames3D, type Shot3D, type Video3DConfig} from '../three/Video3D';
import type {Problem3D, View3D} from '../three/Studio3D';

/**
 * Modèle « mix » : graphisme 2D du début (fond noir + halo d'accent, Anton, produit qui flotte avec reflet,
 * présentateur cartoon, voix Simon) + structure du format H24 (objet problème plein cadre en image 0, plan toutes
 * les ~1,1 s avec mot géant + pastille, prix suspense, objet retourné, CLIQUE tenu 3 s, boucle sur l'image 0).
 */
export const durationFramesMix = durationFrames3D;

const OUT = '#0B0B0F';
const RED = '#FF3B30';
const GREEN = '#2EE66B';

/* ------------------------------------------------ objets « problème » 2D (contours épais, style du présentateur) */
const Battery: React.FC<{level: number; color: string}> = ({level, color}) => (
  <svg width={520} height={820} viewBox="0 0 260 410">
    <rect x={95} y={8} width={70} height={34} rx={10} fill="#C9CDD6" stroke={OUT} strokeWidth={10} />
    <rect x={30} y={38} width={200} height={360} rx={34} fill="#1C2033" stroke={OUT} strokeWidth={14} />
    <rect x={30} y={38} width={200} height={360} rx={34} fill="none" stroke="#ffffff" strokeOpacity={0.25} strokeWidth={4} />
    <rect x={52} y={60 + 316 * (1 - level)} width={156} height={316 * level} rx={18} fill={color} />
    <rect x={62} y={70 + 316 * (1 - level)} width={22} height={Math.max(0, 316 * level - 20)} rx={10} fill="#fff" opacity={0.35} />
    {level > 0.6 && <path d="M140 140 L100 230 L132 230 L118 310 L166 206 L134 206 L150 140 Z" fill="#fff" stroke={OUT} strokeWidth={6} strokeLinejoin="round" />}
  </svg>
);

const Clock: React.FC<{color: string; hour: number; shake: number}> = ({color, hour, shake}) => (
  <svg width={640} height={640} viewBox="0 0 320 320" style={{transform: `rotate(${shake}deg)`}}>
    {[-1, 1].map((d) => <circle key={d} cx={160 + d * 92} cy={62} r={44} fill={color} stroke={OUT} strokeWidth={12} />)}
    {[-1, 1].map((d) => <line key={d} x1={160 + d * 70} y1={270} x2={160 + d * 95} y2={305} stroke={OUT} strokeWidth={16} strokeLinecap="round" />)}
    <circle cx={160} cy={170} r={118} fill={color} stroke={OUT} strokeWidth={14} />
    <circle cx={160} cy={170} r={92} fill="#F6F6F8" stroke={OUT} strokeWidth={8} />
    <line x1={160} y1={170} x2={160 + Math.sin((hour / 12) * Math.PI * 2) * 52} y2={170 - Math.cos((hour / 12) * Math.PI * 2) * 52} stroke={OUT} strokeWidth={14} strokeLinecap="round" />
    <line x1={160} y1={170} x2={160} y2={96} stroke={OUT} strokeWidth={9} strokeLinecap="round" />
    <circle cx={160} cy={170} r={10} fill={OUT} />
  </svg>
);

const Tag: React.FC<{color: string; label: string}> = ({color, label}) => (
  <svg width={680} height={460} viewBox="0 0 340 230" style={{transform: 'rotate(-10deg)'}}>
    <path d="M70 30 L310 30 Q326 30 326 46 L326 184 Q326 200 310 200 L70 200 L14 115 Z" fill={color} stroke={OUT} strokeWidth={12} strokeLinejoin="round" />
    <circle cx={64} cy={115} r={14} fill="#F6F6F8" stroke={OUT} strokeWidth={8} />
    <text x={200} y={140} textAnchor="middle" fontFamily={BRAND.fonts.title} fontSize={84} fill="#fff" stroke={OUT} strokeWidth={4} paintOrder="stroke">{label}</text>
  </svg>
);

const Mark: React.FC<{ok: boolean}> = ({ok}) => (
  <svg width={620} height={620} viewBox="0 0 310 310">
    <circle cx={155} cy={155} r={135} fill={ok ? GREEN : RED} stroke={OUT} strokeWidth={14} />
    {ok ? (
      <path d="M90 160 L135 205 L222 112" stroke="#fff" strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <g stroke="#fff" strokeWidth={34} strokeLinecap="round"><line x1={100} y1={100} x2={210} y2={210} /><line x1={210} y1={100} x2={100} y2={210} /></g>
    )}
  </svg>
);

const ProblemArt: React.FC<{kind: Problem3D; solved: boolean; t: number; accent: string; price?: string}> = ({kind, solved, t, accent, price}) => {
  if (kind === 'battery') return <Battery level={solved ? Math.min(1, 0.15 + t * 1.6) : Math.max(0.06, 0.2 - t * 0.1)} color={solved ? GREEN : RED} />;
  if (kind === 'clock') return <Clock color={solved ? GREEN : RED} hour={solved ? 7 : 3} shake={solved ? 0 : Math.sin(t * 50) * 6 * Math.max(0, 1 - t * 0.5)} />;
  if (kind === 'tag') return <Tag color={solved ? accent : RED} label={solved ? price ?? 'OK' : '€€€'} />;
  return <Mark ok={solved} />;
};

/* ------------------------------------------------ textes (graphisme 2D : Anton, contour sombre) */
const Pill: React.FC<{text: string; bg: string; color?: string; size?: number}> = ({text, bg, color = OUT, size: s0 = 50}) => {
  const size = Math.min(s0, 800 / (text.length * 0.6));
  return (
    <div style={{display: 'inline-block', background: bg, color, fontFamily: BRAND.fonts.body, fontWeight: 900, fontSize: size, lineHeight: 1.2,
      padding: '2px 24px', borderRadius: 999, textTransform: 'uppercase', whiteSpace: 'nowrap', border: `5px solid ${OUT}`}}>{text}</div>
  );
};

const Cart: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{verticalAlign: '-12%', marginRight: size * 0.25}}>
    <path d="M2.5 3.5h2.6l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2l1.6-6.8H6.3" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9.5" cy="20" r="1.7" fill={color} /><circle cx="17" cy="20" r="1.7" fill={color} />
  </svg>
);

const BIG: React.CSSProperties = {fontFamily: BRAND.fonts.title, textTransform: 'uppercase', lineHeight: 0.98, letterSpacing: 1,
  WebkitTextStroke: `6px ${OUT}`, paintOrder: 'stroke fill', textShadow: '0 10px 40px rgba(0,0,0,0.7)', textAlign: 'center', whiteSpace: 'pre-line'};

const Headline: React.FC<{shot: Shot3D; start: number; accent: string; pillColor: string}> = ({shot, start, accent, pillColor}) => {
  const f = useCurrentFrame();
  const p = sp(f, start, SNAP);
  const color = shot.color === 'accent' ? accent : shot.color === 'alert' ? RED : /\d/.test(shot.text) ? accent : '#FFFFFF';
  const longest = Math.max(...shot.text.split('\n').map((l) => l.length), 3);
  const size = Math.min(250, SAFE_W / (longest * 0.5));
  return (
    <div style={{position: 'absolute', left: BRAND.safe.left, width: SAFE_W, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center',
      transform: `scale(${0.4 + 0.6 * p}) rotate(${(1 - p) * -6}deg)`, opacity: Math.min(1, p * 3)}}>
      {shot.over && <div style={{...BIG, fontSize: 70, color: '#fff', WebkitTextStroke: `4px ${OUT}`}}>{shot.over}</div>}
      <div style={{...BIG, position: 'relative', fontSize: size, color}}>
        {shot.text}
        {shot.crossed && (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', inset: '-4% -3%', width: '106%', height: '108%'}}>
            <line x1="4" y1="12" x2="96" y2="88" stroke={RED} strokeWidth="8" strokeLinecap="round" />
            <line x1="96" y1="12" x2="4" y2="88" stroke={RED} strokeWidth="8" strokeLinecap="round" />
          </svg>
        )}
      </div>
      {shot.pill && <div style={{marginTop: 14, transform: `scale(${sp(f, start + 3)})`}}><Pill text={shot.pill} bg={pillColor} /></div>}
    </div>
  );
};

/* ------------------------------------------------ modèle */
export const VideoMix: React.FC<{config: Video3DConfig}> = ({config: c}) => {
  const f = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  const pillColor = c.pillColor ?? c.accent;
  const priceF = Math.round(c.price.at * 30);
  const clickF = Math.round(clickVisual(c) * 30);

  type Seg = {start: number; end: number; view: View3D; shot?: Shot3D; kind: 'shot' | 'price' | 'click' | 'loop'};
  const segs: Seg[] = c.shots.map((s, i) => ({
    start: i === 0 ? 0 : Math.round(s.at * 30),
    end: Math.round((i < c.shots.length - 1 ? c.shots[i + 1].at : c.price.at) * 30),
    view: s.view ?? (i === 0 ? 'problem' : 'product'), shot: s, kind: 'shot' as const,
  }));
  segs.push({start: priceF, end: clickF, view: 'price', kind: 'price'});
  segs.push({start: clickF, end: durationInFrames - 4, view: 'cta', kind: 'click'});
  segs.push({start: durationInFrames - 4, end: durationInFrames, view: 'problem', kind: 'loop'});
  const idx = Math.max(0, segs.findIndex((s) => f >= s.start && f < s.end));
  const seg = segs[idx];
  const local = f - seg.start;
  const t = local / fps;
  const dur = Math.max(1, seg.end - seg.start);
  const productIdx = segs.slice(0, idx + 1).filter((s) => s.view !== 'problem').length;

  // entrée de plan : whip (latéral) ou zoom, en alternance ; 6 images
  const T = 6;
  const pin = Math.min(1, local / T);
  const ein = 1 - Math.pow(1 - pin, 3);
  const whip = idx % 2 === 1;
  const enterTx = idx === 0 || seg.kind === 'loop' ? 0 : whip ? (1 - ein) * 900 * (idx % 4 === 1 ? 1 : -1) : 0;
  const enterSc = idx === 0 || seg.kind === 'loop' ? 1 : whip ? 1 : 0.7 + 0.3 * ein;
  const blur = idx === 0 || seg.kind === 'loop' ? 0 : (1 - ein) * 18;
  // mouvement continu du plan : poussée / travelling / contre-poussée
  const prog = easeOut(f, seg.start, seg.start + dur, 0, 1);
  const move = productIdx % 3;
  const camSc = move === 0 ? 1 + 0.08 * prog : move === 1 ? 1.04 : 1.1 - 0.08 * prog;
  const camTx = move === 1 ? (productIdx % 2 ? 40 : -40) * (prog - 0.5) * 2 : 0;
  // secousse sur l'image 0 et sur le prix
  const shakeAt = seg.kind === 'price' || idx === 0 ? Math.max(0, 1 - local / 10) : 0;
  const shx = shakeAt * 16 * Math.sin(f * 2.1), shy = shakeAt * 12 * Math.cos(f * 2.7);

  const isProblem = seg.view === 'problem';
  const solvedPrice = seg.view === 'price';
  const prodSrc = c.productImage;
  const baseH = (c.productHeight ?? 2.5) / 2.5;

  const product = (() => {
    if (seg.view === 'stack') {
      return [0, 1, 2, 3].map((i) => {
        const d = sp(f, seg.start + i * 3);
        return (
          <div key={i} style={{position: 'absolute', inset: 0, transform: `translateY(${(1 - d) * -900}px)`}}>
            <Product offset={0} src={prodSrc} height={430 * baseH} cx={SAFE_CX + (i % 2 ? 60 : -60)} cy={1560 - i * 170} enterAt={-99} enter="none" seed={'st' + i} />
          </div>
        );
      });
    }
    const close = seg.view === 'close';
    const open = seg.view === 'open' ? Math.min(1, sp(f, seg.start + 3)) : 0;
    return (
      <Product offset={0} src={prodSrc} height={(close ? 1150 : 800) * baseH} cx={SAFE_CX} cy={close ? 1380 : 1250}
        enterAt={seg.start} enter={seg.kind === 'shot' && idx === 1 ? 'slam' : 'none'} open={open} seed={'m' + (productIdx % 5)} sweeps={[seg.start + 4]} />
    );
  })();

  return (
    <AbsoluteFill style={{backgroundColor: BRAND.colors.bg, overflow: 'hidden'}}>
      <Background accent={isProblem ? RED : c.accent} />
      <AbsoluteFill style={{transform: `translate(${enterTx + camTx + shx}px, ${shy}px) scale(${enterSc * camSc})`, filter: blur > 0.5 ? `blur(${blur}px)` : undefined}}>
        {isProblem ? (
          <div style={{position: 'absolute', left: SAFE_CX, top: 1130, transform: `translate(-50%, -50%) scale(${1.05 + 0.08 * prog}) rotate(${(prog - 0.5) * 6}deg)`}}>
            <ProblemArt kind={c.problem} solved={false} t={seg.kind === 'loop' ? 0 : t} accent={c.accent} />
          </div>
        ) : (
          <>
            {seg.view === 'open' && (
              <div style={{position: 'absolute', left: SAFE_CX, top: 1150, width: 900, height: 900, transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${c.accent}99 0%, ${c.accent}00 62%)`, opacity: lin(f, seg.start, seg.start + 8)}} />
            )}
            {product}
            {solvedPrice && (
              <div style={{position: 'absolute', left: 860, top: 1010, transform: `translate(-50%, -50%) scale(${0.36 * sp(f, seg.start + 6)}) rotate(8deg)`}}>
                <ProblemArt kind={c.problem} solved t={t} accent={c.accent} price={c.price.now} />
              </div>
            )}
          </>
        )}
      </AbsoluteFill>

      {/* textes (hors caméra pour rester nets) */}
      {(seg.kind === 'shot' || seg.kind === 'loop') && (
        <Headline key={idx} shot={seg.kind === 'loop' ? c.shots[0] : seg.shot!} start={seg.kind === 'loop' ? -99 : seg.start} accent={c.accent} pillColor={pillColor} />
      )}
      {seg.kind === 'price' && (
        <div style={{position: 'absolute', left: BRAND.safe.left, width: SAFE_W, top: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          transform: `scale(${0.5 + 0.5 * sp(f, seg.start, SNAP)})`}}>
          {c.price.old && <div style={{...BIG, fontSize: 80, color: '#ff8a7a', WebkitTextStroke: `4px ${OUT}`, textDecoration: 'line-through'}}>{c.price.old}</div>}
          <div style={{...BIG, fontSize: 250, color: c.accent}}>{c.price.now}</div>
          {c.price.pills.map((p, i) => <div key={i} style={{transform: `scale(${sp(f, seg.start + 4 + i * 3)})`}}><Pill text={p} bg={i === 0 ? '#fff' : pillColor} size={44} /></div>)}
          <div style={{marginTop: 14, transform: `scale(${sp(f, seg.start + 10)})`, background: BRAND.colors.cart, color: '#fff', fontFamily: BRAND.fonts.title,
            fontSize: 72, padding: '8px 44px', borderRadius: 24, border: `6px solid ${OUT}`, boxShadow: `0 12px 40px ${BRAND.colors.cart}88`}}>
            <Cart size={66} color="#fff" />AJOUTE AU PANIER
          </div>
        </div>
      )}
      {seg.kind === 'click' && (
        <div style={{position: 'absolute', left: BRAND.safe.left, width: SAFE_W, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          transform: `scale(${0.4 + 0.6 * sp(f, seg.start, SNAP)})`}}>
          <div style={{...BIG, fontSize: 250, color: '#fff'}}>CLIQUE</div>
          <Pill text="sur le panier" bg={pillColor} size={64} />
          <div style={{transform: `scale(${1 + 0.07 * Math.max(0, Math.sin((local / 30) * Math.PI * 2))})`, marginTop: 10, background: BRAND.colors.cart, color: '#fff',
            fontFamily: BRAND.fonts.title, fontSize: 64, padding: '6px 40px', borderRadius: 999, border: `6px solid ${OUT}`}}><Cart size={58} color="#fff" />PANIER</div>
        </div>
      )}

      {seg.kind !== 'loop' && !isProblem && (
        <Character cues={c.cues ?? []} words={c.timings.words} x={190} y={1905} scale={0.56} jacket={c.jacket} enterAt={2} />
      )}
      <Grain />

      <Audio src={staticFile(c.voice)} />
      <Audio src={staticFile(c.music)} volume={(fr) => (c.timings.words.some((w) => fr / 30 >= w.start - 0.1 && fr / 30 <= w.end + 0.2) ? 0.07 : 0.12)} />
      {c.shots.map((s, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(s.at * 30) - (i ? 3 : 0))} layout="none">
          <Audio src={staticFile(i === 0 ? 'sfx/impact.wav' : s.crossed ? 'sfx/impact.wav' : i % 2 ? 'sfx/whoosh.wav' : 'sfx/pop.wav')} volume={i === 0 ? 0.5 : 0.35} />
        </Sequence>
      ))}
      <Sequence from={priceF} layout="none"><Audio src={staticFile('sfx/ding.wav')} volume={0.5} /></Sequence>
      <Sequence from={clickF} layout="none"><Audio src={staticFile('sfx/pop.wav')} volume={0.45} /></Sequence>
    </AbsoluteFill>
  );
};
