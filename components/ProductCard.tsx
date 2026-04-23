'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden mb-3 md:mb-4 aspect-[3/4] bg-gray-100 rounded-sm">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
          
          {/* Badges */}
          <motion.div 
            className="absolute top-2 left-2 flex flex-col gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.isNew && (
              <motion.span 
                className="bg-white text-black px-2 py-1 text-[8px] md:text-[10px] uppercase font-bold tracking-wider"
                whileHover={{ scale: 1.1 }}
              >
                New
              </motion.span>
            )}
            {product.onSale && (
              <motion.span 
                className="bg-accent text-white px-2 py-1 text-[8px] md:text-[10px] uppercase font-bold tracking-wider"
                whileHover={{ scale: 1.1 }}
              >
                Sale
              </motion.span>
            )}
          </motion.div>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-16 pb-4 px-3 flex justify-center"
          >
            <motion.button
              onClick={handleQuickAdd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 md:px-6 md:py-2.5 text-[9px] md:text-xs uppercase tracking-wider font-medium transition shadow-lg ${
                isAdded ? 'bg-accent text-white' : 'bg-white text-black hover:bg-accent hover:text-white'
              }`}
            >
              {isAdded ? 'Added!' : 'Quick Add'}
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <motion.div 
          className="flex flex-col gap-1"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-medium text-sm md:text-base text-gray-900 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
            {product.category}
          </p>
          <motion.p 
            className="font-serif italic text-base md:text-lg text-gray-900 mt-1"
            whileHover={{ scale: 1.05 }}
          >
            ${product.price.toLocaleString()}
          </motion.p>
        </motion.div>
      </Link>
    </motion.div>
  );
}