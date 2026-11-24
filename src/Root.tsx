import React from 'react';
import {Composition} from 'remotion';
import {BRAND} from './brand';
import {ShopVideo, durationFrames} from './templates/ShopVideo';
import {VIDEOS} from '../videos';

export const RemotionRoot: React.FC = () => (
  <>
    {VIDEOS.map((cfg) => (
      <Composition
        key={cfg.id}
        id={cfg.id}
        component={ShopVideo}
        durationInFrames={durationFrames(cfg)}
        fps={BRAND.video.fps}
        width={BRAND.video.width}
        height={BRAND.video.height}
        defaultProps={{config: cfg}}
      />
    ))}
  </>
);
