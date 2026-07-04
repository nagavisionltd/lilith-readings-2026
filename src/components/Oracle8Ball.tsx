import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, Coins, RefreshCw, Star, Play, Gift } from 'lucide-react';

const ORACLE_RESPONSES = [
  "The stars reflect a mirror of patience. The answer you seek is slowly materializing in the quiet corners of your mind. Do not force the river; it flows in its own divine alignment.",
  "A shadow is clearing from your path. A secret, once hidden in darkness, will soon illuminate your heart. Trust the friction; it is merely polishing your true reflection.",
  "An unexpected planetary shift brings sudden clarity. What seems chaotic now is simply the universe rearranging the pieces for your absolute highest good.",
  "Look closer at the recurring dreams and quiet coincidences. Your guides are whispering, but your mind is too busy searching for loud answers. Slow down and listen.",
  "The cards reveal an ending that is actually a golden gateway. Let go of the branch you are clinging to. The fall is short, and the soil below is rich and ready for your next rebirth.",
  "The alignment of Venus suggests your heart is holding onto an old script. Rewrite the story today. You are no longer the person who was hurt; you are the one who survived.",
  "The oracle sees a sudden burst of abundance or creative energy heading your way. Keep your hands open to receive. Resistance often masquerades as unworthiness.",
  "A quiet, solitary journey is calling. The noise of others is clouding your celestial compass. Spend tonight with your own shadow; it has valuable secrets to tell you.",
  "Your current question is bound to a cycle that has already served its purpose. Break the loop. The cosmic wind is ready to fill your sails the moment you change direction.",
  "A surprising message from someone from your past or a serendipitous encounter is written in the stars. Pay close attention to the symbols around you over the next three days."
];

