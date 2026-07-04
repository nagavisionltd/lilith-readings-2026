/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function App() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBook = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-mystic-black selection:bg-mystic-gold selection:text-mystic-black"
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services onBook={handleBook} />
          <BookingForm />
        </main>
        <Footer />

        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          service={selectedService} 
        />
      </motion.div>
    </AnimatePresence>
  );
}
