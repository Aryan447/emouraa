'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSlide() {
  const { items, removeItem, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isCartOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black/60 z-[60] lg:bg-black/40 ${
          isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isCartOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] ${
          isCartOpen ? '' : ''
        }`}
      >
        <motion.div className="flex flex-col h-full">
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between p-4 md:p-6 border-b border-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl md:text-2xl font-serif">Your Cart</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-black/5 transition rounded-full"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <AnimatePresence mode="wait">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <motion.div 
                    className="w-20 h-20 mb-6 rounded-full bg-gray-100 flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </motion.div>
                  <p className="text-gray-500 mb-2">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mb-6">Add some items to get started</p>
                  <Link
                    href="/products"
                    onClick={() => setIsCartOpen(false)}
                    className="bg-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent transition"
                  >
                    Start Shopping
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3 md:gap-4"
                    >
                      <motion.div 
                        className="relative w-20 h-24 md:w-24 md:h-32 bg-gray-100 rounded-sm flex-shrink-0"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-sm"
                        />
                      </motion.div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <motion.div whileHover={{ x: 4 }}>
                          <h3 className="font-medium text-sm md:text-base truncate">{item.product.name}</h3>
                          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mt-0.5">
                            {item.product.category}
                          </p>
                        </motion.div>
                        <div className="flex items-center justify-between">
                          <motion.div 
                            className="flex items-center gap-1.5 md:gap-2"
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 md:w-8 md:h-8 border border-black/20 flex items-center justify-center text-sm hover:bg-black hover:text-white transition rounded"
                            >
                              −
                            </motion.button>
                            <span className="text-sm w-5 md:w-6 text-center">{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 md:w-8 md:h-8 border border-black/20 flex items-center justify-center text-sm hover:bg-black hover:text-white transition rounded"
                            >
                              +
                            </motion.button>
                          </motion.div>
                          <motion.p 
                            className="font-serif italic text-sm md:text-base"
                            key={item.product.price * item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                          >
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </motion.p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-300 hover:text-accent transition self-start p-1"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <AnimatePresence>
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-4 md:p-6 border-t border-black/10 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-600">Subtotal</span>
                  <motion.span 
                    className="text-lg md:text-xl font-serif italic"
                    key={totalPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    ${totalPrice.toLocaleString()}
                  </motion.span>
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 mb-4 text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-black text-white text-center py-3 md:py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent transition"
                  >
                    Checkout
                  </Link>
                </motion.div>
                <motion.button
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full text-center py-2 mt-2 text-xs text-gray-400 hover:text-black transition"
                  whileHover={{ y: -2 }}
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}