'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-16">
        <div className="text-center max-w-lg mx-auto">
          {/* Animated heart */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="text-8xl mb-8 select-none"
            aria-hidden="true"
          >
            ❤️
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            It&apos;s a{' '}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Date!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-gray-500 text-lg mb-10 leading-relaxed"
          >
            Your preferences have been saved. I&apos;ll plan everything to make it a day you&apos;ll never forget.
            Get ready — something beautiful is coming.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="px-8 py-4 rounded-2xl border-2 border-pink-200 text-pink-600 font-semibold hover:bg-pink-50 transition-colors duration-200"
            >
              Back to Home
            </Link>
            <Link
              href="/preferences"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Update Preferences
            </Link>
          </motion.div>

          {/* Floating confetti dots */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${8 + (i % 3) * 4}px`,
                  height: `${8 + (i % 3) * 4}px`,
                  background: i % 2 === 0 ? '#f9a8d4' : '#fda4af',
                  left: `${10 + i * 11}%`,
                  top: `${15 + (i % 4) * 18}%`,
                }}
                animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
