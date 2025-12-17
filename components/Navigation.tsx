'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// Debounce utility
function useDebounce<T extends (...args: unknown[]) => void>(callback: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }, [callback, delay])
}

// Prestige transition config
const prestigeTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1]
}

// Memoized nav link component
const NavLink = memo(function NavLink({ 
  href, 
  label, 
  isActive, 
  index 
}: { 
  href: string
  label: string
  isActive: boolean
  index: number 
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...prestigeTransition, delay: 0.1 + index * 0.1 }}
    >
      <Link
        href={href}
        className="group relative py-2 block"
      >
        <span 
          className="relative block transition-prestige"
          style={{
            color: isActive ? 'var(--color-accent, #9DB4A0)' : 'var(--color-charcoal, #2C2C2C)',
            transform: 'translateZ(0)',
          }}
        >
          <span className="group-hover:opacity-80 transition-opacity duration-400">
            {label}
          </span>
        </span>
        <span 
          className="absolute -bottom-0.5 left-0 h-[1.5px] bg-accent origin-left transition-transform duration-400 ease-prestige"
          style={{
            transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />
        <span 
          className="absolute -bottom-0.5 left-0 h-[1.5px] bg-accent origin-left transition-transform duration-400 ease-prestige opacity-0 group-hover:opacity-100"
          style={{
            transform: 'scaleX(1)',
          }}
        />
      </Link>
    </motion.li>
  )
})

// Memoized mobile nav link
const MobileNavLink = memo(function MobileNavLink({
  href,
  label,
  isActive,
  index
}: {
  href: string
  label: string
  isActive: boolean
  index: number
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        ...prestigeTransition,
        delay: 0.1 + index * 0.1,
      }}
      className="overflow-hidden"
    >
      <Link
        href={href}
        className="font-migra text-5xl sm:text-6xl font-medium inline-block transition-prestige hover:scale-102"
        style={{
          color: isActive ? 'var(--color-accent, #9DB4A0)' : 'var(--color-charcoal, #2C2C2C)',
          transform: 'translateZ(0)',
        }}
      >
        {label}
      </Link>
    </motion.li>
  )
})

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  // Debounced scroll handler
  const handleScrollDebounced = useDebounce(() => {
    setIsScrolled(window.scrollY > 50)
  }, 10)

  useEffect(() => {
    // Initial check
    setIsScrolled(window.scrollY > 50)
    
    window.addEventListener('scroll', handleScrollDebounced, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollDebounced)
  }, [handleScrollDebounced])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prestigeTransition}
        className="fixed top-0 left-0 right-0 z-50 gpu"
        style={{
          backgroundColor: isScrolled ? 'rgba(250, 251, 249, 0.95)' : 'rgba(250, 251, 249, 0.8)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.08)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(44, 44, 44, 0.05)' : '1px solid transparent',
          transition: 'background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1), border-color 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div 
            className="flex items-center justify-between transition-all duration-400 ease-prestige"
            style={{ padding: isScrolled ? '1rem 0' : '1.5rem 0' }}
          >
            <Link href="/" className="group relative z-50">
              <span 
                className="font-migra text-xl md:text-2xl font-medium block transition-transform duration-400 ease-prestige hover:scale-102 gpu"
              >
                <span className="relative">
                  ALANA CAVANZO
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] bg-accent transition-transform duration-400 ease-prestige origin-left scale-x-0 group-hover:scale-x-100"
                  />
                </span>
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wider">
              {links.map((link, index) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                  index={index}
                />
              ))}
            </ul>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full transition-colors duration-400 ease-prestige hover:bg-charcoal/5"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className="h-0.5 bg-charcoal origin-center transition-transform duration-400 ease-prestige gpu"
                style={{ 
                  width: 24,
                  transform: isMobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'rotate(0) translateY(0)'
                }}
              />
              <span
                className="w-6 h-0.5 bg-charcoal transition-all duration-400 ease-prestige gpu"
                style={{ 
                  opacity: isMobileMenuOpen ? 0 : 1,
                  transform: isMobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)'
                }}
              />
              <span
                className="h-0.5 bg-charcoal origin-center transition-transform duration-400 ease-prestige gpu"
                style={{ 
                  width: 24,
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'rotate(0) translateY(0)'
                }}
              />
            </button>
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
            transition={prestigeTransition}
            className="fixed inset-0 z-40 md:hidden gpu"
          >
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prestigeTransition}
              className="absolute inset-0 bg-cream"
            />
            
            {/* Decorative elements - GPU optimized */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ ...prestigeTransition, duration: 0.6 }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent blur-3xl gpu"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ ...prestigeTransition, duration: 0.6, delay: 0.1 }}
              className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent blur-3xl gpu"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ...prestigeTransition, delay: 0.1 }}
              className="relative flex flex-col items-center justify-center min-h-screen px-6"
            >
              <ul className="space-y-6 text-center">
                {links.map((link, index) => (
                  <MobileNavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={pathname === link.href}
                    index={index}
                  />
                ))}
              </ul>

              {/* Bottom decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ ...prestigeTransition, delay: 0.4 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-24 h-px bg-charcoal/20 origin-center gpu"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(Navigation)
