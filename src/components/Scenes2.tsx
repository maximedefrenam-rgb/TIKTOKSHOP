import React from 'react';
import {AbsoluteFill, staticFile, useCurrentFrame} from 'remotion';
import {BRAND, SAFE_CX, SAFE_W} from '../brand';
import {sp, SNAP, s2f, lin, easeOut, rand} from '../lib/anim';
import type {Scene, VideoConfig} from '../types';
import {Product} from './Product';
import {BigText, Keywords} from './Keywords';
import {productCx} from './Scenes';

type P<K extends Scene['kind']> = {scene: Extract<Scene, {kind: K}>; cfg: VideoConfig; offset: number};
const useAbs = (offset: number) => useCurrentFrame() + offset;
const euro = (v: number) => v.toFixed(2).replace('.', ',') + ' €';
const OUT = '#0B0B0F';

/* ------------------------------------------------ CALCULATRICE + DOSES (produit en coupe) */
export const DosesScene: React.FC<P<'doses'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const W = s2f(scene.weightAt), Pr = s2f(scene.priceAt), D = s2f(scene.divideAt), R = s2f(scene.resultAt);
  const hide = scene.hideCalcAt !== undefined ? s2f(scene.hideCalcAt) : Infinity;
  const calcOut = f >= hide ? 1 - sp(f, hide, SNAP) : 1;
  const cx = productCx(cfg, scene);
  const cy = 1350, h = 520;
  const open = f >= R ? sp(f, R, {damping: 12, stiffness: 120, mass: 0.8}) : 0;
  const mouthX = cx, mouthY = cy - h * 0.42;
  const count = scene.count;
  const cols = 10, sx = 78, sy = 46;
  const gx0 = SAFE_CX - ((cols - 1) * sx) / 2, gy0 = 700;
  const shown = Math.min(count, Math.max(0, Math.floor(easeOut(f, R + 4, R + 40, 0, count))));
  return (
    <AbsoluteFill>
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={h} cx={cx} cy={cy} enterAt={s2f(scene.from)} open={open} seed="doses" sweeps={[W + 4]} />
      {/* doses qui jaillissent du sachet ouvert */}
      {Array.from({length: count}).map((_, i) => {
        const st = R + 4 + i * 0.36;
        if (f < st) return null;
        const p = sp(f, st, {damping: 13, stiffness: 140, mass: 0.6});
        const tx = gx0 + (i % cols) * sx, ty = gy0 + Math.floor(i / cols) * sy;
        const x = mouthX + (tx - mouthX) * p;
        const y = mouthY + (ty - mouthY) * p - Math.sin(Math.min(1, p) * Math.PI) * (120 + rand(i) * 140);
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, width: 34, height: 34, borderRadius: '50%', transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle at 35% 35%, #FFFFFF 0 18%, ${cfg.accent} 20% 100%)`, border: `4px solid ${OUT}`}} />
        );
      })}
      {f >= R + 4 && (
        <div style={{position: 'absolute', left: SAFE_CX, top: gy0 + 10 * sy + 18, transform: 'translate(-50%, 0)', opacity: calcOut,
          fontFamily: BRAND.fonts.body, fontWeight: 700, fontSize: 40, color: BRAND.colors.text}}>{shown} / {count}</div>
      )}
      {/* calcul */}
      <div style={{opacity: calcOut}}>
        <BigText text={`${scene.weight} G${f >= Pr ? ' = ' + euro(scene.price) : ''}`} size={140} color={BRAND.colors.text} y={250}
          progress={f >= W ? sp(f, W) * (f >= Pr && f < Pr + 8 ? 0.9 + 0.1 * sp(f, Pr) : 1) : 0} />
        <BigText text={`÷ ${scene.dose} G PAR JOUR`} size={110} color={BRAND.colors.text} y={410} progress={f >= D ? sp(f, D) : 0} />
        <BigText text={`= ${count} DOSES`} size={170} color={cfg.accent} y={580} progress={f >= R ? sp(f, R) : 0} />
      </div>
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={420} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------ COUPE DE MUSCLE */
export const MuscleScene: React.FC<P<'muscle'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const f0 = s2f(scene.from);
  const enter = sp(f, f0 + 2);
  const X0 = 90, X1 = 890, Y0 = 640, SKIN = 44, FAT = 120, Y1 = 1320;
  const fatY = Y0 + SKIN, musY = fatY + FAT;
  const wA = s2f(scene.waterAt), inA = s2f(scene.inMuscleAt), xA = s2f(scene.fatCrossAt);
  const fill = f >= inA ? sp(f, inA, {damping: 20, stiffness: 60, mass: 1}) : 0;
  const cross1 = f >= xA ? sp(f, xA, SNAP) : 0, cross2 = f >= xA + 3 ? sp(f, xA + 3, SNAP) : 0;

  const fibers: {x: number; y: number; r: number}[] = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 8; c++) fibers.push({x: X0 + 60 + c * 97 + (r % 2) * 46, y: musY + 62 + r * 100, r: 44});

  // syllabes « IN-TRA-MUS-CU-LAIRE »
  const syl = scene.syllables;
  const n = syl.filter((s) => f >= s2f(s.at)).length;
  const last = n ? s2f(syl[n - 1].at) : 0;
  const done = n === syl.length;
  const sylText = done ? syl.map((s) => s.text).join('') : syl.slice(0, n).map((s) => s.text).join('-');

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: X0, top: Y0, width: X1 - X0, height: Y1 - Y0, transform: `scale(${0.6 + 0.4 * enter})`, opacity: Math.min(1, enter * 2),
        borderRadius: 36, overflow: 'hidden', border: `8px solid ${OUT}`, boxShadow: `0 0 0 4px #ffffff22, 0 30px 80px rgba(0,0,0,0.6)`}}>
        <svg width={X1 - X0} height={Y1 - Y0} viewBox={`${X0} ${Y0} ${X1 - X0} ${Y1 - Y0}`}>
          <rect x={X0} y={Y0} width={X1 - X0} height={SKIN} fill="#F4B58A" />
          <rect x={X0} y={fatY} width={X1 - X0} height={FAT} fill="#FFE39A" />
          {Array.from({length: 14}).map((_, i) => (
            <circle key={i} cx={X0 + 30 + i * 58} cy={fatY + 40 + (i % 2) * 40} r={30} fill="#FFD36A" stroke="#E8B64A" strokeWidth={4} />
          ))}
          <rect x={X0} y={musY} width={X1 - X0} height={Y1 - musY} fill="#6E1121" />
          {fibers.map((b, i) => {
            const s = 1 + 0.12 * fill * (0.7 + 0.3 * rand(i));
            return (
              <g key={i} transform={`translate(${b.x} ${b.y}) scale(${s})`}>
                <circle r={b.r} fill="#D8364B" stroke="#4A0A16" strokeWidth={5} />
                <circle r={b.r * 0.62} fill={`rgba(79,195,247,${0.75 * fill})`} />
                <circle cx={-12} cy={-14} r={9} fill="#ffffff" opacity={0.35} />
              </g>
            );
          })}
          <line x1={X0} y1={fatY} x2={X1} y2={fatY} stroke={OUT} strokeWidth={4} />
          <line x1={X0} y1={musY} x2={X1} y2={musY} stroke={OUT} strokeWidth={4} />
        </svg>
        {/* étiquettes */}
        {[['PEAU', Y0 + SKIN / 2], ['GRAS', fatY + FAT / 2], ['MUSCLE', musY + 40]].map(([t, y]) => (
          <div key={t as string} style={{position: 'absolute', right: 18, top: (y as number) - Y0, transform: 'translateY(-50%)', fontFamily: BRAND.fonts.body,
            fontWeight: 900, fontSize: 30, color: t === 'MUSCLE' ? '#fff' : OUT, background: t === 'MUSCLE' ? '#00000055' : '#ffffffaa', padding: '2px 12px', borderRadius: 8}}>{t}</div>
        ))}
      </div>
      {/* gouttes d'eau qui traversent la peau et le gras pour entrer dans les fibres */}
      {Array.from({length: 16}).map((_, i) => {
        const st = wA + i * 3;
        if (f < st) return null;
        const target = fibers[(i * 7) % fibers.length];
        const p = easeOut(f, st, st + 20);
        const x = target.x + (1 - p) * (rand(i + 3) - 0.5) * 60;
        const y = 520 + (target.y - 520) * p;
        const o = 1 - lin(f, st + 20, st + 28);
        if (o <= 0) return null;
        return (
          <svg key={i} width={40} height={54} viewBox="0 0 40 54" style={{position: 'absolute', left: x - 20, top: y - 34, opacity: o}}>
            <path d="M20 2 C26 16 36 26 36 36 A16 16 0 0 1 4 36 C4 26 14 16 20 2 Z" fill="#4FC3F7" stroke={OUT} strokeWidth={4} />
            <ellipse cx={14} cy={36} rx={4} ry={6} fill="#fff" opacity={0.7} />
          </svg>
        );
      })}
      {/* croix rouge sur le gras */}
      {[cross1, cross2].map((p, i) => (
        <div key={i} style={{position: 'absolute', left: SAFE_CX, top: fatY - 10, width: 560 * p, height: 24, background: BRAND.colors.alert, borderRadius: 12,
          transform: `translate(-50%, -50%) rotate(${i ? -14 : 14}deg)`, boxShadow: `0 0 30px ${BRAND.colors.alert}88`}} />
      ))}
      {n > 0 && f < s2f(scene.syllablesUntil ?? scene.to) && (
        <BigText text={sylText} size={done ? 130 : 120} color={done ? cfg.accent : BRAND.colors.text} y={330} progress={sp(f, last, SNAP)} />
      )}
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={300} cx={SAFE_CX} cy={1500} enterAt={f0 + 6} seed="mus" sweeps={[inA]} />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={300} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------ JAUGE DE PERFORMANCE */
const Dumbbell: React.FC<{s: number}> = ({s}) => (
  <svg width={120} height={60} viewBox="0 0 120 60" style={{transform: `scale(${s})`}}>
    <rect x={30} y={24} width={60} height={12} rx={4} fill="#C9CDD6" stroke={OUT} strokeWidth={4} />
    {[8, 94].map((x) => <rect key={x} x={x} y={6} width={18} height={48} rx={5} fill="#2A2A33" stroke={OUT} strokeWidth={4} />)}
    {[22, 82].map((x) => <rect key={x} x={x} y={14} width={12} height={32} rx={4} fill="#2A2A33" stroke={OUT} strokeWidth={4} />)}
  </svg>
);

