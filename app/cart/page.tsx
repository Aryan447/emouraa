'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-serif mb-8">Your Cart</h1>
          <p className="text-gray-500 mb-8">Your cart is currently empty</p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif mb-12">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-6 pb-8 border-b border-black/10">
                <Link href={`/product/${item.product.id}`} className="relative w-32 h-44 bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/product/${item.product.id}`} className="font-bold text-lg hover:underline">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                        {item.product.category}
                      </p>
                    </div>
                    <p className="font-serif italic text-xl">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 border border-black/20 flex items-center justify-center text-sm hover:bg-black hover:text-white transition"
                      >
                        -
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 border border-black/20 flex items-center justify-center text-sm hover:bg-black hover:text-white transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-accent transition text-sm underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 sticky top-32">
              <h2 className="text-xl font-serif mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-black/10 pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="font-serif italic">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent transition duration-300 mt-8">
                Proceed to Checkout
              </button>
              
              <button
                onClick={clearCart}
                className="w-full text-xs uppercase tracking-widest text-gray-500 hover:text-accent transition mt-4"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}