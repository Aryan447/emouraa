'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById, products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setMounted(true);
    const found = getProductById(params.id);
    if (found) setProduct(found);
  }, [params.id]);

  useEffect(() => {
    if (!mounted) return;
    window.scrollTo(0, 0);
  }, [params.id, mounted]);

  if (!mounted) return null;
  if (!product) notFound();

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 md:pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <motion.div 
          className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-6 md:mb-8 overflow-x-auto hide-scrollbar"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/" className="hover:text-black transition whitespace-nowrap">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-black transition whitespace-nowrap">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-black whitespace-nowrap">{product.name}</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {/* Image Gallery */}
          <motion.div
            className="space-y-3 md:space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-3 md:top-4 left-3 md:left-4"
              >
                {product.isNew && (
                  <span className="bg-white text-black px-2 md:px-3 py-1 text-[10px] md:text-xs uppercase font-bold tracking-widest">
                    New
                  </span>
                )}
                {product.onSale && (
                  <span className="bg-black text-white px-2 md:px-3 py-1 text-[10px] md:text-xs uppercase font-bold tracking-widest">
                    Sale
                  </span>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.p 
              className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {product.category}
            </motion.p>
            <motion.h1 
              className="text-2xl md:text-4xl lg:text-5xl font-serif mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {product.name}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-serif italic mb-6 md:mb-8"
              key={product.price}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              ${product.price.toLocaleString()}
            </motion.p>
            
            <motion.p 
              className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {product.description}
            </motion.p>

            {/* Quantity */}
            <motion.div 
              className="mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-[10px] md:text-xs uppercase tracking-widest mb-3">Quantity</p>
              <div className="flex items-center gap-3 md:gap-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition text-lg"
                >
                  −
                </motion.button>
                <motion.span 
                  className="text-lg w-8 text-center"
                  key={quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {quantity}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition text-lg"
                >
                  +
                </motion.button>
              </div>
            </motion.div>

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-black text-white py-4 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-accent transition duration-300 mb-4"
            >
              Add to Cart
            </motion.button>

            {/* Product Details */}
            <motion.div 
              className="border-t border-black/10 pt-6 md:pt-8 mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <details className="group">
                <summary className="text-[10px] md:text-xs uppercase tracking-widest cursor-pointer flex justify-between items-center py-3">
                  <span>Details</span>
                  <motion.svg 
                    className="w-4 h-4 transition-transform group-open:rotate-180" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ rotate: 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </summary>
                <div className="mt-2 text-sm text-gray-600 space-y-2 pb-3">
                  <p>Premium quality materials</p>
                  <p>Handcrafted with attention to detail</p>
                  <p>Made in Italy</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="text-[10px] md:text-xs uppercase tracking-widest cursor-pointer flex justify-between items-center py-3 border-t border-black/5">
                  <span>Shipping & Returns</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-2 text-sm text-gray-600 space-y-2 pb-3">
                  <p>Free worldwide shipping on orders over $500</p>
                  <p>30-day return policy</p>
                  <p>Express delivery available</p>
                </div>
              </details>
            </motion.div>
          </motion.div>
        </div>

        {/* Related Products */}
        <AnimatePresence>
          {relatedProducts.length > 0 && (
            <motion.section 
              className="mt-16 md:mt-20 pt-16 md:pt-20 border-t border-black/10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif mb-8 md:mb-12">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    <Link href={`/product/${p.id}`} className="group">
                      <motion.div 
                        className="relative aspect-[3/4] bg-gray-100 mb-3 md:mb-4 overflow-hidden rounded-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                      </motion.div>
                      <h3 className="font-bold text-sm md:text-base">{p.name}</h3>
                      <p className="font-serif italic text-sm md:text-base">${p.price.toLocaleString()}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}