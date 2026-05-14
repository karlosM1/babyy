import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type HeartDatum = {
  position: [number, number, number];
  speed: number;
  phase: number;
  scale: number;
  color: string;
};

function HeartShape({ color }: { color: string }) {
  return (
    <mesh castShadow>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.35} />
    </mesh>
  );
}

export function FloatingHearts() {
  const groupRef = useRef<THREE.Group>(null);
  const hearts = useMemo<HeartDatum[]>(
    () => [
      { position: [-0.3, 0.4, 0.5], speed: 0.35, phase: 0, scale: 1, color: "#fb7185" },
      { position: [0.2, 0.6, -0.4], speed: 0.42, phase: 1.2, scale: 0.85, color: "#f472b6" },
      { position: [0.5, 0.3, 0.3], speed: 0.38, phase: 2.1, scale: 0.9, color: "#fda4af" },
      { position: [-0.55, 0.55, -0.2], speed: 0.33, phase: 0.8, scale: 0.75, color: "#fecdd3" },
      { position: [0, 0.8, 0.6], speed: 0.4, phase: 2.6, scale: 1.05, color: "#fbcfe8" },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const h = hearts[i];
      if (!h) return;
      const y = ((h.position[1] + t * h.speed + h.phase) % 1.4) - 0.2;
      child.position.set(h.position[0] + Math.sin(t + h.phase) * 0.08, y, h.position[2]);
      const s = h.scale * (0.95 + Math.sin(t * 2 + h.phase) * 0.05);
      child.scale.setScalar(s);
    });
  });

  return (
    <group ref={groupRef}>
      {hearts.map((h, i) => (
        <group key={i} position={h.position}>
          <group scale={h.scale}>
            <HeartShape color={h.color} />
            <mesh position={[0.05, 0, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color={h.color}
                emissive={h.color}
                emissiveIntensity={0.3}
                roughness={0.35}
              />
            </mesh>
            <mesh position={[-0.05, 0, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color={h.color}
                emissive={h.color}
                emissiveIntensity={0.3}
                roughness={0.35}
              />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}
