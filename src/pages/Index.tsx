import { LanguageProvider } from '@/contexts/LanguageContext';
import CodeRain from '@/components/CodeRain';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import CredibilitySection from '@/components/sections/CredibilitySection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import HowIWorkSection from '@/components/sections/HowIWorkSection';
import TimelineSection from '@/components/sections/TimelineSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background">
        {/* Matrix code rain background */}
        <CodeRain />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content */}
        <main className="relative z-10">
          <HeroSection />
          <CredibilitySection />
          <CaseStudiesSection />
          <HowIWorkSection />
          <TimelineSection />
          <ContactSection />
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
