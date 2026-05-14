import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BirthdayCake } from "./BirthdayCake";

type MaleCharacterProps = {
  onCakeClick?: () => void;
};

export function MaleCharacter({ onCakeClick }: MaleCharacterProps) {
  const rootRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!rootRef.current || !torsoRef.current) return;
    const breath = Math.sin(t * 2.2) * 0.015;
    torsoRef.current.scale.set(1 + breath, 1 + breath * 0.6, 1 + breath);
    rootRef.current.position.x = -0.85 + Math.sin(t * 0.5) * 0.03;
    rootRef.current.rotation.y = 0.35 + Math.sin(t * 0.4) * 0.04;
    torsoRef.current.rotation.z = Math.sin(t * 0.9) * 0.02;
  });

  return (
    <group ref={rootRef} position={[-0.85, 0, 0]}>
      <group ref={torsoRef} position={[0, 0.95, 0]}>
        {/* Legs */}
        <mesh castShadow position={[-0.12, -0.45, 0]}>
          <capsuleGeometry args={[0.09, 0.35, 6, 10]} />
          <meshStandardMaterial color="#3d4f63" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0.12, -0.45, 0]}>
          <capsuleGeometry args={[0.09, 0.35, 6, 10]} />
          <meshStandardMaterial color="#3d4f63" roughness={0.7} />
        </mesh>
        {/* Body / shirt */}
        <mesh castShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[0.42, 0.52, 0.28]} />
          <meshStandardMaterial color="#7eb6ff" roughness={0.55} />
        </mesh>
        {/* Arms — offering pose */}
        <mesh castShadow position={[-0.32, 0.12, 0.12]} rotation={[0.35, 0, -0.55]}>
          <capsuleGeometry args={[0.06, 0.28, 6, 8]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.45} />
        </mesh>
        <mesh castShadow position={[0.34, 0.08, 0.18]} rotation={[0.5, -0.2, 0.65]}>
          <capsuleGeometry args={[0.06, 0.32, 6, 8]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.45} />
        </mesh>
        {/* Neck */}
        <mesh castShadow position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.1, 12]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.5} />
        </mesh>
        {/* Head */}
        <mesh castShadow position={[0, 0.58, 0.02]}>
          <sphereGeometry args={[0.2, 18, 18]} />
          <meshStandardMaterial color="#ffd6ba" roughness={0.45} />
        </mesh>
        {/* Hair */}
        <mesh castShadow position={[0, 0.72, -0.05]}>
          <sphereGeometry args={[0.18, 14, 12]} />
          <meshStandardMaterial color="#4a3728" roughness={0.85} />
        </mesh>
        {/* Simple face */}
        <mesh position={[0.12, 0.58, 0.17]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color="#2f2a28" roughness={0.3} />
        </mesh>
        <mesh position={[-0.12, 0.58, 0.17]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color="#2f2a28" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.52, 0.18]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.01]} />
          <meshStandardMaterial color="#c45c7a" roughness={0.35} />
        </mesh>
      </group>
      {/* Cake in hands — offset toward partner */}
      <BirthdayCake position={[0.55, 1.05, 0.35]} onPointerDown={onCakeClick} />
    </group>
  );
}
