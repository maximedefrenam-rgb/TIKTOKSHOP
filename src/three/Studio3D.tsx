import React, {useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {staticFile, useCurrentFrame, useVideoConfig, Easing, interpolate} from 'remotion';
import {useLoader, useThree} from '@react-three/fiber';
import * as THREE from 'three';

/** Vues 3D disponibles pour un plan. */
export type View3D = 'problem' | 'product' | 'close' | 'open' | 'stack' | 'solved' | 'price' | 'cta';
export type Problem3D = 'battery' | 'clock' | 'tag' | 'check';

export type Shot3DRuntime = {start: number; end: number; view: View3D; preset: number};

const ease = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});

/* ------------------------------------------------------------------ décor */
const Floor: React.FC = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
    <planeGeometry args={[60, 60]} />
    <meshStandardMaterial color="#070914" metalness={0.85} roughness={0.32} transparent opacity={0.9} />
  </mesh>
);

const LightLines: React.FC<{accent: string}> = ({accent}) => (
  <group position={[0, 0, -9]}>
    {[1.2, 2.6, 4.3, 6.4].map((y, i) => (
      <mesh key={i} position={[0, y, 0]}>
        <boxGeometry args={[40, 0.025 + (i % 2) * 0.02, 0.01]} />
        <meshBasicMaterial color={i === 1 ? accent : '#5a6bff'} transparent opacity={0.22 + (i % 2) * 0.1} />
      </mesh>
    ))}
  </group>
);

const Podium: React.FC<{accent: string; y?: number; r?: number}> = ({accent, y = 0, r = 1.7}) => (
  <group position={[0, y, 0]}>
    <mesh position={[0, 0.14, 0]}>
      <cylinderGeometry args={[r, r * 1.02, 0.28, 96]} />
      <meshStandardMaterial color="#0c1024" metalness={0.9} roughness={0.25} />
    </mesh>
    <mesh position={[0, 0.285, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[r * 0.99, 0.022, 12, 128]} />
      <meshBasicMaterial color={accent} />
    </mesh>
    <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[r * 1.02, 0.012, 8, 128]} />
      <meshBasicMaterial color={accent} transparent opacity={0.5} />
    </mesh>
  </group>
);

/* ------------------------------------------------------------------ produit (vraie étiquette) */
const ProductCard: React.FC<{src: string; height: number; position?: [number, number, number]; rotY?: number; reflect?: boolean; open?: number}> = ({
  src, height, position = [0, 0, 0], rotY = 0, reflect = true, open = 0,
}) => {
  const tex = useLoader(THREE.TextureLoader, staticFile(src));
  tex.colorSpace = THREE.SRGBColorSpace;
  const img = tex.image as HTMLImageElement | undefined;
  const aspect = img && img.height ? img.width / img.height : 0.75;
  const w = height * aspect;
  const mat = (
    <meshStandardMaterial map={tex} transparent alphaTest={0.05} side={THREE.DoubleSide} roughness={0.55} metalness={0.05} />
  );
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      {/* épaisseur : copie sombre légèrement en retrait */}
      <mesh position={[0, height / 2, -0.04]}>
        <planeGeometry args={[w, height]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.05} color="#202538" />
      </mesh>
      <mesh position={[0, height / 2 + open * 0.15, open * 0.05]}>
        <planeGeometry args={[w, height]} />
        {mat}
      </mesh>
      {reflect && (
        <mesh position={[0, -height / 2, 0]} scale={[1, -1, 1]}>
          <planeGeometry args={[w, height]} />
          <meshBasicMaterial map={tex} transparent opacity={0.18} alphaTest={0.05} />
        </mesh>
      )}
    </group>
  );
};

