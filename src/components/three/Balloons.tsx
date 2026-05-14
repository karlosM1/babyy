import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type BalloonProps = {
  position: [number, number, number];
  color: string;
  phase: number;
};

function Balloon({ position, color, phase }: BalloonProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.rotation.z = Math.sin(t * 1.1) * 0.08;
    ref.current.rotation.x = Math.cos(t * 0.9) * 0.05;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.55, 6]} />
        <meshStandardMaterial color="#cfcfcf" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Balloons() {
  const data = useMemo(
    () => [
      { position: [-1.35, 1.9, -0.6] as [number, number, number], color: "#fb7185", phase: 0.2 },
      { position: [-1.1, 2.15, -0.4] as [number, number, number], color: "#c4b5fd", phase: 1.1 },
      { position: [1.25, 2.05, -0.55] as [number, number, number], color: "#fcd34d", phase: 0.7 },
      { position: [1.45, 1.85, -0.35] as [number, number, number], color: "#fda4af", phase: 1.6 },
    ],
    []
  );
  return (
    <group>
      {data.map((b, index) => (
        <Balloon key={index} {...b} />
      ))}
    </group>
  );
}
