'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="font-migra text-xl md:text-2xl font-medium hover:opacity-60 transition-opacity relative z-50"
            >
              ALANA CABANZO
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:opacity-60 transition-opacity ${
                      pathname === link.href ? 'opacity-60' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-charcoal transition-all origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-charcoal transition-all"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-charcoal transition-all origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-cream"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center min-h-screen px-6"
            >
              <ul className="space-y-8 text-center">
                {links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-migra text-4xl font-medium hover:opacity-60 transition-opacity ${
                        pathname === link.href ? 'opacity-60' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

