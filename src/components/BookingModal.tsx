import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';
import { format, addHours, startOfDay, setHours, setMinutes } from 'date-fns';
import Calendar from './Calendar';
import { cn } from '../lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    price: string;
    duration: string;
  } | null;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'date' | 'time' | 'confirm' | 'success'>('date');

  // Reset state when modal opens or service changes
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(null);
      setSelectedTime(null);
      setStep('date');
    }
  }, [isOpen, service?.title]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('confirm');
  };

  const handleConfirm = () => {
    // Simulate Stripe redirect or link generation
    setStep('success');
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-mystic-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-panel overflow-hidden shadow-2xl shadow-mystic-purple/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-mystic-accent" />
                <h2 className="text-xl font-serif text-white tracking-wide">
                  {step === 'success' ? 'Booking Confirmed' : `Book ${service.title}`}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <div className="p-8">
              {step === 'date' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8">Select a Date</p>
                  <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                </motion.div>
              )}

              {step === 'time' && (
                <motion.div
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
                  <div className="grid grid-cols-3 gap-4">
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
                  
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-serif text-white mb-2">{service.title}</h4>
                        <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <span className="text-2xl font-serif text-mystic-accent">{service.price}</span>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40 uppercase tracking-widest text-[10px]">Date</span>
                        <span className="text-white/80">{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40 uppercase tracking-widest text-[10px]">Time</span>
                        <span className="text-white/80">{selectedTime}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirm}
                    className="w-full py-5 bg-mystic-accent text-mystic-black font-medium text-xs uppercase tracking-[0.3em] hover:bg-white transition-all duration-300 shadow-lg shadow-mystic-accent/10 flex items-center justify-center gap-3"
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-8"
                >
                  <div className="w-20 h-20 bg-mystic-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-mystic-accent" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-serif text-white">Your journey awaits</h3>
                    <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">
                      Your booking for {service.title} on {selectedDate && format(selectedDate, 'MMM d')} at {selectedTime} has been confirmed.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-10 py-4 border border-white/10 text-white/60 text-[10px] uppercase tracking-widest hover:border-mystic-accent hover:text-mystic-accent transition-all"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
