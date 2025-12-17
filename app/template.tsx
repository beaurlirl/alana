'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.99,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Overlay variants for dramatic page transitions
const overlayVariants = {
  initial: {
    scaleY: 1,
  },
  enter: {
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative">
      {/* Page transition overlay */}
      <motion.div
        key={`overlay-${pathname}`}
        variants={overlayVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 z-50 bg-accent origin-bottom pointer-events-none"
      />

      {/* Main content with animations */}
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>

      {/* Floating cursor glow effect (desktop only) */}
      <CursorGlow />
    </div>
  )
}

// Cursor glow component for desktop
function CursorGlow() {
  return (
    <motion.div
      className="fixed pointer-events-none z-[60] w-64 h-64 rounded-full hidden lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(139, 155, 138, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      initial={false}
    />
  )
}
