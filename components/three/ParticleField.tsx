"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
attribute float size;
varying vec3 vColor;

void main() {
  vColor = color;
  vec3 pos = position;
  
  // Subtle wave movement
  pos.x += sin(uTime * 0.5 + pos.z) * 0.1;
  pos.y += cos(uTime * 0.3 + pos.x) * 0.1;
  pos.z += sin(uTime * 0.4 + pos.y) * 0.1;
  
  // Mouse interaction
  float dist = distance(uv, uMouse);
  if (dist < 0.5) {
    pos.z += (0.5 - dist) * 2.0;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * (300.0 / -mvPosition.z);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
  float dist = distance(gl_PointCoord, vec2(0.5));
  if (dist > 0.5) discard;
  
  // Soft glow edge with much lower opacity
  float alpha = smoothstep(0.5, 0.1, dist);
  gl_FragColor = vec4(vColor, alpha * 0.4);
}
`;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { normalized } = useMousePosition();
  
  const particleCount = 600;
  
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    
    const color1 = new THREE.Color("#00F0FF");
    const color2 = new THREE.Color("#7B2FF7");
    
    for (let i = 0; i < particleCount; i++) {
      // Sphere volume distribution
      const r = 15 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      const mixedColor = color1.clone().lerp(color2, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
      
      sz[i] = Math.random() * 1.5 + 0.2;
    }
    return [pos, col, sz];
  }, [particleCount]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const material = pointsRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Smooth mouse interpolation
    material.uniforms.uMouse.value.x += (normalized.current.x - material.uniforms.uMouse.value.x) * 0.05;
    material.uniforms.uMouse.value.y += (normalized.current.y - material.uniforms.uMouse.value.y) * 0.05;
    
    // Auto-rotation
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        vertexColors
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </points>
  );
}