function getZodiacSign(dateStr: string) {
  if (!dateStr) return "Cosmic Traveler";
  const parts = dateStr.split('-');
  if (parts.length < 3) return "Cosmic Traveler";
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

export default function Oracle8Ball() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birthday, setBirthday] = useState('');
  const [question, setQuestion] = useState('');
  const [rollsLeft, setRollsLeft] = useState(2);
  const [isShaking, setIsShaking] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [currentReading, setCurrentReading] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('lilith_oracle_date');
    const storedRolls = localStorage.getItem('lilith_oracle_rolls');

    if (storedDate !== today) {
      localStorage.setItem('lilith_oracle_date', today);
      localStorage.setItem('lilith_oracle_rolls', '2');
      setRollsLeft(2);
    } else if (storedRolls !== null) {
      setRollsLeft(parseInt(storedRolls, 10));
    }
  }, []);

  const handleAskOracle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthday || !question) return;

    if (rollsLeft <= 0) {
      setShowPaymentModal(true);
      return;
    }

    setIsShaking(true);
    setShowReading(false);
    const sign = getZodiacSign(birthday);
    setZodiacSign(sign);

    setTimeout(() => {
      setIsShaking(false);
      const randomIndex = Math.floor(Math.random() * ORACLE_RESPONSES.length);
      const reading = ORACLE_RESPONSES[randomIndex];
      
      const personalizedReading = `Greetings, ${name} of ${sign}. Regarding your question: "${question}"...\n\n${reading}`;
      setCurrentReading(personalizedReading);
      setShowReading(true);

      const newRolls = rollsLeft - 1;
      setRollsLeft(newRolls);
      localStorage.setItem('lilith_oracle_rolls', newRolls.toString());
    }, 1800);
  };

  const handleSimulatePayment = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setPaymentSuccess(true);
      const newRolls = rollsLeft + 5;
      setRollsLeft(newRolls);
      localStorage.setItem('lilith_oracle_rolls', newRolls.toString());
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
      }, 1500);
    }, 1200);
  };

  return (
    <section id="oracle" className="py-32 px-8 bg-mystic-black relative overflow-hidden border-t border-white/5">
      {/* Mystical Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mystic-accent/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-94 h-94 bg-mystic-purple/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-mystic-accent/60 mb-4 block"
          >
            Cosmic Oracle
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Magic <span className="italic">8-Ball</span> Readings
          </motion.h2>
          <p className="max-w-xl mx-auto text-white/50 text-sm font-light leading-relaxed">
            Consult the orbital tides and Lilith's subconscious reservoir. Input your terrestrial coordinates, state your burning question, and watch the Cosmic Sphere reveal your fortune.
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-px bg-mystic-accent/30 mx-auto mt-8"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
          {/* Left: Input Form */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 p-3 bg-mystic-accent/10 rounded-bl-2xl border-l border-b border-mystic-accent/20">
              <span className="text-[10px] uppercase tracking-widest text-mystic-accent flex items-center gap-1.5 font-semibold">
                <Gift className="w-3.5 h-3.5" /> {rollsLeft} {rollsLeft === 1 ? 'Roll' : 'Rolls'} Free Today
              </span>
            </div>

            <h3 className="text-2xl font-serif text-white mb-6">Oracle Input Form</h3>
            <form onSubmit={handleAskOracle} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Your Name</label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aurelia Sol"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors placeholder:text-white/20 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Your Age</label>
                  <input 
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors placeholder:text-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Terrestrial Birthday</label>
                  <input 
                    type="date"
                    required
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors [color-scheme:dark] text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Your Question for the Sphere</label>
                <textarea 
                  required
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a yes/no or general guidance question..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-mystic-accent/50 transition-colors placeholder:text-white/20 resize-none text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isShaking}
                className="w-full py-5 bg-mystic-accent text-mystic-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white disabled:opacity-50 transition-all duration-300 shadow-lg shadow-mystic-accent/10 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isShaking ? "Channels opening..." : "Ask the Cosmic Oracle"}
              </button>
            </form>
          </div>

          {/* Right: The Interactive Glowing Crystal Ball */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 min-h-[500px] relative overflow-hidden backdrop-blur-md">
            
            {/* The Glowing Crystal Ball & Stand */}
            <div className="relative mb-12 flex flex-col items-center">
              {/* Stand Back Arcs & Bottom Glow shadow */}
              <div className="absolute -bottom-1 w-36 h-6 bg-gradient-to-t from-mystic-accent/30 to-transparent blur-md rounded-full pointer-events-none" />
              
              <motion.div
                animate={isShaking ? {
                  x: [0, -12, 12, -10, 10, -8, 8, -4, 4, 0],
                  y: [0, 10, -10, 8, -8, 6, -6, 2, -2, 0],
                  rotate: [0, -3, 3, -2, 2, -1, 1, 0]
                } : {}}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="relative select-none cursor-pointer group z-10"
                onClick={() => {
                  if (name && birthday && question) {
                    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                    handleAskOracle(fakeEvent);
                  }
                }}
              >
                {/* Aura Glow Behind Ball */}
                <motion.div 
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-mystic-accent/30 via-mystic-purple/40 to-indigo-500/30 rounded-full blur-2xl pointer-events-none" 
                />

                {/* Crystal Ball Sphere */}
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-indigo-950/90 via-purple-950/80 to-mystic-black shadow-[inset_0_0_50px_rgba(235,191,104,0.3),0_0_30px_rgba(147,51,234,0.4)] border border-white/10 flex items-center justify-center relative overflow-hidden">
                  
                  {/* Internal Swirling Mist & Nebula */}
                  <motion.div 
                    animate={{
                      rotate: 360,
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-800/20 via-indigo-900/30 to-transparent mix-blend-screen blur-md opacity-70"
                  />
                  
                  <motion.div 
                    animate={{
                      rotate: -360,
                      scale: [1.15, 0.85, 1.15],
                    }}
                    transition={{
                      rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                      scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-8 rounded-full bg-gradient-to-bl from-mystic-accent/15 via-pink-900/10 to-transparent mix-blend-color-dodge blur-lg opacity-60"
                  />

                  {/* 3D Glass Highlights */}
                  <div className="absolute top-4 left-8 w-16 h-8 bg-gradient-to-b from-white/25 to-transparent rounded-full blur-[2px] rotate-[-15deg] pointer-events-none" />
                  <div className="absolute bottom-4 right-12 w-10 h-4 bg-gradient-to-t from-white/10 to-transparent rounded-full blur-[1px] rotate-[15deg] pointer-events-none" />
                  
                  {/* Light Reflection Dots */}
                  <div className="absolute top-6 left-12 w-3 h-3 bg-white/50 rounded-full blur-[0.5px] pointer-events-none" />
                  <div className="absolute top-10 left-16 w-1.5 h-1.5 bg-white/35 rounded-full blur-[0.5px] pointer-events-none" />

                  {/* Inner Oracle Display */}
                  <div className="w-36 h-36 rounded-full flex items-center justify-center relative z-20">
                    <AnimatePresence mode="wait">
                      {isShaking ? (
                        <motion.div 
                          key="shaking"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.05, 0.95], y: [-2, 2, -2] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="text-mystic-accent font-serif text-3xl font-light drop-shadow-[0_0_10px_rgba(235,191,104,0.6)] animate-pulse"
                        >
                          🔮
                        </motion.div>
                      ) : showReading ? (
                        <motion.div
                          key="reading"
                          initial={{ opacity: 0, scale: 0.4, rotate: -60, filter: "blur(5px)" }}
                          animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                          transition={{ type: "spring", stiffness: 90, damping: 15 }}
                          className="w-full h-full flex flex-col items-center justify-center"
                        >
                          {/* Inner glowing celestial star / rune */}
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                            transition={{ scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
                            className="text-mystic-accent font-serif text-4xl drop-shadow-[0_0_15px_rgba(235,191,104,0.8)]"
                          >
                            ✧
                          </motion.div>
                          <span className="text-[9px] uppercase tracking-[0.25em] text-white/85 font-bold mt-2 drop-shadow-md">
                            Aligned
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center text-center space-y-1.5"
                        >
                          <Sparkles className="w-8 h-8 text-mystic-accent/40 group-hover:text-mystic-accent/90 transition-all group-hover:scale-110 duration-500 animate-pulse" />
                          <span className="text-[9px] uppercase tracking-[0.25em] text-white/30 group-hover:text-white/60 transition-colors font-medium">
                            Peer Within
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Elegant Ornate Crescent Stand Base */}
                <div className="w-48 h-10 mt-[-10px] bg-gradient-to-b from-neutral-800 to-neutral-950 border-t border-white/20 rounded-t-xl rounded-b-md shadow-2xl relative z-10 mx-auto flex flex-col items-center justify-center">
                  {/* Stand Gold Details */}
                  <div className="w-36 h-1 bg-mystic-accent/40 rounded-full" />
                  <div className="flex justify-between w-40 px-4 mt-1 text-[8px] tracking-[0.2em] font-mono text-mystic-accent/30 uppercase">
                    <span>* LILITH *</span>
                    <span>* ORBIT *</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Reading Display Box */}
            <AnimatePresence mode="wait">
              {showReading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full text-center space-y-4"
                >
                  <div className="flex items-center justify-center gap-2 text-mystic-accent text-xs uppercase tracking-widest">
                    <Star className="w-4 h-4 animate-spin-slow" />
                    <span>The Crystal Orb Has Aligned</span>
                    <Star className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative">
                    <p className="text-white/80 text-sm font-light leading-relaxed whitespace-pre-wrap italic">
                      {currentReading}
                    </p>
                  </div>
                </motion.div>
              )}

              {!showReading && !isShaking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="text-center text-xs text-white/30 uppercase tracking-[0.2em]"
                >
                  Enter details & ask or tap the glowing crystal orb to consult the spirits
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Payment simulated modal for Extra Tries */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-8 md:p-10 max-w-md w-full relative overflow-hidden"
            >
              {paymentSuccess ? (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-mystic-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-mystic-accent animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-serif text-white">Insight Unlocked!</h3>
                  <p className="text-white/40 text-xs uppercase tracking-wider">
                    5 extra cosmic tries have been loaded onto your device.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-xl font-serif text-white">Rolls Limit Reached</h3>
                    <button 
                      onClick={() => setShowPaymentModal(false)}
                      className="text-white/40 hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed">
                    You have spent your 2 daily free cosmic requests. Purchase an extra set of channels to unlock deeper astral insight.
                  </p>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-serif text-white">5 Extra Oracle Reading Tries</h4>
                      <p className="text-[10px] uppercase tracking-widest text-white/30">Immediate celestial access</p>
                    </div>
                    <span className="text-lg font-serif text-mystic-accent">$1.99</span>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isPurchasing}
                    className="w-full py-4 bg-mystic-accent text-mystic-black font-semibold text-xs uppercase tracking-widest hover:bg-white disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Coins className="w-4 h-4" />
                    {isPurchasing ? "Connecting to Stripe..." : "Simulate Payment with Stripe"}
                  </button>
                  <p className="text-center text-[9px] uppercase tracking-widest text-white/20">
                    Secure checkout. 256-bit cosmic encryption.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
