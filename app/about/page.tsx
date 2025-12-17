'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const experiences = [
    { year: '20XX', title: 'Started modeling career', desc: 'First agency signing' },
    { year: '20XX', title: 'International debut', desc: 'First international campaign' },
    { year: '20XX', title: 'Fashion Week', desc: 'Runway shows in major cities' },
    { year: 'Present', title: 'Continuing to grow', desc: 'Working with global brands' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div 
        ref={containerRef}
        className="relative z-10 flex items-center min-h-screen px-6 md:px-12 lg:px-24 py-32"
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left column - Main content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Title with decorative element */}
              <div className="mb-12">
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <motion.div 
                    className="h-px bg-accent flex-grow max-w-12"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-sm uppercase tracking-widest text-accent">About Me</span>
                </motion.div>
                
                <div className="overflow-hidden">
                  <motion.h1 
                    className="font-migra text-5xl md:text-6xl lg:text-7xl font-medium"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : { y: '100%' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-charcoal/80"
                >
                  Professional model based in{' '}
                  <span className="text-accent font-medium">[Your City]</span>, 
                  specializing in editorial, commercial, and runway work.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-charcoal/70"
                >
                  With <span className="text-charcoal font-medium">[X] years</span> of experience 
                  in the fashion industry, I&apos;ve had the privilege of working with renowned 
                  photographers, designers, and brands across the globe.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-charcoal/70"
                >
                  My work spans from high fashion editorials to commercial campaigns, 
                  always bringing a unique perspective and professional dedication to every project.
                </motion.p>
              </div>

              {/* Decorative divider */}
              <motion.div
                className="mt-12 h-px bg-gradient-to-r from-charcoal/20 via-accent/40 to-transparent max-w-sm"
                initial={{ scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              />

              {/* Stats */}
              <motion.div
                className="mt-12 grid grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                {[
                  { number: 'X+', label: 'Years' },
                  { number: 'XX+', label: 'Campaigns' },
                  { number: 'XX+', label: 'Brands' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    <p className="font-migra text-3xl md:text-4xl font-medium text-accent mb-1">
                      {stat.number}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-charcoal/50">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column - Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="sticky top-32">
                <motion.h2 
                  className="text-sm uppercase tracking-widest text-charcoal/50 mb-8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Journey
                </motion.h2>

                {/* Timeline */}
                <div className="relative">
                  {/* Vertical line */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px bg-charcoal/10"
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  
                  {/* Timeline items */}
                  <div className="space-y-8 pl-8">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        {/* Dot */}
                        <motion.div
                          className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-accent"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        />
                        
                        {/* Connecting line */}
                        <motion.div
                          className="absolute -left-6 top-2 w-4 h-px bg-charcoal/10"
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                          transition={{ duration: 0.3, delay: 0.75 + index * 0.1 }}
                        />

                        <p className="text-xs text-accent font-medium tracking-wider mb-1">
                          {exp.year}
                        </p>
                        <h3 className="font-medium text-charcoal mb-1 group-hover:text-accent transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-charcoal/60">{exp.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <motion.blockquote
                  className="mt-16 pl-6 border-l-2 border-accent/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
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
