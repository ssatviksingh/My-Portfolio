import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';

export const HeroScene: React.FC = () => {
  return (
    <Canvas
      className="pointer-events-none absolute inset-0 -z-10"
      camera={{ position: [0, 0, 7], fov: 45 }}
    >
      <color attach="background" args={['#020617']} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.7}>
        <Sphere args={[1.7, 32, 32]} position={[0.2, 0.4, 0]}>
          <meshStandardMaterial emissive="#f97316" emissiveIntensity={1.4} />
        </Sphere>
      </Float>

      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.8, 32, 32]} position={[-2.2, -0.4, -1]}>
          <meshStandardMaterial emissive="#22c55e" emissiveIntensity={1.2} />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
        <Sphere args={[0.6, 32, 32]} position={[2.1, -1.2, -0.6]}>
          <meshStandardMaterial emissive="#eab308" emissiveIntensity={1.1} />
        </Sphere>
      </Float>
    </Canvas>
  );
};

