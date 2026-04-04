"use client";
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { Float } from '@react-three/drei';
import { useScrollProgress } from '../providers/LenisProvider';
import { useReducedMotion } from 'framer-motion';

export default function AbstractGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Group>(null);
  const scaleTarget = useRef(new THREE.Vector3(2.5, 2.5, 2.5));
  const { normalized } = useMousePosition();
  const { progress } = useScrollProgress();
  const shouldReduceMotion = useReducedMotion();

  useFrame((state, delta) => {
    const motionFactor = shouldReduceMotion ? 0 : 1;
    const scrollDepth = progress * motionFactor;

    if (outerRef.current) {
      // Smooth parallax based on mouse
      const targetX = normalized.current.x * 1.2 * motionFactor;
      const targetY = normalized.current.y * 0.9 * motionFactor + scrollDepth * 0.6;
      const targetZ = -scrollDepth * 1.5;

      outerRef.current.position.x += (targetX - outerRef.current.position.x) * delta * 2;
      outerRef.current.position.y += (targetY - outerRef.current.position.y) * delta * 2;
      outerRef.current.position.z += (targetZ - outerRef.current.position.z) * delta * 2;
      outerRef.current.rotation.z += ((scrollDepth * 0.2) - outerRef.current.rotation.z) * delta * 2;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (0.1 + scrollDepth * 0.35);
      meshRef.current.rotation.y += delta * (0.15 + scrollDepth * 0.45);
      const targetScale = 2.5 - scrollDepth * 0.35;
      scaleTarget.current.set(targetScale, targetScale, targetScale);
      meshRef.current.scale.lerp(scaleTarget.current, delta * 1.5);
    }

    if (innerCoreRef.current) {
      const pulse = 0.2 + Math.sin(state.clock.elapsedTime * 1.8) * 0.08;
      innerCoreRef.current.rotation.y += delta * (0.5 + scrollDepth * 0.8);
      const coreMaterial = innerCoreRef.current.material as THREE.MeshPhysicalMaterial;
      coreMaterial.emissiveIntensity = pulse + scrollDepth * 0.45;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.35;
      ringRef.current.rotation.z += delta * (0.45 + scrollDepth * 0.35);
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * (0.35 + scrollDepth * 0.3);
      ringRef2.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={outerRef}>
      <Float
        speed={2} // Animation speed
        rotationIntensity={0.5} // XYZ rotation intensity
        floatIntensity={1} // Up/down float intensity
      >
        <mesh ref={meshRef} scale={2.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#00F0FF" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </mesh>
        
        <mesh scale={2.4}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#7B2FF7" 
            wireframe 
            transparent 
            opacity={0.1} 
          />
        </mesh>

        <mesh ref={ringRef} scale={2.1} rotation={[0.8, 0.2, 0]}>
          <torusGeometry args={[1.1, 0.03, 16, 120]} />
          <meshStandardMaterial color="#00F0FF" transparent opacity={0.35} emissive="#00F0FF" emissiveIntensity={0.2} />
        </mesh>

        <mesh ref={ringRef2} scale={1.65} rotation={[0.2, 1.2, 1]}>
          <torusGeometry args={[1.1, 0.025, 16, 120]} />
          <meshStandardMaterial color="#7B2FF7" transparent opacity={0.28} emissive="#7B2FF7" emissiveIntensity={0.15} />
        </mesh>
        
        {/* Core solid object inside */}
        <mesh ref={innerCoreRef} scale={1.8}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial 
            color="#0A0A0A"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            emissive="#7B2FF7"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}
