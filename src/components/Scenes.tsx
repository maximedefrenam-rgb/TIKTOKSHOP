import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BRAND, SAFE_CX, SAFE_W, SAFE_BOTTOM_Y} from '../brand';
import {sp, SNAP, s2f, lin, easeOut, rand} from '../lib/anim';
import type {Scene, VideoConfig} from '../types';
import {Product, ProductLift} from './Product';
import {BigText, Keywords} from './Keywords';

type P<K extends Scene['kind']> = {scene: Extract<Scene, {kind: K}>; cfg: VideoConfig; offset: number};

const useAbs = (offset: number) => useCurrentFrame() + offset;
/** Centre horizontal du produit : décalé à droite si le présentateur est à l'écran (en bas à gauche). */
export const productCx = (cfg: VideoConfig, scene: Scene) =>
  cfg.character && !(cfg.character.hiddenInScenes ?? []).includes(cfg.scenes.indexOf(scene)) ? (cfg.priceTag ? 630 : 600) : SAFE_CX;
const euro = (v: number) => v.toFixed(2).replace('.', ',') + ' €';

/* ---------------------------------------------------------------- ACCROCHE */
export const HookScene: React.FC<P<'hook'>> = ({scene, cfg, offset}) => {
  const f0 = s2f(scene.from);
  return (
    <AbsoluteFill>
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={900} cx={productCx(cfg, scene)} cy={1140} enterAt={f0} enter={f0 <= 1 ? 'none' : 'slam'} sweeps={[f0 + 12]} seed="hook" />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={420} />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- PRIX CHOC */
export const PriceScene: React.FC<P<'price'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const pA = s2f(scene.priceAt), dA = s2f(scene.dividerAt), rA = s2f(scene.resultAt);
  const count = easeOut(f, pA, pA + 14, 0, scene.price);
  const perDose = scene.price / scene.doses;
  const resCount = easeOut(f, rA, rA + 12, scene.price, perDose);
  const pPrice = f >= pA ? sp(f, pA) : 0;
  const pDiv = f >= dA ? sp(f, dA) : 0;
  const pRes = f >= rA ? sp(f, rA) : 0;
  // le prix total se barre et s'efface quand le résultat tombe
  const strike = lin(f, rA, rA + 6);
  return (
    <AbsoluteFill>
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={640} cx={productCx(cfg, scene)} cy={1320} enterAt={s2f(scene.from)} sweeps={[rA + 2]} seed="price" />
      <div style={{opacity: 1 - strike * 0.55}}>
        <BigText text={euro(count)} size={190} color={BRAND.colors.text} y={360} progress={pPrice} />
        <BigText text={`÷ ${scene.doses} ${scene.divLabel ?? 'DOSES'}`} size={110} color={BRAND.colors.text} y={540} progress={pDiv} />
      </div>
      <BigText text={euro(f >= rA ? resCount : perDose)} size={240} color={cfg.accent} y={770} progress={pRes} />
      <BigText text={scene.unitLabel ?? 'LA DOSE'} size={70} color={BRAND.colors.text} y={950} progress={f >= rA + 6 ? sp(f, rA + 6) : 0} />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={230} />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- IDÉE REÇUE */
export const MythScene: React.FC<P<'myth'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const cA = s2f(scene.crossAt);
  const pS = sp(f, s2f(scene.from) + 2);
  const c1 = f >= cA ? sp(f, cA, SNAP) : 0;
  const c2 = f >= cA + 3 ? sp(f, cA + 3, SNAP) : 0;
  const pV = f >= cA + 5 ? sp(f, cA + 5) : 0;
  return (
    <AbsoluteFill>
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={720} cx={productCx(cfg, scene)} cy={1250} enterAt={s2f(scene.from)} sweeps={[cA + 4]} seed="myth" />
      <div style={{opacity: 1 - c1 * 0.4}}>
        <BigText text={`« ${scene.statement} »`} size={120} color={BRAND.colors.text} y={420} progress={pS} />
      </div>
      {[c1, c2].map((p, i) => (
        <div key={i} style={{position: 'absolute', left: SAFE_CX, top: 420, width: 700 * p, height: 26, background: BRAND.colors.alert,
          borderRadius: 13, transform: `translate(-50%, -50%) rotate(${i ? -28 : 28}deg)`, boxShadow: `0 0 40px ${BRAND.colors.alert}88`}} />
      ))}
      <div style={{position: 'absolute', left: SAFE_CX, top: 660, transform: `translate(-50%, -50%) scale(${1.8 - 0.8 * pV}) rotate(-8deg)`,
        opacity: pV, border: `10px solid ${BRAND.colors.alert}`, borderRadius: 18, padding: '0 34px',
        fontFamily: BRAND.fonts.title, fontSize: 140, lineHeight: 1.15, color: BRAND.colors.alert}}>
        {scene.verdict ?? 'FAUX'}
      </div>
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={820} />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- EN COUPE (signature) */
const Particles: React.FC<{frame: number; start: number; cx: number; cy: number; accent: string}> = ({frame, start, cx, cy, accent}) => {
  const d = frame - start;
  if (d < 0 || d > 40) return null;
  return (
    <>
      {Array.from({length: 46}).map((_, i) => {
        const ang = -Math.PI / 2 + (rand(i) - 0.5) * 2.2;
        const v = 14 + rand(i + 99) * 26;
        const x = cx + Math.cos(ang) * v * d;
        const y = cy + Math.sin(ang) * v * d + 0.55 * d * d;
        const r = 6 + rand(i + 7) * 16;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, width: r, height: r, borderRadius: '50%',
            background: i % 3 ? accent : '#FFFFFF', opacity: 1 - d / 40, transform: 'translate(-50%, -50%)'}} />
        );
      })}
    </>
  );
};

/** Taille du libellé pour que « libellé + sous-texte » tienne sur une ligne dans la zone sûre. */
const labelSize = (it: {label: string; sub?: string}) => {
  const subW = it.sub ? it.sub.length * 22 + 22 : 0;
  return Math.min(104, (SAFE_W - 20 - subW) / (it.label.length * 0.5));
};

export const CutawayScene: React.FC<P<'cutaway'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const oA = s2f(scene.openAt);
  const openS = f >= oA ? sp(f, oA, {damping: 12, stiffness: 120, mass: 0.8}) : 0;
  const zoom = scene.style === 'zoom';
  const open = zoom ? 0 : openS;
  // emballage large (productScale < 1) : produit plus bas pour que le couvercle ne monte pas sur les textes
  // pas de pastille pendant la coupe : on annule la remontée, et l'emballage reste ≤ 0,95 pour que le couvercle ne monte pas sur la liste
  const lift = React.useContext(ProductLift);
  const cutScale = Math.min(cfg.productScale ?? 1, 0.95);
  const h = 700, cy = 1260 + lift + (1 - cutScale) * h * 0.5;
  const glow = lin(f, oA, oA + 8) * (1 - lin(f, oA + 20, oA + 45) * 0.5);
  return (
    <AbsoluteFill>
      {/* lueur qui sort du produit ouvert */}
      <div style={{position: 'absolute', left: productCx(cfg, scene), top: cy - h * 0.05, width: 700, height: 700, transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${cfg.accent}AA 0%, ${cfg.accent}00 65%)`, opacity: glow}} />
      <Product offset={offset} src={cfg.productImage} scale={cutScale * (zoom ? 1 + 0.22 * openS : 1)} height={h} cx={productCx(cfg, scene)} cy={zoom ? cy + 40 : cy} enterAt={s2f(scene.from)} open={open} seed="cut" sweeps={[s2f(scene.from) + 6]} />
      <Particles frame={f} start={oA} cx={productCx(cfg, scene)} cy={cy - h * 0.04} accent={cfg.accent} />
      {scene.items.map((it, i) => {
        const a = s2f(it.at);
        if (f < a) return null;
        const p = sp(f, a);
        const slotY = 300 + i * (scene.items.length > 3 ? 125 : 140);
        const y = (cy - h * 0.05) + (slotY - (cy - h * 0.05)) * p;
        return (
          <div key={i} style={{position: 'absolute', left: SAFE_CX, top: y, width: SAFE_W, transform: `translate(-50%, -50%) scale(${0.3 + 0.7 * p})`,
            display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 22, opacity: Math.min(1, p * 2)}}>
            <span style={{fontFamily: BRAND.fonts.title, fontSize: labelSize(it), color: cfg.accent, whiteSpace: 'nowrap',
              WebkitTextStroke: '6px #0B0B0F', paintOrder: 'stroke fill', textShadow: `0 6px 24px rgba(0,0,0,0.8), 0 0 30px ${cfg.accent}55`}}>{it.label}</span>
            {it.sub && <span style={{fontFamily: BRAND.fonts.body, fontWeight: 700, fontSize: 40, color: BRAND.colors.text, whiteSpace: 'nowrap', textShadow: '0 0 6px #000, 0 2px 10px #000'}}>{it.sub}</span>}
          </div>
        );
      })}
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={300 + scene.items.length * 140} />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- COMPARATIF */
export const CompareScene: React.FC<P<'compare'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const a = s2f(scene.at);
  const max = Math.max(...scene.rows.map((r) => r.value));
  const maxW = SAFE_W - 20;
  return (
    <AbsoluteFill>
      {scene.title && <BigText text={scene.title} size={100} color={BRAND.colors.text} y={290} progress={sp(f, s2f(scene.from) + 2)} />}
      {scene.rows.map((r, i) => {
        const st = r.at !== undefined ? s2f(r.at) : a + i * 8;
        const p = f >= st ? sp(f, st) : 0;
        const col = r.highlight ? cfg.accent : BRAND.colors.muted;
        const top = 450 + i * 185;
        return (
          <div key={i} style={{position: 'absolute', left: BRAND.safe.left, top, opacity: Math.min(1, p * 2)}}>
            <div style={{fontFamily: BRAND.fonts.body, fontWeight: 700, fontSize: 40, color: BRAND.colors.text, marginBottom: 10}}>{r.label}</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: Math.max(8, (r.value / max) * (maxW - 260) * p), height: 78, background: col, borderRadius: 12,
                boxShadow: r.highlight ? `0 0 40px ${cfg.accent}66` : undefined}} />
              <div style={{fontFamily: BRAND.fonts.title, fontSize: 84, color: r.highlight ? cfg.accent : BRAND.colors.text}}>{r.display}</div>
            </div>
          </div>
        );
      })}
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={500} cx={productCx(cfg, scene)} cy={1360} enterAt={s2f(scene.from)} sweeps={[a + 20]} seed="cmp" />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={1030} />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- BÉNÉFICE */
export const BenefitScene: React.FC<P<'benefit'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const f0 = s2f(scene.from);
  const burst = sp(f, f0);
  const rot = (f - f0) * 0.25;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: productCx(cfg, scene), top: 1150, width: 1500, height: 1500, opacity: 0.22 * burst,
        transform: `translate(-50%, -50%) scale(${burst}) rotate(${rot}deg)`,
        background: `repeating-conic-gradient(${cfg.accent} 0deg 7deg, transparent 7deg 22deg)`,
        WebkitMaskImage: 'radial-gradient(circle, black 0%, transparent 62%)', maskImage: 'radial-gradient(circle, black 0%, transparent 62%)'}} />
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={860} cx={productCx(cfg, scene)} cy={1170} enterAt={f0} enter="rise" sweeps={[f0 + 10]} seed="ben" />
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={380} />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- APPEL À L'ACTION */
const Cart: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2.5 3.5h2.6l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2l1.6-6.8H6.3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9.5" cy="20" r="1.6" fill="#fff" />
    <circle cx="17" cy="20" r="1.6" fill="#fff" />
  </svg>
);

export const CtaScene: React.FC<P<'cta'>> = ({scene, cfg, offset}) => {
  const f = useAbs(offset);
  const f0 = s2f(scene.from);
  const aA = s2f(scene.arrowAt ?? scene.from + 0.3);
  const pT = sp(f, f0 + 2);
  const pA = f >= aA ? sp(f, aA) : 0;
  // deux petites relances de la flèche (pas de boucle)
  const lift = React.useContext(ProductLift);
  const nudge = [aA + 24, aA + 48].reduce((acc, n) => acc + (f >= n ? Math.sin(Math.min(1, (f - n) / 10) * Math.PI) * 26 : 0), 0);
  return (
    <AbsoluteFill>
      <Product offset={offset} src={cfg.productImage} scale={cfg.productScale ?? 1} height={720} cx={productCx(cfg, scene)} cy={1110 + lift} enterAt={f0} enter="slam" sweeps={[f0 + 8]} seed="cta" />
      <div style={{position: 'absolute', left: SAFE_CX, top: 330, transform: `translate(-50%, -50%) scale(${pT})`, display: 'flex',
        alignItems: 'center', gap: 26, background: BRAND.colors.cart, padding: '18px 44px 18px 34px', borderRadius: 28,
        boxShadow: `0 16px 60px ${BRAND.colors.cart}77`}}>
        <Cart size={110} />
        <span style={{fontFamily: BRAND.fonts.title, fontSize: 112, color: '#fff', lineHeight: 1.1, whiteSpace: 'nowrap'}}>
          {scene.text ?? 'PANIER ORANGE'}
        </span>
      </div>
      {/* flèche vers le lien produit (en bas à gauche, au-dessus de la légende) */}
      <svg width="260" height="260" viewBox="0 0 100 100" style={{position: 'absolute', left: cfg.character ? 330 : 90, top: SAFE_BOTTOM_Y - 230,
        transform: `translate(${-nudge * 0.5}px, ${nudge}px) scale(${pA})`, opacity: Math.min(1, pA * 2), transformOrigin: '30% 70%'}}>
        <path d="M80 10 C 70 50, 45 70, 18 80" stroke={BRAND.colors.cart} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M14 58 L 16 83 L 40 86" stroke={BRAND.colors.cart} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Keywords keywords={scene.keywords ?? []} sceneTo={scene.to} offset={offset} accent={cfg.accent} defaultY={520} />
    </AbsoluteFill>
  );
};
