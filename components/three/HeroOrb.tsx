"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

function OrbMesh({ mousePos }: { mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const nx = (mousePos.x / window.innerWidth) * 2 - 1;
    const ny = -(mousePos.y / window.innerHeight) * 2 + 1;
    targetRotation.current.x += (ny * 0.3 - targetRotation.current.x) * 0.05;
    targetRotation.current.y += (nx * 0.5 - targetRotation.current.y) * 0.05;
    meshRef.current.rotation.x = targetRotation.current.x;
    meshRef.current.rotation.y += delta * 0.15 + targetRotation.current.y * delta;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <Sphere ref={meshRef} args={[1, 128, 128]}>
        <MeshDistortMaterial
          color="#06e5ff"
          emissive="#06e5ff"
          emissiveIntensity={0.15}
          distort={0.45}
          speed={1.8}
          roughness={0.1}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function RingMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.2;
      ref.current.rotation.x += delta * 0.08;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[1.6, 0.008, 16, 200]} />
      <meshBasicMaterial color="#06e5ff" transparent opacity={0.3} />
    </mesh>
  );
}

export default function HeroOrb() {
  const mousePos = useMousePosition();

  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#06e5ff" />
      <pointLight position={[-2, -1, -1]} intensity={0.5} color="#8b5cf6" />
      <OrbMesh mousePos={mousePos} />
      <RingMesh />
    </Canvas>
  );
}
