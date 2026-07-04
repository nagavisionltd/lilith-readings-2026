import { Eye, Moon, Sparkles, Wand2, Compass } from 'lucide-react';

export interface Service {
  icon: any;
  title: string;
  description: string;
  price: string;
  duration: string;
}

export const SERVICES: Service[] = [
  {
    icon: Eye,
    title: "15min Tarot reading",
    description: "A quick, focused session for immediate clarity on a specific question or current energy.",
    price: "$30",
    duration: "15 mins"
  },
  {
    icon: Moon,
    title: "30min tarot reading",
    description: "A deeper exploration of your path, uncovering hidden influences and future potentials.",
    price: "$55",
    duration: "30 mins"
  },
  {
    icon: Compass,
    title: "astrology reading (personal birth chart / relationship)",
    description: "Explore your cosmic blueprint or the dynamics between two souls through the stars.",
    price: "$120",
    duration: "60 mins"
  },
  {
    icon: Wand2,
    title: "advanced astrology reading",
    description: "An in-depth analysis of transits, progressions, and complex astrological patterns.",
    price: "$180",
    duration: "90 mins"
  },
  {
    icon: Sparkles,
    title: "astrology + tarot reading",
    description: "The ultimate guidance session combining celestial wisdom with intuitive card insights.",
    price: "$150",
    duration: "75 mins"
  }
];
