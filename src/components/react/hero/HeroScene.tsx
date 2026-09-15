import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, Line } from "@react-three/drei";
import * as THREE from "three";

const SYMBOLS = ["SQL", "DAX", "π", "AI", "01", "10", "BI", "ETL", "{ }", "Σ"];
const PALETTE = ["#22d3ee", "#8b5cf6", "#ec4899", "#3b82f6", "#34d399", "#fb923c"];

/** Converts a fraction of the visible frustum (at a given depth) into a world position, so
 * edge-framed elements stay clear of the centered hero text regardless of viewport aspect ratio. */
function useEdgePosition(fx: number, fy: number, z: number): [number, number, number] {
  const camera = useThree((s) => s.camera);
  const viewport = useThree((s) => s.viewport);
  return useMemo(() => {
    const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, z));
    return [fx * (vp.width / 2), fy * (vp.height / 2), z];
  }, [camera, viewport, fx, fy, z]);
}

function ParticleField({ count = 700 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#7dd3fc" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function FloatingSymbol({ fx, fy, z, text, color }: { fx: number; fy: number; z: number; text: string; color: string }) {
  const position = useEdgePosition(fx, fy, z);
  return (
    <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.3}>
      <Text position={position} fontSize={0.62} color={color} anchorX="center" anchorY="middle" fillOpacity={0.95}>
        {text}
      </Text>
    </Float>
  );
}

function BarChartNode({ fx, fy, z }: { fx: number; fy: number; z: number }) {
  const position = useEdgePosition(fx, fy, z);
  const heights = [0.6, 1.1, 0.8, 1.4, 0.5];
  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={1}>
      <group position={position} scale={1.3}>
        {heights.map((h, i) => (
          <mesh key={i} position={[i * 0.32 - 0.6, h / 2, 0]}>
            <boxGeometry args={[0.22, h, 0.22]} />
            <meshStandardMaterial color={PALETTE[i % PALETTE.length]} emissive={PALETTE[i % PALETTE.length]} emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function DonutChart({ fx, fy, z }: { fx: number; fy: number; z: number }) {
  const position = useEdgePosition(fx, fy, z);
  return (
    <Float speed={1.6} rotationIntensity={1} floatIntensity={1.2}>
      <mesh position={position} rotation={[Math.PI / 2.4, 0, 0]} scale={1.2}>
        <torusGeometry args={[0.7, 0.22, 16, 48]} />
        <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={0.9} roughness={0.3} />
      </mesh>
    </Float>
  );
}

function NetworkNodes({ isMobile }: { isMobile: boolean }) {
  const layout = isMobile
    ? ([[-0.7, 0.88, -4.5], [-0.4, 0.9, -5], [-0.75, -0.82, -4], [-0.42, -0.86, -4.5]] as const)
    : ([[-0.82, 0.42, -4.5], [-0.65, 0.62, -5], [-0.9, 0.14, -4], [-0.78, -0.3, -4.5]] as const);
  const a = useEdgePosition(...layout[0]);
  const b = useEdgePosition(...layout[1]);
  const c = useEdgePosition(...layout[2]);
  const d = useEdgePosition(...layout[3]);
  const nodes = [a, b, c, d];

  return (
    <group>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.4} />
        </mesh>
      ))}
      {nodes.slice(0, -1).map((p, i) => (
        <Line key={i} points={[p, nodes[i + 1]]} color="#22d3ee" transparent opacity={0.45} lineWidth={1} />
      ))}
    </group>
  );
}

function Rig({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ camera, pointer }) => {
    target.current.x += (pointer.x * 0.6 - target.current.x) * 0.04;
    target.current.y += (pointer.y * 0.4 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y * 0.6;
    const progress = scrollProgress.current ?? 0;
    camera.position.z = 8 - progress * 4;
    camera.lookAt(0, 0, -3);
  });

  return null;
}

interface HeroSceneProps {
  scrollProgress: React.RefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}

// Fractions of the half-width/half-height of the visible frustum at each element's depth:
// this keeps everything framed around the edges (clear of the centered hero text) on any
// viewport size or aspect ratio, unlike fixed world-unit coordinates.
const SYMBOL_LAYOUT: { fx: number; fy: number; z: number }[] = [
  [-0.72, 0.5, -3.5],
  [0.78, 0.68, -4.5],
  [-0.8, -0.58, -3.2],
  [0.78, -0.6, -3.6],
  [-0.85, 0.08, -5],
  [0.85, 0.1, -5.4],
  [-0.5, 0.68, -4.5],
  [0.56, 0.7, -4.8],
  [-0.46, -0.72, -4],
  [0.46, -0.75, -4.3],
].map(([fx, fy, z]) => ({ fx, fy, z }));

// Narrow/portrait screens have almost no vertical margin around the centered text, so mobile
// spreads the full symbol set across the top and bottom bands instead of the sides. The bottom
// band leaves the outer corners (~±0.8) clear for the bar/donut chart nodes.
const MOBILE_SYMBOL_LAYOUT: { fx: number; fy: number; z: number }[] = [
  [-0.82, 0.86, -4],
  [-0.48, 0.92, -4.8],
  [-0.16, 0.84, -4.2],
  [0.16, 0.92, -5],
  [0.48, 0.84, -4.4],
  [0.82, 0.9, -4.6],
  [-0.52, -0.8, -4],
  [-0.18, -0.86, -4.6],
  [0.18, -0.78, -4.2],
  [0.52, -0.86, -5],
].map(([fx, fy, z]) => ({ fx, fy, z }));

export default function HeroScene({ scrollProgress, reducedMotion, isMobile }: HeroSceneProps) {
  const layout = isMobile ? MOBILE_SYMBOL_LAYOUT : SYMBOL_LAYOUT;
  const symbols = isMobile ? SYMBOLS.slice(0, layout.length) : SYMBOLS;

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#05060f"]} />
      <fog attach="fog" args={["#05060f", 9, 21]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#8b5cf6" />
      <pointLight position={[-5, -3, -2]} intensity={1.2} color="#22d3ee" />

      <ParticleField count={reducedMotion ? 200 : 700} />

      <NetworkNodes isMobile={isMobile} />
      <BarChartNode fx={isMobile ? 0.8 : 0.78} fy={isMobile ? -0.9 : -0.62} z={isMobile ? -4.8 : -4} />
      <DonutChart fx={isMobile ? -0.8 : -0.76} fy={isMobile ? -0.9 : -0.6} z={isMobile ? -5.2 : -4.2} />

      {symbols.map((s, i) => (
        <FloatingSymbol key={s} text={s} color={PALETTE[i % PALETTE.length]} {...layout[i]} />
      ))}

      {!reducedMotion && <Rig scrollProgress={scrollProgress} />}
    </Canvas>
  );
}
