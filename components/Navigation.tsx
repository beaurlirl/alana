'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  
  // For magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])
  
  // Hide navigation on admin page
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/collections', label: 'Collections' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <motion.nav 
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-cream/95 backdrop-blur-md shadow-elegant border-b border-charcoal/5' 
            : 'bg-cream/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'py-4' : 'py-6'
          }`}>
            <Link 
              href="/" 
              className="group relative z-50"
            >
              <motion.span 
                className="font-migra text-xl md:text-2xl font-medium block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span className="relative">
                  ALANA CABANZO
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-accent"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </motion.span>
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wider">
              {links.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="group relative py-2"
                  >
                    <span className={`relative transition-all duration-300 ${
                      pathname === link.href 
                        ? 'text-accent' 
                        : 'text-charcoal group-hover:text-accent'
                    }`}>
                      {link.label}
                    </span>
                    <span className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-accent transition-all duration-500 ease-out-expo ${
                      pathname === link.href 
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Hamburger Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-charcoal/5 transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-0.5 bg-charcoal origin-center"
                style={{ width: 24 }}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-6 h-0.5 bg-charcoal"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-0.5 bg-charcoal origin-center"
                style={{ width: 24 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-cream"
            />
            
            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent blur-3xl"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative flex flex-col items-center justify-center min-h-screen px-6"
            >
              <ul className="space-y-6 text-center">
                {links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 40, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.15 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      className={`font-migra text-5xl sm:text-6xl font-medium transition-all duration-300 inline-block ${
                        pathname === link.href 
                          ? 'text-accent' 
                          : 'text-charcoal hover:text-accent hover:tracking-wider'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-24 h-px bg-charcoal/20 origin-center"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
