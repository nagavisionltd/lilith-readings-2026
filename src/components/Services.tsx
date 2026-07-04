import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { SERVICES, Service } from '../constants';
import { ChevronLeft, ChevronRight, Clock, Star, Sparkles } from 'lucide-react';

interface ServicesProps {
  onBook: (service: Service) => void;
}

export default function Services({ onBook }: ServicesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update index if it goes out of bounds on resize
  const maxIndex = Math.max(0, SERVICES.length - cardsPerPage);
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerPage, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section id="services" className="py-32 px-8 bg-mystic-black relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-purple/10 blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mystic-accent/5 blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-mystic-accent/60 mb-4 block"
          >
            Divine Exploration
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Tarot <span className="italic">Readings</span>
          </motion.h2>
          <p className="max-w-xl mx-auto text-white/50 text-sm font-light leading-relaxed mb-4">
            Select a session that aligns with your current transition. Lilith balances rigorous astrology calculations with intuitive cards.
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-px bg-mystic-accent/30 mx-auto"
          />
        </div>

        {/* Carousel Control Buttons */}
        <div className="flex justify-end items-center gap-3 mb-8">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-mystic-accent hover:border-mystic-accent/40 bg-white/[0.01] hover:bg-mystic-accent/5 transition-all duration-300"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-mystic-accent hover:border-mystic-accent/40 bg-white/[0.01] hover:bg-mystic-accent/5 transition-all duration-300"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Track Container */}
        <div className="relative overflow-hidden py-4">
          <motion.div 
            animate={{ x: `-${currentIndex * (100 / cardsPerPage)}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="flex gap-6"
            style={{ 
              width: `${(SERVICES.length / cardsPerPage) * 100}%`,
            }}
          >
            {SERVICES.map((service, index) => {
              const IconComp = service.icon;
              return (
                <div
                  key={index}
                  style={{ width: `${100 / SERVICES.length}%` }}
                  className="px-2"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    onClick={() => onBook(service)}
                    className="glass-panel p-8 md:p-10 group hover:border-mystic-accent/35 transition-all duration-500 cursor-pointer h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-mystic-accent/10 transition-colors">
                        <IconComp className="w-6 h-6 text-mystic-accent group-hover:scale-110 transition-transform" />
                      </div>
                      
                      <h3 className="text-2xl font-serif mb-4 group-hover:text-mystic-accent transition-colors capitalize">{service.title}</h3>
                      <p className="text-white/40 text-xs leading-relaxed mb-8 font-light">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Duration</span>
                        <span className="text-xs font-medium text-white/80 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-mystic-accent/60" /> {service.duration}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Exchange</span>
                        <span className="text-xl font-serif text-mystic-accent">{service.price}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentIndex === idx ? "w-8 bg-mystic-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
