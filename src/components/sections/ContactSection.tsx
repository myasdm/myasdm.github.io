import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className={`py-20 px-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-mono mb-2 block">
            {'// '}{t('contact', '联系方式')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Let's Talk Architecture", '聊聊架构')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Building something complex? Let's talk architecture.",
              '要构建复杂系统？让我们聊聊架构。'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t('Get in touch', '联系我')}
              </h3>
              <a
                href="mailto:songdeming@gmail.com"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" size={20} />
                </div>
                <span>songdeming@gmail.com</span>
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t('Connect', '社交链接')}
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/songdeming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Github className="text-primary" size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/songdeming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="text-primary" size={20} />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card/50 border border-border">
              <p className="text-muted-foreground text-sm font-mono">
                <span className="text-primary">{'>'}</span> {t(
                  'Available for senior architecture roles, consulting, and advisory work.',
                  '可接受高级架构职位、咨询和顾问工作。'
                )}
              </p>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                {t('Name', '姓名')}
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t('Your name', '您的姓名')}
                className="bg-card/50 border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                {t('Email', '邮箱')}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t('your@email.com', 'your@email.com')}
                className="bg-card/50 border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">
                {t('Message', '留言')}
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder={t(
                  'Tell me about your project or opportunity...',
                  '告诉我您的项目或机会...'
                )}
                rows={5}
                className="bg-card/50 border-border focus:border-primary resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full glow-box bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                t('Sending...', '发送中...')
              ) : (
                <>
                  <Send size={18} />
                  {t('Send Message', '发送消息')}
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm font-mono">
            {'© '}{new Date().getFullYear()} {t('Deming Song', '宋德明')} {'// '} 
            {t('Built with React + TypeScript', '使用 React + TypeScript 构建')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
