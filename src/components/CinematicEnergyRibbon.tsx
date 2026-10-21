import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicEnergyRibbonProps {
  color?: string;
  speed?: number;
}

export const CinematicEnergyRibbon: React.FC<CinematicEnergyRibbonProps> = ({
  color = '#ef4444',
  speed = 1,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    let prefersReducedMotion = motionQuery.matches;
    let isVisible = false;
    let isDocumentVisible = document.visibilityState === 'visible';
    let elapsedTime = 0;
    let previousFrameTime = 0;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 20, 140);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Create glowing circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 90, 40, 0.9)');
      grad.addColorStop(0.6, 'rgba(239, 68, 68, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // Create a dynamic 3D swirling curve around the character (lemniscate/lissajous loop)
    const particleCount = isMobile ? 500 : 900;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const primaryColor = new THREE.Color(color);
    const goldColor = new THREE.Color('#f59e0b');
    const whiteColor = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 2;
      // 3D Lissajous ribbon knot around (0, 0, 0)
      const r = 52 + Math.sin(t * 3) * 12;
      const x = Math.sin(t) * r;
      const y = Math.sin(t * 2) * 22;
      const z = Math.cos(t) * (r * 0.85);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation
      const mix = (Math.sin(t * 4) + 1) / 2;
      const c = primaryColor.clone().lerp(goldColor, mix * 0.6);
      if (Math.random() > 0.85) c.lerp(whiteColor, 0.8);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 2.5 + Math.random() * 3.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Secondary inner tight ribbon for intense core glow
    const innerCount = isMobile ? 120 : 250;
    const innerPositions = new Float32Array(innerCount * 3);
    const innerColors = new Float32Array(innerCount * 3);

    for (let i = 0; i < innerCount; i++) {
      const t = (i / innerCount) * Math.PI * 2;
      const r = 40 + Math.cos(t * 2) * 8;
      innerPositions[i * 3] = Math.sin(t) * r;
      innerPositions[i * 3 + 1] = Math.sin(t * 3) * 16;
      innerPositions[i * 3 + 2] = Math.cos(t) * (r * 0.7);

      innerColors[i * 3] = 1;
      innerColors[i * 3 + 1] = 0.4;
      innerColors[i * 3 + 2] = 0.2;
    }

    const innerGeo = new THREE.BufferGeometry();
    innerGeo.setAttribute('position', new THREE.BufferAttribute(innerPositions, 3));
    innerGeo.setAttribute('color', new THREE.BufferAttribute(innerColors, 3));

    const innerMat = new THREE.PointsMaterial({
      size: 4.8,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const innerParticles = new THREE.Points(innerGeo, innerMat);
    scene.add(innerParticles);

    // Glowing floor light rings
    const ringGeo1 = new THREE.RingGeometry(38, 40, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = -35;
    scene.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(55, 56.5, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = -35;
    scene.add(ring2);

    let frameId: number | null = null;

    const render = (t: number) => {

      particles.rotation.y = t * 0.45;
      particles.rotation.x = Math.sin(t * 0.3) * 0.15;
      particles.rotation.z = Math.cos(t * 0.25) * 0.12;

      innerParticles.rotation.y = -t * 0.65;
      innerParticles.rotation.x = Math.cos(t * 0.4) * 0.18;

      ring1.rotation.z = t * 0.2;
      ring2.rotation.z = -t * 0.15;

      renderer.render(scene, camera);
    };

    const animate = (frameTime: number) => {
      frameId = null;
      if (!isVisible || !isDocumentVisible || prefersReducedMotion) return;

      const delta = previousFrameTime
        ? Math.min((frameTime - previousFrameTime) / 1000, 0.05)
        : 0;
      previousFrameTime = frameTime;
      elapsedTime += delta * speed;
      render(elapsedTime);
      frameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (prefersReducedMotion) {
        render(0);
      } else if (isVisible && isDocumentVisible && frameId === null) {
        previousFrameTime = 0;
        frameId = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) startAnimation();
      else stopAnimation();
    });
    observer.observe(container);

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible';
      if (isDocumentVisible) startAnimation();
      else stopAnimation();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      if (prefersReducedMotion) {
        stopAnimation();
        render(0);
      } else {
        startAnimation();
      }
    };
    motionQuery.addEventListener('change', handleMotionPreferenceChange);
    render(0);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionPreferenceChange);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleTexture.dispose();
    };
  }, [color, speed]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-10" />;
};
