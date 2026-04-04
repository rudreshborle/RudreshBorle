"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import AbstractGeometry from './AbstractGeometry';
import { useScrollProgress } from '../providers/LenisProvider';
import { useReducedMotion } from 'framer-motion';

function ScrollReactiveLights() {
  const { progress } = useScrollProgress();
  const shouldReduceMotion = useReducedMotion();
  const motionFactor = shouldReduceMotion ? 0 : 1;
  const keyLightIntensity = 1.2 + progress * 1.3 * motionFactor;
  const fillLightIntensity = 1.1 + progress * 0.8 * motionFactor;

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 10, 10]} intensity={keyLightIntensity} color="#00F0FF" />
      <directionalLight position={[-10, -10, -10]} intensity={fillLightIntensity} color="#7B2FF7" />
    </>
  );
}

export default function SceneCanvas() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <AbstractGeometry />
          <ScrollReactiveLights />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
