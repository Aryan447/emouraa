'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { products, getAllCategories, getNewArrivals, getSaleItems } from '@/data/products';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const sale = searchParams.get('sale');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mounted, setMounted] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (category) setSelectedCategory(category);
    if (sale === 'true') setSelectedCategory('Sale');
  }, [category, sale]);

  useEffect(() => {
    if (mounted) window.scrollTo(0, 0);
  }, [selectedCategory, mounted]);

  if (!mounted) return null;

  const categories = ['All', ...getAllCategories(), 'Sale'];
  let filteredProducts = [...products];

  if (selectedCategory === 'Sale') filteredProducts = getSaleItems();
  else if (selectedCategory !== 'All') filteredProducts = products.filter(p => p.category === selectedCategory);
  if (selectedCategory === 'New Arrivals') filteredProducts = getNewArrivals();

  switch (sortBy) {
    case 'price-low': filteredProducts.sort((a, b) => a.price - b.price); break;
    case 'price-high': filteredProducts.sort((a, b) => b.price - a.price); break;
    case 'name': filteredProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 md:pt-32 pb-16 md:pb-20"
    >
      {/* Header */}
      <motion.div 
        className="bg-soft-pink py-8 md:py-16 px-4 md:px-6 mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.p 
            className="text-[10px] md:text-xs text-accent font-bold uppercase tracking-[0.3em] mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Curated Collection
          </motion.p>
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-serif mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Shop All
          </motion.h1>
          <motion.p 
            className="text-gray-500 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredProducts.length} pieces
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Mobile Filter Toggle */}
        <motion.div 
          className="flex items-center justify-between mb-6 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </motion.button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs uppercase tracking-wider border border-gray-200 bg-white"
          >
            <option value="newest">Sort</option>
            <option value="price-low">Price: Low</option>
            <option value="price-high">Price: High</option>
            <option value="name">Name</option>
          </select>
        </motion.div>

        {/* Desktop Filters */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 text-[10px] uppercase tracking-wider transition-all duration-300 ${
                      selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-black hover:text-white'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-8 md:mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-3 md:px-4 py-2 text-[10px] md:text-xs uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-black hover:text-white'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="hidden md:block ml-auto px-4 py-2 text-xs uppercase tracking-widest border border-black/10 bg-white hover:border-black transition"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Sort: Price Low to High</option>
              <option value="price-high">Sort: Price High to Low</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
<AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
              initial="initial"
              animate="animate"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Link href={`/product/${product.id}`} className="group block">
                    <motion.div 
                      className="relative overflow-hidden mb-2 md:mb-3 aspect-[3/4] bg-gray-100 rounded-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </motion.div>
                      
                      <motion.div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && (
                          <motion.span 
                            className="bg-white text-black px-1.5 py-0.5 text-[7px] md:text-[8px] uppercase font-bold tracking-wider"
                            whileHover={{ scale: 1.1 }}
                          >
                            New
                          </motion.span>
                        )}
                        {product.onSale && (
                          <motion.span 
                            className="bg-accent text-white px-1.5 py-0.5 text-[7px] md:text-[8px] uppercase font-bold tracking-wider"
                            whileHover={{ scale: 1.1 }}
                          >
                            Sale
                          </motion.span>
                        )}
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      className="flex flex-col gap-0.5"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-medium text-xs md:text-sm text-gray-900 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider">
                        {product.category}
                      </p>
                      <motion.p 
                        className="font-serif italic text-sm md:text-base text-gray-900 mt-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        ${product.price.toLocaleString()}
                      </motion.p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-lg mb-4">No products found</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-accent text-sm underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <motion.div 
        className="min-h-screen pt-32 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="text-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </motion.div>
      </motion.div>
    }>
      <ProductsContent />
    </Suspense>
  );
}