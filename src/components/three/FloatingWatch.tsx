'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Circle, Ring, Environment } from '@react-three/drei';
import * as THREE from 'three';

function MiniWatch() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={groupRef} scale={0.6}>
        {/* Case */}
        <Torus args={[1.6, 0.12, 24, 48]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.1} />
        </Torus>

        {/* Dial */}
        <Circle args={[1.5, 48]} position={[0, 0, 0.04]}>
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.3} />
        </Circle>

        {/* Bezel */}
        <Ring args={[1.52, 1.65, 48]} position={[0, 0, 0.06]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.15} />
        </Ring>

        {/* Markers */}
        {[0, 3, 6, 9].map((i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, 0.08]}
            >
              <boxGeometry args={[0.08, 0.04, 0.02]} />
              <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.15} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

export default function FloatingWatch() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 5]} intensity={0.8} color="#D4AF37" />
        <pointLight position={[-2, 1, 3]} intensity={0.4} color="#E5E4E2" />

        <Suspense fallback={null}>
          <MiniWatch />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
