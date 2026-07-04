import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function Events() {
  const [eventType, setEventType] = useState('Private Gathering');
  const [guestCount, setGuestCount] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setEventType('Private Gathering');
    setGuestCount('');
    setEventDate('');
    setEventLocation('');
    setAdditionalDetails('');
    setName('');
    setEmail('');
    setSubmitted(false);
  };

  return (
    <section id="events" className="py-32 px-8 bg-mystic-black relative overflow-hidden border-t border-white/5">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-mystic-accent/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-mystic-purple/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-mystic-accent/60 mb-4 block"
          >
            Special Occasions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Book an <span className="italic">Event</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-white/50 text-sm font-light leading-relaxed">
            Elevate your next gathering with an unforgettable interactive reading experience. Book Lilith to provide personalized Tarot spreads and Astrological map consultations for your guests.
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-px bg-mystic-accent/30 mx-auto mt-8"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Packages & Descriptions */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-3xl font-serif text-white mb-6">Interactive Magic for Your Gatherings</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Lilith brings a elegant, highly refined, and deeply resonant energetic presence to gatherings. Rather than simple fortune-telling, each guest receives a deeply respectful, validating, and empowering session that often becomes the most talked-about highlight of the occasion.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Private Soirées & Birthdays",
                  desc: "Intimate gatherings where each guest gets a custom 10-15 minute deep-dive Tarot layout focusing on their current solar cycle."
                },
                {
                  title: "Weddings & Bridal Showers",
                  desc: "Celebrate union with readings focused on the astrology of connection, soul contracts, and the beauty of upcoming milestones."
                },
                {
                  title: "Corporate Events & Galas",
                  desc: "A highly interactive setup with quick, witty, and profoundly validating insights that break the ice and energize any venue."
                }
              ].map((pack, idx) => (
                <div key={idx} className="p-6 bg-white/[0.01] border border-white/5 hover:border-mystic-accent/20 rounded-2xl transition-all">
                  <h4 className="text-lg font-serif text-mystic-accent mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> {pack.title}
                  </h4>
                  <p className="text-white/40 text-xs leading-relaxed font-light">{pack.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Request Form */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleEventSubmit}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-serif text-white mb-6">Submit an Inquiry</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Your Name</label>
                      <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors text-white placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Email Address</label>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@domain.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors text-white placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Event Type</label>
                      <select 
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors text-white appearance-none select-dark"
                      >
                        <option value="Private Gathering" className="bg-mystic-black text-white">Private Gathering</option>
                        <option value="Wedding / Bridal" className="bg-mystic-black text-white">Wedding / Bridal</option>
                        <option value="Corporate Event" className="bg-mystic-black text-white">Corporate Event</option>
                        <option value="Birthday Celebration" className="bg-mystic-black text-white">Birthday Celebration</option>
                        <option value="Other Soiree" className="bg-mystic-black text-white">Other Soiree</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Estimated Guest Count</label>
                      <input 
                        type="text"
                        required
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        placeholder="e.g. 15 - 30 guests"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors text-white placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Desired Date</label>
                      <input 
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors [color-scheme:dark] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Location / City</label>
                      <input 
                        type="text"
                        required
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. Paris, France"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors text-white placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Additional Details & Vision</label>
                    <textarea 
                      rows={3}
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Share your timeline, themes, or any custom wishes..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors text-white placeholder:text-white/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-mystic-accent text-mystic-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-lg shadow-mystic-accent/10 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Casting inquiry to the ethers..." : "Send Event Inquiry"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-6"
                >
                  <div className="w-16 h-16 bg-mystic-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-mystic-accent" />
                  </div>
                  <h3 className="text-3xl font-serif text-white">Inquiry Received</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm mx-auto">
                    Lilith has received your request. She will peer into the coordinates of your gathering and reach out with a custom quote within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-8 py-3 border border-white/10 text-white/60 text-xs uppercase tracking-widest hover:border-mystic-accent hover:text-mystic-accent transition-colors mt-4"
                  >
                    Inquire Another Event
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
