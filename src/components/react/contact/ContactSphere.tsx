import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlowSphere({ pointCount }: { pointCount: number }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      const v = new THREE.Vector3().setFromSphericalCoords(2.2, phi, theta);
      pts.push(v.x, v.y, v.z);
    }
    return new Float32Array(pts);
  }, [pointCount]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.25} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#a78bfa" transparent opacity={0.8} />
      </points>
    </group>
  );
}

export default function ContactSphere({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={isMobile ? [1, 1] : [1, 1.5]} camera={{ position: [0, 0, isMobile ? 7.5 : 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#22d3ee" />
        <GlowSphere pointCount={isMobile ? 220 : 500} />
      </Canvas>
    </div>
  );
}
