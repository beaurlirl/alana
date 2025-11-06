'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32">
      <motion.div 
        className="max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-migra text-4xl md:text-5xl lg:text-6xl font-medium mb-8">
          About
        </h1>
        
        <div className="space-y-6 text-base md:text-lg leading-relaxed opacity-80">
          <p>
            Professional model based in [Your City], specializing in editorial, commercial, and runway work.
          </p>
          
          <p>
            With [X] years of experience in the fashion industry, I've had the privilege 
            of working with renowned photographers, designers, and brands across the globe.
          </p>
        </div>
      </motion.div>
    </main>
  )
}

