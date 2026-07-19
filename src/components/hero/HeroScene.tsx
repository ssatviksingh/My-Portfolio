import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshDistortMaterial,
  PerformanceMonitor,
} from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';

type Quality = 'high' | 'low';

function HeroMesh({ quality }: { quality: Quality }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = state.clock.elapsedTime;
    const targetX = mouse.current.y * 0.35 + t * 0.12;
    const targetY = mouse.current.x * 0.45 + t * 0.18;

    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetX, 0.04);
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetY, 0.04);
  });

  const color = theme === 'dark' ? '#3b82f6' : '#074782';

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={meshRef} scale={1.35}>
        <icosahedronGeometry args={[1.15, quality === 'high' ? 4 : 2]} />
        <MeshDistortMaterial
          color={color}
          distort={quality === 'high' ? 0.38 : 0.28}
          speed={1.6}
          roughness={0.22}
          metalness={0.55}
          emissive={color}
          emissiveIntensity={theme === 'dark' ? 0.28 : 0.12}
        />
      </mesh>
      <mesh position={[1.9, 0.6, -0.4]} scale={0.16}>
        <sphereGeometry args={[1, quality === 'high' ? 24 : 12, quality === 'high' ? 24 : 12]} />
        <meshStandardMaterial
          color={theme === 'dark' ? '#93c5fd' : '#38bdf8'}
          emissive={theme === 'dark' ? '#60a5fa' : '#0ea5e9'}
          emissiveIntensity={0.5}
          roughness={0.35}
        />
      </mesh>
    </Float>
  );
}

export const HeroScene: React.FC = () => {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const [quality, setQuality] = useState<Quality>('high');
  const { theme } = useTheme();

  return (
    <Canvas
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={dpr}
      gl={{
        antialias: quality === 'high',
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={theme === 'dark' ? 0.35 : 0.55} />
      <directionalLight position={[4, 5, 2]} intensity={theme === 'dark' ? 0.9 : 0.7} />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <HeroMesh quality={quality} />
      </Suspense>
      <PerformanceMonitor
        onDecline={() => {
          setQuality('low');
          setDpr([1, 1]);
        }}
        onIncline={() => {
          setQuality('high');
          setDpr([1, 1.5]);
        }}
      />
    </Canvas>
  );
};

export default HeroScene;
