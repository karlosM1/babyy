import { useMemo } from "react";
import * as THREE from "three";

export function SceneLights() {
  const warm = useMemo(() => new THREE.Color("#fff1e6"), []);

  return (
    <>
      <ambientLight intensity={0.55} color={warm} />
      <directionalLight
        castShadow
        position={[4, 8, 5]}
        intensity={0.85}
        color="#ffffff"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, 3, 2]} intensity={0.35} color="#f9c7ff" />
      <pointLight position={[3, 2, -3]} intensity={0.25} color="#ffd6a8" />
    </>
  );
}
