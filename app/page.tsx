'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/ProductCard';
import { products, getNewArrivals, getSaleItems } from '@/data/products';

const heroImages = [
  '/images/InShot_20260422_112532366.jpg.jpeg',
  '/images/Picsart_26-04-22_07-23-21-200.jpg.jpeg',
  '/images/IMG_20260422_093407.jpg.jpeg',
  '/images/InShot_20260422_093300108.jpg.jpeg',
];

const marqueeText = 'Emouraa Fashion • Paris • Milan • New York • Tokyo • Emouraa Fashion • Paris • Milan • New York • Tokyo • ';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const newArrivals = getNewArrivals();
  const saleItems = getSaleItems();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {/* Hero Section */}
      <motion.section 
        className="relative w-full h-[85vh] md:h-screen bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Mobile Image */}
        <motion.div 
          className="md:hidden relative w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src="/images/InShot_20260422_111205315.jpg.jpeg"
            alt="Emouraa editorial"
            fill
            className="object-cover object-[center_15%] scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        </motion.div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative w-full h-full">
          <Carousel
            images={heroImages}
            autoPlay={true}
            autoPlayInterval={6000}
            showDots={true}
            showArrows={true}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <motion.div 
          className="absolute bottom-6 left-4 right-4 md:left-10 md:right-auto md:bottom-10 text-white z-10 max-w-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.p 
            className="mb-2 md:mb-3 text-[9px] md:text-xs font-medium uppercase tracking-[0.4em] md:tracking-[0.35em] text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            New Season Editorial
          </motion.p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] mb-3 md:mb-4">
            Fall <br />
            <motion.span 
              className="italic font-light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Winter
            </motion.span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              href="/products"
              className="inline-block border border-white/60 px-5 py-2.5 md:px-8 md:py-3 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-widest hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
            >
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - mobile */}
        <motion.div 
          className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[8px] uppercase tracking-widest">Scroll</span>
          <motion.div 
            className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Marquee */}
      <motion.section 
        className="py-4 md:py-6 border-y border-black/5 bg-offwhite overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-4xl md:text-7xl font-serif italic font-thin opacity-15 inline-block">
            {marqueeText}
          </span>
        </motion.div>
      </motion.section>

      {/* New Arrivals */}
      <motion.section 
        className="py-16 md:py-24 px-4 md:px-6 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={pageVariants}>
              <motion.p 
                className="text-[10px] md:text-xs text-accent font-bold uppercase tracking-[0.3em] mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Just In
              </motion.p>
              <h2 className="text-3xl md:text-5xl font-serif">New Arrivals</h2>
            </motion.div>
            <motion.div variants={pageVariants}>
              <Link
                href="/products"
                className="text-[10px] md:text-xs font-medium uppercase tracking-widest hover:line-through transition pb-1 border-b border-transparent hover:border-black"
              >
                View All
              </Link>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {newArrivals.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Editorial Section */}
      <motion.section 
        className="grid md:grid-cols-2 min-h-[80vh] md:min-h-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="relative h-[50vh] md:h-auto overflow-hidden order-2 md:order-1"
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Carousel
            images={[
              '/images/InShot_20260422_111205315.jpg.jpeg',
              '/images/InShot_20260422_112532366.jpg.jpeg',
            ]}
            autoPlay={true}
            autoPlayInterval={4000}
            showDots={false}
            showArrows={false}
            className="w-full h-full"
          />
        </motion.div>
        <motion.div 
          className="bg-white p-6 md:p-12 lg:p-20 flex flex-col justify-center order-1 md:order-2"
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-[9px] md:text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Emouraa Editorial
          </motion.p>
          <motion.h2 
            className="text-2xl md:text-4xl font-serif italic mb-4 md:mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The Art of Subtlety
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base text-gray-500 leading-relaxed mb-6 md:mb-8 max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            An exploration of texture and form. Our latest campaign highlights
            the intricate details that define modern luxury.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/about"
              className="inline-block text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-widest pb-1 hover:text-accent hover:border-accent transition w-fit border-b border-black/20"
            >
              Read Article
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Sale Section */}
      {saleItems.length > 0 && (
        <motion.section 
          className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-soft-pink"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.p 
                  className="text-[10px] md:text-xs text-accent font-bold uppercase tracking-[0.3em] mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Limited Time
                </motion.p>
                <h2 className="text-3xl md:text-5xl font-serif">Sale</h2>
              </div>
              <Link
                href="/products?sale=true"
                className="text-[10px] md:text-xs font-medium uppercase tracking-widest hover:line-through transition text-accent pb-1 border-b border-transparent hover:border-accent"
              >
                View All
              </Link>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
              {saleItems.slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.section 
        className="relative py-20 md:py-32 bg-black text-white text-center px-4 md:px-6 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
        <motion.div 
          className="max-w-2xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Limited Edition
          </motion.p>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif italic mb-8 md:mb-10 leading-tight">
            The Minimalist <br /> Collection
          </h2>
          <p className="text-gray-400 mb-8 md:mb-12 max-w-md mx-auto leading-relaxed text-sm md:text-base">
            Defining a new era of simplicity and elegance. Discover pieces that
            transcend trends.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/products"
              className="inline-block bg-white text-black px-8 py-3 md:px-12 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-500"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* All Products Preview */}
      <motion.section 
        className="py-16 md:py-24 px-4 md:px-6 bg-offwhite"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-[0.3em] mb-2">
                Curated For You
              </p>
              <h2 className="text-3xl md:text-5xl font-serif">Shop All</h2>
            </div>
            <Link
              href="/products"
              className="text-[10px] md:text-xs font-medium uppercase tracking-widest hover:line-through transition pb-1 border-b border-transparent hover:border-black"
            >
              View All
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="py-16 md:py-24 px-4 md:px-6 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-serif mb-4">Stay in Touch</h2>
          <p className="text-gray-500 mb-8 text-sm md:text-base">
            Subscribe to receive updates on new arrivals and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent transition duration-300"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}