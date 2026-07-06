import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, RefreshCw, BookOpen, Star, Clock, Calendar, Check, Trash2, Heart, Moon } from 'lucide-react';

interface TarotCard {
  id: number;
  name: string;
  image: string;
  keywordsUpright: string[];
  keywordsReversed: string[];
  meaningUpright: string;
  meaningReversed: string;
}

const TAROT_DECK: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4b6a1?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["New beginnings", "Spontaneity", "Faith", "Pure potential"],
    keywordsReversed: ["Recklessness", "Risk-taking", "Holding back", "Naivety"],
    meaningUpright: "The Fool encourages you to take a leap of faith. The cosmos is clearing a clean slate for you to step forward. Trust your heart, even if the destination is still hidden in the celestial fog. Embrace child-like curiosity and begin the adventure.",
    meaningReversed: "The Fool reversed whispers a warning against impulsive decisions. Are you rushing into a portal without checking where it leads? Or is fear holding you back from starting a necessary journey? Pause, anchor your coordinates, then take a calculated step."
  },
  {
    id: 1,
    name: "The Magician",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Manifestation", "Willpower", "Skill", "Inspired action"],
    keywordsReversed: ["Illusions", "Blocked potential", "Wasted talent", "Manipulation"],
    meaningUpright: "The alignment of the Magician signals that you already possess all the tools needed to manifest your dreams. Your mind and spirit are in absolute harmony. Direct your focus, set a clear intention, and watch the physical world mold to your desire.",
    meaningReversed: "The Magician reversed suggests that while your energy is potent, it is scattered or misaligned. You might be doubting your own magic or feeling overwhelmed by choices. Strip away the illusions and re-align your core values before casting your net."
  },
  {
    id: 2,
    name: "The High Priestess",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Intuition", "Sacred knowledge", "Subconscious", "Divine feminine"],
    keywordsReversed: ["Ignored whispers", "Secret motives", "Surface level", "Superficiality"],
    meaningUpright: "The High Priestess calls you to turn your attention inward. The answers you seek cannot be found in the noise of the external world. Sit in quiet silence, listen to the low hum of your intuition, and trust the ancient wisdom resting in your subconscious.",
    meaningReversed: "The High Priestess reversed indicates that you are ignoring your gut feelings. Are you prioritizing logical calculations over deep, somatic truths? The stars warn that keeping your ears closed to your inner guidance will only create internal friction."
  },
  {
    id: 3,
    name: "The Empress",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Abundance", "Creativity", "Fertility", "Nurturing comfort"],
    keywordsReversed: ["Creative block", "Dependence", "Over-smothering", "Lack of growth"],
    meaningUpright: "The Empress represents absolute creative fertility and connection with nature. A project, a relationship, or an aspect of yourself is ready to blossom into luxury. Allow yourself to receive love, comfort, and the material blessings the universe is preparing for you.",
    meaningReversed: "The Empress reversed warns that you may be neglecting your own well-being or experiencing a block in your creative output. You cannot pour from an empty chalice. Reconnect with soil, water, and self-care to cultivate a richer soil for growth."
  },
  {
    id: 4,
    name: "The Emperor",
    image: "https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Authority", "Structure", "Solid foundation", "Protection"],
    keywordsReversed: ["Tyranny", "Rigidity", "Lack of discipline", "Inefficiency"],
    meaningUpright: "The Emperor brings structural clarity and firm boundaries. It is a time to establish order, take leadership of your path, and construct strong, unshakeable foundations. The cosmos supports your discipline and focus today.",
    meaningReversed: "The Emperor reversed indicates a breakdown in control. Either someone is imposing rigid, suffocating boundaries on you, or you are resisting the healthy discipline required to stabilize your daily routines. Re-evaluate where authority is being misused."
  },
  {
    id: 5,
    name: "The Hierophant",
    image: "https://images.unsplash.com/photo-1543728069-a3f97c5a2f32?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Spiritual wisdom", "Tradition", "Belief systems", "Conformity"],
    keywordsReversed: ["Rebellion", "Unorthodox path", "Rigid dogma", "New methods"],
    meaningUpright: "The Hierophant suggests seeking wisdom from established teachers, ancient scripts, or structured spiritual systems. Respect the lineages that came before you, and seek a mentor or community that aligns with your quest for higher truth.",
    meaningReversed: "The Hierophant reversed represents a powerful call to rebellion. You are ready to break free from outdated dogmas and create your own sacred rituals. Trust your unique, unorthodox path over traditional guidelines."
  },
  {
    id: 6,
    name: "The Lovers",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Harmony", "Relationships", "Alignment of values", "Choices"],
    keywordsReversed: ["Disharmony", "Misalignment", "Bad choices", "Internal conflict"],
    meaningUpright: "The Lovers speaks of complete harmony, deep connections, and pivotal decisions. It is not just about romance, but choosing a path that matches your soul's absolute truth. Align your heart and mind to make a choice of profound integrity.",
    meaningReversed: "The Lovers reversed indicates disharmony or an internal rift. You may be facing a moral dilemma or experiencing friction in a key partnership. The stars advise looking inward to resolve any disconnect between what you do and what you believe."
  },
  {
    id: 7,
    name: "The Chariot",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Willpower", "Focus", "Victory", "Determination"],
    keywordsReversed: ["Lack of direction", "Loss of control", "Aggression", "Obstacles"],
    meaningUpright: "The Chariot represents absolute momentum and victorious focus. Harness the opposing forces of your life and steer them in a single, unwavering direction. Your willpower is your greatest superpower today—triumph is close.",
    meaningReversed: "The Chariot reversed suggests that you have lost control of your horses. You are running in circles or feeling pulled in too many directions. Pull back on the reins, re-calibrate your target, and gain control before driving forward again."
  },
  {
    id: 8,
    name: "Strength",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Courage", "Inner fortitude", "Patience", "Compassion"],
    keywordsReversed: ["Self-doubt", "Raw emotion", "Weakness", "Imbalance of power"],
    meaningUpright: "Strength represents quiet, internal fortitude rather than raw force. It is the power of patience, love, and compassion overcoming chaos. You can calm the wild beasts around and inside you with gentle confidence and resilience.",
    meaningReversed: "Strength reversed signals that self-doubt or temporary weakness is clouding your spirit. You might be letting anger rule your reactions, or feeling exhausted by ongoing friction. Re-discover your soft, quiet center to find your power."
  },
  {
    id: 9,
    name: "The Hermit",
    image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Soul searching", "Inner guidance", "Solitude", "Spiritual mentor"],
    keywordsReversed: ["Loneliness", "Isolation", "Paranoia", "Withdrawal"],
    meaningUpright: "The Hermit beckons you to step away from the crowd. Spend some time in conscious solitude. Your soul needs space to process recent transitions. Let your own inner lantern guide you through the darkness.",
    meaningReversed: "The Hermit reversed warns of slipping from healthy solitude into cold isolation. Are you shutting out the world due to fear or judgment? Do not lose touch with those who love you; seeking guidance is a sign of strength, not surrender."
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Good luck", "Destiny", "Turning point", "Cycles of life"],
    keywordsReversed: ["Bad luck", "Resistance to change", "Breaking bad cycles", "Out of control"],
    meaningUpright: "The Wheel of Fortune is turning in your favor! Life is characterized by constant movement and change, and a positive shift in your cosmic tides is underway. Welcome the synchronicity and trust that the universe has your back.",
    meaningReversed: "The Wheel reversed indicates that you are fighting the inevitable cycles of change. Resisting the current will only exhaust your spirits. Release your grip on control and trust that this dip in the cycle is preparing you for a powerful ascent."
  },
  {
    id: 11,
    name: "Justice",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Truth", "Fairness", "Cause and effect", "Accountability"],
    keywordsReversed: ["Unfairness", "Dishonesty", "Unwillingness to accept truth", "Dispute"],
    meaningUpright: "Justice reminds you that the laws of karma are always at play. Make decisions with complete truth and fairness, as their impact will ripple through your timeline. Speak your truth, act with absolute integrity, and equilibrium will be restored.",
    meaningReversed: "Justice reversed indicates that you are feeling treated unfairly, or you are avoiding accountability. Take an objective, cold look at your situation. Acceptance of reality, even when challenging, is the first step toward genuine freedom."
  },
  {
    id: 12,
    name: "The Hanged Man",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Surrender", "New perspective", "Pause", "Letting go"],
    keywordsReversed: ["Stagnation", "Egotism", "Resistance", "Wasted delay"],
    meaningUpright: "The Hanged Man asks you to surrender your expectations and view things from an upside-down perspective. This is a sacred pause—do not force action. The answers will appear clearly once you stop struggling and simply let go.",
    meaningReversed: "The Hanged Man reversed indicates a state of stubborn stagnation. You are resisting a necessary sacrifice or stalling your own progress. Release what no longer serves you to allow the celestial waters to flow again."
  },
  {
    id: 13,
    name: "Death",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Transformation", "Endings", "Transition", "Rebirth"],
    keywordsReversed: ["Fear of change", "Holding on", "Resisting transformation", "Decay"],
    meaningUpright: "Death is the beautiful harbinger of rebirth. Do not fear this card; it simply marks the transition of an old, expired cycle. Clear away the dead wood of your life so that fresh, green seeds can finally catch the solar rays.",
    meaningReversed: "Death reversed indicates that you are desperately clinging to a dead situation, relationship, or belief. You are prolonging the inevitable and blocking your own rebirth. Let go with grace; the universe has grander plans."
  },
  {
    id: 14,
    name: "Temperance",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Balance", "Moderation", "Patience", "Inner peace"],
    keywordsReversed: ["Imbalance", "Excess", "Lack of long-term vision", "Hastiness"],
    meaningUpright: "Temperance brings beautiful balance, peace, and patience. You are successfully synthesizing different elements of your life into a perfect, quiet flow. Walk the middle path and trust that things are aligning at exactly the right speed.",
    meaningReversed: "Temperance reversed suggests an imbalance or excess. Are you over-committing, over-working, or feeling emotionally volatile? Take a step back and re-calibrate. Restore your daily harmony before moving forward."
  },
  {
    id: 15,
    name: "The Devil",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Shadow self", "Attachment", "Materialism", "Restricting habits"],
    keywordsReversed: ["Releasing bonds", "Overcoming fear", "Independence", "Reclaiming power"],
    meaningUpright: "The Devil shines an honest light on your attachments. Are you bound to a toxic habit, codependent relationship, or limiting belief? Remember that the chains holding you are loose—you have the keys to your own freedom whenever you choose to stand.",
    meaningReversed: "The Devil reversed is a glorious sign of liberation! You are finally recognizing and breaking free from negative habits, patterns, or fear-based attachments that once restricted your growth. Step boldly into your reclaimed power."
  },
  {
    id: 16,
    name: "The Tower",
    image: "https://images.unsplash.com/photo-1518818419601-72c8673f5852?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Sudden upheaval", "Revelation", "Breakthrough", "Rebuilding"],
    keywordsReversed: ["Avoiding disaster", "Delaying inevitable", "Fear of change", "Fear of collapse"],
    meaningUpright: "The Tower brings lightning-fast upheaval to structures built on unstable sand. While the collapse feels sudden and jarring, it is a blessing in disguise. False structures must fall so you can build an authentic, solid path forward.",
    meaningReversed: "The Tower reversed suggests that you are trying to ignore or delay a necessary, major transformation. Clinging to the crumbling walls will only increase the fallout. Allow the old structures to fall with grace so rebuilding can begin."
  },
  {
    id: 17,
    name: "The Star",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Hope", "Faith", "Rejuvenation", "Divine guidance"],
    keywordsReversed: ["Despair", "Lack of faith", "Disconnection", "Stiff optimism"],
    meaningUpright: "The Star rises after the storm, showering you with cosmic grace, hope, and deep spiritual healing. You are protected, guided, and beautifully aligned with your divine calling. Wash away past wounds and look forward with absolute confidence.",
    meaningReversed: "The Star reversed indicates that while the cosmic guidance is shining bright, you are feeling disconnected from hope. Self-doubt and past wounds are clouding your sight. Remember that the stars are still there, even behind the dark storm clouds."
  },
  {
    id: 18,
    name: "The Moon",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Illusion", "Vivid dreams", "Fear", "Intuitive clarity"],
    keywordsReversed: ["Releasing fear", "Unveiling secrets", "Clearer vision", "Reality check"],
    meaningUpright: "The Moon brings vivid dreams, deep instincts, and subconscious illusions. Things are not entirely what they seem on the surface. Trust your shadow-intuition, pay close attention to your dreams, and walk slowly through the fog.",
    meaningReversed: "The Moon reversed signals that the fog is clearing. Secrets, anxieties, or illusions that once clouded your vision are finally dissipating. You can now distinguish between authentic intuition and fear-based delusions, bringing solid clarity."
  },
  {
    id: 19,
    name: "The Sun",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Success", "Vitality", "Joy", "Warm truth"],
    keywordsReversed: ["Temporary cloud", "Lack of enthusiasm", "Unrealistic optimism", "Mild delay"],
    meaningUpright: "The Sun radiates golden success, joy, and vitality. This is one of the most magnificent alignments in the deck. Bask in the warmth, express your authentic self with absolute boldness, and share your light with everyone you meet.",
    meaningReversed: "The Sun reversed indicates that while success and joy are assured, a minor cloud is temporarily blocking your view. You might be feeling slightly fatigued or struggling to find enthusiasm. Reconnect with what makes your inner child laugh."
  },
  {
    id: 20,
    name: "Judgement",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Reflection", "Inner calling", "Awakening", "Absolution"],
    keywordsReversed: ["Self-doubt", "Ignoring call", "Refusal to learn", "Regret"],
    meaningUpright: "Judgement signals a spiritual awakening. You are being called to rise above your past and step into a higher state of consciousness. Reflect on your journey, release old regrets, and embrace the fresh mission calling your soul.",
    meaningReversed: "Judgement reversed warns that you are ignoring a loud, clear call from your soul. Fear of judgment or self-doubt is keeping you stuck in outdated dynamics. Listen closely to the trumpet of your inner guide—it is time to rise."
  },
  {
    id: 21,
    name: "The World",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    keywordsUpright: ["Completion", "Integration", "Travel", "Accomplishment"],
    keywordsReversed: ["Incomplete cycle", "Lack of closure", "Shortcuts", "Stagnation"],
    meaningUpright: "The World represents total completion, triumph, and integration. You have successfully finished a major evolutionary cycle and are stepping into absolute alignment. Celebrate your growth, feel whole, and prepare for your next level.",
    meaningReversed: "The World reversed suggests you are close to completion, but a final piece of closure is missing. Are you taking shortcuts or leaving loose ends? Tie up the remaining threads of this chapter so you can step into the next cycle unburdened."
  }
];

