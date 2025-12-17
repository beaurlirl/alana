'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, memo } from 'react'

// Prestige transition config
const prestigeTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1]
}

// Memoized stat component
const StatItem = memo(function StatItem({
  number,
  label,
  index,
  isInView
}: {
  number: string
  label: string
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ ...prestigeTransition, delay: 0.7 + index * 0.1 }}
    >
      <p className="font-migra text-3xl md:text-4xl font-medium text-accent mb-1">
        {number}
      </p>
      <p className="text-xs uppercase tracking-wider text-charcoal/50">
        {label}
      </p>
    </motion.div>
  )
})

// Memoized timeline item
const TimelineItem = memo(function TimelineItem({
  exp,
  index,
  isInView
}: {
  exp: { year: string; title: string; desc: string }
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ ...prestigeTransition, delay: 0.4 + index * 0.1 }}
    >
      {/* Dot */}
      <motion.div
        className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-accent gpu"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ ...prestigeTransition, delay: 0.45 + index * 0.1 }}
      />
      
      {/* Connecting line */}
      <motion.div
        className="absolute -left-6 top-2 w-4 h-px bg-charcoal/10 gpu"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ ...prestigeTransition, delay: 0.5 + index * 0.1 }}
        style={{ transformOrigin: 'left' }}
      />

      <p className="text-xs text-accent font-medium tracking-wider mb-1">
        {exp.year}
      </p>
      <h3 className="font-medium text-charcoal mb-1 transition-colors duration-400 ease-prestige group-hover:text-accent">
        {exp.title}
      </h3>
      <p className="text-sm text-charcoal/60">{exp.desc}</p>
    </motion.div>
  )
})

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const experiences = [
    { year: '20XX', title: 'Started modeling career', desc: 'First agency signing' },
    { year: '20XX', title: 'International debut', desc: 'First international campaign' },
    { year: '20XX', title: 'Fashion Week', desc: 'Runway shows in major cities' },
    { year: 'Present', title: 'Continuing to grow', desc: 'Working with global brands' },
  ]

  const stats = [
    { number: 'X+', label: 'Years' },
    { number: 'XX+', label: 'Campaigns' },
    { number: 'XX+', label: 'Brands' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements - GPU optimized */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl gpu"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      <motion.div 
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl gpu"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div 
        ref={containerRef}
        className="relative z-10 flex items-center min-h-screen px-4 md:px-12 lg:px-24 py-20 md:py-24"
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left column - Main content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={prestigeTransition}
              className="gpu"
            >
              {/* Title with decorative element */}
              <div className="mb-12">
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ ...prestigeTransition, delay: 0.1 }}
                >
                  <motion.div 
                    className="h-px bg-accent flex-grow max-w-12 gpu"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ ...prestigeTransition, delay: 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  />
                  <span className="text-sm uppercase tracking-widest text-accent">About Me</span>
                </motion.div>
                
                <div className="overflow-hidden">
                  <motion.h1 
                    className="font-migra text-5xl md:text-6xl lg:text-7xl font-medium"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : { y: '100%' }}
                    transition={{ ...prestigeTransition, delay: 0.15 }}
                  >
                    The Story
                  </motion.h1>
                </div>
              </div>
              
              {/* Content paragraphs with staggered reveal */}
              <div className="space-y-6 text-base md:text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ ...prestigeTransition, delay: 0.25 }}
                  className="text-charcoal/80"
                >
                  Professional model based in{' '}
                  <span className="text-accent font-medium">[Your City]</span>, 
                  specializing in editorial, commercial, and runway work.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ ...prestigeTransition, delay: 0.35 }}
                  className="text-charcoal/70"
                >
                  With <span className="text-charcoal font-medium">[X] years</span> of experience 
                  in the fashion industry, I&apos;ve had the privilege of working with renowned 
                  photographers, designers, and brands across the globe.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ ...prestigeTransition, delay: 0.45 }}
                  className="text-charcoal/70"
                >
                  My work spans from high fashion editorials to commercial campaigns, 
                  always bringing a unique perspective and professional dedication to every project.
                </motion.p>
              </div>

              {/* Decorative divider */}
              <motion.div
                className="mt-12 h-px bg-gradient-to-r from-charcoal/20 via-accent/40 to-transparent max-w-sm gpu"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ ...prestigeTransition, delay: 0.55, duration: 0.6 }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Stats */}
              <motion.div
                className="mt-12 grid grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ ...prestigeTransition, delay: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <StatItem
                    key={stat.label}
                    number={stat.number}
                    label={stat.label}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Right column - Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ ...prestigeTransition, delay: 0.2 }}
              className="relative gpu"
            >
              <div className="sticky top-32">
                <motion.h2 
                  className="text-sm uppercase tracking-widest text-charcoal/50 mb-8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ ...prestigeTransition, delay: 0.3 }}
                >
                  Journey
                </motion.h2>

                {/* Timeline */}
                <div className="relative">
                  {/* Vertical line */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px bg-charcoal/10 gpu"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ ...prestigeTransition, delay: 0.35, duration: 0.6 }}
                    style={{ transformOrigin: 'top' }}
                  />
                  
                  {/* Timeline items */}
                  <div className="space-y-8 pl-8">
                    {experiences.map((exp, index) => (
                      <TimelineItem
                        key={index}
                        exp={exp}
                        index={index}
                        isInView={isInView}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <motion.blockquote
                  className="mt-16 pl-6 border-l-2 border-accent/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ ...prestigeTransition, delay: 0.8 }}
                >
                  <p className="text-lg italic text-charcoal/70 font-light">
                    &ldquo;Every frame tells a story, every look captures a moment.&rdquo;
                  </p>
                </motion.blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
