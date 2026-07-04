import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Instagram, Twitter, Mail, MapPin, Sparkles, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <footer className="py-24 px-8 bg-mystic-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-mystic-accent" />
            <span className="text-xl font-serif tracking-widest uppercase text-mystic-accent">Lilith Readings</span>
          </div>
          <p className="text-white/30 text-xs leading-relaxed font-light uppercase tracking-widest">
            Unveiling the shadow, <br />
            guiding the soul.
          </p>
          <div className="flex items-center gap-6">
            <Instagram className="w-4 h-4 text-white/40 hover:text-mystic-accent transition-colors cursor-pointer" />
            <Twitter className="w-4 h-4 text-white/40 hover:text-mystic-accent transition-colors cursor-pointer" />
            <Mail className="w-4 h-4 text-white/40 hover:text-mystic-accent transition-colors cursor-pointer" />
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.3em] text-mystic-accent">Quick Links</h4>
          <ul className="space-y-4">
            {['Services', 'Oracle', 'Events', 'Courses', 'FAQ', 'About', 'Booking'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.3em] text-mystic-accent">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/40">
              <Mail className="w-3 h-3 text-mystic-accent/50" />
              hello@lilithreadings.com
            </li>
            <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/40">
              <MapPin className="w-3 h-3 text-mystic-accent/50" />
              The Ether & Beyond
            </li>
          </ul>
        </div>

        {/* Improved Newsletter Signup with Animated Mystical Icon */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {/* Animated Mystical Icon */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.15, 1],
              }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-10 h-10 rounded-full bg-mystic-accent/10 border border-mystic-accent/25 flex items-center justify-center text-mystic-accent shadow-[0_0_12px_rgba(235,191,104,0.15)]"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-mystic-accent">Astral Newsletter</h4>
          </div>

          <p className="text-white/45 text-[10px] uppercase tracking-widest leading-relaxed">
            Subscribe for daily personalized <span className="text-mystic-accent italic font-semibold">Horoscopes</span> and our curated <span className="text-mystic-accent italic font-semibold">Tarot Card of the Day</span>.
          </p>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form 
                key="signup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="flex"
              >
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Coordinates"
                  className="bg-white/5 border border-white/10 rounded-l-xl py-3 px-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-mystic-accent/50 transition-colors w-full text-white placeholder:text-white/20"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-mystic-accent text-mystic-black px-5 rounded-r-xl hover:bg-white transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-4.5 h-4.5 border-2 border-mystic-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/[0.02] border border-mystic-accent/20 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-7 h-7 bg-mystic-accent/10 rounded-full flex items-center justify-center text-mystic-accent shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-white font-semibold">Portal Opened</h5>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Expect your daily guidance at dawn.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-[10px] uppercase tracking-widest text-white/20">
          © 2026 Lilith Tarot Readings. All Rights Reserved.
        </p>
        <div className="flex items-center gap-8">
          <a href="#" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
