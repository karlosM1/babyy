import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type BirthdayCakeProps = {
  position?: [number, number, number];
  onPointerDown?: () => void;
};

export function BirthdayCake({ position = [0, 0, 0], onPointerDown }: BirthdayCakeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flameMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const frostingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    flameMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = 1 + Math.sin(t * 8 + i) * 0.08;
      mesh.scale.setScalar(s);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.9 + Math.sin(t * 12 + i) * 0.25;
    });
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.04;
    }
    if (frostingRef.current) {
      const fm = frostingRef.current.material as THREE.MeshStandardMaterial;
      fm.emissiveIntensity = 0.12 + Math.sin(t * 2.4) * 0.06 + Math.sin(t * 5.1) * 0.03;
    }
  });

  const candles = [0.12, 0, -0.12];

  return (
    <group ref={groupRef} position={position}>
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.18, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          onPointerDown?.();
        }}
      >
        <cylinderGeometry args={[0.38, 0.42, 0.22, 20]} />
        <meshStandardMaterial color="#c68642" roughness={0.65} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 20]} />
        <meshStandardMaterial color="#b37438" roughness={0.65} />
      </mesh>
      <mesh ref={frostingRef} castShadow receiveShadow position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.36, 0.38, 0.16, 20]} />
        <meshStandardMaterial
          color="#ffe8f4"
          roughness={0.45}
          metalness={0.05}
          emissive="#ffb7d5"
          emissiveIntensity={0.12}
        />
      </mesh>
      {candles.map((x, i) => (
        <group key={i} position={[x, 0.66, 0]}>
          <mesh castShadow position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.16, 10]} />
            <meshStandardMaterial color="#fff5da" roughness={0.3} />
          </mesh>
          <mesh
            ref={(el) => {
              flameMeshes.current[i] = el;
            }}
            position={[0, 0.2, 0]}
          >
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshStandardMaterial
              color="#ffcf66"
              emissive="#ff9f1c"
              emissiveIntensity={1}
              transparent
              opacity={0.95}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
