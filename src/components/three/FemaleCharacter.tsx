import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type FemaleCharacterProps = {
  presentMoment: number | null;
};

export function FemaleCharacter({ presentMoment }: FemaleCharacterProps) {
  const rootRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!rootRef.current || !bodyRef.current) return;
    const bounce = Math.abs(Math.sin(t * 3.2)) * 0.06;
    let cheer = 0;
    if (presentMoment !== null) {
      const age = (performance.now() - presentMoment) / 1000;
      if (age < 2.2) {
        cheer = Math.sin(age * 14) * 0.12 * (1 - age / 2.2);
      }
    }
    bodyRef.current.position.y = 0.95 + bounce + cheer * 0.25;
    bodyRef.current.rotation.z = cheer;
    rootRef.current.position.x = 0.85 + Math.sin(t * 0.55 + 1) * 0.025;
    rootRef.current.rotation.y = -0.45 + Math.sin(t * 0.35) * 0.05;
  });

  return (
    <group ref={rootRef} position={[0.85, 0, 0]}>
      <group ref={bodyRef} position={[0, 0.95, 0]}>
        <mesh castShadow position={[-0.1, -0.45, 0]}>
          <capsuleGeometry args={[0.08, 0.34, 6, 10]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.45} />
        </mesh>
        <mesh castShadow position={[0.1, -0.45, 0]}>
          <capsuleGeometry args={[0.08, 0.34, 6, 10]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.45} />
        </mesh>
        <mesh castShadow position={[0, -0.05, 0]}>
          <coneGeometry args={[0.38, 0.55, 18]} />
          <meshStandardMaterial color="#f472b6" roughness={0.45} metalness={0.05} />
        </mesh>
        <mesh castShadow position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.22, 18]} />
          <meshStandardMaterial color="#fbcfe8" roughness={0.4} />
        </mesh>
        <mesh castShadow position={[-0.28, 0.18, 0.05]} rotation={[0.25, 0, 0.45]}>
          <capsuleGeometry args={[0.055, 0.24, 6, 8]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.45} />
        </mesh>
        <mesh castShadow position={[0.28, 0.2, 0.05]} rotation={[0.25, 0, -0.45]}>
          <capsuleGeometry args={[0.055, 0.24, 6, 8]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.45} />
        </mesh>
        <mesh castShadow position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.1, 12]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.5} />
        </mesh>
        <mesh castShadow position={[0, 0.62, 0.02]}>
          <sphereGeometry args={[0.19, 18, 18]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.45} />
        </mesh>
        <mesh castShadow position={[0, 0.74, -0.06]}>
          <sphereGeometry args={[0.2, 16, 14]} />
          <meshStandardMaterial color="#5b3a29" roughness={0.75} />
        </mesh>
        <mesh castShadow position={[0.16, 0.7, 0.05]} rotation={[0.2, 0, -0.5]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#5b3a29" roughness={0.75} />
        </mesh>
        <mesh castShadow position={[-0.16, 0.7, 0.05]} rotation={[0.2, 0, 0.5]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#5b3a29" roughness={0.75} />
        </mesh>
        <mesh position={[0.1, 0.6, 0.16]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.06, 0.015, 0.01]} />
          <meshStandardMaterial color="#2f2a28" />
        </mesh>
        <mesh position={[-0.1, 0.6, 0.16]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.06, 0.015, 0.01]} />
          <meshStandardMaterial color="#2f2a28" />
        </mesh>
        <mesh position={[0, 0.54, 0.17]} rotation={[-0.15, 0, 0]}>
          <torusGeometry args={[0.04, 0.012, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#c45c7a" roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}
