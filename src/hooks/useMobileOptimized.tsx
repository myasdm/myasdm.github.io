import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

interface OptimizedAnimationConfig {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  shouldReduceAnimations: boolean;
  isTouchDevice: boolean;
}

/**
 * Hook for detecting mobile devices and motion preferences
 * to optimize animations for performance
 */
export function useMobileOptimized(): OptimizedAnimationConfig {
  const [config, setConfig] = useState<OptimizedAnimationConfig>({
    isMobile: false,
    prefersReducedMotion: false,
    shouldReduceAnimations: false,
    isTouchDevice: false,
  });

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = motionQuery.matches;
    
    // Check for mobile viewport
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const isMobile = mobileQuery.matches;
    
    // Should reduce animations if mobile, touch device, or prefers reduced motion
    const shouldReduceAnimations = isMobile || prefersReducedMotion || isTouchDevice;

    setConfig({
      isMobile,
      prefersReducedMotion,
      shouldReduceAnimations,
      isTouchDevice,
    });

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({
        ...prev,
        isMobile: e.matches,
        shouldReduceAnimations: e.matches || prev.prefersReducedMotion || prev.isTouchDevice,
      }));
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        shouldReduceAnimations: prev.isMobile || e.matches || prev.isTouchDevice,
      }));
    };

    mobileQuery.addEventListener('change', handleMobileChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return config;
}

/**
 * Utility to get animation class based on device capabilities
 */
export function getOptimizedAnimation(
  shouldReduceAnimations: boolean,
  fullAnimation: string,
  reducedAnimation: string = ''
): string {
  return shouldReduceAnimations ? reducedAnimation : fullAnimation;
}

/**
 * Utility to get animation duration multiplier
 * Mobile devices get faster animations for better perceived performance
 */
export function getAnimationDuration(shouldReduceAnimations: boolean, baseDuration: number): number {
  return shouldReduceAnimations ? baseDuration * 0.5 : baseDuration;
}
