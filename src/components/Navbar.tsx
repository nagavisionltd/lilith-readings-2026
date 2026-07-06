import { motion } from 'motion/react';
import { Moon, Star } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-mystic-black/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        <Moon className="w-6 h-6 text-mystic-accent group-hover:rotate-12 transition-transform" />
        <span className="text-xl font-serif tracking-widest uppercase text-mystic-accent">Lilith Readings</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: 'About', href: '#about' },
          { label: 'Services', href: '#services' },
          { label: 'Daily Draw', href: '#dailydraw' },
          { label: 'Oracle', href: '#oracle' },
          { label: 'Events', href: '#events' },
          { label: 'Courses', href: '#courses' },
          { label: 'FAQ', href: '#faq' }
        ].map((item) => (
          <a 
            key={item.label} 
            href={item.href}
            className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-mystic-accent transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
      
      <a 
        href="#booking"
        className="px-6 py-2 border border-mystic-accent text-mystic-accent text-xs uppercase tracking-widest hover:bg-mystic-accent hover:text-mystic-black transition-all duration-300"
      >
        Book Now
      </a>
    </motion.nav>
  );
}
