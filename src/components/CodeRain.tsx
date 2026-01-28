import { useEffect, useRef } from 'react';

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Track speeds for each column
    const speeds: number[] = [];
    for (let i = 0; i < columns; i++) {
      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(8, 12, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Create gradient effect - brighter at the head
        const alpha = Math.min(1, Math.max(0.1, 1 - (drops[i] % 30) / 30));
        
        // Head of the drop is bright white-green
        if (drops[i] % 30 < 2) {
          ctx.fillStyle = `rgba(180, 255, 180, ${alpha})`;
        } else {
          // Rest is green with varying opacity
          ctx.fillStyle = `rgba(0, 255, 128, ${alpha * 0.7})`;
        }

        ctx.fillText(char, x, y);

        // Reset when off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.5 + Math.random() * 1.5;
        }

        drops[i] += speeds[i];
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
