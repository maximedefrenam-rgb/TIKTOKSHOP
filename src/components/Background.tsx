import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BRAND, SAFE_CX} from '../brand';

/** Noir profond + léger dégradé radial de l'accent au centre + grain subtil. */
export const Background: React.FC<{accent: string}> = ({accent}) => (
  <AbsoluteFill
    style={{
      backgroundColor: BRAND.colors.bg,
      backgroundImage: `radial-gradient(ellipse 75% 50% at ${(SAFE_CX / BRAND.video.width) * 100}% 52%, ${accent}38 0%, ${accent}12 45%, transparent 75%)`,
    }}
  />
);

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
