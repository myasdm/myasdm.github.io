import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Mail, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const heroText = t(
    '15 years shipping high-scale systems. From 2M+ connected devices to 40+ government bureaus—I architect solutions that perform under pressure.',
    '15年高并发系统架构经验。从200万+物联网设备接入到40+政府委办局共用平台——我专注于构建高性能、可扩展的技术解决方案。'
  );

  useEffect(() => {
    setDisplayText('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < heroText.length) {
        setDisplayText(heroText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [heroText]);

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
      className={`relative min-h-screen flex items-center justify-center px-4 pt-16 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-4xl text-center">
        {/* Terminal-style header */}
        <div className="mb-6 inline-block">
          <span className="text-muted-foreground text-sm font-mono">
            {'>'} {t('initializing profile...', '正在加载档案...')}
          </span>
        </div>

        {/* Name */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in">
          <span className="text-foreground">{t('Deming Song', '宋德明')}</span>
          <span className="text-muted-foreground text-2xl md:text-3xl lg:text-4xl block mt-2">
            {t('Senior Architect', '高级架构师')}
          </span>
        </h1>

        {/* Typing effect hero statement */}
        <div className="min-h-[120px] md:min-h-[100px] mb-10">
          <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-mono">
            {displayText}
            <span 
              className={`inline-block w-[2px] h-6 bg-primary ml-1 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </p>
        </div>

        {/* Contact info */}
        <div className="mb-10 flex items-center justify-center gap-2 text-muted-foreground">
          <Mail size={18} className="text-primary" />
          <a
            href="mailto:songdeming@gmail.com"
            className="hover:text-primary transition-colors hover-glow"
          >
            songdeming@gmail.com
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="glow-box bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
          >
            {t("Let's Talk", '联系我')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToCredibility}
            className="border-primary/30 hover:border-primary hover:bg-primary/10 text-primary px-8 py-6 text-lg"
          >
            {t('View Portfolio', '查看作品')}
          </Button>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToCredibility}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float"
        >
          <ArrowDown className="text-primary opacity-60 hover:opacity-100 transition-opacity" size={28} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
