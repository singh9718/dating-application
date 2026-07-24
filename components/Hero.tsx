"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const floatingShapes = [
  {
    size: 320,
    top: "-5%",
    left: "-8%",
    color: "from-pink-200/40 to-rose-200/30",
    delay: 0,
  },
  {
    size: 250,
    top: "60%",
    right: "-5%",
    color: "from-lavender-200/40 to-pink-200/30",
    delay: 0.3,
  },
  {
    size: 180,
    top: "30%",
    left: "40%",
    color: "from-rose-100/50 to-pink-100/40",
    delay: 0.6,
  },
  {
    size: 140,
    bottom: "10%",
    left: "20%",
    color: "from-lavender-100/50 to-pink-100/40",
    delay: 0.9,
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Floating background blobs */}
      {floatingShapes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: s.delay, ease: "easeOut" }}
          className={`absolute rounded-full bg-gradient-to-br ${s.color} blur-3xl pointer-events-none`}
          style={{
            width: s.size,
            height: s.size,
            top: (s as any).top,
            left: (s as any).left,
            right: (s as any).right,
            bottom: (s as any).bottom,
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-pink-200 text-pink-600 text-sm font-medium mb-8 shadow-sm"
        >
          <span>✨</span>
          <span>Something special is coming</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-400 bg-clip-text text-transparent">
            Our Date
          </span>
          <span className="ml-3">❤️</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-500 mb-12 leading-relaxed max-w-xl mx-auto"
        >
          Help me plan a date you&apos;ll absolutely love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full sm:w-auto flex justify-center"
        >
          <Link
            href="/preferences"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-semibold shadow-xl shadow-pink-200 hover:shadow-2xl hover:shadow-pink-300 hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
          >
            <span>Let&apos;s Plan Our Date</span>
            <span className="text-xl">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-gray-400 text-sm"
        >
          {["Romantic", "Thoughtful", "Personal"].map((tag) => (
            <span key={tag} className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-pink-300 inline-block" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
