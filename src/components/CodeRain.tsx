import { useEffect, useRef } from 'react';

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for mobile/touch device
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
    
    // If reduced motion, just show static background
    if (prefersReducedMotion) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = 'hsl(220, 20%, 4%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - reduced set for mobile
    const chars = isMobile 
      ? '01<>/={}[]'  // Simpler character set for mobile
      : '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>=/+*-;:.,!?@#$%^&()_~`|\\';
    const charArray = chars.split('');

    // Reduced density for mobile
    const fontSize = isMobile ? 16 : 14;
    const columnSpacing = isMobile ? 2.5 : 1; // Skip columns on mobile
    const columns = Math.floor(canvas.width / (fontSize * columnSpacing));
    
    // Array to track the y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Track speeds for each column (slower on mobile)
    const baseSpeeds: number[] = [];
    for (let i = 0; i < columns; i++) {
      baseSpeeds[i] = isMobile 
        ? 0.3 + Math.random() * 0.8  // Slower for mobile
        : 0.5 + Math.random() * 1.5;
    }

    // Parallax layers - simplified for mobile (only 2 layers)
    const layerCount = isMobile ? 2 : 3;
    const layers: number[] = [];
    for (let i = 0; i < columns; i++) {
      layers[i] = Math.floor(Math.random() * layerCount);
    }

    // Track scroll for parallax - disabled on mobile
    const handleScroll = () => {
      if (!isMobile) {
        scrollRef.current = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let lastScrollY = 0;
    let frameCount = 0;
    
    // Throttle frame rate on mobile
    const frameSkip = isMobile ? 2 : 1; // Skip every other frame on mobile

    const draw = () => {
      frameCount++;
      if (isMobile && frameCount % frameSkip !== 0) return;

      // Semi-transparent background for trail effect
      ctx.fillStyle = isMobile 
        ? 'rgba(8, 12, 16, 0.08)'  // Faster fade on mobile
        : 'rgba(8, 12, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      // Calculate scroll delta for parallax effect (desktop only)
      const currentScroll = scrollRef.current;
      const scrollDelta = isMobile ? 0 : currentScroll - lastScrollY;
      lastScrollY = currentScroll;

      // Parallax multipliers - simplified for mobile
      const parallaxMultipliers = isMobile ? [0.3, 1.0] : [0.2, 0.5, 1.0];
      const opacityMultipliers = isMobile ? [0.5, 1.0] : [0.4, 0.7, 1.0];
      const sizeMultipliers = isMobile ? [0.8, 1.0] : [0.7, 0.85, 1.0];

      for (let i = 0; i < drops.length; i++) {
        const layer = layers[i];
        const parallaxFactor = parallaxMultipliers[layer];
        const opacityFactor = opacityMultipliers[layer];
        const sizeFactor = sizeMultipliers[layer];

        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        const x = i * fontSize * columnSpacing;
        
        // Apply parallax offset based on scroll (desktop only)
        const parallaxOffset = isMobile ? 0 : (currentScroll * parallaxFactor * 0.1) % canvas.height;
        const y = (drops[i] * fontSize + parallaxOffset) % (canvas.height + 100);

        // Create gradient effect - brighter at the head
        const alpha = Math.min(1, Math.max(0.1, 1 - (drops[i] % 30) / 30)) * opacityFactor;
        
        // Adjust font size based on layer
        const layerFontSize = Math.round(fontSize * sizeFactor);
        ctx.font = `${layerFontSize}px "JetBrains Mono", monospace`;

        // Simplified color scheme for mobile
        if (isMobile) {
          ctx.fillStyle = `rgba(0, 255, 128, ${alpha * 0.5})`;
        } else {
          // Head of the drop is bright white-green
          if (drops[i] % 30 < 2) {
            ctx.fillStyle = `rgba(180, 255, 180, ${alpha})`;
          } else {
            // Rest is green with varying opacity
            ctx.fillStyle = `rgba(0, 255, 128, ${alpha * 0.7})`;
          }
        }

        ctx.fillText(char, x, y);

        // Adjust speed based on scroll direction for parallax feel (desktop only)
        const scrollBoost = isMobile ? 0 : scrollDelta * parallaxFactor * 0.05;
        const speed = baseSpeeds[i] + scrollBoost;

        // Reset when off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          baseSpeeds[i] = isMobile 
            ? 0.3 + Math.random() * 0.8
            : 0.5 + Math.random() * 1.5;
        }

        drops[i] += Math.max(0.1, speed);
      }
    };

    // Animation loop with performance optimization
    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    // Initial fill
    ctx.fillStyle = 'rgba(8, 12, 16, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'hsl(220, 20%, 4%)' }}
    />
  );
};

export default CodeRain;
