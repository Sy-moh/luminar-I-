/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail,
  Users,
  LockOpen
} from 'lucide-react';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

const FUNDRAISING_URL = "https://fundraising.fracturedatlas.org/the-luminaria-imagineerium/general_support";

// --- Custom Animation Wrapper ---

const FadeIn = ({ children, delay = 0, direction = 'up', distance = 20, duration = 0.8, className = "" }: { 
  children: ReactNode; 
  delay?: number; 
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  key?: React.Key;
  className?: string;
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Components ---

const TopBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, minutes: 42, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-deep-space py-2.5 md:py-3 px-4 text-center border-b border-white/5 shadow-lg relative z-[110]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-3 text-[11px] md:text-sm">
        <span className="text-white/95 font-medium tracking-wide">
          May 4–8 · Help us unlock $1,000 → 
          <a 
            href={FUNDRAISING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-ember-glow hover:text-white transition-colors underline underline-offset-4 decoration-ember-glow/30"
          >
            Donate Now
          </a>
        </span>
      </div>
    </div>
  );
};


const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      
      const sections = ['hero', 'vision', 'campaign', 'contact'];
      // Offset for sticky header
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Vision', id: 'vision' },
    { name: 'Donate', id: 'campaign' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add global scroll handler for internal links
    const handleInternalLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = link.getAttribute('href')?.substring(1);
        if (id) scrollToSection(id);
      }
    };

    document.addEventListener('click', handleInternalLinks);
    return () => document.removeEventListener('click', handleInternalLinks);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-[1000] transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-deep-space/60 backdrop-blur-xl border-white/5 py-4 shadow-2xl' 
          : 'bg-deep-space/20 backdrop-blur-md border-white/10 py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 bg-luminaria-glow/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center transition-all duration-700 group-hover:rotate-[15deg] shadow-[0_0_15px_rgba(124,92,255,0.4)]">
              <Sparkles className="text-white w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold tracking-tight text-white leading-none">
              Luminaria
            </span>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-luminaria-glow transition-colors duration-300">
              Imagineerium
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                activeSection === link.id ? 'text-luminaria-glow' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-luminaria-glow shadow-[0_0_15px_rgba(124,92,255,0.8)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Nav Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors relative z-[110]"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
          </div>
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Click-away backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 z-[90] md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10, transformOrigin: 'top right' }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 w-64 md:hidden z-[1001] mt-2"
              >
                <div className="bg-[#0A0F1F]/98 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-1">
                  {navLinks.map((link, idx) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => scrollToSection(link.id)}
                      className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 w-full px-5 py-4 text-left rounded-xl flex items-center justify-between ${
                        activeSection === link.id 
                          ? 'text-luminaria-glow bg-white/5' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      {activeSection === link.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-luminaria-glow shadow-[0_0_8px_rgba(124,92,255,1)]" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};


const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const visions = [
    "“I want a world where no one goes to bed hungry.” — Tida, Conakry",
    "“I just wish our air and oceans were cleaner than this….” — Daniel, London",
    "“Every child should have somewhere they feel safe enough to learn.” — Sofia, Manila",
    "“I want energy that doesn’t cost the earth its future.” — Lucas, São Paulo",
    "“A world where people don’t have to live through war.” — Mariam, Muscat",
    "“I want cities that actually work for people and the earth, not just systems..” — Lisa, New York",
    "“Healthcare that reaches you when you need it most. ” — Priya, Delhi",
    "“I just want a place I can call home and not worry about losing it.” — Aisha, Gaza",
    "“Stories that connect us more than the news about everything going wrong..” — Kenji, Osaka",
    "“I want forests to come back faster than we’re losing them.” — Noah, Sydney"
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    /* WIND FIELD SETTINGS */
    const config = {
      speedBase: 1.1,
      amplitude: 35,
      frequency: 0.008,
      batchSize: 3,
      batchGapMs: 4000, 
    };

    const cardStates = visions.map((text, i) => ({
      x: -500, 
      y: 80,
      phase: Math.random() * 1000,
      speed: config.speedBase + Math.random() * 0.5,
      size: 0.7 + Math.random() * 0.35,
      active: false
    }));

    let animationId: number;
    let currentBatchIndex = 0;
    let lastBatchStartTime = 0;
    let isWaveLiving = false;

    const animate = () => {
      const now = Date.now();
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      // STARTING A NEW WAVE
      if (!isWaveLiving) {
        if (now - lastBatchStartTime > config.batchGapMs) {
          isWaveLiving = true;
          
          const startIdx = currentBatchIndex * config.batchSize;
          const endIdx = startIdx + config.batchSize;
          
          for (let i = startIdx; i < endIdx && i < cardStates.length; i++) {
            const state = cardStates[i];
            state.active = true;
            // Stagger horizontal entry so they don't stack
            state.x = -400 - (i - startIdx) * 450; 
            // Avoid UI zone (bottom-left) by staying in upper atmospheric bands
            // We give each card in the wave a dedicated lane to prevent overlaps
            state.y = 80 + ((i - startIdx) * (winH * 0.12)) + (Math.random() * (winH * 0.05));
          }
        }
      }

      let stillActiveCount = 0;

      cardStates.forEach((state, i) => {
        const el = cardRefs.current[i];
        if (!el) return;

        if (state.active) {
          stillActiveCount++;
          state.x += state.speed;

          /* CURVED WIND FLOW */
          const wave = Math.sin((state.x + state.phase) * config.frequency) * config.amplitude;
          const drift = Math.sin((state.phase + now * 0.0003)) * 8;

          const x = state.x;
          const y = state.y + wave + drift;

          // Check if exited screen
          if (state.x > winW + 500) {
            state.active = false;
          }

          el.style.opacity = "1";
          el.style.display = "block";
          el.style.transform = `translate(${x}px, ${y}px) scale(${state.size})`;
        } else {
          el.style.opacity = "0";
          el.style.display = "none";
          el.style.transform = `translate(-1000px, 0px)`; 
        }
      });

      // WAVE COMPLETED?
      if (isWaveLiving && stillActiveCount === 0) {
        isWaveLiving = false;
        lastBatchStartTime = now;
        currentBatchIndex++;
        
        // Loop back to beginning
        if (currentBatchIndex * config.batchSize >= cardStates.length) {
          currentBatchIndex = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const scrollToVision = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('problem');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Artistic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop" 
          alt="Luminaria Vision" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Added dark overlay for better text legibility */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
      </div>

      {/* Wind-Driven Imagination Clouds (JS Layer) */}
      <div ref={containerRef} className="absolute inset-0 z-20 pointer-events-none">
        {visions.map((text, i) => (
          <div 
            key={i}
            ref={el => cardRefs.current[i] = el}
            className="vision-glow-card absolute w-[240px] sm:w-[280px] will-change-transform"
          >
            <span className="text-[12px] md:text-[14px] leading-snug text-white font-medium">{text}</span>
          </div>
        ))}
      </div>

      {/* Main UI Overlay - Elevated Z-Index */}
      <div className="absolute left-0 right-0 px-6 md:px-0 md:left-[8%] top-[20%] md:top-[28%] z-30 max-w-7xl md:max-w-[650px] pointer-events-none flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div
           initial={{ opacity: 0, y: 20, md: { x: -30, y: 0 } }}
           animate={{ opacity: 1, y: 0, md: { x: 0 } }}
           transition={{ duration: 1.2 }}
           className="pointer-events-auto"
        >
          <h1 className="mb-6 text-white text-[32px] sm:text-[42px] md:text-[54px] font-bold leading-[1.1] md:leading-tight">
            You dream of a<br /> 
            better world. <br /> 
            This is where it starts <span className="font-serif italic text-luminaria-glow font-normal">becoming real.</span>
          </h1>
          <p className="text-[16px] md:text-[18px] font-normal leading-[1.6] md:leading-[1.8] tracking-[-0.01em] md:tracking-[-0.015em] mb-10 max-w-[480px] text-white/90 drop-shadow-sm">
            The Luminary Imaginarium is a living art project; a global gallery where visions of a better world are shared, explored, and brought to life together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-6">
            <a 
               href={FUNDRAISING_URL}
               target="_blank"
               rel="noopener noreferrer"
               className="w-full sm:w-auto bg-ember-glow text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-[12px] md:rounded-[14px] text-sm md:text-lg shadow-[0_12px_40px_rgba(255,107,74,0.35)] hover:shadow-[0_16px_50px_rgba(255,107,74,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto flex items-center justify-center text-center"
            >
              Help Build the Gallery
            </a>
          </div>
          
          <div className="text-white/40 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase border-l-2 border-luminaria-glow/30 pl-4 py-1">
            Become a founding supporter of the 
            <br /> first Thriving World Gallery.
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <button 
          onClick={scrollToVision}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors duration-500 group"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent group-hover:from-white group-hover:h-16 transition-all duration-700" />
        </button>
      </motion.div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 md:py-32 px-6 bg-white text-slate-900 relative overflow-hidden">
      {/* Artistic Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=2000&auto=format&fit=crop&q=80"
          alt="White texture background"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative">
                <div className="transition-transform duration-700 max-w-md mx-auto lg:mx-0">
                  <div className="relative aspect-[4/5] bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100">
                    <img 
                      src="https://res.cloudinary.com/dm7szzkwo/image/upload/f_auto,q_auto/vision_action_eef3zq" 
                      alt="Visionary Action" 
                      className="w-full h-full object-contain transition-transform duration-1000 relative z-10"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="fallback-placeholder absolute inset-0 flex items-center justify-center border-2 border-dashed border-slate-200">
                      <div className="text-center">
                        <Sparkles className="w-10 h-10 text-luminaria-glow/20 mx-auto mb-4" />
                        <span className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">Vision Gallery Space</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Artistic accents */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 border-r-2 border-b-2 border-luminaria-glow/20 z-0" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-luminaria-glow/5 blur-[80px] rounded-full pointer-events-none z-0" />
              </div>
            </FadeIn>
          </div>

          {/* Text Column */}
          <div className="order-1 lg:order-2">
            <FadeIn direction="right">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-slate-900">
                  You care about this world. <br />
                  <span className="font-serif italic text-luminaria-glow font-normal">You always have.</span>
                </h2>

                <div className="space-y-4 md:space-y-5 text-slate-800 body-lg font-sans">
                  <div className="space-y-2 md:space-y-3">
                    <p>So you watch. You read. You hope.</p>
                    <p>Maybe you donated once or more. Maybe you signed something.</p>
                  </div>
                  
                  <div className="pl-6 border-l-2 border-luminaria-glow/30 relative py-1">
                    <p className="text-slate-900 font-medium leading-tight">And still, the headlines keep coming.</p>
                    <p className="mt-2 text-slate-800">
                      And somewhere along the way, a thought crept in: 
                      <span className="italic block mt-1">"What if nothing actually changes?"</span>
                    </p>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <p>
                      That thought is not weakness. It’s what happens when caring people 
                      have nowhere real to put their energy. 
                    </p>
                    <p>
                      When the only options feel like donate, scroll, or despair. 
                      When your dream has nowhere to grow, <span className="italic">so it quietly fades.</span>
                    </p>
                  </div>

                  <div className="space-y-2 md:space-y-3 italic text-slate-600">
                    <p>Millions are living in that silence right now.</p>
                    <p>
                      Each carrying a spark of something better. 
                      But those sparks rarely find each other.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <p className="text-slate-500 text-base font-serif italic mb-2 font-medium">
                    This isn't just a resource problem.
                  </p>
                  <p className="text-luminaria-glow text-4xl md:text-5xl font-serif italic font-bold leading-tight">
                    It's an imagination gap.
                    <span className="text-slate-700 text-xl font-sans font-semibold block mt-2">And it doesn’t have to stay that way.</span>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

const ThrivingSection = () => {
  return (
    <section id="thriving" className="py-20 md:py-48 px-6 bg-[#0a0a1a] text-white relative overflow-hidden">
      {/* Texture Background - High-end painterly abstract matching the user's uploaded style */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550684848-86a5d8727436?w=2000&auto=format&fit=crop&q=80" 
          alt="Dark painterly abstract background" 
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-transparent to-[#0a0a1a]" />
        <div className="absolute inset-0 bg-[#0a0a1a]/40" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <FadeIn direction="up">
          <div className="section-label !mb-6 mx-auto">
            Transformation
          </div>
          <h2 className="text-white mb-10 text-center">
            The art of <br />
            <span className="font-serif italic text-luminaria-glow font-normal">thriving</span>
          </h2>
        </FadeIn>

        <div className="space-y-8 text-white body-xl max-w-3xl mx-auto">
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl leading-relaxed">
              Before anything changes in the world, it is imagined.<br />
              Every movement. Every act of beauty. 
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="text-white text-xl md:text-2xl leading-relaxed">
              Every world that became better than the one before it<br className="hidden md:block" />
              began as a vision <span className="font-serif italic text-luminaria-glow text-3xl">someone dared to hold.</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="py-10 relative inline-block w-full">
               <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-px bg-gradient-to-r from-transparent via-luminaria-glow/60 to-transparent" />
               <p className="font-display font-medium text-white tracking-widest uppercase text-sm md:text-base">
                 We call this the art of thriving.
               </p>
               <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-px bg-gradient-to-r from-transparent via-luminaria-glow/60 to-transparent" />
            </div>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="space-y-6 italic text-white/80 text-lg md:text-xl">
              <p>
                The practice of imagining a better world <br />
                and choosing to express it, share it, and grow it with others.
              </p>
              <p>
                Not as something distant. <br />
                But as something we begin to shape together, right now.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={1.0}>
            <div className="pt-12 flex flex-col items-center gap-6">
              <p className="text-luminaria-glow font-medium tracking-[0.3em] uppercase text-xs">
                Imagination becomes connection.
              </p>
              <div className="w-px h-16 bg-gradient-to-b from-luminaria-glow to-transparent" />
              <p className="text-3xl md:text-5xl font-display font-medium tracking-tight">
                Connection becomes <br /> something real.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-luminaria-glow/20 blur-[140px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-ember-glow/10 blur-[160px] rounded-full pointer-events-none opacity-30" />
    </section>
  );
};


const ConnectionSection = () => {
  return (
    <section id="vision" className="py-24 md:py-40 px-6 relative overflow-hidden bg-white text-slate-900">
      {/* Artistic Dynamic Background - Replaced with Section 2 background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=2000&auto=format&fit=crop&q=80"
          alt="White texture background"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <FadeIn direction="left">
            {/* New Video Section */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-slate-50 mt-12 lg:mt-0 max-w-md mx-auto">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&auto=format&fit=crop&q=60"
              >
                <source src="/images/campaign_vision.mov" type="video/quicktime" />
                <source src="/images/campaign_vision.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-slate-900">
                What if those sparks <br />
                <span className="font-serif italic text-luminaria-glow font-normal">finally had a place to meet?</span>
              </h2>

              <div className="space-y-5">
                <div className="space-y-3 text-slate-800 body-lg">
                  <p>
                    We are building the Thriving World Gallery; a living digital art space shaped by people across the world.
                  </p>
                  <p>
                    Not a feed. Not a campaign. <br className="hidden md:block" />
                    A gallery where imagination is the medium and a thriving world is the work.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-luminaria-glow font-bold tracking-[0.2em] uppercase text-xs">Inside this space:</h4>
                  <ul className="space-y-3">
                    {[
                      "People share simple visions of a better world; a thought, an idea, an expression.",
                      "Others discover them and add to them",
                      "Ideas grow through connection and collaboration"
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-start text-slate-800">
                        <span className="text-luminaria-glow shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 text-slate-800 body-lg">
                  <p>
                    Someone brings a vision. Someone else recognises it. Another has the skill to help it grow. <br />
                    <span className="text-slate-900 font-medium">For the first time — They find each other.</span>
                  </p>
                  <p className="border-l-2 border-luminaria-glow/30 pl-6 py-1 italic text-slate-700">
                    This is not something you scroll through. <br />
                    It is something you enter. Something you become part of.
                  </p>
                </div>

                <div className="pt-6">
                  <a 
                    href={FUNDRAISING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 md:px-10 py-3 md:py-5 bg-ember-glow text-white font-display font-bold text-base md:text-lg rounded-[12px] hover:bg-white hover:text-deep-space hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(255,107,74,0.4)]"
                  >
                    Add Your Voice. Help Build the Gallery →
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};


const OurStoryAndVisionSection = () => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isVisionOpen, setIsVisionOpen] = useState(false);

  return (
    <section id="our-story" className="py-16 md:py-20 px-6 bg-white relative overflow-hidden">
      {/* Unified Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=2000&auto=format&fit=crop&q=80"
          alt="White texture background"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        {/* Block 1: Who We Are */}
        <div 
          className={`overflow-hidden transition-all duration-700 rounded-[32px] border ${
            isStoryOpen 
              ? 'bg-white border-transparent shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] scale-[1.01]' 
              : 'bg-white/80 backdrop-blur-md border-black/5 hover:border-black/10 hover:shadow-lg'
          }`}
        >
          <button 
            onClick={() => {
              setIsStoryOpen(!isStoryOpen);
              if (!isStoryOpen) setIsVisionOpen(false);
            }}
            className="w-full px-6 md:px-10 py-6 md:py-8 flex items-center justify-between text-left group gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1px] bg-luminaria-glow/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luminaria-glow" style={{ fontFamily: 'Arial, sans-serif' }}>The Origins</span>
              </div>
              <span className="text-xl md:text-2xl font-display font-medium tracking-tight text-slate-900">
                Who We Are
              </span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${
              isStoryOpen 
                ? 'bg-luminaria-glow text-white shadow-md shadow-luminaria-glow/20' 
                : 'bg-slate-50 text-slate-400 group-hover:bg-luminaria-glow group-hover:text-white group-hover:shadow-md shadow-sm border border-black/5'
            }`}>
              <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isStoryOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          <AnimatePresence>
            {isStoryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-10 pb-10 md:pb-14">
                  <div className="grid lg:grid-cols-11 gap-12 items-center">
                    <div className="lg:col-span-5 relative order-1 lg:order-1">
                      <div className="relative group/img">
                        {/* Main Image */}
                        <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl border border-black/5 bg-slate-50 z-10 transition-transform duration-500 group-hover/img:-translate-y-2">
                           <img 
                             src="/images/who_we_are_main.jpg" 
                             alt="Luminaria Visionary Lead" 
                             className="w-full h-full object-cover transition-transform duration-2000 group-hover/img:scale-105"
                             referrerPolicy="no-referrer"
                             onError={(e) => {
                               const target = e.target as HTMLImageElement;
                               // Safe fallback to existing image
                               target.src = "/images/hub.png";
                             }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover/img:opacity-20 transition-opacity duration-1000" />
                        </div>



                        {/* Artistic Accents */}
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-luminaria-glow/20 z-0 rounded-tl-[30px]" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-luminaria-glow/5 blur-[60px] rounded-full pointer-events-none z-0" />
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-6 text-slate-700 body-lg leading-[1.7] order-2 lg:order-2">
                      <div className="space-y-6">
                        <p className="first-letter:text-5xl first-letter:font-serif first-letter:italic first-letter:text-luminaria-glow first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:pt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                          The Luminary Imaginarium was founded by Amber Jade — an artist, musician, and social innovator — with a simple belief: the world doesn’t change until people can imagine it differently.
                        </p>
                        <p style={{ fontFamily: 'Arial, sans-serif' }}>
                          We are a nonprofit arts and innovation project, fiscally sponsored by Fractured Atlas — a registered 501(c)(3). We sit at the intersection of art, imagination, and community — a living creative project with one intention: bringing a thriving world to life.
                        </p>
                        <div className="space-y-4 pt-2">
                          <p style={{ fontFamily: 'Arial, sans-serif' }}>
                            Before anything changes, it is imagined. And imagination is not private — It is built together. 
                          </p>
                          <p style={{ fontFamily: 'Arial, sans-serif' }}>
                            When people can see new possibilities, and feel supported by others who believe in them, they begin to make them real.
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                         <div className="w-7 h-7 rounded-full hero-gradient flex items-center justify-center opacity-40">
                           <Sparkles className="w-3.5 h-3.5 text-white" />
                         </div>
                        <p className="font-display font-bold text-slate-900 italic text-xl tracking-tight leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                          "That’s what we’re building. And you’re part of how it begins."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Block 2: Mission & Vision */}
        <div 
          className={`overflow-hidden transition-all duration-700 rounded-[32px] border ${
            isVisionOpen 
              ? 'bg-white border-transparent shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] scale-[1.01]' 
              : 'bg-white/80 backdrop-blur-md border-black/5 hover:border-black/10 hover:shadow-lg'
          }`}
        >
          <button 
            onClick={() => {
              setIsVisionOpen(!isVisionOpen);
              if (!isVisionOpen) setIsStoryOpen(false);
            }}
            className="w-full px-6 md:px-10 py-6 md:py-8 flex items-center justify-between text-left group gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1px] bg-luminaria-glow/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luminaria-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Core Intent</span>
              </div>
              <span className="text-xl md:text-2xl font-display font-medium tracking-tight text-slate-900">
                Mission <span className="font-serif italic text-luminaria-glow normal-case font-normal">& Vision</span>
              </span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${
              isVisionOpen 
                ? 'bg-luminaria-glow text-white shadow-md shadow-luminaria-glow/20' 
                : 'bg-slate-50 text-slate-400 group-hover:bg-luminaria-glow group-hover:text-white group-hover:shadow-md shadow-sm border border-black/5'
            }`}>
              <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isVisionOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          <AnimatePresence>
            {isVisionOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <div 
                  className="px-8 md:px-14 pb-12 md:pb-20 text-slate-700 leading-relaxed"
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                >
                  <div className="space-y-8">
                    {/* Mission & Vision Intro */}
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-1 h-auto border-l-2 border-luminaria-glow/30 rounded-full" />
                        <p className="text-[16px] text-slate-900 font-medium">Our mission is to help bring a more sustainable, just, and thriving world to life — through art, creativity, and collective imagination.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-1 h-auto border-l-2 border-ember-glow/30 rounded-full" />
                        <p className="text-[16px] text-slate-900 font-medium">Our vision is a world where people and the planet thrive together — not in opposition, but in collaboration, care, and shared responsibility.</p>
                      </div>
                    </div>

                    {/* The Meaning of Thriving */}
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-slate-900 font-normal mb-4">To us, thriving means living well in balance with each other and with the Earth.</p>
                      <div className="space-y-2 border-l-2 border-slate-100 ml-1 pl-5">
                        <p style={{ color: '#050505' }} className="italic">Not as sacrifice.</p>
                        <p style={{ color: '#080808' }} className="italic">Not as something distant or out of reach.</p>
                      </div>
                    </div>

                    {/* The Shift */}
                    <div className="space-y-4">
                      <p className="text-slate-900 font-normal">But as a shift in how we live and relate to the world around us —</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { from: "extraction", to: "care" },
                          { from: "consumption", to: "creation" },
                          { from: "isolation", to: "connection" }
                        ].map((shift, i) => (
                          <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-luminaria-glow/30 transition-colors">
                            <span className="block text-[10px] uppercase tracking-widest text-slate-400 line-through mb-1">{shift.from}</span>
                            <span className="block text-lg font-bold text-slate-900 group-hover:text-luminaria-glow transition-colors">{shift.to}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* The Building Section */}
                    <div className="pt-6 mt-8 bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-luminaria-glow/10 blur-3xl rounded-full" />
                      <p className="text-luminaria-glow font-bold tracking-widest uppercase text-[10px] mb-4">This is what we’re building:</p>
                      <p className="text-2xl font-bold mb-6 tracking-tight">A global gallery of visions —</p>
                      <div className="space-y-3 text-slate-300">
                        <div className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-luminaria-glow mt-2.5 shrink-0" />
                          <p>a space where people can share their ideas for a better world,</p>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-luminaria-glow mt-2.5 shrink-0" />
                          <p>find others who believe in them,</p>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-luminaria-glow mt-2.5 shrink-0" />
                          <p>and begin bringing those visions to life together.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const VisionGallery = () => {
  const visions = [
    {
      title: "Atmospheric Restoration",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      size: "large"
    },
    {
      title: "Collective Dreaming",
      category: "Art & Culture",
      image: "/images/vision_action.png",
      size: "small"
    },
    {
      title: "Solar Kinetic Sculptures",
      category: "Energy",
      image: "https://images.unsplash.com/photo-1509391366360-fe58f9df77e5?auto=format&fit=crop&w=800&q=80",
      size: "small"
    },
    {
      title: "Bioluminescent Cities",
      category: "Urban Future",
      image: "https://images.unsplash.com/photo-1444703686981-a3abb997c7e8?auto=format&fit=crop&w=1200&q=80",
      size: "wide"
    }
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="left">
            <h2 className="text-deep-space">
              What changes because of <br />
              <span className="font-serif italic text-luminaria-glow font-normal">your support.</span>
            </h2>
          </FadeIn>

          <div className="space-y-12">
            {[
              { emoji: '✨', text: 'Visions that once had nowhere to go finally have a place to grow' },
              { emoji: '🌍', text: 'People who carry the same dream find each other and start building together' },
              { emoji: '💡', text: 'Ideas that would have faded begin to take shape in the real world' }
            ].map((item, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.2}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-warm-light flex items-center justify-center text-2xl shadow-sm border border-black/5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {item.emoji}
                  </div>
                  <p className="body-xl text-slate-800 pt-1">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.8} direction="up">
              <div className="pt-6">
                <a 
                  href={FUNDRAISING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-sm md:text-lg px-6 md:px-10 py-2.5 md:py-5 inline-block"
                >
                  Become a Founding Supporter
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const SupportBuildingSection = () => {
  const items = [
    {
      title: "The Thriving World Gallery",
      description: "A digital space where visions of a better future can be shared, explored, and celebrated, making visible what's possible when imagination has room to breathe.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800"
    },
    {
      title: "A Hub for Visionaries",
      description: "A place where people and creators can find each other, collaborate across borders and disciplines, and shape ideas into something real.",
      image: "/images/hub.png"
    },
    {
      title: "A Stepping Stone to Reality",
      description: "A bridge from isolated sparks of imagination to a shared, living blueprint for a more sustainable, just, and thriving world.",
      image: "https://images.unsplash.com/photo-1449156001931-158bb26162e7?auto=format&fit=crop&w=800"
    }
  ];

  return (
    <section id="support" className="py-20 md:py-32 px-6 bg-warm-light text-slate-800 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn direction="up">
          <div className="mb-20">
            <h2 className="text-slate-900">What your support <br /><span className="font-serif italic text-luminaria-glow font-normal">is building.</span></h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {items.map((item, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.2} className="h-full">
              <div className="group h-full flex flex-col">
                {/* Image Container */}
                <div className="aspect-video w-full bg-black/5 rounded-2xl border border-black/10 mb-8 overflow-hidden relative group-hover:border-luminaria-glow/30 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-luminaria-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                  
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  
                  {/* Fallback Placeholder UI */}
                  <div className="hidden absolute inset-0 flex items-center justify-center text-center p-8 bg-black/5">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-black/20" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/10">Upload {item.image.split('/').pop()}</span>
                    </div>
                  </div>
                </div>

                <div className="w-12 h-[1px] bg-luminaria-glow mb-8 group-hover:w-24 transition-all duration-500" />
                <h3 className="text-2xl font-display font-bold mb-6 text-slate-900 group-hover:text-luminaria-glow transition-colors">{item.title}</h3>
                <p className="text-slate-800 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="none" distance={0}>
          <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
            <p className="text-sm italic font-light max-w-2xl text-slate-600">
              Luminaria Imagineerium is fiscally sponsored by Fractured Atlas, a registered 501(c)(3) nonprofit, ensuring your donation is secure and tax-deductible.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-luminaria-glow">
              <Heart className="w-3 h-3 fill-current" /> Verified Non-Profit Project
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luminaria-glow/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

const SpringMatchSection = () => {
  return (
    <section id="campaign" className="py-20 md:py-48 px-6 relative overflow-hidden bg-[#0a0a1a] text-white">
      {/* Dark Painterly Background - Outer background replaced while keeping inner card white */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550684848-86a5d8727436?w=2000&auto=format&fit=crop&q=80"
          alt="Dark abstract art background"
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-transparent to-[#0a0a1a]" />
        <div className="absolute inset-0 bg-[#0a0a1a]/40" />
      </div>

      <FadeIn direction="up">
        <div className="max-w-4xl mx-auto text-center border border-white/10 rounded-sm p-8 sm:p-12 md:p-20 bg-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.4)] relative z-10">
          <div className="section-label">
            THE MATCH CAMPAIGN
          </div>
          
          <h2 className="mb-8 text-slate-900">
            Help unlock an extra <span className="text-luminaria-glow font-medium">$1,000</span> in funding
          </h2>


          <div className="space-y-10 max-w-2xl mx-auto body-lg text-slate-800 font-sans">
            <p>
              From <span className="font-semibold text-slate-900">May 4–8</span>, we are part of a public funding campaign through Fractured Atlas.
            </p>
            
            <p className="text-slate-800">
              The project with the most individual donors receives an additional $1,000 grant.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-12 py-4">
              {['$5 counts.', '$25 counts.', '$100 counts.'].map((text, idx) => (
                <p key={idx} className="text-2xl md:text-4xl font-display font-medium text-slate-900 border-b border-luminaria-glow/20 pb-2">{text}</p>
              ))}
            </div>

            <p className="text-slate-800 font-medium italic border-t border-slate-200 pt-10">
              Every supporter moves us closer
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <a 
               href={FUNDRAISING_URL}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center px-8 md:px-10 py-3 md:py-5 bg-ember-glow text-white font-display font-bold text-base md:text-lg rounded-[12px] hover:bg-deep-space hover:text-white hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(255,107,74,0.3)]"
            >
              Give Before May 8 →
            </a>
            <p className="text-slate-500 text-sm font-light">
              Donate securely through Fractured Atlas · Tax-deductible
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-luminaria-glow/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-ember-glow/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};

const GiftImpactSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState<'upcoming' | 'active' | 'ended'>('upcoming');

  useEffect(() => {
    const startDate = new Date('2026-05-04T00:00:00Z').getTime();
    const endDate = new Date('2026-05-09T00:00:00Z').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      let targetDate = startDate;
      let currentStatus: 'upcoming' | 'active' | 'ended' = 'upcoming';

      if (now < startDate) {
        targetDate = startDate;
        currentStatus = 'upcoming';
      } else if (now < endDate) {
        targetDate = endDate;
        currentStatus = 'active';
      } else {
        currentStatus = 'ended';
      }

      setStatus(currentStatus);

      if (currentStatus === 'ended') {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="gift-impact" className="py-24 md:py-32 px-6 relative overflow-hidden bg-white">
      {/* Background Image Container - Matches Section 2 */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=2000&auto=format&fit=crop&q=80"
          alt="White texture background"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn direction="left">
            <div className="space-y-8 md:space-y-10 text-center lg:text-left">
              <div>
                <span className="text-luminaria-glow uppercase tracking-[0.2em] text-[11px] font-bold mb-4 block underline underline-offset-8 font-arial">Double Impact</span>
                <h2 className="text-slate-900">
                  What your gift <br />
                  <span className="font-serif italic text-luminaria-glow font-normal">actually does.</span>
                </h2>
              </div>
              
              <p className="body-xl text-slate-800">
                Your donation during this window does two powerful things at once:
              </p>

              <div className="space-y-12">
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-full bg-luminaria-glow/10 flex items-center justify-center text-luminaria-glow group-hover:bg-luminaria-glow group-hover:text-white transition-all duration-500 shadow-sm">
                    <Zap className="w-8 h-8 fill-current" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold mb-2 text-slate-900">It fuels the mission</h3>
                    <p className="text-slate-800 font-normal leading-relaxed">
                      Directly funding the tools, spaces, and support that turn imagination into action.
                    </p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-full bg-golden-hour/10 flex items-center justify-center text-golden-hour group-hover:bg-golden-hour group-hover:text-white transition-all duration-500 shadow-sm">
                    {/* Literal Unlocked Padlock */}
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <rect x="3" y="11" width="18" height="11" rx="2.5" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
                      <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
                      <path d="M12 18V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold mb-2 text-slate-900">It unlocks the grant</h3>
                    <p className="text-slate-800 font-normal leading-relaxed">
                      Every donor is an entry, placing us in the running for an extra $1,000 at no cost to you.
                    </p>
                  </div>
                </div>
              </div>

              <p className="pt-8 text-slate-800 font-normal leading-relaxed border-t border-slate-100 text-base">
                This is about momentum. Every donation in these five days brings you closer to sharing a sustainable, just, thriving world.
              </p>
            </div>
          </FadeIn>

          {/* Countdown & CTA Column */}
          <FadeIn direction="up" delay={0.2}>
            <div className="bg-deep-space rounded-[30px] md:rounded-[40px] p-8 md:p-16 text-white text-center shadow-2xl relative overflow-hidden group">
              {/* Background Majestic Tree Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://picsum.photos/seed/majestic-oak/800/1200" 
                  alt="Majestic Tree" 
                  className="w-full h-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-deep-space/60 via-deep-space/20 to-deep-space/90" />
              </div>

              <div className="relative z-10">
                <span className="text-luminaria-glow text-xs font-bold uppercase tracking-[0.4em] mb-12 block">
                  {status === 'upcoming' ? 'Campaign Window Opens In' : status === 'active' ? 'Campaign Window Ends In' : 'Campaign Window Closed'}
                </span>
                
                <div className="grid grid-cols-4 gap-4 mb-16">
                  {[
                    { val: timeLeft.days, label: 'Days' },
                    { val: timeLeft.hours, label: 'Hours' },
                    { val: timeLeft.minutes, label: 'Mins' },
                    { val: timeLeft.seconds, label: 'Secs' }
                  ].map((t, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{String(t.val).padStart(2, '0')}</div>
                      <div className="text-[11px] uppercase tracking-widest text-white/40 font-bold">{t.label}</div>
                    </div>
                  ))}
                </div>

                <div className="h-[1px] w-full bg-white/10 mb-12" />

                <h4 className="text-xl md:text-2xl font-light mb-12 text-white/80">
                  May 4 – May 8, 2026
                </h4>

                <a 
                  href={FUNDRAISING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-ember-glow text-white font-bold py-3.5 md:py-6 px-6 md:px-10 rounded-[12px] md:rounded-[20px] text-sm md:text-lg shadow-[0_20px_48px_rgba(255,107,74,0.3)] hover:shadow-[0_24px_60_rgba(255,107,74,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-3"
                >
                  {status === 'ended' ? 'Join the waitlist' : 'Help unlock $1,000'} <ArrowRight className="w-5 h-5" />
                </a>
                
                <p className="mt-8 text-white/30 text-xs uppercase tracking-widest font-bold">
                  Become a Founding Supporter
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const DonationImpactSection = () => {
  const categories = [
    { 
      title: 'Platform Development', 
      desc: 'Creating a beautiful, accessible digital home for visionaries, ideas, and connection',
      progress: 35
    },
    { 
      title: 'Creative Support', 
      desc: 'Mentorship, visibility, and resources for the creators shaping new possibilities',
      progress: 25
    },
    { 
      title: 'Community Outreach', 
      desc: 'Events, partnerships, and open doors for new voices to enter the space',
      progress: 25
    },
    { 
      title: 'Operations', 
      desc: 'Fair wages and the day-to-day care that keeps this project growing sustainably',
      progress: 15
    },
  ];

  return (
    <section id="impact" className="py-20 md:py-32 px-6 bg-[#0a0a1a] text-white relative overflow-hidden">
      {/* Dark Painterly Background - Matching Section 3 */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550684848-86a5d8727436?w=2000&auto=format&fit=crop&q=80" 
          alt="Dark abstract art background" 
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-transparent to-[#0a0a1a]" />
        <div className="absolute inset-0 bg-[#0a0a1a]/40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="mb-8 text-white uppercase">
            Where your <span className="font-serif italic text-luminaria-glow normal-case font-normal">donation goes</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/80 body-xl leading-relaxed">
            Every contribution goes directly toward building the sanctuary for imagination:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {categories.map((cat, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.1} className="h-full">
              <div className="rounded-[40px] bg-white border border-black/[0.03] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.02)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden flex flex-col h-full">
                <div className="aspect-[2/1] w-full bg-warm-light/50 shadow-inner flex flex-col justify-center px-10 relative overflow-hidden">
                  <div className="flex items-center justify-end mb-4">
                    <span className="text-sm font-mono font-bold text-luminaria-glow">{cat.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/[0.05] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                      className="h-full hero-gradient"
                    />
                  </div>
                </div>
                <div className="p-8 md:p-10 flex-1">
                  <h3 className="text-2xl font-display font-bold mb-4 tracking-tight text-slate-900">{cat.title}</h3>
                  <p className="text-slate-800 font-normal leading-relaxed text-sm">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-xl md:text-2xl font-serif font-light text-white/90 italic leading-relaxed">
            "Whether you give $10, $50, or $500 — your gift directly builds something that has never existed before."
          </p>
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-white/50 uppercase tracking-[0.2em] font-bold">
              All donations are securely managed through Fractured Atlas, a registered 501(c)(3) fiscal sponsor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


const FinalCTA = () => {
  return (
    <section id="donate" className="py-20 md:py-48 px-6 relative overflow-hidden bg-white text-slate-900">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=2000&auto=format&fit=crop&q=80" 
          alt="White texture background" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/30" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          <FadeIn direction="up">
            <div className="flex flex-col items-center">
              <span className="section-label">Join the movement</span>
              <h2 className="mb-8 md:mb-12 text-slate-900">
                <span className="text-luminaria-glow">The window is short.</span> <br />
                <span className="font-serif italic text-slate-900 font-normal">The vision is ready.</span>
              </h2>
              
              <div className="space-y-8 md:space-y-12 mb-12 md:mb-16 flex flex-col items-center">
                <p className="text-xl md:text-3xl font-serif font-light text-slate-800 italic border-t border-luminaria-glow/20 pt-8 md:pt-10 px-4 md:px-6 leading-snug">
                  A better world doesn't wait to be imagined —<br />
                  it waits for the people willing to help build it.
                </p>

                <div className="space-y-8">
                  <p className="text-slate-800 font-normal">
                    Join as a founding supporter. <br />
                    Help create the space where:
                  </p>
                  
                  <div className="space-y-4 flex flex-col items-center">
                    <p className="text-2xl font-display font-medium text-slate-900 group cursor-default hover:text-luminaria-glow transition-colors duration-500">visions become action</p>
                    <p className="text-2xl font-display font-medium text-slate-900 group cursor-default hover:text-luminaria-glow transition-colors duration-500">ideas become connection</p>
                    <p className="text-2xl font-display font-medium text-slate-900 group cursor-default hover:text-luminaria-glow transition-colors duration-500">the future begins to take shape</p>
                  </div>
                </div>
              </div>

              <div className="space-y-10 flex flex-col items-center w-full max-w-xl">
                <a 
                  href={FUNDRAISING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto bg-ember-glow text-white font-bold py-3 md:py-6 px-6 md:px-12 rounded-[12px] md:rounded-[24px] text-sm md:text-lg shadow-[0_20px_48px_rgba(255,107,74,0.3)] hover:shadow-[0_24px_60px_rgba(255,107,74,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 group flex items-center justify-center gap-4"
                >
                  Become a Founding Supporter <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </a>

                <p className="text-sm text-slate-500 font-medium">
                  Give by May 8 to help unlock the $1,000 grant · Secure · Tax-deductible via Fractured Atlas
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};


const FAQSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      question: "Where does my donation go?",
      answer: (
        <div className="space-y-4">
          <p>Every donation supports building the first version of the Thriving World Gallery — the platform, design, tools, and early community.</p>
          <p>We’re in the foundation phase. Your support shapes what this becomes.</p>
        </div>
      )
    },
    {
      question: "Why does the number of donors matter?",
      answer: (
        <div className="space-y-4">
          <p>From May 4–8, we’re part of a matching campaign through Fractured Atlas. The project with the most donors receives $1,000.</p>
          <p>Every person who gives increases our chances.</p>
        </div>
      )
    },
    {
      question: "Do I need to be an artist to participate?",
      answer: "No. A vision can be a thought, a sentence, a piece of art, or a small idea. No experience. No format. Just a willingness to imagine something better."
    },
    {
      question: "Is this project legitimate?",
      answer: "Yes. We are fiscally sponsored by Fractured Atlas, a registered 501(c)(3) nonprofit. Donations are secure and tax-deductible."
    },
    {
      question: "Can I participate without donating?",
      answer: "Yes. When the gallery launches, anyone can share a vision — for free. Donating now helps us build the space where that becomes possible."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-16 px-6 bg-[#0a0a1a] relative overflow-hidden">
      {/* Texture Background - Replicated from Section 3 (ThrivingSection) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550684848-86a5d8727436?w=2000&auto=format&fit=crop&q=80" 
          alt="Dark painterly abstract background" 
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-transparent to-[#0a0a1a]" />
        <div className="absolute inset-0 bg-[#0a0a1a]/40" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div 
          className={`overflow-hidden transition-all duration-700 rounded-[32px] border ${
            isOpen 
              ? 'bg-white border-luminaria-glow/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] scale-[1.01]' 
              : 'bg-white/95 backdrop-blur-md border-black/5 hover:border-black/10 hover:shadow-lg'
          }`}
        >
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-6 md:px-10 py-6 md:py-8 flex items-center justify-between text-left group gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1px] bg-luminaria-glow/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luminaria-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Answers & Inquiries</span>
              </div>
              <span className={`text-[22px] font-display font-bold tracking-tight transition-colors duration-500 text-slate-900`} style={{ fontFamily: 'Arial, sans-serif' }}>
                FAQ
              </span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${
              isOpen 
                ? 'bg-luminaria-glow text-white shadow-md shadow-luminaria-glow/20' 
                : 'bg-white text-slate-400 group-hover:bg-luminaria-glow group-hover:text-white group-hover:shadow-md shadow-sm border border-black/5'
            }`}>
              {isOpen ? (
                <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.5, ease: "circOut" }}>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <div className="px-8 md:px-14 pb-12 md:pb-20">
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <div 
                        key={idx}
                        className={`overflow-hidden transition-all duration-500 rounded-[24px] border ${
                          openIdx === idx 
                            ? 'bg-white border-luminaria-glow/10 shadow-sm' 
                            : 'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <button 
                          onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                          className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left group"
                        >
                          <span 
                            className={`text-[16px] font-display font-bold tracking-tight transition-colors duration-300 ${
                              openIdx === idx ? 'text-luminaria-glow' : 'text-slate-900'
                            }`}
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            {faq.question}
                          </span>
                          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                            openIdx === idx 
                              ? 'bg-luminaria-glow text-white rotate-180' 
                              : 'bg-white text-slate-400 border border-black/5'
                          }`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {openIdx === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "circOut" }}
                              className="overflow-hidden"
                            >
                              <div 
                                className="px-6 md:px-8 pb-6 md:pb-8 text-slate-600 leading-relaxed pt-2"
                                style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                              >
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#1A2A3A] py-16 px-6 text-white relative overflow-hidden">
      {/* Structural Paper Depth Shadow - Subtle Vignette only */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: `radial-gradient(circle at 70% 30%, transparent 60%, rgba(200, 190, 170, 0.05) 100%)`,
        }} 
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-luminaria-glow/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center transition-all duration-700 group-hover:rotate-[15deg]">
                  <Sparkles className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold tracking-tight text-white leading-none">
                  Luminaria
                </span>
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/40">
                  Imagineerium
                </span>
              </div>
            </div>
            <p className="text-white/70 text-base font-normal leading-relaxed max-w-sm mb-6">
              Luminaria Imagineerium is an arts and innovation project building a space for collective imagination and creative action.
            </p>
            <div className="flex items-center gap-4">
              {[Mail].map((Icon, idx) => (
                <a key={idx} href="mailto:imagineerium@theluminaria.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-luminaria-glow text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
 
          <div>
            <h4 className="font-arial font-bold text-base mb-6 uppercase tracking-widest text-white/60">Contact</h4>
            <div className="space-y-4 text-white/60 text-sm">
              <p>Questions? Contact us at <a href="mailto:imagineerium@theluminaria.com" className="hover:text-luminaria-glow transition-colors">imagineerium@theluminaria.com</a></p>
            </div>
          </div>
        </div>
 
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="max-w-4xl">
            <p className="text-white/50 text-xs font-medium leading-relaxed mb-4">
              Luminaria Imagineerium is a sponsored project of Fractured Atlas, a non-profit arts service organization. Contributions for the charitable purposes of Luminaria Imagineerium must be made payable to “Fractured Atlas” only and are tax-deductible to the extent permitted by law.
            </p>
            <p className="text-white/50 text-xs font-medium">
              You can view the <a href="https://identity.fracturedatlas.org/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Fractured Atlas Privacy Policy</a> to learn how your donor data is protected.
            </p>
          </div>
          <p className="text-white/40 text-[11px] tracking-widest uppercase py-4 font-bold">
            &copy; 2026 Luminaria Imagineerium. Built with wonder.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-luminaria-glow selection:text-white bg-warm-light">
      <TopBanner />
      <Navbar />
      <main>
        {/* 1 */} <Hero />
        {/* 2 */} <ProblemSection />
        {/* 3 */} <ThrivingSection />
        {/* 4 */} <ConnectionSection />
        {/* 5 */} <SpringMatchSection />
        {/* 6 */} <GiftImpactSection />
        {/* 7 */} <DonationImpactSection />
        {/* 9 & 10 Merged */} <OurStoryAndVisionSection />
        {/* 8 */} <FinalCTA />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
