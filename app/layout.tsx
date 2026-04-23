import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartProvider from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Emouraa Fashion Forward - Editorial Store',
  description: 'A curated destination for the modern aesthete. We bridge the gap between fashion and art.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}