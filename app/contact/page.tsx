'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <main className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32">
      <motion.div 
        className="max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-migra text-4xl md:text-5xl lg:text-6xl font-medium mb-8">
          Contact
        </h1>
        
        <div className="space-y-6 text-base md:text-lg">
          <p className="leading-relaxed opacity-80">
            For bookings, collaborations, or inquiries, please reach out via email or through my agency.
          </p>
          
          <div className="space-y-4 pt-4">
            <div>
              <p className="opacity-60 mb-1 text-sm">Email</p>
              <a 
                href="mailto:hello@alana.com" 
                className="text-lg hover:opacity-60 transition-opacity"
              >
                hello@alana.com
              </a>
            </div>
            
            <div>
              <p className="opacity-60 mb-1 text-sm">Instagram</p>
              <a 
                href="https://instagram.com/alana" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:opacity-60 transition-opacity"
              >
                @alana
              </a>
            </div>
            
            <div>
              <p className="opacity-60 mb-1 text-sm">Agency</p>
              <div className="text-lg">
                [Your Agency Name]<br />
                <a href="mailto:agency@example.com" className="hover:opacity-60 transition-opacity">
                  agency@example.com
                </a>
              </div>
            </div>

            <div className="pt-6">
              <p className="opacity-60 mb-1 text-sm">Based in</p>
              <p className="text-lg">[Your City, Country]</p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

