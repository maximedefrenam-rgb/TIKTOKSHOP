import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {sp, lin, easeOut} from '../lib/anim';

type Props = {
  src: string;
  /** hauteur affichée en px (l'image garde ses proportions : jamais déformée) */
  height: number;
  cx: number;
  cy: number;
  /** image (absolue) d'apparition */
  enterAt: number;
  enter?: 'slam' | 'rise' | 'none';
  /** images (absolues) des passages du reflet lumineux */
  sweeps?: number[];
  /** ouverture « en coupe » 0 → 1 */
  open?: number;
  /** position de la découpe (0–1 depuis le haut) */
  splitAt?: number;
  seed?: string;
  scale?: number;
  /** image de début de la séquence parente (les temps sont absolus) */
  offset?: number;
};

/**
 * Le produit n'est JAMAIS immobile : flottement non périodique (bruit), rotateY ±12°,
 * reflet de lumière qui le balaie, ombre douce. L'emballage n'est jamais recoloré ni déformé :
 * seules des transformations rigides (translation, rotation, échelle uniforme) sont appliquées.
 */
export const Product: React.FC<Props> = ({
  src, height, cx, cy, enterAt, enter = 'rise', sweeps = [], open = 0, splitAt = 0.46, seed = 'p', scale = 1, offset = 0,
}) => {
  const frame = useCurrentFrame() + offset;
  const t = frame / 30;
  const n1 = noise2D(seed + 'ry', t * 0.35, 0);
  const n2 = noise2D(seed + 'y', t * 0.45, 3);
  const n3 = noise2D(seed + 'rz', t * 0.3, 7);
  const rotY = Math.max(-12, Math.min(12, n1 * 13));
  const floatY = n2 * 16;
  const rotZ = n3 * 2.2;

  const e = enter === 'none' ? 1 : sp(frame, enterAt);
  const enterScale = enter === 'slam' ? 1.9 - 0.9 * e : 0.55 + 0.45 * e;
  const enterY = enter === 'rise' ? (1 - e) * 260 : 0;
  const opacity = enter === 'none' ? 1 : lin(frame, enterAt, enterAt + 4);

  const src_ = src.startsWith('http') ? src : staticFile(src);
  const shadowLift = 1 - (floatY + 16) / 64;

  // reflet : bande lumineuse qui traverse l'emballage (masquée par la forme du produit)
  let sweepX = -200;
  for (const s of sweeps) {
    if (frame >= s && frame < s + 22) sweepX = easeOut(frame, s, s + 22, -60, 160);
  }

  const imgLayer = (clip?: string, extra?: React.CSSProperties) => (
    <div style={{position: 'absolute', inset: 0, clipPath: clip, ...extra}}>
      <Img src={src_} style={{height, width: 'auto', display: 'block'}} />
      {sweepX > -100 && (
        // reflet : bande diagonale d'une copie éclaircie de l'image (pas de masque CSS : rendu stable)
        <Img src={src_} style={{
          position: 'absolute', left: 0, top: 0, height, width: 'auto', display: 'block',
          filter: 'brightness(1.9)', opacity: 0.5,
          clipPath: `polygon(${sweepX - 14}% 0%, ${sweepX + 4}% 0%, ${sweepX - 6}% 100%, ${sweepX - 24}% 100%)`,
        }} />
      )}
    </div>
  );

  const pct = splitAt * 100;
  return (
    <div
      style={{
        position: 'absolute', left: cx, top: cy,
        transform: `translate(-50%, -50%) translateY(${floatY + enterY}px) scale(${enterScale * scale})`,
        opacity,
      }}
    >
      {/* ombre douce */}
      <div
        style={{
          position: 'absolute', left: '50%', top: height * 0.97,
          width: height * 0.62, height: height * 0.09,
          transform: `translate(-50%, -50%) scale(${0.85 + shadowLift * 0.2})`,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(10px)', opacity: 0.5 + shadowLift * 0.4,
        }}
      />
      <div>
        <div style={{position: 'relative', transform: `perspective(1400px) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`}}>
          {/* gabarit invisible qui donne la taille */}
          <Img src={src_} style={{height, width: 'auto', display: 'block', visibility: 'hidden'}} />
          {open <= 0.001 ? (
            imgLayer()
          ) : (
            <>
              {imgLayer(`inset(${pct}% 0 0 0)`, {transform: `translateY(${open * 40}px)`})}
              {imgLayer(`inset(0 0 ${100 - pct}% 0)`, {
                transform: `translate(${-open * height * 0.17}px, ${-open * height * 0.36}px) rotate(${-open * 18}deg)`,
                transformOrigin: '20% 100%',
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