interface JournalEntry {
  id: string;
  date: string;
  cardName: string;
  isReversed: boolean;
  notes: string;
}

export default function DailyDraw() {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState<string | null>(null);
  const [journalInput, setJournalInput] = useState('');
  const [savedJournal, setSavedJournal] = useState<JournalEntry[]>([]);
  const [journalSuccess, setJournalSuccess] = useState(false);

  // Audio effect generator using Web Audio API (silent until clicked)
  const playSoundEffect = (type: 'shuffle' | 'reveal' | 'success') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      if (type === 'shuffle') {
        // Soft white noise shuffling sound
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(600, ctx.currentTime);
        filter.Q.setValueAtTime(10, ctx.currentTime);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.38);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } else if (type === 'reveal') {
        // High crystalline chime
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.8); // A5
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc2.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.8); // C6
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 1.2);
        osc2.stop(ctx.currentTime + 1.2);
      } else if (type === 'success') {
        // Harp-like ascending scale
        const notes = [440, 554.37, 659.25, 880]; // A major
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          
          gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.6);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 0.6);
        });
      }
    } catch (e) {
      // Audio context error or browser restriction, fail silently
    }
  };

  useEffect(() => {
    // Load local journal history
    const storedJournal = localStorage.getItem('lilith_tarot_journal');
    if (storedJournal) {
      setSavedJournal(JSON.parse(storedJournal));
    }

    // Load active card drawn today
    const storedDate = localStorage.getItem('lilith_dailydraw_date');
    const storedCardId = localStorage.getItem('lilith_dailydraw_card_id');
    const storedReversed = localStorage.getItem('lilith_dailydraw_reversed');
    const todayStr = new Date().toDateString();

    if (storedDate === todayStr && storedCardId !== null) {
      const card = TAROT_DECK.find(c => c.id === parseInt(storedCardId, 10));
      if (card) {
        setSelectedCard(card);
        setIsReversed(storedReversed === 'true');
        setIsFlipped(true);
        setCooldownLeft("Fixed under the current solar transit.");
      }
    }
  }, []);

  const handleDrawCard = () => {
    if (isShuffling) return;
    
    setIsShuffling(true);
    setIsFlipped(false);
    setJournalInput('');
    setJournalSuccess(false);

    // Shuffle sounds repeated for active dynamic rhythm
    let soundInterval = setInterval(() => {
      playSoundEffect('shuffle');
    }, 150);

    setTimeout(() => {
      clearInterval(soundInterval);
      
      const randomIdx = Math.floor(Math.random() * TAROT_DECK.length);
      const card = TAROT_DECK[randomIdx];
      // 80% Upright, 20% Reversed
      const rev = Math.random() < 0.20;

      setSelectedCard(card);
      setIsReversed(rev);
      setIsShuffling(false);

      // Save to local storage for standard Daily limits
      const todayStr = new Date().toDateString();
      localStorage.setItem('lilith_dailydraw_date', todayStr);
      localStorage.setItem('lilith_dailydraw_card_id', card.id.toString());
      localStorage.setItem('lilith_dailydraw_reversed', rev.toString());
      setCooldownLeft("Fixed under the current solar transit.");

      // Flip card with dynamic crystallizing audio chime
      setTimeout(() => {
        setIsFlipped(true);
        playSoundEffect('reveal');
      }, 300);

    }, 1600);
  };

  const handleOverrideDraw = () => {
    // Allows user to draw again for customizable query
    localStorage.removeItem('lilith_dailydraw_date');
    localStorage.removeItem('lilith_dailydraw_card_id');
    localStorage.removeItem('lilith_dailydraw_reversed');
    setCooldownLeft(null);
    setIsFlipped(false);
    setTimeout(() => {
      handleDrawCard();
    }, 200);
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard || !journalInput.trim()) return;

    const newEntry: JournalEntry = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      cardName: selectedCard.name,
      isReversed: isReversed,
      notes: journalInput.trim()
    };

    const updatedJournal = [newEntry, ...savedJournal].slice(0, 30); // limit to 30 history
    setSavedJournal(updatedJournal);
    localStorage.setItem('lilith_tarot_journal', JSON.stringify(updatedJournal));
    setJournalSuccess(true);
    playSoundEffect('success');
  };

  const handleDeleteJournal = (id: string) => {
    const updated = savedJournal.filter(item => item.id !== id);
    setSavedJournal(updated);
    localStorage.setItem('lilith_tarot_journal', JSON.stringify(updated));
  };

  return (
    <section id="dailydraw" className="py-32 px-8 bg-mystic-black relative overflow-hidden border-t border-white/5">
      {/* Mystical Blur Decorators */}
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-mystic-accent/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 left-10 w-[350px] h-[350px] bg-mystic-purple/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-mystic-accent/60 mb-4 block"
          >
            Daily Oracle
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Interactive <span className="italic">Daily Draw</span>
          </motion.h2>
          <p className="max-w-xl mx-auto text-white/50 text-sm font-light leading-relaxed">
            Align with the celestial coordinates. Clear your thoughts, formulate a query in your mind, and draw a personalized Tarot card to receive immediate cosmic advice.
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-px bg-mystic-accent/30 mx-auto mt-8"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Column Left: The Card Canvas Area */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 min-h-[580px] relative">
            
            {/* Shuffling stack animation placeholder */}
            <div className="relative w-64 h-96 flex items-center justify-center mb-8">
              <AnimatePresence>
                {isShuffling ? (
                  // Shuffle State animation
                  [...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        rotate: Math.random() * 20 - 10,
                        x: i * 8 - 16,
                        y: 0
                      }}
                      animate={{
                        x: [i * 8 - 16, (i % 2 === 0 ? -120 : 120), i * 8 - 16],
                        rotate: [Math.random() * 20 - 10, Math.random() * 30 - 15, Math.random() * 20 - 10],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                      className="absolute w-56 h-80 rounded-2xl border-2 border-mystic-accent/30 bg-neutral-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-mystic-black shadow-2xl flex items-center justify-center p-3"
                    >
                      {/* Card Back details */}
                      <div className="w-full h-full border border-mystic-accent/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 border-4 border-mystic-accent/5 rounded-lg pointer-events-none" />
                        <div className="w-16 h-16 rounded-full border border-mystic-accent/30 flex items-center justify-center">
                          <Star className="w-6 h-6 text-mystic-accent/40 animate-pulse" />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // Static / Revelatory Card representation
                  <motion.div
                    className="w-56 h-80 select-none cursor-pointer"
                    style={{ perspective: 1000 }}
                    onClick={() => {
                      if (!isFlipped && !selectedCard) {
                        handleDrawCard();
                      }
                    }}
                  >
                    {/* Inner wrapper with 3D space */}
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="w-full h-full relative"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Card BACK (Shows when not flipped) */}
                      <div 
                        className="absolute inset-0 rounded-2xl border-2 border-mystic-accent/40 bg-neutral-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-mystic-black shadow-[0_0_25px_rgba(235,191,104,0.15)] flex items-center justify-center p-3"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="w-full h-full border border-mystic-accent/15 rounded-xl flex flex-col items-center justify-between py-8 px-4 relative overflow-hidden">
                          {/* Inner gold lines */}
                          <div className="absolute inset-2 border border-mystic-accent/5 pointer-events-none" />
                          <div className="text-mystic-accent/20 text-[9px] uppercase tracking-[0.25em] font-mono">
                            ✦ Cosmic Aligned ✦
                          </div>
                          
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-mystic-accent/20 flex items-center justify-center animate-spin-slow">
                            <Moon className="w-8 h-8 text-mystic-accent/40" />
                          </div>

                          <div className="text-center">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-accent/60 block mb-1">
                              Tap to Draw
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-white/20 block font-mono">
                              * LILITH *
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card FRONT (Shows when flipped) */}
                      {selectedCard && (
                        <div 
                          className={`absolute inset-0 rounded-2xl border-2 border-mystic-accent/50 bg-neutral-950 shadow-[0_0_35px_rgba(235,191,104,0.25)] flex flex-col overflow-hidden`}
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          {/* Card Image and Border */}
                          <div className="relative h-2/3 w-full bg-neutral-900 overflow-hidden">
                            <img 
                              src={selectedCard.image} 
                              alt={selectedCard.name}
                              className={`w-full h-full object-cover transition-all duration-1000 ${isReversed ? 'rotate-180 grayscale-[30%]' : 'grayscale-[15%]'}`}
                              referrerPolicy="no-referrer"
                            />
                            {/* Dark gradient mask on bottom of card picture */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                            
                            {/* Arcana Number Badge */}
                            <div className="absolute top-3 left-3 bg-neutral-950/80 border border-mystic-accent/40 px-2.5 py-0.5 rounded-full text-[8px] uppercase font-mono tracking-widest text-mystic-accent">
                              Arcana {selectedCard.id}
                            </div>

                            {/* Reversed Badge */}
                            {isReversed && (
                              <div className="absolute top-3 right-3 bg-red-950/80 border border-red-500/30 px-2.5 py-0.5 rounded-full text-[8px] uppercase font-bold tracking-widest text-red-400">
                                Reversed
                              </div>
                            )}
                          </div>

                          {/* Card Details on Bottom */}
                          <div className="p-4 flex-1 flex flex-col justify-between bg-neutral-950 relative z-10">
                            <div className="text-center">
                              <h3 className="text-lg font-serif text-mystic-accent tracking-wider mb-1.5 uppercase font-medium">
                                {selectedCard.name}
                              </h3>
                              
                              {/* Keywords list */}
                              <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-full">
                                {(isReversed ? selectedCard.keywordsReversed : selectedCard.keywordsUpright).map((word, i) => (
                                  <span key={i} className="text-[8px] uppercase tracking-wider bg-white/5 border border-white/10 text-white/50 px-2 py-0.5 rounded-full">
                                    {word}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-center border-t border-white/5 pt-2 text-center text-[7px] font-mono text-mystic-accent/30 uppercase tracking-widest">
                              ✧ LILITH TAROT READINGS ✧
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dynamic Button Controls */}
            <div className="space-y-4 w-full max-w-sm text-center">
              {selectedCard && isFlipped ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleOverrideDraw}
                    className="flex-1 py-3 bg-white/5 border border-white/10 hover:border-mystic-accent/40 text-white hover:text-mystic-accent text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Inquire Again
                  </button>
                  <button
                    onClick={handleDrawCard}
                    className="flex-1 py-3 bg-mystic-accent text-mystic-black text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Shuffle & Draw
                  </button>
                </div>
              ) : (
                <button
                  disabled={isShuffling}
                  onClick={handleDrawCard}
                  className="w-full py-4.5 bg-mystic-accent text-mystic-black font-semibold text-xs uppercase tracking-[0.25em] hover:bg-white disabled:opacity-50 transition-all duration-300 shadow-lg shadow-mystic-accent/10 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  {isShuffling ? "Shuffling channels..." : "Shuffle & Draw Card"}
                </button>
              )}

              {cooldownLeft && (
                <div className="text-[10px] uppercase tracking-widest text-white/30 flex items-center justify-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5" /> {cooldownLeft}
                </div>
              )}
            </div>
          </div>

          {/* Column Right: Card Interpretations & Personal Journal */}
          <div className="lg:col-span-6 space-y-8">
            <AnimatePresence mode="wait">
              {selectedCard && isFlipped ? (
                <motion.div
                  key="meaning"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-3 bg-mystic-accent/10 rounded-bl-2xl border-l border-b border-mystic-accent/20">
                    <span className="text-[9px] uppercase tracking-widest text-mystic-accent font-semibold flex items-center gap-1 font-mono">
                      <Star className="w-3 h-3 animate-pulse" /> Alignment Revealed
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-white mb-2 flex items-center gap-2">
                    {selectedCard.name} <span className="text-xs uppercase tracking-widest text-mystic-accent font-sans font-light">({isReversed ? 'Reversed' : 'Upright'})</span>
                  </h3>
                  <div className="w-16 h-px bg-mystic-accent/30 mb-6" />

                  <p className="text-white/75 text-sm font-light leading-relaxed mb-8 italic">
                    {isReversed ? selectedCard.meaningReversed : selectedCard.meaningUpright}
                  </p>

                  {/* Reflection Journal Form */}
                  <form onSubmit={handleSaveJournal} className="border-t border-white/5 pt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">
                        Jot Down Your Terrestrial Thoughts
                      </label>
                      <textarea
                        rows={3}
                        value={journalInput}
                        onChange={(e) => setJournalInput(e.target.value)}
                        placeholder="What guidance does this card offer for your current situation? Journal your insights..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs focus:outline-none focus:border-mystic-accent/50 transition-colors placeholder:text-white/20 resize-none text-white font-light"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-[9px] uppercase tracking-widest text-white/20 font-mono">
                        Saved securely in local vault
                      </div>
                      <button
                        type="submit"
                        disabled={!journalInput.trim()}
                        className="py-2.5 px-5 bg-white/5 border border-white/10 hover:border-mystic-accent hover:text-mystic-accent text-[9px] uppercase tracking-widest font-semibold transition-all duration-300 disabled:opacity-40"
                      >
                        {journalSuccess ? (
                          <span className="flex items-center gap-1 text-mystic-accent font-bold">
                            <Check className="w-3 h-3" /> Saved!
                          </span>
                        ) : (
                          "Commit to Journal"
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="awaiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="bg-white/[0.01] border border-white/5 border-dashed rounded-3xl p-10 text-center min-h-[160px] flex flex-col items-center justify-center space-y-3"
                >
                  <BookOpen className="w-10 h-10 text-mystic-accent/40 animate-pulse" />
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-light max-w-xs">
                    Please shuffle and draw a card to reveal its divine interpretation and unlock the reflection ledger.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* History Logs */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
              <h4 className="text-xs uppercase tracking-[0.3em] text-mystic-accent mb-6 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Cosmic Journal History
              </h4>
              
              <AnimatePresence mode="wait">
                {savedJournal.length > 0 ? (
                  <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                    {savedJournal.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors relative group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-serif text-mystic-accent uppercase tracking-wider">
                            {item.cardName} <span className="text-[8px] tracking-widest font-sans font-light">({item.isReversed ? 'Reversed' : 'Upright'})</span>
                          </span>
                          <span className="text-[8px] font-mono text-white/30 flex items-center gap-1 uppercase">
                            <Calendar className="w-3 h-3 text-white/10" /> {item.date}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed font-light font-sans whitespace-pre-wrap">
                          {item.notes}
                        </p>

                        <button
                          onClick={() => handleDeleteJournal(item.id)}
                          className="absolute bottom-2.5 right-2.5 p-1 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    key="no-history"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="text-center py-8 text-[10px] uppercase tracking-widest text-white/30"
                  >
                    No historical entries saved. Your insights will appear here once saved.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
