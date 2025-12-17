'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback, memo } from 'react'

// Prestige transition config
const prestigeTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1]
}

interface ContactItemProps {
  label: string
  children: React.ReactNode
  delay: number
  isInView: boolean
}

// Memoized contact item
const ContactItem = memo(function ContactItem({ label, children, delay, isInView }: ContactItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ ...prestigeTransition, delay }}
      className="group"
    >
      <motion.p 
        className="text-xs uppercase tracking-widest text-charcoal/40 mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ ...prestigeTransition, delay: delay + 0.05 }}
      >
        {label}
      </motion.p>
      {children}
    </motion.div>
  )
})

// Memoized social link
const SocialLink = memo(function SocialLink({
  href,
  icon,
  name,
  index,
  isInView
}: {
  href: string
  icon: string
  name: string
  index: number
  isInView: boolean
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ ...prestigeTransition, delay: 0.4 + index * 0.1 }}
    >
      <div className="w-14 h-14 rounded-full border border-charcoal/20 flex items-center justify-center transition-all duration-400 ease-prestige group-hover:border-accent group-hover:bg-accent group-hover:text-cream group-hover:scale-102 gpu">
        <span className="text-sm font-medium tracking-wider">{icon}</span>
      </div>
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-charcoal/50 whitespace-nowrap opacity-0 transition-opacity duration-400 ease-prestige group-hover:opacity-100">
        {name}
      </span>
    </motion.a>
  )
})

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const handleEmailEnter = useCallback(() => setHoveredLink('email'), [])
  const handleEmailLeave = useCallback(() => setHoveredLink(null), [])

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/alana', icon: 'IG' },
    { name: 'LinkedIn', href: '#', icon: 'LI' },
    { name: 'Twitter', href: '#', icon: 'TW' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background elements - GPU optimized */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl gpu"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-rose/10 blur-3xl gpu"
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
        className="relative z-10 flex items-center min-h-screen px-4 md:px-12 lg:px-24 py-20 md:py-24"
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={prestigeTransition}
              className="gpu"
            >
              {/* Header */}
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
                  <span className="text-sm uppercase tracking-widest text-accent">Get In Touch</span>
                </motion.div>
                
                <div className="overflow-hidden">
                  <motion.h1 
                    className="font-migra text-5xl md:text-6xl lg:text-7xl font-medium"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : { y: '100%' }}
                    transition={{ ...prestigeTransition, delay: 0.15 }}
                  >
                    Contact
                  </motion.h1>
                </div>
              </div>
              
              <motion.p 
                className="text-base md:text-lg leading-relaxed text-charcoal/70 max-w-md mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ ...prestigeTransition, delay: 0.25 }}
              >
                For bookings, collaborations, or inquiries, please reach out via email 
                or through my agency. I&apos;d love to hear from you.
              </motion.p>

              {/* Contact details */}
              <div className="space-y-8">
                <ContactItem label="Email" delay={0.3} isInView={isInView}>
                  <a 
                    href="mailto:hello@alana.com" 
                    className="relative text-xl md:text-2xl font-migra font-medium inline-block group transition-transform duration-400 ease-prestige hover:translate-x-1"
                    onMouseEnter={handleEmailEnter}
                    onMouseLeave={handleEmailLeave}
                  >
                    <span className="relative z-10 transition-colors duration-400 ease-prestige group-hover:text-accent">
                      hello@alana.com
                    </span>
                    <span
                      className="absolute bottom-0 left-0 h-0.5 bg-accent transition-transform duration-400 ease-prestige gpu"
                      style={{
                        transform: hoveredLink === 'email' ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        width: '100%'
                      }}
                    />
                  </a>
                </ContactItem>

                <ContactItem label="Agency" delay={0.4} isInView={isInView}>
                  <div className="space-y-1">
                    <p className="text-lg font-medium">[Your Agency Name]</p>
                    <a 
                      href="mailto:agency@example.com" 
                      className="text-charcoal/70 transition-all duration-400 ease-prestige hover:text-accent hover:translate-x-1 inline-block"
                    >
                      agency@example.com
                    </a>
                  </div>
                </ContactItem>

                <ContactItem label="Based In" delay={0.5} isInView={isInView}>
                  <p className="text-lg">[Your City, Country]</p>
                </ContactItem>
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ ...prestigeTransition, delay: 0.2 }}
              className="flex flex-col justify-center gpu"
            >
              {/* Social links */}
              <div className="mb-16">
                <motion.h2 
                  className="text-xs uppercase tracking-widest text-charcoal/40 mb-8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ ...prestigeTransition, delay: 0.3 }}
                >
                  Connect
                </motion.h2>

                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <SocialLink
                      key={social.name}
                      href={social.href}
                      icon={social.icon}
                      name={social.name}
                      index={index}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <motion.div
                className="relative p-8 border border-charcoal/10 bg-cream/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ ...prestigeTransition, delay: 0.5 }}
              >
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent" />

                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500 gpu"
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
                transition={{ ...prestigeTransition, delay: 0.6 }}
              >
                <motion.div
                  className="h-px bg-charcoal/10 flex-grow gpu"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ ...prestigeTransition, delay: 0.65, duration: 0.6 }}
                  style={{ transformOrigin: 'left' }}
                />
                <motion.span
                  className="text-xs text-charcoal/30 tracking-widest"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✦
                </motion.span>
                <motion.div
                  className="h-px bg-charcoal/10 flex-grow gpu"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ ...prestigeTransition, delay: 0.65, duration: 0.6 }}
                  style={{ transformOrigin: 'right' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
