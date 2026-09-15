import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function latLongToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const MARKERS = [
  { lat: 37, lon: -95, label: "USA" },
  { lat: 51, lon: 10, label: "EU" },
  { lat: 20, lon: 78, label: "India" },
  { lat: 35, lon: 105, label: "China" },
  { lat: -25, lon: 133, label: "Australia" },
];

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const dotPositions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < 900; i++) {
      const phi = Math.acos(-1 + (2 * i) / 900);
      const theta = Math.sqrt(900 * Math.PI) * phi;
      const v = new THREE.Vector3().setFromSphericalCoords(1.5, phi, theta);
      pts.push(v.x, v.y, v.z);
    }
    return new Float32Array(pts);
  }, []);

  const markerVecs = useMemo(() => MARKERS.map((m) => latLongToVec3(m.lat, m.lon, 1.52)), []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#60a5fa" transparent opacity={0.85} sizeAttenuation />
      </points>

      {markerVecs.map((v, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={1.4} />
        </mesh>
      ))}

      {markerVecs.slice(0, -1).map((v, i) => {
        const start = v;
        const end = markerVecs[i + 1];
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.1);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(24);
        return <Line key={i} points={points} color="#22d3ee" transparent opacity={0.5} lineWidth={1} />;
      })}
    </group>
  );
}

export default function GlobeViz() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070a18] sm:h-96">
      <Canvas dpr={1} camera={{ position: [0, 0, 4.2], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#8b5cf6" />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
