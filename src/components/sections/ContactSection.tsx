import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Github, Linkedin, Send, Terminal, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const staggeredItems = useStaggeredReveal(4, isVisible, 100);
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: t('Message sent!', '消息已发送！'),
      description: t(
        "Thank you for reaching out. I'll get back to you soon.",
        '感谢您的联系。我会尽快回复您。'
      ),
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    { id: 'github', icon: Github, href: 'https://github.com/songdeming', label: 'GitHub' },
    { id: 'linkedin', icon: Linkedin, href: 'https://linkedin.com/in/songdeming', label: 'LinkedIn' },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className={`py-20 px-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Section header with animation */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          staggeredItems[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="text-primary text-sm font-mono mb-2 block animate-pulse">
            {'// '}{t('contact', '联系方式')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-primary animate-pulse" size={28} />
            {t("Let's Talk Architecture", '聊聊架构')}
            <Sparkles className="text-primary animate-pulse" size={28} />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Building something complex? Let's talk architecture.",
              '要构建复杂系统？让我们聊聊架构。'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info with enhanced animations */}
          <div className={`space-y-8 transition-all duration-700 delay-100 ${
            staggeredItems[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            {/* Email card with hover effect */}
            <div className="group">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Terminal size={18} className="text-primary" />
                {t('Get in touch', '联系我')}
              </h3>
              <a
                href="mailto:songdeming@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.3)]"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="text-primary group-hover:animate-pulse" size={22} />
                  </div>
                </div>
                <div>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                    songdeming@gmail.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('Click to send email', '点击发送邮件')}
                  </p>
                </div>
              </a>
            </div>

            {/* Social links with enhanced animations */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Terminal size={18} className="text-primary" />
                {t('Connect', '社交链接')}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  const isHovered = hoveredSocial === social.id;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                      onMouseEnter={() => setHoveredSocial(social.id)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-primary/30 rounded-lg blur-xl transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`} />
                      
                      {/* Button */}
                      <div className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isHovered 
                          ? 'bg-primary scale-110 -translate-y-1' 
                          : 'bg-primary/10'
                      }`}
                      style={{
                        boxShadow: isHovered 
                          ? '0 10px 30px -10px hsl(var(--primary)/0.5)' 
                          : 'none',
                      }}
                      >
                        <Icon 
                          className={`transition-colors duration-300 ${
                            isHovered ? 'text-primary-foreground' : 'text-primary'
                          }`} 
                          size={22} 
                        />
                      </div>
                      
                      {/* Label tooltip */}
                      <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-primary transition-all duration-300 whitespace-nowrap ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                      }`}>
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Status card with typing effect */}
            <div className="p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] group">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse" />
                <p className="text-muted-foreground text-sm font-mono group-hover:text-foreground transition-colors duration-300">
                  <span className="text-primary">{'>'}</span> {t(
                    'Available for senior architecture roles, consulting, and advisory work.',
                    '可接受高级架构职位、咨询和顾问工作。'
                  )}
                  <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                </p>
              </div>
            </div>
          </div>

          {/* Contact form with enhanced animations */}
          <form 
            onSubmit={handleSubmit} 
            className={`space-y-6 transition-all duration-700 delay-200 ${
              staggeredItems[2] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Name field */}
            <div className={`space-y-2 transition-all duration-300 ${
              focusedField === 'name' ? '-translate-y-1' : ''
            }`}>
              <Label 
                htmlFor="name" 
                className={`text-foreground transition-colors duration-300 ${
                  focusedField === 'name' ? 'text-primary' : ''
                }`}
              >
                {t('Name', '姓名')}
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder={t('Your name', '您的姓名')}
                  className={`bg-card/50 border-border transition-all duration-300 ${
                    focusedField === 'name' 
                      ? 'border-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]' 
                      : 'focus:border-primary'
                  }`}
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  focusedField === 'name' ? 'w-full' : 'w-0'
                }`} />
              </div>
            </div>

            {/* Email field */}
            <div className={`space-y-2 transition-all duration-300 ${
              focusedField === 'email' ? '-translate-y-1' : ''
            }`}>
              <Label 
                htmlFor="email" 
                className={`text-foreground transition-colors duration-300 ${
                  focusedField === 'email' ? 'text-primary' : ''
                }`}
              >
                {t('Email', '邮箱')}
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder={t('your@email.com', 'your@email.com')}
                  className={`bg-card/50 border-border transition-all duration-300 ${
                    focusedField === 'email' 
                      ? 'border-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]' 
                      : 'focus:border-primary'
                  }`}
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  focusedField === 'email' ? 'w-full' : 'w-0'
                }`} />
              </div>
            </div>

            {/* Message field */}
            <div className={`space-y-2 transition-all duration-300 ${
              focusedField === 'message' ? '-translate-y-1' : ''
            }`}>
              <Label 
                htmlFor="message" 
                className={`text-foreground transition-colors duration-300 ${
                  focusedField === 'message' ? 'text-primary' : ''
                }`}
              >
                {t('Message', '留言')}
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder={t(
                    'Tell me about your project or opportunity...',
                    '告诉我您的项目或机会...'
                  )}
                  rows={5}
                  className={`bg-card/50 border-border resize-none transition-all duration-300 ${
                    focusedField === 'message' 
                      ? 'border-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]' 
                      : 'focus:border-primary'
                  }`}
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  focusedField === 'message' ? 'w-full' : 'w-0'
                }`} />
              </div>
            </div>

            {/* Submit button with enhanced animation */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.5)] group"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
              
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {t('Sending...', '发送中...')}
                  </>
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    {t('Send Message', '发送消息')}
                  </>
                )}
              </span>
            </Button>
          </form>
        </div>

        {/* Footer with animation */}
        <div className={`mt-16 pt-8 border-t border-border text-center transition-all duration-700 delay-300 ${
          staggeredItems[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-muted-foreground text-sm font-mono hover:text-foreground transition-colors duration-300">
            {'© '}{new Date().getFullYear()} {t('Deming Song', '宋德明')} {'// '} 
            {t('Built with React + TypeScript', '使用 React + TypeScript 构建')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
