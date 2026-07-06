import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Video, VideoOff } from 'lucide-react';

export default function Hero() {
  const [videoQuality, setVideoQuality] = useState<'720p' | '1080p' | 'off'>('1080p');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Fallback Static Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4b6a1?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10 mix-blend-screen grayscale pointer-events-none" />
      
      {/* Interactive Video Background (YouTube Embed) */}
      {videoQuality !== 'off' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <iframe
            src={`https://www.youtube.com/embed/PlPLQzQ94NM?autoplay=1&mute=1&loop=1&playlist=PlPLQzQ94NM&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&vq=${videoQuality === '1080p' ? 'hd1080' : 'hd720'}`}
            className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-25 mix-blend-screen"
            allow="autoplay; encrypted-media"
            frameBorder="0"
            title="Cosmic Smoke Background Loop"
          />
        </div>
      )}

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 mystic-gradient opacity-70 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
      
      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none z-10">
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
          <span className="text-xs uppercase tracking-[0.5em] text-mystic-accent/80">Tarot Clarity & Divine Guidance</span>
          <Sparkles className="w-4 h-4 text-mystic-accent" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="text-6xl md:text-9xl font-serif font-light leading-tight mb-8"
        >
          Get Cosmic <br />
          <span className="italic text-mystic-accent">Clarity</span>
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-white/50" />
      </motion.div>

      {/* Floating Background Quality Control Badge */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-full text-[9px] uppercase tracking-widest font-mono text-white/50 shadow-lg">
        <span className="flex items-center gap-1 text-mystic-accent">
          {videoQuality !== 'off' ? <Video className="w-3 h-3 animate-pulse" /> : <VideoOff className="w-3 h-3 text-white/30" />}
          <span className="hidden sm:inline">Ambience:</span>
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setVideoQuality('720p')} 
            className={`transition-colors duration-200 py-0.5 px-1.5 rounded ${videoQuality === '720p' ? 'text-mystic-accent font-bold bg-white/5 border border-white/10' : 'hover:text-white/80'}`}
          >
            720p
          </button>
          <span className="text-white/10">|</span>
          <button 
            onClick={() => setVideoQuality('1080p')} 
            className={`transition-colors duration-200 py-0.5 px-1.5 rounded ${videoQuality === '1080p' ? 'text-mystic-accent font-bold bg-white/5 border border-white/10' : 'hover:text-white/80'}`}
          >
            1080p
          </button>
          <span className="text-white/10">|</span>
          <button 
            onClick={() => setVideoQuality('off')} 
            className={`transition-colors duration-200 py-0.5 px-1.5 rounded ${videoQuality === 'off' ? 'text-red-400 font-bold bg-white/5 border border-white/10' : 'hover:text-white/80'}`}
          >
            Off
          </button>
        </div>
      </div>
    </section>
  );
}
