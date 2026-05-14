import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Balloons } from "./three/Balloons";
import { Confetti } from "./three/Confetti";
import { FemaleCharacter } from "./three/FemaleCharacter";
import { FloatingHearts } from "./three/FloatingHearts";
import { MaleCharacter } from "./three/MaleCharacter";
import { SceneLights } from "./three/SceneLights";

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.14) * 0.22;
    camera.position.y = 1.42 + Math.sin(t * 0.19) * 0.05;
    camera.position.z = 4.15 + Math.sin(t * 0.11) * 0.06;
    camera.lookAt(0, 0.85, 0);
  });
  return null;
}

function SceneContent({ onCakeClick, presentMoment }: { onCakeClick?: () => void; presentMoment: number | null }) {
  return (
    <>
      <color attach="background" args={["#fde7f3"]} />
      <fog attach="fog" args={["#fde7f3", 6, 18]} />
      <CameraRig />
      <SceneLights />
      <Suspense fallback={null}>
        <Sparkles count={36} scale={[5.5, 2.4, 3.2]} size={1.6} speed={0.35} color="#ffdcef" position={[0, 1.15, 0]} />
      </Suspense>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#fff0f7" roughness={0.9} metalness={0} />
      </mesh>
      <MaleCharacter onCakeClick={onCakeClick} />
      <FemaleCharacter presentMoment={presentMoment} />
      <Balloons />
      <FloatingHearts />
      <Confetti />
      <ContactShadows opacity={0.35} scale={12} blur={2.4} far={6} color="#d4b8c7" position={[0, 0.01, 0]} />
    </>
  );
}

type BirthdaySceneProps = {
  onCakeClick?: () => void;
  className?: string;
};

export function BirthdayScene({ onCakeClick, className = "" }: BirthdaySceneProps) {
  const [presentMoment, setPresentMoment] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setPresentMoment(performance.now()), 1400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      role="img"
      aria-label="Animated 3D birthday scene with two characters, a cake with candles, balloons, hearts, and confetti."
      className={`relative h-[min(72vh,560px)] w-full min-h-[280px] overflow-hidden rounded-3xl ${className}`}
    >
      <Canvas
        className="pointer-events-none h-full w-full touch-pan-y"
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.42, 4.15], fov: 42, near: 0.1, far: 40 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <SceneContent onCakeClick={onCakeClick} presentMoment={presentMoment} />
      </Canvas>
    </div>
  );
}