const Snowflake: React.FC<{s: number; rot: number}> = ({s, rot}) => (
  <svg width={140} height={140} viewBox="-70 -70 140 140" style={{transform: `scale(${s}) rotate(${rot}deg)`}}>
    {[0, 60, 120].map((a) => (
      <g key={a} transform={`rotate(${a})`}>
        <line x1={0} y1={-58} x2={0} y2={58} stroke="#BDE9FF" strokeWidth={10} strokeLinecap="round" />
        {[-1, 1].map((d) => (
          <g key={d}>
            <line x1={0} y1={d * 36} x2={-16} y2={d * 52} stroke="#BDE9FF" strokeWidth={8} strokeLinecap="round" />
            <line x1={0} y1={d * 36} x2={16} y2={d * 52} stroke="#BDE9FF" strokeWidth={8} strokeLinecap="round" />
          </g>
        ))}
      </g>
    ))}
  </svg>
);

export const PowerScene: React.FC<P<'power'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const a = s2f(scene.fillFrom), b = s2f(scene.fillTo);
  const fill = Math.min(1, easeOut(f, a, b) * 0.97 + (f >= b ? sp(f, b) * 0.03 : 0));
  const gx = 110, gw = 780, gy = 720;
  const snow = scene.snowAt !== undefined && f >= s2f(scene.snowAt) ? sp(f, s2f(scene.snowAt)) : 0;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: gx, top: gy, width: gw, height: 64, borderRadius: 32, border: `6px solid #fff`, background: '#ffffff14', overflow: 'hidden',
        opacity: f >= a - 6 ? sp(f, a - 6) : 0}}>
        <div style={{width: `${fill * 100}%`, height: '100%', background: `linear-gradient(90deg, ${cfg.accent}AA, ${cfg.accent})`, boxShadow: `0 0 40px ${cfg.accent}`}} />
      </div>
      {scene.dumbbells.map((t, i) => {
        const st = s2f(t);
        if (f < st) return null;
        return (
          <div key={i} style={{position: 'absolute', left: gx + gw * (0.25 + i * 0.33), top: gy + 120, transform: 'translate(-50%, -50%)'}}>
            <Dumbbell s={sp(f, st)} />
          </div>
        );
      })}
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={600} cx={productCx(cfg, scene)} cy={1300} enterAt={s2f(scene.from)} seed="pow" sweeps={[b]} />
      {snow > 0 && (
        <div style={{position: 'absolute', left: productCx(cfg, scene) + 230, top: 980, transform: 'translate(-50%, -50%)'}}>
          <Snowflake s={snow} rot={(1 - snow) * -120 + (f - s2f(scene.snowAt!)) * 0.8} />
        </div>
      )}
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={260} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------ DÉFILÉ DES GOÛTS */
export const FlavorsScene: React.FC<P<'flavors'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const s = s2f(scene.spreadAt);
  const slots = [
    {x: 150, y: 1260, r: -10}, {x: 300, y: 1200, r: -5}, {x: 700, y: 1200, r: 5}, {x: 850, y: 1260, r: 10},
  ];
  return (
    <AbsoluteFill>
      {scene.images.slice(0, 4).map((img, i) => {
        if (f < s + i * 3) return null;
        const p = sp(f, s + i * 3);
        const sl = slots[i];
        const fromX = sl.x < SAFE_CX ? -300 : 1380;
        return (
          <div key={i} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%',
            transform: `translateX(${(1 - p) * (fromX - sl.x)}px) rotate(${sl.r * p}deg)`, transformOrigin: `${sl.x}px ${sl.y}px`}}>
            <Product offset={offset} src={img} height={330} cx={sl.x} cy={sl.y} enterAt={s + i * 3} enter="none" seed={'fl' + i} />
          </div>
        );
      })}
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={560} cx={SAFE_CX} cy={1180} enterAt={s2f(scene.from)} seed="flc" sweeps={[s + 14]} />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={330} />
    </AbsoluteFill>
  );
};

