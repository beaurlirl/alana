'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-migra text-2xl font-medium hover:opacity-60 transition-opacity">
            ALANA CABANZO
          </Link>
          
          <ul className="flex items-center gap-8 text-sm uppercase tracking-wider">
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
        </div>
      </div>
    </nav>
  )
}

