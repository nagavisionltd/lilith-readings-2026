import { motion } from 'motion/react';
import { Sparkles, Moon, Star } from 'lucide-react';
import lilithReader from '../assets/images/lilith_tarot_reader_1783182876851.jpg';

export default function About() {
  return (
    <section id="about" className="py-32 px-8 bg-mystic-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative max-w-md mx-auto lg:mx-0"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden aspect-square shadow-2xl shadow-mystic-purple/20">
            <img 
              src={lilithReader} 
              alt="Lilith Tarot Reader" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-mystic-purple/20 mix-blend-multiply" />
          </div>
          
          {/* Decorative Frames */}
          <div className="absolute -top-6 -left-6 w-full h-full border border-mystic-accent/20 rounded-3xl -z-10" />
          <div className="absolute -bottom-6 -right-6 w-full h-full border border-mystic-purple/30 rounded-3xl -z-10" />
          
          {/* Floating Icons */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 w-20 h-20 glass-panel flex items-center justify-center"
          >
            <Moon className="w-8 h-8 text-mystic-accent" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-10 -left-10 w-16 h-16 glass-panel flex items-center justify-center"
          >
            <Star className="w-6 h-6 text-mystic-accent" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-mystic-accent/60">The Reader</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight">
              Meet <span className="italic">Lilith</span>
            </h2>
          </div>

          <div className="space-y-6 text-white/50 font-light leading-relaxed">
            <p>
              With over 15 years of experience in the esoteric arts, Lilith has dedicated her life to 
              understanding the unseen forces that shape our reality. Her approach combines traditional 
              Tarot wisdom with modern psychological insights, specifically focusing on Shadow Work 
              and the integration of the subconscious.
            </p>
            <p>
              "I believe the cards are not just tools for prediction, but mirrors for the soul. 
              They show us what we are ready to see, and guide us toward the parts of ourselves 
              that have been waiting in the dark."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-mystic-accent">
                <Sparkles className="w-4 h-4" />
                <span className="text-xl font-serif">15+ Years</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Experience</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-mystic-accent">
                <Sparkles className="w-4 h-4" />
                <span className="text-xl font-serif">5000+</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Readings Delivered</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
