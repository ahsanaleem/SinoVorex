"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;
const CONNECTION_DIST = 2.2;

function generateNodes(count: number): THREE.Vector3[] {
  return Array.from({ length: count }, () =>
    new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4
    )
  );
}

function NeuralMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const velocities = useRef<THREE.Vector3[]>([]);
  const nodes = useMemo(() => generateNodes(NODE_COUNT), []);

  useMemo(() => {
    velocities.current = nodes.map(
      () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.003
        )
    );
  }, [nodes]);

  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECTION_DIST) {
          points.push(nodes[i].clone(), nodes[j].clone());
        }
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [nodes]);

  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;

    nodes.forEach((node, i) => {
      node.add(velocities.current[i]);
      if (Math.abs(node.x) > 5) velocities.current[i].x *= -1;
      if (Math.abs(node.y) > 3) velocities.current[i].y *= -1;
      if (Math.abs(node.z) > 2) velocities.current[i].z *= -1;

      if (nodesRef.current[i]) {
        nodesRef.current[i].position.copy(node);
      }
    });

    if (linesRef.current) {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].distanceTo(nodes[j]) < CONNECTION_DIST) {
            points.push(nodes[i].clone(), nodes[j].clone());
          }
        }
      }
      linesRef.current.geometry.setFromPoints(points);
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(el) => {
            if (el) nodesRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#06e5ff" transparent opacity={0.8} />
        </mesh>
      ))}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#06e5ff" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

export default function NeuralNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <NeuralMesh />
    </Canvas>
  );
}
