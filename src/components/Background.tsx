import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {BRAND, SAFE_CX} from '../brand';
import {rand} from '../lib/anim';

/** Noir profond + léger dégradé radial de l'accent au centre + grain subtil. */
export const Background: React.FC<{accent: string}> = ({accent}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  // le halo se balade et respire (bruit, jamais en boucle)
  const cx = (SAFE_CX / BRAND.video.width) * 100 + 9 * noise2D('bgx', t * 0.12, 0);
  const cy = 52 + 7 * noise2D('bgy', t * 0.1, 3);
  const sz = 75 + 10 * noise2D('bgs', t * 0.15, 6);
  return (
    <AbsoluteFill style={{backgroundColor: BRAND.colors.bg, overflow: 'hidden'}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(ellipse ${sz}% ${sz * 0.66}% at ${cx}% ${cy}%, ${accent}40 0%, ${accent}14 45%, transparent 75%)`}} />
      {/* particules lumineuses qui montent en dérivant (vitesses et départs pseudo-aléatoires : pas de boucle visible) */}
      {Array.from({length: 26}).map((_, i) => {
        const speed = 40 + rand(i + 3) * 90;           // px / s
        const x0 = rand(i + 11) * BRAND.video.width;
        const y = (BRAND.video.height + 120) - ((rand(i + 29) * 2400 + t * speed) % (BRAND.video.height + 240));
        const x = x0 + 60 * noise2D('px' + i, t * 0.2, i);
        const r = 3 + rand(i + 47) * 9;
        const o = 0.12 + rand(i + 61) * 0.3;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r, height: r, borderRadius: '50%',
          background: i % 4 ? accent : '#FFFFFF', opacity: o, filter: `blur(${r > 8 ? 3 : 1}px)`}} />;
      })}
    </AbsoluteFill>
  );
};

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity: 0.09, mixBlendMode: 'overlay'}}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 997} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};
