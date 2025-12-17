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

// Multi-layer fog variants for ethereal transitions
const fogLayer1 = {
  initial: { 
    x: '-100%',
    opacity: 0.7,
  },
  enter: { 
    x: '100%',
    opacity: 0,
    transition: { 
      duration: 1.4, 
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: { 
    x: '0%',
    opacity: 0.6,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const fogLayer2 = {
  initial: { 
    x: '-100%',
    opacity: 0.5,
  },
  enter: { 
    x: '100%',
    opacity: 0,
    transition: { 
      duration: 1.6, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1,
    },
  },
  exit: { 
    x: '0%',
    opacity: 0.4,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.05,
    },
  },
}

const fogLayer3 = {
  initial: { 
    x: '-100%',
    opacity: 0.3,
  },
  enter: { 
    x: '100%',
    opacity: 0,
    transition: { 
      duration: 1.8, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2,
    },
  },
  exit: { 
    x: '0%',
    opacity: 0.3,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1,
    },
  },
}

// Shimmer/light ray effect
const shimmerVariant = {
  initial: {
    x: '-200%',
    opacity: 0,
  },
  enter: {
    x: '200%',
    opacity: [0, 0.8, 0],
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
      delay: 0.3,
    },
  },
  exit: {
    x: '-200%',
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative">
      {/* Multi-layer fog transition */}
      <motion.div
        key={`fog1-${pathname}`}
        variants={fogLayer1}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(157, 180, 160, 0.6) 20%, rgba(157, 180, 160, 0.8) 50%, rgba(157, 180, 160, 0.6) 80%, transparent 100%)',
          filter: 'blur(40px)',
        }}
      />
      
      <motion.div
        key={`fog2-${pathname}`}
        variants={fogLayer2}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(194, 212, 197, 0.5) 30%, rgba(194, 212, 197, 0.7) 50%, rgba(194, 212, 197, 0.5) 70%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />
      
      <motion.div
        key={`fog3-${pathname}`}
        variants={fogLayer3}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(250, 251, 249, 0.4) 40%, rgba(250, 251, 249, 0.6) 50%, rgba(250, 251, 249, 0.4) 60%, transparent 100%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Light ray shimmer */}
      <motion.div
        key={`shimmer-${pathname}`}
        variants={shimmerVariant}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.3) 55%, transparent 100%)',
          filter: 'blur(20px)',
        }}
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
        background: 'radial-gradient(circle, rgba(157, 180, 160, 0.06) 0%, transparent 70%)',
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
