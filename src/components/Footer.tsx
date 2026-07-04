import { motion } from 'motion/react';
import { Moon, Instagram, Twitter, Mail, MapPin } from 'lucide-react';

export default function Footer() {
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
            {['Services', 'About', 'Booking'].map((item) => (
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

        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.3em] text-mystic-accent">Newsletter</h4>
          <p className="text-white/30 text-[10px] uppercase tracking-widest leading-relaxed">
            Receive monthly cosmic insights and exclusive offerings.
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email Address"
              className="bg-white/5 border border-white/10 rounded-l-xl py-3 px-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-mystic-accent/50 transition-colors w-full"
            />
            <button className="bg-mystic-accent text-mystic-black px-4 rounded-r-xl hover:bg-white transition-colors">
              <Mail className="w-3 h-3" />
            </button>
          </div>
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