/* ------------------------------------------------------------------ objets « problème » */
const Battery: React.FC<{level: number; color: string}> = ({level, color}) => (
  <group>
    <mesh position={[0, 1.2, 0]}>
      <boxGeometry args={[1.25, 2.3, 0.75]} />
      <meshStandardMaterial color="#2a3048" metalness={0.3} roughness={0.15} transparent opacity={0.35} />
    </mesh>
    <lineSegments position={[0, 1.2, 0]}>
      <edgesGeometry args={[new THREE.BoxGeometry(1.25, 2.3, 0.75)]} />
      <lineBasicMaterial color="#dfe4ff" />
    </lineSegments>
    <mesh position={[0, 2.48, 0]}>
      <boxGeometry args={[0.5, 0.25, 0.45]} />
      <meshStandardMaterial color="#c9cdd6" metalness={0.9} roughness={0.2} />
    </mesh>
    <mesh position={[0, 0.15 + (2.05 * level) / 2, 0]}>
      <boxGeometry args={[1.05, Math.max(0.05, 2.05 * level), 0.6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  </group>
);

const Clock: React.FC<{color: string; hourAngle: number; ring: number}> = ({color, hourAngle, ring}) => (
  <group position={[0, 1.4, 0]} rotation={[0, 0, Math.sin(ring * 40) * 0.12 * ring]}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[1.1, 1.1, 0.35, 64]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
    </mesh>
    <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.95, 0.95, 0.02, 64]} />
      <meshStandardMaterial color="#f4f4f6" />
    </mesh>
    {[-0.7, 0.7].map((x) => (
      <mesh key={x} position={[x, 1.05, 0]}>
        <sphereGeometry args={[0.32, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
    ))}
    <mesh position={[0, 0, 0.21]} rotation={[0, 0, -hourAngle]}>
      <boxGeometry args={[0.07, 0.55, 0.02]} />
      <meshBasicMaterial color="#111" />
    </mesh>
    <mesh position={[0, 0.3, 0.22]}>
      <boxGeometry args={[0.05, 0.7, 0.02]} />
      <meshBasicMaterial color="#111" />
    </mesh>
  </group>
);

const Tag: React.FC<{color: string}> = ({color}) => (
  <group position={[0, 1.4, 0]} rotation={[0, 0, -0.25]}>
    <mesh>
      <boxGeometry args={[1.7, 1.15, 0.12]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
    </mesh>
    <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
      <boxGeometry args={[0.82, 0.82, 0.12]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
    </mesh>
    <mesh position={[-1.15, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.12, 0.04, 8, 32]} />
      <meshStandardMaterial color="#e8e8e8" metalness={0.9} />
    </mesh>
  </group>
);

const Check: React.FC<{ok: boolean; color: string}> = ({ok, color}) => (
  <group position={[0, 1.4, 0]}>
    {ok ? (
      <>
        <mesh position={[-0.35, -0.15, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.32, 0.9, 0.3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.25, 0.25, 0]} rotation={[0, 0, -Math.PI / 5]}>
          <boxGeometry args={[0.32, 1.7, 0.3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
      </>
    ) : (
      [Math.PI / 4, -Math.PI / 4].map((r) => (
        <mesh key={r} rotation={[0, 0, r]}>
          <boxGeometry args={[0.36, 2.2, 0.3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
      ))
    )}
  </group>
);

const RED = '#ff3b30';
const GREEN = '#2ee66b';

const ProblemObject: React.FC<{kind: Problem3D; solved: boolean; t: number; accent: string}> = ({kind, solved, t, accent}) => {
  if (kind === 'battery') return <Battery level={solved ? Math.min(1, 0.08 + t * 2) : Math.max(0.06, 0.18 - t * 0.08)} color={solved ? GREEN : RED} />;
  if (kind === 'clock') return <Clock color={solved ? GREEN : RED} hourAngle={solved ? (7 / 12) * Math.PI * 2 : (3 / 12) * Math.PI * 2} ring={solved ? 0 : Math.max(0, 1 - t * 0.6)} />;
  if (kind === 'tag') return <Tag color={solved ? accent : RED} />;
  return <Check ok={solved} color={solved ? GREEN : RED} />;
};

/* ------------------------------------------------------------------ caméra par plan */
const CAMS: {from: [number, number, number]; to: [number, number, number]; look: [number, number, number]}[] = [
  {from: [0, 2.6, 10.5], to: [0, 2.5, 8.6], look: [0, 2.9, 0]}, // poussée
  {from: [-3.4, 2.5, 9.6], to: [-1.7, 2.4, 9.4], look: [0, 2.9, 0]}, // travelling latéral
  {from: [0, 1.2, 9.4], to: [0, 1.3, 8.4], look: [0, 3.0, 0]}, // contre-plongée
  {from: [2.9, 3.6, 9.6], to: [1.5, 3.3, 9.4], look: [0, 2.8, 0]}, // plongée diagonale
];
const CLOSE = {from: [0.5, 1.9, 5.2] as [number, number, number], to: [-0.3, 1.8, 4.5] as [number, number, number], look: [0, 2.3, 0] as [number, number, number]};
const PROBLEM = {from: [0, 1.6, 6.2] as [number, number, number], to: [0, 1.6, 5.4] as [number, number, number], look: [0, 1.75, 0] as [number, number, number]};
const STACK = {from: [0, 3.0, 9.8] as [number, number, number], to: [0.8, 2.9, 9.0] as [number, number, number], look: [0, 2.9, 0] as [number, number, number]};

const CameraRig: React.FC<{p: number; preset: number; close: boolean; mode?: 'problem' | 'stack'}> = ({p, preset, close, mode}) => {
  const {camera} = useThree();
  const c = mode === 'problem' ? PROBLEM : mode === 'stack' ? STACK : close ? CLOSE : CAMS[preset % CAMS.length];
  const lerp = (a: number, b: number) => a + (b - a) * p;
  const cam = camera as THREE.PerspectiveCamera;
  cam.fov = 38;
  cam.position.set(lerp(c.from[0], c.to[0]), lerp(c.from[1], c.to[1]), lerp(c.from[2], c.to[2]));
  cam.lookAt(...c.look);
  cam.updateProjectionMatrix();
  return null;
};

/* ------------------------------------------------------------------ scène */
export const Studio3D: React.FC<{
  shot: Shot3DRuntime;
  accent: string;
  productImage: string;
  productHeight?: number;
  problem: Problem3D;
}> = ({shot, accent, productImage, productHeight = 2.5, problem}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const t = (frame - shot.start) / fps;
  const dur = Math.max(1, shot.end - shot.start);
  const p = ease(frame, shot.start, shot.start + dur, 0, 1);
  const enter = ease(frame, shot.start, shot.start + 7, 0, 1);
  const spin = (shot.preset % 2 ? -1 : 1) * (0.35 - 0.5 * p);

  const isProblem = shot.view === 'problem';
  const showProblem = isProblem || shot.view === 'solved' || shot.view === 'price';
  const solved = shot.view !== 'problem';
  const showProduct = !isProblem;
  const close = shot.view === 'close';
  const prodY = (1 - enter) * 1.6;

  const stack = useMemo(() => [0, 1, 2, 3, 4, 5], []);

  return (
    <ThreeCanvas width={width} height={height} style={{position: 'absolute', inset: 0}} gl={{alpha: true, antialias: true}}>
      <CameraRig p={p} preset={shot.preset} close={close} mode={isProblem ? 'problem' : shot.view === 'stack' ? 'stack' : undefined} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 6]} intensity={1.6} />
      <pointLight position={[-4, 3, 3]} intensity={18} color={accent} distance={14} />
      <pointLight position={[4, 2, -2]} intensity={10} color="#6a7bff" distance={12} />
      <Floor />
      <LightLines accent={accent} />

      {isProblem && (
        <group scale={0.82 + 0.08 * p} rotation={[0.08, spin * 1.4, 0]} position={[0, 0.15, 0]}>
          <ProblemObject kind={problem} solved={false} t={t} accent={accent} />
        </group>
      )}

      {showProduct && shot.view !== 'stack' && (
        <>
          <Podium accent={accent} />
          <group scale={0.55 + 0.45 * enter} rotation={[shot.view === 'open' ? -0.35 * Math.min(1, t * 2) : 0, spin * 0.6, 0]}
            position={[0, 0.29 + prodY + (shot.view === 'open' ? 0.5 * Math.min(1, t * 2) : 0), 0]}>
            <ProductCard src={productImage} height={productHeight} />
          </group>
          {shot.view === 'open' && (
            <mesh position={[0, productHeight * 0.55, -0.6]}>
              <circleGeometry args={[1.8 * Math.min(1, t * 2), 64]} />
              <meshBasicMaterial color={accent} transparent opacity={0.25} />
            </mesh>
          )}
        </>
      )}

      {shot.view === 'stack' && (
        <>
          <Podium accent={accent} r={1.9} />
          {stack.map((i) => {
            const d = ease(frame, shot.start + i * 3, shot.start + i * 3 + 8, 0, 1);
            if (d <= 0) return null;
            return (
              <group key={i} position={[(i % 2 ? 0.12 : -0.12), 0.32 + i * 0.5 + (1 - d) * 4, 0.4]} rotation={[-Math.PI / 2 + 0.75, 0, (i % 3 - 1) * 0.1]}>
                <ProductCard src={productImage} height={2.0} reflect={false} />
              </group>
            );
          })}
        </>
      )}

      {showProblem && !isProblem && (
        <group position={[2.3, 3.6, -1.5]} scale={0.55} rotation={[0, -0.4 + 0.3 * p, 0]}>
          <ProblemObject kind={problem} solved={solved} t={t} accent={accent} />
        </group>
      )}
    </ThreeCanvas>
  );
};
