import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { SERVICES, Service } from '../constants';

interface ServicesProps {
  onBook: (service: Service) => void;
}

export default function Services({ onBook }: ServicesProps) {
  return (
    <section id="services" className="py-32 px-8 bg-mystic-black relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-purple/10 blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mystic-accent/5 blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-mystic-accent/60 mb-4 block"
          >
            Our Offerings
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Mystical <span className="italic">Services</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-px bg-mystic-accent/30 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onBook(service)}
              className="glass-panel p-10 group hover:border-mystic-accent/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-mystic-accent/10 transition-colors">
                <service.icon className="w-6 h-6 text-mystic-accent group-hover:scale-110 transition-transform" />
              </div>
              
              <h3 className="text-2xl font-serif mb-4 group-hover:text-mystic-accent transition-colors">{service.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8 font-light">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-white/30 mb-1">Duration</span>
                  <span className="text-sm font-medium text-white/80">{service.duration}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs uppercase tracking-widest text-white/30 mb-1">Energy Exchange</span>
                  <span className="text-xl font-serif text-mystic-accent">{service.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
