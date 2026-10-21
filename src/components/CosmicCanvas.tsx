import React, { useEffect, useRef } from 'react';

interface CosmicCanvasProps {
  scrollProgress?: number;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({ scrollProgress = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let disposeScene: (() => void) | undefined;

    const initialize = async () => {
      const {
        AdditiveBlending,
        BufferAttribute,
        BufferGeometry,
        CanvasTexture,
        Color,
        DoubleSide,
        FogExp2,
        Group,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Points,
        PointsMaterial,
        RingGeometry,
        Scene,
        WebGLRenderer,
      } = await import('three');
      if (isDisposed) return;

      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      let prefersReducedMotion = motionQuery.matches;

      // Scene setup
      const scene = new Scene();
      scene.fog = new FogExp2(0x02040a, 0.0008);

      const camera = new PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      camera.position.z = 600;

      const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x02040a, 1);
      container.appendChild(renderer.domElement);

      // 1. Base Deep Stars (White & Subtle Sky Blue)
      const starCount = isMobile ? 900 : 2400;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);

      const colorSky = new Color(0x38bdf8);
      const colorWhite = new Color(0xf8fafc);
      const colorGold = new Color(0xf5c542);
      const colorPurple = new Color(0xa855f7);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        starPositions[i3] = (Math.random() - 0.5) * 2400;
        starPositions[i3 + 1] = (Math.random() - 0.5) * 2400;
        starPositions[i3 + 2] = (Math.random() - 0.5) * 2000;

        // Color selection distribution
        const rand = Math.random();
        let c = colorWhite;
        if (rand < 0.25) c = colorSky;
        else if (rand < 0.35) c = colorGold;
        else if (rand < 0.45) c = colorPurple;

        starColors[i3] = c.r;
        starColors[i3 + 1] = c.g;
        starColors[i3 + 2] = c.b;
      }

