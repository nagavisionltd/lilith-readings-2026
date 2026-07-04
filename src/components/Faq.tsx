import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles, AlertCircle, Calendar } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'tarot' | 'policies' | 'events';
}

export default function Faq() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tarot' | 'policies' | 'events'>('all');

  const faqData: FaqItem[] = [
    {
      category: 'tarot',
      question: "How should I prepare for a Tarot or Astrology reading with Lilith?",
      answer: "We recommend finding a quiet, comfortable space where you will not be disturbed. Before the session, take a few deep breaths to ground your energy. If you have specific questions or areas of your life you want to focus on (such as career, romance, or personal alignment), write them down. Open your mind to the symbolism, and remember that Tarot serves as a mirror of your subconscious path."
    },
    {
      category: 'tarot',
      question: "How often should I get a Tarot reading?",
      answer: "Tarot readings are most insightful when you are undergoing changes, facing important decisions, or entering a new cycle (like a birthday or seasonal equinox). For general alignment, we recommend a reading every 2 to 3 months. Getting readings too frequently on the same question can muddy the energetic focus and create unnecessary confusion."
    },
    {
      category: 'policies',
      question: "What is the cancellation and rescheduling policy?",
      answer: "We require at least 24 hours notice for cancellations or rescheduling. Sessions cancelled or rescheduled with less than 24 hours notice will be subject to a 50% fee. If you miss your scheduled slot without any prior notice, the energy exchange is non-refundable. You can easily reschedule your session through the booking portal."
    },
    {
      category: 'policies',
      question: "What happens if I am late to my virtual session?",
      answer: "Lilith begins sessions exactly at the scheduled cosmic time. If you are running late, please notify us as soon as possible. Your session will still end at the scheduled time to ensure respect for the clients booked after you, and no partial refunds will be given."
    },
    {
      category: 'events',
      question: "How does booking Lilith for special events work?",
      answer: "You can book Lilith for private gatherings, weddings, corporate events, and galas via our dedicated Events Inquiry form. Lilith sets up an elegant, atmospheric reading station at your venue. Guests can sign up for brief, high-impact 10-15 minute personal readings throughout the gathering, creating an interactive and highly memorable experience."
    },
    {
      category: 'events',
      question: "What is included in the event pricing?",
      answer: "Our event packages include Lilith's travel within the metropolitan area, the complete aesthetic setup of her interactive reading table (luxurious velvet tablecloths, glowing ambient lighting, crystal clusters, and multiple specialized card decks), and continuous back-to-back readings for your guests. Custom hours and tailored reading themes are available."
    }
  ];

  const filteredFaq = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setActiveId(activeId === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 px-8 bg-mystic-black relative overflow-hidden border-t border-white/5">
      {/* Mystical blur elements */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-mystic-accent/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-mystic-purple/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-mystic-accent/60 mb-4 block"
          >
            Cosmic Answers
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Frequently Asked <span className="italic">Questions</span>
          </motion.h2>
          <p className="max-w-xl mx-auto text-white/50 text-sm font-light leading-relaxed">
            Delve into the mechanisms of our sessions, booking boundaries, and private event offerings. Clear your mind of uncertainty.
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-px bg-mystic-accent/30 mx-auto mt-8"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {([
            { id: 'all', label: 'All Queries' },
            { id: 'tarot', label: 'Tarot Readings' },
            { id: 'policies', label: 'Booking & Policies' },
            { id: 'events', label: 'Special Events' }
          ] as const).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveId(null);
              }}
              className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-medium transition-all duration-300 border ${
                selectedCategory === cat.id 
                  ? 'bg-mystic-accent border-mystic-accent text-mystic-black font-semibold' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/25'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFaq.map((faq, index) => {
              const isOpen = activeId === index;
              return (
                <motion.div
                  key={`${faq.category}-${faq.question}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full py-6 px-8 text-left flex items-center justify-between gap-6 hover:bg-white/[0.01] transition-colors"
                  >
                    <span className="text-sm font-serif text-white hover:text-mystic-accent transition-colors font-medium">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 text-mystic-accent"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-6 border-t border-white/5 pt-4 text-xs font-light text-white/50 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
