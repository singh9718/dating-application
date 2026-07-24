'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 glass border-b border-white/40"
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-pink-600 text-lg tracking-tight">
          <span className="text-xl">💕</span>
          <span>OurDate</span>
        </Link>
        <Link
          href="/preferences"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-200"
        >
          Plan Our Date
        </Link>
      </nav>
    </motion.header>
  );
}