export const SAFE_WIDTH = SAFE_W;

/* ------------------------------------------------ PROMO (prix barré → nouveau prix) */
export const DealScene: React.FC<P<'deal'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const B = s2f(scene.badgeAt), X = s2f(scene.strikeAt), Nw = s2f(scene.newAt);
  const pB = f >= B ? sp(f, B) : 0;
  const strike = f >= X ? sp(f, X, SNAP) : 0;
  const stamp = f >= X + 3 ? sp(f, X + 3) : 0;
  const pN = f >= Nw ? sp(f, Nw) : 0;
  const s = cfg.productScale ?? 1;
  return (
    <AbsoluteFill>
      <Product offset={offset} src={cfg.productImage} height={560} scale={s} cx={productCx(cfg, scene)} cy={1320} enterAt={s2f(scene.from)} seed="deal" sweeps={[Nw + 2]} />
      <div style={{position: 'absolute', left: SAFE_CX, top: 250, transform: `translate(-50%, -50%) scale(${pB}) rotate(${(1 - pB) * -8}deg)`,
        background: '#FFFFFF', color: OUT, fontFamily: BRAND.fonts.title, fontSize: 104, lineHeight: 1.12, padding: '4px 40px', borderRadius: 18,
        boxShadow: `0 14px 50px ${cfg.accent}66`, whiteSpace: 'nowrap'}}>{scene.badge}</div>
      <div style={{opacity: 1 - strike * 0.5}}>
        <BigText text={euro(scene.oldPrice)} size={150} color={BRAND.colors.text} y={430} progress={sp(f, s2f(scene.from) + 2)} />
      </div>
      <div style={{position: 'absolute', left: SAFE_CX, top: 430, width: 540 * strike, height: 16, background: BRAND.colors.alert, borderRadius: 8,
        transform: 'translate(-50%, -50%) rotate(-7deg)', boxShadow: `0 0 30px ${BRAND.colors.alert}`}} />
      <div style={{position: 'absolute', left: 800, top: 430, transform: `translate(-50%, -50%) scale(${1.9 - 0.9 * stamp}) rotate(12deg)`, opacity: stamp, whiteSpace: 'nowrap',
        border: `8px solid ${BRAND.colors.alert}`, color: BRAND.colors.alert, background: '#0B0B0Fcc', borderRadius: 16, padding: '0 20px',
        fontFamily: BRAND.fonts.title, fontSize: 76, lineHeight: 1.15}}>{scene.discount}</div>
      <BigText text={euro(scene.newPrice)} size={250} color={cfg.accent} y={640} progress={pN} />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={840} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------ USAGE (deux moments + interdit) */
const Controller: React.FC = () => (
  <svg width={240} height={150} viewBox="0 0 240 150">
    <path d="M40 30 Q120 10 200 30 Q236 40 232 100 Q228 140 196 136 Q176 134 160 106 L80 106 Q64 134 44 136 Q12 140 8 100 Q4 40 40 30 Z"
      fill="#2A2A33" stroke={OUT} strokeWidth={8} strokeLinejoin="round" />
    <rect x={46} y={58} width={44} height={14} rx={4} fill="#C9CDD6" /><rect x={61} y={43} width={14} height={44} rx={4} fill="#C9CDD6" />
    {[[176, 50, '#4FC3F7'], [196, 70, '#FF3B30'], [156, 70, '#7ED957'], [176, 90, '#FFD60A']].map(([x, y, c], i) => (
      <circle key={i} cx={x as number} cy={y as number} r={10} fill={c as string} stroke={OUT} strokeWidth={3} />
    ))}
  </svg>
);

const EnergyCan: React.FC = () => (
  <svg width={150} height={240} viewBox="0 0 150 240">
    <rect x={20} y={20} width={110} height={205} rx={18} fill="#9AA0AC" stroke={OUT} strokeWidth={8} />
    <rect x={20} y={60} width={110} height={130} fill="#5B6270" />
    <path d="M84 72 L58 128 L78 128 L66 176 L98 114 L78 114 L90 72 Z" fill="#FFFFFF" stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx={75} cy={22} rx={55} ry={10} fill="#C9CDD6" stroke={OUT} strokeWidth={6} />
  </svg>
);

const Palm: React.FC = () => (
  <svg width={220} height={190} viewBox="0 0 220 190">
    <circle cx={170} cy={40} r={26} fill="#FFD60A" stroke={OUT} strokeWidth={5} />
    <path d="M10 178 Q110 150 210 178 L210 190 L10 190 Z" fill="#F2D49B" stroke={OUT} strokeWidth={5} />
    <path d="M104 170 Q98 120 112 62" stroke="#8B5A2B" strokeWidth={14} fill="none" strokeLinecap="round" />
    {[[-70, 20], [-30, -10], [20, -12], [62, 18], [-50, 40], [45, 42]].map(([dx, dy], i) => (
      <path key={i} d={`M112 62 Q${112 + dx / 2} ${62 + dy - 30} ${112 + dx} ${62 + dy + 10}`} stroke="#2FB55A" strokeWidth={13} fill="none" strokeLinecap="round" />
    ))}
  </svg>
);

const Rain: React.FC = () => (
  <svg width={220} height={190} viewBox="0 0 220 190">
    <path d="M50 110 A34 34 0 0 1 60 46 A46 46 0 0 1 148 40 A36 36 0 0 1 176 110 Z" fill="#8C93A3" stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
    {[[70, 128], [105, 140], [140, 128], [88, 165], [123, 168]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} l-8 18`} stroke="#4FC3F7" strokeWidth={8} strokeLinecap="round" />
    ))}
  </svg>
);

const iconOf = (k: string | undefined, fallback: 'dumbbell' | 'controller') => {
  switch (k ?? fallback) {
    case 'palm': return <Palm />;
    case 'rain': return <Rain />;
    case 'controller': return <Controller />;
    default: return <div style={{transform: 'scale(2)'}}><Dumbbell s={1} /></div>;
  }
};

export const UsageScene: React.FC<P<'usage'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const L = s2f(scene.leftAt), R = s2f(scene.rightAt), C = scene.crossAt !== undefined ? s2f(scene.crossAt) : Infinity;
  const pL = f >= L ? sp(f, L) : 0, pR = f >= R ? sp(f, R) : 0;
  const pC = f >= C ? sp(f, C) : 0;
  const x1 = f >= C + 4 ? sp(f, C + 4, SNAP) : 0, x2 = f >= C + 7 ? sp(f, C + 7, SNAP) : 0;
  const dim = 1 - 0.75 * pC;
  const panel = (p: number, x: number, icon: React.ReactNode, label: string) => (
    <div style={{position: 'absolute', left: x, top: 560, transform: `translate(-50%, -50%) scale(${p})`, opacity: Math.min(1, p * 2) * dim,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
      <div style={{width: 300, height: 220, borderRadius: 32, background: '#ffffff10', border: `5px solid ${cfg.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
      <div style={{fontFamily: BRAND.fonts.title, fontSize: 62, color: BRAND.colors.text, whiteSpace: 'nowrap'}}>{label}</div>
    </div>
  );
  return (
    <AbsoluteFill>
      <Product offset={offset} src={cfg.productImage} height={560} scale={cfg.productScale ?? 1} cx={productCx(cfg, scene)} cy={1330} enterAt={s2f(scene.from)} seed="use" sweeps={[R]} />
      {panel(pL, 280, iconOf(scene.leftIcon, 'dumbbell'), scene.leftLabel)}
      {panel(pR, 720, iconOf(scene.rightIcon, 'controller'), scene.rightLabel)}
      {pC > 0 && (
        <div style={{position: 'absolute', left: SAFE_CX, top: 600, transform: `translate(-50%, -50%) scale(${pC}) rotate(${(1 - pC) * 20}deg)`}}>
          <EnergyCan />
          {[x1, x2].map((p, i) => (
            <div key={i} style={{position: 'absolute', left: 75, top: 120, width: 300 * p, height: 26, background: BRAND.colors.alert, borderRadius: 13,
              transform: `translate(-50%, -50%) rotate(${i ? -45 : 45}deg)`, boxShadow: `0 0 30px ${BRAND.colors.alert}88`}} />
          ))}
        </div>
      )}
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={300} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------ AVANT / APRÈS (photo, volet) */
export const BeforeAfterScene: React.FC<P<'beforeAfter'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const f0 = s2f(scene.from);
  const pIn = sp(f, f0 + 1);
  const R = scene.revealAt !== undefined ? s2f(scene.revealAt) : Infinity;
  const wipe = f >= R ? easeOut(f, R, R + 14) : 0;
  const stop = scene.stopAt !== undefined && f >= s2f(scene.stopAt) ? sp(f, s2f(scene.stopAt)) * (1 - wipe) : 0;
  const W = 700, H = 660, cx = SAFE_CX, cy = 700;
  const half = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute', inset: 0,
    backgroundImage: `url(${staticFile(scene.image)})`,
    backgroundSize: '200% 100%',
    backgroundPosition: side === 'left' ? '0% 50%' : '100% 50%',
  });
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: cx, top: cy, width: W, height: H, transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * pIn})`,
        opacity: Math.min(1, pIn * 2), borderRadius: 34, overflow: 'hidden', border: `8px solid ${OUT}`, boxShadow: `0 0 0 5px ${cfg.accent}, 0 30px 80px rgba(0,0,0,0.6)`}}>
        <div style={half('left')} />
        {scene.revealAt !== undefined && <div style={{...half('right'), clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`}} />}
        {wipe > 0 && wipe < 1 && (
          <div style={{position: 'absolute', top: 0, bottom: 0, left: `${wipe * 100}%`, width: 10, marginLeft: -5, background: '#fff', boxShadow: '0 0 24px #fff'}} />
        )}
        <div style={{position: 'absolute', left: 18, top: 16, background: wipe >= 1 ? cfg.accent : BRAND.colors.alert, color: '#fff',
          fontFamily: BRAND.fonts.title, fontSize: 52, padding: '0 18px', borderRadius: 12}}>{wipe >= 0.5 ? 'APRÈS' : 'AVANT'}</div>
        {stop > 0 && (
          <div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) scale(${1.8 - 0.8 * stop}) rotate(-10deg)`, opacity: stop,
            border: `12px solid ${BRAND.colors.alert}`, color: BRAND.colors.alert, background: '#0B0B0Fbb', borderRadius: 22, padding: '0 40px',
            fontFamily: BRAND.fonts.title, fontSize: 170, lineHeight: 1.1}}>STOP</div>
        )}
      </div>
      <div style={{position: 'absolute', left: cx, top: cy + H / 2 + 26, transform: 'translateX(-50%)', fontFamily: BRAND.fonts.body, fontWeight: 700,
        fontSize: 26, color: '#ffffffaa', opacity: pIn}}>Image d'illustration</div>
      <Product offset={offset} src={cfg.productImage} height={560} scale={cfg.productScale ?? 1} cx={productCx(cfg, scene)} cy={1330} enterAt={f0} seed="ba" sweeps={[R]} />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={250} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------ AVIS (note, étoiles, ventes, classement) */
const Star: React.FC<{fill: number; color: string}> = ({fill, color}) => (
  <svg width={110} height={110} viewBox="0 0 24 24">
    <defs>
      <linearGradient id={`st${Math.round(fill * 100)}`}>
        <stop offset={`${fill * 100}%`} stopColor={color} />
        <stop offset={`${fill * 100}%`} stopColor="#3A3A46" />
      </linearGradient>
    </defs>
    <path d="M12 2.5l2.9 6.2 6.6.7-5 4.5 1.4 6.6L12 17.2 6.1 20.5l1.4-6.6-5-4.5 6.6-.7z" fill={`url(#st${Math.round(fill * 100)})`} stroke={OUT} strokeWidth={1.2} strokeLinejoin="round" />
  </svg>
);

export const ReviewsScene: React.FC<P<'reviews'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const rA = s2f(scene.ratingAt), sA = s2f(scene.soldAt);
  const rk = scene.rankAt !== undefined ? s2f(scene.rankAt) : Infinity;
  const pR = f >= rA ? sp(f, rA) : 0;
  const stars = easeOut(f, rA, rA + 24, 0, scene.rating);
  const sold = Math.round(easeOut(f, sA, sA + 20, 0, scene.sold));
  const pS = f >= sA ? sp(f, sA) : 0;
  const pK = f >= rk ? sp(f, rk) : 0;
  return (
    <AbsoluteFill>
      <BigText text={scene.rating.toFixed(1).replace('.', ',')} size={230} color={cfg.accent} y={330} progress={pR} />
      <div style={{position: 'absolute', left: SAFE_CX, top: 500, transform: `translate(-50%, -50%) scale(${pR})`, display: 'flex', gap: 6}}>
        {[0, 1, 2, 3, 4].map((i) => <Star key={i} fill={Math.max(0, Math.min(1, stars - i))} color="#FFD60A" />)}
      </div>
      {scene.reviews && <BigText text={`${scene.reviews} AVIS`} size={50} small color={BRAND.colors.text} y={585} progress={pR} />}
      <BigText text={`${sold.toLocaleString('fr-FR')} VENDUS`} size={120} color={BRAND.colors.text} y={710} progress={pS} />
      {scene.rank && (
        <div style={{position: 'absolute', left: SAFE_CX, top: 860, transform: `translate(-50%, -50%) scale(${pK}) rotate(${(1 - pK) * -6}deg)`, opacity: pK,
          background: cfg.accent, color: OUT, fontFamily: BRAND.fonts.title, fontSize: 64, padding: '4px 30px', borderRadius: 16, whiteSpace: 'nowrap',
          boxShadow: `0 12px 40px ${cfg.accent}66`}}>{scene.rank}</div>
      )}
      <Product offset={offset} src={cfg.productImage} height={560} scale={cfg.productScale ?? 1} cx={productCx(cfg, scene)} cy={1360} enterAt={s2f(scene.from)} seed="rev" sweeps={[sA]} />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={200} />
    </AbsoluteFill>
  );
};
