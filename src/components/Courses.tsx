import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Star, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function Courses() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail('');
    }, 1000);
  };

  const coursesList = [
    {
      level: "Acolyte Level I",
      title: "Tarot Mastery: The Language of Symbols",
      duration: "6 Weeks • Self-Paced & Live",
      desc: "Learn to read Tarot intuitively by stepping beyond rote card memorization. Connect with the ancient Hermetic and alchemical symbols to unlock raw guidance directly from the subconscious.",
      topics: ["Major Arcana spiritual progression", "The Alchemy of Suits & Numbers", "Storytelling spreads & intuitive reading"]
    },
    {
      level: "Adept Level II",
      title: "The Celestial Map: Applied Astrology",
      duration: "8 Weeks • Immersive Study",
      desc: "Explore your cosmic blueprint. Master reading natal charts, planetary configurations, houses, and transits to decipher personal path coordinates and energetic timing maps.",
      topics: ["Planetary rulers & aspect dynamics", "Decoding personal birth charts", "Predictive transit mapping"]
    },
    {
      level: "Master Level III",
      title: "Shadow Integration & Esoteric Psychology",
      duration: "4 Weeks • Intensive Workshop",
      desc: "A profound journey incorporating Jungian shadow work, dream-peering, and active integration. Safely uncover, face, and assimilate unconscious energetic blockages.",
      topics: ["Jungian archetype mapping", "Active imagination & shadow triggers", "Energetic integration practices"]
    }
  ];

  return (
    <section id="courses" className="py-32 px-8 bg-mystic-black relative overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-mystic-accent/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-mystic-purple/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-4 py-1 border border-mystic-accent/30 bg-mystic-accent/5 rounded-full mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mystic-accent" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-mystic-accent font-semibold">The Esoteric Academy</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Teachings & <span className="italic">Courses</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-white/50 text-sm font-light leading-relaxed">
            Delve deep into the ancient arts. Learn the high-end language of Tarot, astrology mapping, and sacred shadow work from Lilith. Transition from curious seeker to powerful intuitive reader.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 bg-mystic-accent rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-mystic-accent font-semibold italic">COMING SOON — AUTUMN EQUINOX 2026</span>
          </div>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-px bg-mystic-accent/30 mx-auto mt-8"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {coursesList.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-10 flex flex-col justify-between hover:border-mystic-accent/25 transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-6 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <span className="text-[9px] uppercase tracking-widest text-white/60 font-medium">Coming Soon</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-mystic-accent/70 block mb-2 font-mono">{course.level}</span>
                <h3 className="text-2xl font-serif text-white mb-2 leading-tight group-hover:text-mystic-accent transition-colors">{course.title}</h3>
                <span className="text-[11px] uppercase tracking-wider text-white/40 block mb-6 font-medium">{course.duration}</span>
                
                <p className="text-white/50 text-xs font-light leading-relaxed mb-8">
                  {course.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Key Curriculum Pillars:</span>
                {course.topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-mystic-accent shrink-0" />
                    <span className="text-xs text-white/70 font-light">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Waitlist Call To Action */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-mystic-purple/10 to-mystic-accent/5 border border-mystic-accent/20 rounded-3xl p-8 md:p-12 text-center backdrop-blur-md relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-mystic-accent/10 blur-3xl pointer-events-none" />
          
          <h3 className="text-3xl font-serif text-white mb-4">Join the Academy Waitlist</h3>
          <p className="text-white/50 text-xs uppercase tracking-widest max-w-md mx-auto mb-8 leading-relaxed">
            Get exclusive early enrollment offers, limited planetary bonuses, and direct equinox updates from Lilith.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="waitlist-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubscribe} 
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email coordinates..."
                  className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-xs text-white uppercase tracking-widest focus:outline-none focus:border-mystic-accent/40 transition-colors w-full sm:flex-1 placeholder:text-white/20"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-mystic-accent hover:bg-white text-mystic-black py-4 px-8 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? "Enrolling..." : "Secure Early Access"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="waitlist-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-3"
              >
                <div className="w-12 h-12 bg-mystic-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6 text-mystic-accent" />
                </div>
                <h4 className="text-xl font-serif text-white">Your spot is secured</h4>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">
                  Lilith will reach out via the cosmos as the Autumn Equinox approaches.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
