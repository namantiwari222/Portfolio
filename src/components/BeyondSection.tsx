import React, { useEffect, useRef, useState } from 'react';

export const BeyondSection: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      aria-label="Portfolio footer"
      className={`beyond-footer${isVisible ? ' is-visible' : ''}`}
    >
      <div className="footer-glow" aria-hidden="true" />
      <h2 className="beyond-footer__word" aria-label="BEYOND">
        <span className="beyond-footer__neutral">B</span>
        <span className="beyond-footer__sparkle-group">
          <span className="beyond-footer__neutral">E</span>
          <span className="beyond-footer__pink">YON</span>
        </span>
        <span className="beyond-footer__neutral">D</span>
      </h2>
    </footer>
  );
};
