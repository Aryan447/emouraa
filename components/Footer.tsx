import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-24 pb-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="text-4xl font-serif font-bold tracking-tighter mb-8">
            Emouraa.
          </div>
          <p className="text-gray-500 max-w-sm">
            A curated destination for the modern aesthete. We bridge the gap
            between fashion and art.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">
            Shop
          </h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li>
              <Link
                href="/products"
                className="hover:text-black hover:underline transition"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=All"
                className="hover:text-black hover:underline transition"
              >
                Clothing
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=Shoes"
                className="hover:text-black hover:underline transition"
              >
                Shoes
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=Accessories"
                className="hover:text-black hover:underline transition"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">
            Client Services
          </h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li>
              <Link
                href="/shipping"
                className="hover:text-black hover:underline transition"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-black hover:underline transition"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-black hover:underline transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/appointment"
                className="hover:text-black hover:underline transition"
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-400 gap-4">
        <div>&copy; 2026 Emouraa Fashion</div>
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            Instagram
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            Pinterest
          </a>
        </div>
      </div>
    </footer>
  );
}