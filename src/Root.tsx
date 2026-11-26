import React from 'react';
import {Composition} from 'remotion';
import {BRAND} from './brand';
import {ShopVideo, durationFrames} from './templates/ShopVideo';
import {VIDEOS} from '../videos';
import {VIDEOS3D} from '../videos3d';
import {Video3D, durationFrames3D} from './three/Video3D';
import {VideoMix, durationFramesMix} from './mix/VideoMix';
import {VIDEOSMIX} from '../videosmix';

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
    {VIDEOS3D.map((cfg) => (
      <Composition key={cfg.id} id={cfg.id} component={Video3D} durationInFrames={durationFrames3D(cfg)} fps={30}
        width={1080} height={1920} defaultProps={{config: cfg}} />
    ))}
    {VIDEOSMIX.map((cfg) => (
      <Composition key={cfg.id} id={cfg.id} component={VideoMix} durationInFrames={durationFramesMix(cfg)} fps={30}
        width={1080} height={1920} defaultProps={{config: cfg}} />
    ))}
  </>
);
