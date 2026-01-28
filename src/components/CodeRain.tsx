import { useEffect, useRef, useState } from 'react';

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(0);

  // Track scroll position for parallax
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (mix of code symbols and Chinese/Japanese characters)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>=/+*-;:.,!?@#$%^&()_~`|\\';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Track speeds for each column (base speeds)
    const baseSpeeds: number[] = [];
    for (let i = 0; i < columns; i++) {
      baseSpeeds[i] = 0.5 + Math.random() * 1.5;
    }

    // Parallax layers - assign each column to a layer (0 = back, 1 = mid, 2 = front)
    const layers: number[] = [];
    for (let i = 0; i < columns; i++) {
      layers[i] = Math.floor(Math.random() * 3);
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastScrollY = 0;

    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(8, 12, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      // Calculate scroll delta for parallax effect
      const currentScroll = scrollRef.current;
      const scrollDelta = currentScroll - lastScrollY;
      lastScrollY = currentScroll;

      // Parallax multipliers for each layer (back moves slower, front moves faster)
      const parallaxMultipliers = [0.2, 0.5, 1.0];
      const opacityMultipliers = [0.4, 0.7, 1.0];
      const sizeMultipliers = [0.7, 0.85, 1.0];

      for (let i = 0; i < drops.length; i++) {
        const layer = layers[i];
        const parallaxFactor = parallaxMultipliers[layer];
        const opacityFactor = opacityMultipliers[layer];
        const sizeFactor = sizeMultipliers[layer];

        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        const x = i * fontSize;
        
        // Apply parallax offset based on scroll
        const parallaxOffset = (currentScroll * parallaxFactor * 0.1) % canvas.height;
        const y = (drops[i] * fontSize + parallaxOffset) % (canvas.height + 100);

        // Create gradient effect - brighter at the head
        const alpha = Math.min(1, Math.max(0.1, 1 - (drops[i] % 30) / 30)) * opacityFactor;
        
        // Adjust font size based on layer
        const layerFontSize = Math.round(fontSize * sizeFactor);
        ctx.font = `${layerFontSize}px "JetBrains Mono", monospace`;

        // Head of the drop is bright white-green
        if (drops[i] % 30 < 2) {
          ctx.fillStyle = `rgba(180, 255, 180, ${alpha})`;
        } else {
          // Rest is green with varying opacity
          ctx.fillStyle = `rgba(0, 255, 128, ${alpha * 0.7})`;
        }

        ctx.fillText(char, x, y);

        // Adjust speed based on scroll direction for parallax feel
        const scrollBoost = scrollDelta * parallaxFactor * 0.05;
        const speed = baseSpeeds[i] + scrollBoost;

        // Reset when off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          baseSpeeds[i] = 0.5 + Math.random() * 1.5;
        }

        drops[i] += Math.max(0.1, speed);
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!prefersReducedMotion) {
        draw();
      }
      animationId = requestAnimationFrame(animate);
    };

    // Initial fill
    ctx.fillStyle = 'rgba(8, 12, 16, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
