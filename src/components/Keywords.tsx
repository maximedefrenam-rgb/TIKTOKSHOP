import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BRAND, SAFE_CX, SAFE_W} from '../brand';
import {sp, SNAP, s2f, resolveColor} from '../lib/anim';
import type {Keyword} from '../types';

/** Taille qui tient dans la zone de sécurité (Anton est condensée : ~0,48 em par caractère). */
export const fitSize = (text: string, size: number, small = false) => {
  const longest = Math.max(...text.split('\n').map((l) => l.length), 1);
  const factor = small ? 0.62 : 0.5;
  return Math.min(size, SAFE_W / (longest * factor));
};

export const BigText: React.FC<{
  text: string; size: number; color: string; y: number; progress: number; small?: boolean; rotate?: number;
}> = ({text, size, color, y, progress, small, rotate = 0}) => {
  const fs = fitSize(text, size, small);
  return (
    <div
      style={{
        position: 'absolute', left: SAFE_CX, top: y, width: SAFE_W,
        transform: `translate(-50%, -50%) scale(${progress}) rotate(${(1 - progress) * -6 + rotate}deg)`,
        opacity: Math.min(1, progress * 3),
        textAlign: 'center',
        fontFamily: small ? BRAND.fonts.body : BRAND.fonts.title,
        fontWeight: small ? 700 : 400,
        fontSize: fs, lineHeight: 0.98, color,
        textTransform: small ? 'none' : 'uppercase',
        letterSpacing: small ? 0 : 1,
        whiteSpace: 'pre-line',
        WebkitTextStroke: small ? undefined : '4px #0B0B0F', paintOrder: 'stroke fill',
        textShadow: `0 10px 40px rgba(0,0,0,0.7)${color !== BRAND.colors.text ? `, 0 0 40px ${color}55` : ''}`,
      }}
    >
      {text}
    </div>
  );
};

/** Mots-clés calés sur la voix. Les temps sont absolus ; `offset` = image de début de la séquence. */
export const Keywords: React.FC<{keywords: Keyword[]; sceneTo: number; offset: number; accent: string; defaultY: number}> = ({
  keywords, sceneTo, offset, accent, defaultY,
}) => {
  const frame = useCurrentFrame() + offset;
  let stackIdx = 0;
  return (
    <>
      {keywords.map((k, i) => {
        const size = k.size ?? (k.small ? 54 : 150);
        const next = keywords.slice(i + 1).find((o) => !o.stack || !k.stack);
        const until = k.until ?? (k.stack ? sceneTo : next ? next.at : sceneTo);
        let y = k.y ?? defaultY;
        if (k.stack && k.y === undefined) {
          y = defaultY + stackIdx * fitSize(k.text, size, k.small) * 1.05;
          stackIdx++;
        }
        const a = s2f(k.at);
        const u = s2f(until);
        if (frame < a || frame > u + 6) return null;
        const pin = sp(frame, a);
        const pout = frame > u ? 1 - sp(frame, u, SNAP) : 1;
        return (
          <BigText
            key={i} text={k.text} size={size} small={k.small} y={y}
            color={resolveColor(k.color ?? (k.small ? 'white' : 'white'), accent)}
            progress={Math.max(0, pin * pout)}
          />
        );
      })}
    </>
  );
};
