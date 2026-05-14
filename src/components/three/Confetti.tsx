import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 48;

export function Confetti() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const velocities = useMemo(() => new Float32Array(COUNT * 3), []);
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1.6, 0.2), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.4,
        metalness: 0.05,
      }),
    []
  );
  const palette = useMemo(
    () => [
      new THREE.Color("#fb7185"),
      new THREE.Color("#fcd34d"),
      new THREE.Color("#c4b5fd"),
      new THREE.Color("#6ee7b7"),
      new THREE.Color("#93c5fd"),
    ],
    []
  );

  useLayoutEffect(() => {
    let frame = 0;
    const init = () => {
      const instanced = meshRef.current;
      if (!instanced) {
        frame = requestAnimationFrame(init);
        return;
      }
      for (let i = 0; i < COUNT; i++) {
        velocities[i * 3] = (Math.random() - 0.5) * 0.35;
        velocities[i * 3 + 1] = -0.25 - Math.random() * 0.55;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
        dummy.position.set((Math.random() - 0.5) * 3.2, 1.8 + Math.random() * 1.2, (Math.random() - 0.5) * 1.6);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        dummy.scale.setScalar(0.06 + Math.random() * 0.05);
        dummy.updateMatrix();
        instanced.setMatrixAt(i, dummy.matrix);
        instanced.setColorAt(i, palette[i % palette.length]!);
      }
      instanced.instanceMatrix.needsUpdate = true;
      if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
    };
    frame = requestAnimationFrame(init);
    return () => cancelAnimationFrame(frame);
  }, [dummy, palette, velocities]);

  useFrame((_, delta) => {
    const instanced = meshRef.current;
    if (!instanced) return;
    for (let i = 0; i < COUNT; i++) {
      instanced.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      dummy.position.x += velocities[i * 3]! * delta * 1.2;
      dummy.position.y += velocities[i * 3 + 1]! * delta * 1.2;
      dummy.position.z += velocities[i * 3 + 2]! * delta * 1.2;
      dummy.rotation.x += delta * 2.5;
      dummy.rotation.y += delta * 1.8;
      if (dummy.position.y < -0.2) {
        dummy.position.y = 2.2 + Math.random() * 0.8;
        dummy.position.x = (Math.random() - 0.5) * 3.2;
        dummy.position.z = (Math.random() - 0.5) * 1.6;
      }
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, COUNT]} frustumCulled={false} />;
}
