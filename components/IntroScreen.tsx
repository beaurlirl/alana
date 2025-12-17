'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Prestige transition config
const prestigeTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1]
}

interface IntroScreenProps {
  children: React.ReactNode
}

// Memoized corner accent component
const CornerAccent = memo(function CornerAccent({ 
  position, 
  delay 
}: { 
  position: string
  delay: number 
}) {
  return (
    <motion.div
      className={`absolute ${position} w-12 h-12 gpu`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...prestigeTransition, delay }}
      style={{
        borderTop: position.includes('top') ? '1px solid rgba(44, 44, 44, 0.1)' : 'none',
        borderBottom: position.includes('bottom') ? '1px solid rgba(44, 44, 44, 0.1)' : 'none',
        borderLeft: position.includes('left') ? '1px solid rgba(44, 44, 44, 0.1)' : 'none',
        borderRight: position.includes('right') ? '1px solid rgba(44, 44, 44, 0.1)' : 'none',
      }}
    />
  )
})

function IntroScreen({ children }: IntroScreenProps) {
  const [showIntro, setShowIntro] = useState(true)

  const handleEnter = useCallback(() => {
    sessionStorage.setItem('hasSeenIntro', 'true')
    setShowIntro(false)
  }, [])

  useEffect(() => {
    // Check if user has seen intro this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
    
    if (hasSeenIntro) {
      setShowIntro(false)
      return
    }
    // Stay on screen until user clicks enter - no auto-dismiss
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ...prestigeTransition, duration: 0.6 }}
            className="fixed inset-0 z-[200] bg-cream flex items-center justify-center cursor-pointer gpu"
            onClick={handleEnter}
          >
            {/* Background gradient */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 60% 40% at 50% 50%, rgba(157, 180, 160, 0.08), transparent),
                  linear-gradient(180deg, #FAFBF9 0%, #F5F7F4 100%)
                `,
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={prestigeTransition}
              className="relative z-10 text-center px-6 gpu"
            >
              {/* Wordmark image - gentle fade in */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3 
                }}
                className="gpu"
              >
                <Image
                  src="/alanawordmark.png"
                  alt="Alana Cavanzo"
                  width={320}
                  height={80}
                  className="mx-auto"
                  priority
                />
              </motion.div>

              {/* Enter hint */}
              <motion.p
                className="mt-12 font-migra text-sm text-charcoal/40 tracking-[0.2em] cursor-pointer transition-colors duration-400 ease-prestige hover:text-charcoal/60"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...prestigeTransition, delay: 0.4 }}
              >
                enter site
              </motion.p>

              {/* Animated line */}
              <motion.div
                className="mt-3 mx-auto w-12 h-px bg-charcoal/20 gpu"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ ...prestigeTransition, delay: 0.5, duration: 0.6 }}
                style={{ transformOrigin: 'center' }}
              />
            </motion.div>

            {/* Corner accents - staggered */}
            <CornerAccent position="top-8 left-8" delay={0.2} />
            <CornerAccent position="top-8 right-8" delay={0.25} />
            <CornerAccent position="bottom-8 left-8" delay={0.3} />
            <CornerAccent position="bottom-8 right-8" delay={0.35} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - fade in when intro exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={prestigeTransition}
        className="gpu"
      >
        {children}
      </motion.div>
    </>
  )
}

export default memo(IntroScreen)
