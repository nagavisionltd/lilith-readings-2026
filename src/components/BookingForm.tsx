import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CreditCard, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import Calendar from './Calendar';
import { SERVICES, Service } from '../constants';
import { cn } from '../lib/utils';

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function BookingForm() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'service' | 'date' | 'time' | 'confirm' | 'success'>('service');

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep('date');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('success');
  };

  const resetBooking = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep('service');
  };

  return (
    <section id="booking" className="py-32 px-8 bg-mystic-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-mystic-accent/60 mb-4 block"
          >
            Reserve Your Session
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Schedule a <span className="italic">Reading</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-px bg-mystic-accent/30 mx-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden min-h-[600px]"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-mystic-purple/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-mystic-accent/5 blur-[80px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {step === 'service' && (
                <motion.div
                  key="service"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8">Select an Offering</p>
                  <div className="grid grid-cols-1 gap-4">
                    {SERVICES.map((service) => (
                      <button
                        key={service.title}
                        onClick={() => handleServiceSelect(service)}
                        className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-mystic-accent/50 hover:bg-mystic-accent/5 transition-all group text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-mystic-accent/10 transition-colors">
                            <service.icon className="w-5 h-5 text-mystic-accent" />
                          </div>
                          <div>
                            <h4 className="text-lg font-serif text-white">{service.title}</h4>
                            <p className="text-[10px] uppercase tracking-widest text-white/30">{service.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-serif text-mystic-accent">{service.price}</span>
                          <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-mystic-accent transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'date' && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button 
                    onClick={() => setStep('service')}
                    className="text-[10px] uppercase tracking-widest text-mystic-accent mb-6 hover:text-white transition-colors"
                  >
                    ← Back to Offerings
                  </button>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8">Select a Date for {selectedService?.title}</p>
                  <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                </motion.div>
              )}

              {step === 'time' && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button 
                    onClick={() => setStep('date')}
                    className="text-[10px] uppercase tracking-widest text-mystic-accent mb-6 hover:text-white transition-colors"
                  >
                    ← Back to Calendar
                  </button>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8">
                    Available Slots for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className="py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:border-mystic-accent/50 hover:bg-mystic-accent/5 transition-all"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'confirm' && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <button 
                    onClick={() => setStep('time')}
                    className="text-[10px] uppercase tracking-widest text-mystic-accent mb-6 hover:text-white transition-colors"
                  >
                    ← Back to Times
                  </button>
                  
                  <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-2xl font-serif text-white mb-2">{selectedService?.title}</h4>
                        <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          <span>{selectedService?.duration}</span>
                        </div>
                      </div>
                      <span className="text-3xl font-serif text-mystic-accent">{selectedService?.price}</span>
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 uppercase tracking-widest text-xs">Date</span>
                        <span className="text-white/80 text-lg">{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 uppercase tracking-widest text-xs">Time</span>
                        <span className="text-white/80 text-lg">{selectedTime}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirm}
                    className="w-full py-6 bg-mystic-accent text-mystic-black font-medium text-xs uppercase tracking-[0.3em] hover:bg-white transition-all duration-300 shadow-lg shadow-mystic-accent/10 flex items-center justify-center gap-3"
                  >
                    <CreditCard className="w-4 h-4" />
                    Pay and Confirm
                  </button>
                  <p className="text-center text-[10px] text-white/30 uppercase tracking-widest">
                    Secure payment via Stripe
                  </p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-8"
                >
                  <div className="w-24 h-24 bg-mystic-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-mystic-accent" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-serif text-white">Your journey awaits</h3>
                    <p className="text-white/40 text-base max-w-sm mx-auto leading-relaxed">
                      Your booking for {selectedService?.title} on {selectedDate && format(selectedDate, 'MMM d')} at {selectedTime} has been confirmed.
                    </p>
                  </div>
                  <button 
                    onClick={resetBooking}
                    className="px-12 py-5 bg-white/5 border border-white/10 text-white/80 text-xs uppercase tracking-widest hover:border-mystic-accent hover:text-mystic-accent transition-all"
                  >
                    Book Another Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
