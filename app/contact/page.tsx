'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface ContactItemProps {
  label: string
  children: React.ReactNode
  delay: number
  isInView: boolean
}

function ContactItem({ label, children, delay, isInView }: ContactItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <motion.p 
        className="text-xs uppercase tracking-widest text-charcoal/40 mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.1 }}
      >
        {label}
      </motion.p>
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/alana', icon: 'IG' },
    { name: 'LinkedIn', href: '#', icon: 'LI' },
    { name: 'Twitter', href: '#', icon: 'TW' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-rose/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div 
        ref={containerRef}
        className="relative z-10 flex items-center min-h-screen px-6 md:px-12 lg:px-24 py-32"
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
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
                  <span className="text-sm uppercase tracking-widest text-accent">Get In Touch</span>
                </motion.div>
                
                <div className="overflow-hidden">
                  <motion.h1 
                    className="font-migra text-5xl md:text-6xl lg:text-7xl font-medium"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : { y: '100%' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Contact
                  </motion.h1>
                </div>
              </div>
              
              <motion.p 
                className="text-base md:text-lg leading-relaxed text-charcoal/70 max-w-md mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                For bookings, collaborations, or inquiries, please reach out via email 
                or through my agency. I&apos;d love to hear from you.
              </motion.p>

              {/* Contact details */}
              <div className="space-y-8">
                <ContactItem label="Email" delay={0.5} isInView={isInView}>
                  <motion.a 
                    href="mailto:hello@alana.com" 
                    className="relative text-xl md:text-2xl font-migra font-medium inline-block group"
                    onMouseEnter={() => setHoveredLink('email')}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <span className="relative z-10 group-hover:text-accent transition-colors duration-300">
                      hello@alana.com
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredLink === 'email' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </ContactItem>

                <ContactItem label="Agency" delay={0.6} isInView={isInView}>
                  <div className="space-y-1">
                    <p className="text-lg font-medium">[Your Agency Name]</p>
                    <motion.a 
                      href="mailto:agency@example.com" 
                      className="text-charcoal/70 hover:text-accent transition-colors duration-300 inline-block"
                      whileHover={{ x: 3 }}
                    >
                      agency@example.com
                    </motion.a>
                  </div>
                </ContactItem>

                <ContactItem label="Based In" delay={0.7} isInView={isInView}>
                  <p className="text-lg">[Your City, Country]</p>
                </ContactItem>
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              {/* Social links */}
              <div className="mb-16">
                <motion.h2 
                  className="text-xs uppercase tracking-widest text-charcoal/40 mb-8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Connect
                </motion.h2>

                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-14 h-14 rounded-full border border-charcoal/20 flex items-center justify-center transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-cream">
                        <span className="text-sm font-medium tracking-wider">{social.icon}</span>
                      </div>
                      <motion.span
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-charcoal/50 whitespace-nowrap"
                        initial={{ opacity: 0, y: -5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {social.name}
                      </motion.span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <motion.div
                className="relative p-8 border border-charcoal/10 bg-cream/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent" />

                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm uppercase tracking-wider text-charcoal/60">Currently Available</span>
                </div>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  Open to new projects and collaborations. Reach out for availability 
                  and rates.
                </p>
              </motion.div>

              {/* Decorative element */}
              <motion.div
                className="mt-16 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.div
                  className="h-px bg-charcoal/10 flex-grow"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                />
                <motion.span
                  className="text-xs text-charcoal/30 tracking-widest"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✦
                </motion.span>
                <motion.div
                  className="h-px bg-charcoal/10 flex-grow"
                  initial={{ scaleX: 0, originX: 1 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
