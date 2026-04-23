'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import CartSlide from './CartSlide';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white text-[9px] md:text-[10px] items-center justify-center p-1.5 md:p-2 uppercase tracking-widest font-medium hidden md:flex"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Free Worldwide Shipping on Orders Over $500 · Easy Returns · Cash on Delivery
        </motion.span>
      </motion.div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-3 md:px-8 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-md py-2 md:py-3' 
            : 'bg-transparent py-3 md:py-6'
        } ${mobileMenuOpen ? 'bg-black' : ''}`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/"
              className="text-xl md:text-3xl lg:text-4xl font-serif font-bold tracking-tighter leading-none text-white hover-target z-50 block"
            >
              Emouraa
              <span className="block italic text-xs md:text-xl lg:text-2xl font-light">Fashion Forward</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-medium uppercase tracking-widest text-white">
            {['New Arrivals', 'Shop All', 'Accessories', 'Sale'].map((item, i) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item === 'Shop All' ? '/products?category=All' : item === 'Sale' ? '/products?sale=true' : `/products?category=${item}`} 
                  className={`transition-colors hover:text-accent ${item === 'Sale' ? 'text-accent' : ''}`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-6 text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-white pt-1">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block hover:text-accent transition-colors"
            >
              Search
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <span className="hidden md:inline">Cart</span>
              <motion.span 
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
              >
                {totalItems}
              </motion.span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden z-50 p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span 
                  className="block w-full h-0.5 bg-white transition-all duration-300" 
                  animate={mobileMenuOpen ? { rotate: 45, translateY: 6 } : {}}
                />
                <motion.span 
                  className="block w-full h-0.5 bg-white transition-all duration-300" 
                  animate={mobileMenuOpen ? { opacity: 0 } : {}}
                />
                <motion.span 
                  className="block w-full h-0.5 bg-white transition-all duration-300" 
                  animate={mobileMenuOpen ? { rotate: -45, translateY: -6 } : {}}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-md py-8 px-4 flex flex-col items-center gap-6 text-white"
            >
              {['New Arrivals', 'Shop All', 'Accessories', 'Sale', 'About', 'Contact'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item === 'Shop All' ? '/products?category=All' : item === 'Sale' ? '/products?sale=true' : item === 'About' ? '/about' : item === 'Contact' ? '/contact' : `/products?category=${item}`}
                    className={`text-sm font-medium uppercase tracking-widest ${item === 'Sale' ? 'text-accent' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
      <CartSlide />
    </>
  );
}