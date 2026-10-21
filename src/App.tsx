import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { CosmicCanvas } from './components/CosmicCanvas';
import { NavigationHud } from './components/NavigationHud';
import { CosmicUniverseHero } from './components/CosmicUniverseHero';
import { BeyondSection } from './components/BeyondSection';
import type { ReactNode } from 'react';

const CinematicTechUniverse = lazy(() =>
  import('./components/CinematicTechUniverse').then((module) => ({
    default: module.CinematicTechUniverse,
  }))
);
const CinematicThroughTime = lazy(() =>
  import('./components/CinematicThroughTime').then((module) => ({
    default: module.CinematicThroughTime,
  }))
);
const CinematicBuildWithoutLimits = lazy(() =>
  import('./components/CinematicBuildWithoutLimits').then((module) => ({
    default: module.CinematicBuildWithoutLimits,
  }))
);
const ProblemSolvingCore = lazy(() =>
  import('./components/ProblemSolvingCore').then((module) => ({
    default: module.ProblemSolvingCore,
  }))
);
const MissionLog = lazy(() =>
  import('./components/MissionLog').then((module) => ({
    default: module.MissionLog,
  }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((module) => ({
    default: module.ContactSection,
  }))
);
const FinalScene = lazy(() =>
  import('./components/FinalScene').then((module) => ({
    default: module.FinalScene,
  }))
);

const DeferredSection: React.FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div id={id} ref={sectionRef} className="min-h-screen">
      {isNearViewport && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
};

const PortfolioSections = React.memo(function PortfolioSections() {
  return (
    <main className="relative z-10 bg-transparent">
      <CosmicUniverseHero
        onEnterUniverse={() => {
          const el = document.getElementById('tech-universe');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <DeferredSection id="tech-universe"><CinematicTechUniverse /></DeferredSection>
      <DeferredSection id="through-time"><CinematicThroughTime /></DeferredSection>
      <DeferredSection id="build-without-limits"><CinematicBuildWithoutLimits /></DeferredSection>
      <DeferredSection id="dsa"><ProblemSolvingCore /></DeferredSection>
      <DeferredSection id="mission"><MissionLog /></DeferredSection>
      <DeferredSection id="contact"><ContactSection /></DeferredSection>
      <DeferredSection id="final-scene"><FinalScene /></DeferredSection>
      <BeyondSection />
    </main>
  );
});

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sections = [
        'hero',
        'tech-universe',
        'through-time',
        'build-without-limits',
        'dsa',
        'mission',
        'contact',
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#02040A] text-slate-100 selection:bg-red-500/30 selection:text-red-200">
      {/* Three.js GPU-accelerated cosmic universe background */}
      <CosmicCanvas scrollProgress={scrollProgress} />

      {/* Futuristic Navigation HUD with Cinematic Beat Audio */}
      <NavigationHud currentSection={currentSection} scrollProgress={scrollProgress} />

      {/* Main Cinematic Scroll Flow (Exact sequence from video) */}
      <PortfolioSections />
    </div>
  );
}
