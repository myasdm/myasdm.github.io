import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Mail, ArrowDown, Terminal, Code2, Zap } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const heroText = t(
    '15 years shipping high-scale systems. From 2M+ connected devices to 40+ government bureaus—I architect solutions that perform under pressure.',
    '15年高并发系统架构经验。从200万+物联网设备接入到40+政府委办局共用平台——我专注于构建高性能、可扩展的技术解决方案。'
  );

  // Simulate terminal loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setLoadingComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Glitch effect trigger
  useEffect(() => {
    if (!loadingComplete) return;
    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    
    return () => clearInterval(glitchInterval);
  }, [loadingComplete]);

  // Typing effect
  useEffect(() => {
    if (!loadingComplete) return;
    
    setDisplayText('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < heroText.length) {
        setDisplayText(heroText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [heroText, loadingComplete]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCredibility = () => {
    document.getElementById('credibility')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)/0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)/0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top left code bracket */}
        <div 
          className={`absolute top-20 left-10 text-primary/20 text-6xl font-mono transition-all duration-1000 ${
            loadingComplete ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ animationDelay: '0.5s' }}
        >
          {'</>'}
        </div>
        
        {/* Floating icons */}
        <Code2 
          className={`absolute top-32 right-20 text-primary/30 transition-all duration-1000 delay-300 ${
            loadingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
          size={40}
          style={{ animation: 'float 6s ease-in-out infinite' }}
        />
        <Terminal 
          className={`absolute bottom-40 left-20 text-primary/20 transition-all duration-1000 delay-500 ${
            loadingComplete ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          size={50}
          style={{ animation: 'float 5s ease-in-out infinite reverse' }}
        />
        <Zap 
          className={`absolute top-1/3 right-10 text-accent/30 transition-all duration-1000 delay-700 ${
            loadingComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          size={30}
          style={{ animation: 'float 4s ease-in-out infinite' }}
        />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Terminal-style header with loading animation */}
        <div 
          className={`mb-6 inline-block transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
            <span className={`inline-block w-2 h-2 rounded-full ${loadingComplete ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="text-primary">{'>'}</span>
            <span className={loadingComplete ? '' : 'animate-pulse'}>
              {loadingComplete 
                ? t('profile loaded successfully', '档案加载成功')
                : t('initializing profile...', '正在加载档案...')
              }
            </span>
            {!loadingComplete && (
              <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            )}
          </div>
        </div>

        {/* Name with glitch effect */}
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 transition-all duration-700 delay-200 ${
            loadingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span 
            className={`relative inline-block text-foreground ${glitchActive ? 'animate-glitch' : ''}`}
            style={{
              textShadow: glitchActive 
                ? '2px 0 hsl(var(--accent)), -2px 0 hsl(var(--primary))' 
                : 'none',
            }}
          >
            {t('Deming Song', '宋德明')}
            
            {/* Glitch layers */}
            {glitchActive && (
              <>
                <span 
                  className="absolute inset-0 text-accent opacity-70"
                  style={{ transform: 'translate(2px, -2px)', clipPath: 'inset(20% 0 30% 0)' }}
                >
                  {t('Deming Song', '宋德明')}
                </span>
                <span 
                  className="absolute inset-0 text-primary opacity-70"
                  style={{ transform: 'translate(-2px, 2px)', clipPath: 'inset(50% 0 10% 0)' }}
                >
                  {t('Deming Song', '宋德明')}
                </span>
              </>
            )}
          </span>
          
          <span 
            className={`text-muted-foreground text-2xl md:text-3xl lg:text-4xl block mt-4 transition-all duration-700 delay-400 ${
              loadingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-primary">{'<'}</span>
            {t('Senior Architect', '高级架构师')}
            <span className="text-primary">{' />'}</span>
          </span>
        </h1>

        {/* Typing effect hero statement */}
        <div 
          className={`min-h-[120px] md:min-h-[100px] mb-10 transition-all duration-700 delay-500 ${
            loadingComplete ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative p-6 rounded-lg bg-card/30 border border-border/50 backdrop-blur-sm">
            {/* Terminal header */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-card/50 rounded-t-lg border-b border-border/50 flex items-center px-3 gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">~/about.md</span>
            </div>
            
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-mono mt-6">
              <span className="text-primary">{'## '}</span>
              {displayText}
              <span 
                className={`inline-block w-[3px] h-6 bg-primary ml-1 align-middle ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </p>
          </div>
        </div>

        {/* Contact info with animation */}
        <div 
          className={`mb-10 flex items-center justify-center gap-2 text-muted-foreground transition-all duration-700 delay-700 ${
            loadingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="mailto:songdeming@gmail.com"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card/30 border border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            <Mail size={18} className="text-primary group-hover:animate-pulse" />
            <span className="group-hover:text-primary transition-colors">
              songdeming@gmail.com
            </span>
          </a>
        </div>

        {/* CTA Buttons with staggered animation */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-800 ${
            loadingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)]"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
            
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-md animate-ping bg-primary/20 opacity-0 group-hover:opacity-100" style={{ animationDuration: '1.5s' }} />
            
            <span className="relative">{t("Let's Talk", '联系我')}</span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToCredibility}
            className="group border-primary/30 hover:border-primary hover:bg-primary/10 text-primary px-8 py-6 text-lg transition-all duration-300 hover:-translate-y-1"
          >
            <span className="group-hover:mr-2 transition-all duration-300">
              {t('View Portfolio', '查看作品')}
            </span>
            <ArrowDown 
              size={18} 
              className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0" 
            />
          </Button>
        </div>

        {/* Scroll indicator with enhanced animation */}
        <button
          onClick={scrollToCredibility}
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1000 ${
            loadingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col items-center gap-2 group">
            <span className="text-xs text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {t('scroll down', '向下滚动')}
            </span>
            <div className="relative">
              {/* Outer ring pulse */}
              <div className="absolute inset-0 w-10 h-10 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
              
              {/* Inner button */}
              <div className="relative w-10 h-10 rounded-full border-2 border-primary/50 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                <ArrowDown 
                  className="text-primary animate-bounce" 
                  size={20}
                  style={{ animationDuration: '1.5s' }}
                />
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
