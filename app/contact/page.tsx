'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-4xl font-serif mb-4">Thank You</h1>
          <p className="text-gray-600">
            Your message has been received. We will get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Get in Touch</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-12">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-gray-600 leading-relaxed mb-8">
              Have a question about our collections? Need styling advice? 
              We are here to help.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-2">Email</h3>
                <a href="mailto:hello@emouraa.com" className="text-gray-600 hover:text-black transition">
                  hello@emouraa.com
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-2">Phone</h3>
                <a href="tel:+1234567890" className="text-gray-600 hover:text-black transition">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Fashion Avenue<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}