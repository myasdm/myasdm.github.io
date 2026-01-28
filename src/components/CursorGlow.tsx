import { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Main glow */}
      <div
        className="absolute rounded-full transition-transform duration-100 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: 400,
          height: 400,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsla(142, 70%, 45%, 0.08) 0%, hsla(142, 70%, 45%, 0.03) 40%, transparent 70%)',
        }}
      />
      {/* Inner bright core */}
      <div
        className="absolute rounded-full transition-transform duration-75 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: 150,
          height: 150,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsla(142, 80%, 50%, 0.12) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default CursorGlow;
