import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4b6a1?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10 mix-blend-screen grayscale" />
      <div className="absolute inset-0 mystic-gradient opacity-60" />
      
      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              scale: [0, 1, 0],
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%"
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-mystic-accent rounded-full"
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-mystic-accent" />
          <span className="text-xs uppercase tracking-[0.5em] text-mystic-accent/80">Shadow Work & Tarot Guidance</span>
          <Sparkles className="w-4 h-4 text-mystic-accent" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="text-6xl md:text-9xl font-serif font-light leading-tight mb-8"
        >
          Unveil Your <br />
          <span className="italic text-mystic-accent">Shadow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-xl mx-auto text-white/50 text-sm md:text-base font-light leading-relaxed mb-12"
        >
          Explore the hidden depths of your subconscious. Through the ancient wisdom of Tarot, 
          we navigate the unseen paths to find clarity, healing, and profound transformation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a 
            href="#booking"
            className="px-10 py-4 bg-mystic-accent text-mystic-black font-medium text-xs uppercase tracking-widest hover:bg-white transition-all duration-300"
          >
            Book a Reading
          </a>
          <a 
            href="#services"
            className="px-10 py-4 border border-white/20 text-white/80 font-medium text-xs uppercase tracking-widest hover:border-mystic-accent hover:text-mystic-accent transition-all duration-300"
          >
            View Services
          </a>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-white/50" />
      </motion.div>
    </section>
  );
}