      const starGeometry = new BufferGeometry();
      starGeometry.setAttribute('position', new BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('color', new BufferAttribute(starColors, 3));

      // Particle sprite texture generated programmatically for crisp circular glow
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
        grad.addColorStop(0.7, 'rgba(56,189,248,0.2)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      const particleTexture = new CanvasTexture(canvas);

      const starMaterial = new PointsMaterial({
        size: 3.2,
        vertexColors: true,
        map: particleTexture,
        transparent: true,
        opacity: 0.85,
        blending: AdditiveBlending,
        depthWrite: false,
      });

      const starField = new Points(starGeometry, starMaterial);
      scene.add(starField);

      // 2. Cosmic Nebula Particle Clouds (Sky Blue & Purple & Gold)
      const nebulaCount = isMobile ? 180 : 450;
      const nebulaPositions = new Float32Array(nebulaCount * 3);
      const nebulaColors = new Float32Array(nebulaCount * 3);

      for (let i = 0; i < nebulaCount; i++) {
        const i3 = i * 3;
        const radius = 300 + Math.random() * 500;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;

        nebulaPositions[i3] = radius * Math.cos(theta) * Math.cos(phi);
        nebulaPositions[i3 + 1] = radius * Math.sin(phi);
        nebulaPositions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

        const isPurple = Math.random() > 0.5;
        const c = isPurple ? colorPurple : colorSky;
        nebulaColors[i3] = c.r;
        nebulaColors[i3 + 1] = c.g;
        nebulaColors[i3 + 2] = c.b;
      }

      const nebulaGeometry = new BufferGeometry();
      nebulaGeometry.setAttribute('position', new BufferAttribute(nebulaPositions, 3));
      nebulaGeometry.setAttribute('color', new BufferAttribute(nebulaColors, 3));

      const nebulaMaterial = new PointsMaterial({
        size: 16,
        vertexColors: true,
        map: particleTexture,
        transparent: true,
        opacity: 0.35,
        blending: AdditiveBlending,
        depthWrite: false,
      });

      const nebulaField = new Points(nebulaGeometry, nebulaMaterial);
      scene.add(nebulaField);

      // 3. Orbital Celestial Rings
      const ringGroup = new Group();
      const ringGeometry = new RingGeometry(220, 222, 64);
      const ringMaterial = new MeshBasicMaterial({
        color: 0x38bdf8,
        side: DoubleSide,
        transparent: true,
        opacity: 0.22,
      });
      const ring1 = new Mesh(ringGeometry, ringMaterial);
      ring1.rotation.x = Math.PI / 3;
      ringGroup.add(ring1);

      const ringGeometry2 = new RingGeometry(340, 341.5, 64);
      const ringMaterial2 = new MeshBasicMaterial({
        color: 0xf5c542,
        side: DoubleSide,
        transparent: true,
        opacity: 0.18,
      });
      const ring2 = new Mesh(ringGeometry2, ringMaterial2);
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.y = Math.PI / 6;
      ringGroup.add(ring2);

      scene.add(ringGroup);

      // Mouse movement parallax
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Resize handling
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      let animationFrameId: number | null = null;
      let elapsedTime = 0;
      let previousFrameTime = 0;
      let isHeroVisible = false;
      let isDocumentVisible = document.visibilityState === 'visible';

      const renderScene = () => {
        starField.rotation.y = elapsedTime * 0.012;
        starField.rotation.x = elapsedTime * 0.005;
        nebulaField.rotation.y = -elapsedTime * 0.008;
        nebulaField.rotation.z = elapsedTime * 0.004;
        ringGroup.rotation.z = elapsedTime * 0.03;
        ringGroup.rotation.y = elapsedTime * 0.02;

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        const scrollOffset = scrollRef.current * 800;
        camera.position.x = targetX * 0.6;
        camera.position.y = -targetY * 0.6;
        camera.position.z = 600 - scrollOffset * 0.4;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };

      const animate = (frameTime: number) => {
        animationFrameId = null;
        if (!isHeroVisible || !isDocumentVisible || prefersReducedMotion) return;

        const delta = previousFrameTime
          ? Math.min((frameTime - previousFrameTime) / 1000, 0.05)
          : 0;
        previousFrameTime = frameTime;
        elapsedTime += delta;
        renderScene();
        animationFrameId = requestAnimationFrame(animate);
      };

      const startAnimation = () => {
        if (prefersReducedMotion) {
          renderer.render(scene, camera);
        } else if (isHeroVisible && isDocumentVisible && animationFrameId === null) {
          previousFrameTime = 0;
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      const stopAnimation = () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      };

      const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
        prefersReducedMotion = event.matches;
        if (prefersReducedMotion) {
          stopAnimation();
          renderer.render(scene, camera);
        } else {
          startAnimation();
        }
      };
      motionQuery.addEventListener('change', handleMotionPreferenceChange);

      const hero = document.getElementById('hero');
      const heroObserver = hero
        ? new IntersectionObserver(([entry]) => {
            isHeroVisible = entry.isIntersecting;
            if (isHeroVisible) startAnimation();
            else stopAnimation();
          })
        : null;
      heroObserver?.observe(hero!);

      const handleVisibilityChange = () => {
        isDocumentVisible = document.visibilityState === 'visible';
        if (isDocumentVisible) startAnimation();
        else stopAnimation();
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      renderer.render(scene, camera);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        motionQuery.removeEventListener('change', handleMotionPreferenceChange);
        heroObserver?.disconnect();
        stopAnimation();

        renderer.dispose();
        starGeometry.dispose();
        starMaterial.dispose();
        nebulaGeometry.dispose();
        nebulaMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        ringGeometry2.dispose();
        ringMaterial2.dispose();
        particleTexture.dispose();

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    void initialize().then((dispose) => {
      if (isDisposed) dispose?.();
      else disposeScene = dispose;
    }).catch((error: unknown) => {
      if (!isDisposed) console.error('Failed to initialize the cosmic background.', error);
    });

    return () => {
      isDisposed = true;
      disposeScene?.();
    };
  }, []);

  return (
    <div
      id="cosmic-canvas-container"
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
