'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Torus, Cylinder, Circle, Ring } from '@react-three/drei';
import * as THREE from 'three';

function WatchCase() {
  const groupRef = useRef<THREE.Group>(null);
  const material = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.95,
    roughness: 0.1,
  });
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    metalness: 1,
    roughness: 0.15,
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Case body */}
        <Torus args={[1.6, 0.15, 32, 64]} material={material}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.1} />
        </Torus>

        {/* Dial */}
        <Circle args={[1.5, 64]} position={[0, 0, 0.05]}>
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.3} />
        </Circle>

        {/* Bezel ring */}
        <Ring args={[1.55, 1.7, 64]} position={[0, 0, 0.08]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.15} />
        </Ring>

        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r = 1.3;
          return (
            <Cylinder
              key={i}
              args={[0.02, 0.02, i % 3 === 0 ? 0.18 : 0.1, 8]}
              position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.1]}
              rotation={[0, 0, angle + Math.PI / 2]}
              material={goldMaterial}
            />
          );
        })}

        {/* Hour hand */}
        <Cylinder
          args={[0.025, 0.015, 0.7, 8]}
          position={[0, 0.35, 0.12]}
          material={goldMaterial}
        />

        {/* Minute hand */}
        <Cylinder
          args={[0.018, 0.01, 1, 8]}
          position={[0.3, 0.15, 0.13]}
          rotation={[0, 0, -Math.PI / 4]}
          material={goldMaterial}
        />

        {/* Crown */}
        <Cylinder
          args={[0.08, 0.08, 0.25, 16]}
          position={[1.85, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={goldMaterial}
        />

        {/* Crown stem */}
        <Cylinder
          args={[0.03, 0.03, 0.2, 8]}
          position={[1.7, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={material}
        />
      </group>
    </Float>
  );
}

export default function WatchScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#D4AF37" />
        <directionalLight position={[-3, 2, 4]} intensity={0.5} color="#E5E4E2" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#D4AF37" />

        <Suspense fallback={null}>
          <WatchCase />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
