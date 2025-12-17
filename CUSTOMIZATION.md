# 🎨 Customization Guide

Learn how to make this portfolio truly yours.

## Quick Customizations (No Coding)

### 1. Change Model Name and Tagline

Edit `data/portfolio.json`:

```json
{
  "modelName": "Your Name",
  "heroTagline": "Your Professional Title",
  "images": []
}
```

This updates the hero section immediately.

---

### 2. Update About Page

Edit `app/about/page.tsx` and replace the placeholder content:

**Lines to change:**
- Line ~10: Model name in `<h1>`
- Line ~15-22: Your bio paragraphs
- Lines ~25-32: Your measurements

**Example:**

```typescript
<p>
  Hi, I'm Sarah — a professional model based in New York City. 
  I specialize in editorial, commercial, and runway work.
</p>

<p>
  With 5 years of experience in the fashion industry, I've had the privilege 
  of working with renowned photographers, designers, and brands across the globe.
</p>

<div className="pt-8 space-y-2">
  <h2 className="font-migra text-2xl md:text-3xl font-bold mb-4">Details</h2>
  <p><span className="opacity-60">Height:</span> 5'9"</p>
  <p><span className="opacity-60">Bust:</span> 32"</p>
  <p><span className="opacity-60">Waist:</span> 24"</p>
  <p><span className="opacity-60">Hips:</span> 34"</p>
  <p><span className="opacity-60">Shoe:</span> 8</p>
  <p><span className="opacity-60">Hair:</span> Blonde</p>
  <p><span className="opacity-60">Eyes:</span> Blue</p>
</div>
```

---

### 3. Update Contact Information

Edit `app/contact/page.tsx`:

**Lines to change:**
- Email address (line ~23)
- Instagram handle (line ~31)
- Agency name and contact (lines ~38-43)
- Location (line ~49)

**Example:**

```typescript
<div>
  <p className="opacity-60 mb-1">Email</p>
  <a 
    href="mailto:sarah@example.com" 
    className="text-xl hover:opacity-60 transition-opacity"
  >
    sarah@example.com
  </a>
</div>

<div>
  <p className="opacity-60 mb-1">Instagram</p>
  <a 
    href="https://instagram.com/sarahmodel" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-xl hover:opacity-60 transition-opacity"
  >
    @sarahmodel
  </a>
</div>

<div>
  <p className="opacity-60 mb-1">Agency</p>
  <p className="text-xl">
    Elite Model Management<br />
    <a href="mailto:elite@example.com" className="hover:opacity-60 transition-opacity">
      elite@example.com
    </a>
  </p>
</div>
```

---

## Styling Customizations

### 4. Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'cream': '#F5F5F0',      // Background accent
  'charcoal': '#2A2A2A',   // Primary dark color
}
```

**Popular color schemes:**

```typescript
// Elegant Black & White
colors: {
  'cream': '#FAFAFA',
  'charcoal': '#000000',
}

// Warm Minimal
colors: {
  'cream': '#F4EDE3',
  'charcoal': '#3D3D3D',
}

// Modern Gray
colors: {
  'cream': '#F8F8F8',
  'charcoal': '#1A1A1A',
}

// Soft Beige
colors: {
  'cream': '#F0EBE3',
  'charcoal': '#2D2D2D',
}
```

---

### 5. Change Fonts

#### Option A: Use Different Google Fonts

Edit `app/layout.tsx`:

```typescript
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
})
```

Then update the body className and Tailwind config.

#### Option B: Use Different Fontshare Fonts

Edit the `<link>` tag in `app/layout.tsx`:

```html
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,800&display=swap"
  rel="stylesheet"
/>
```

Browse fonts at [fontshare.com](https://www.fontshare.com)

#### Option C: Keep Monospace, Change Style

Popular monospace alternatives:
- Roboto Mono
- Space Mono
- IBM Plex Mono
- Courier Prime
- Inconsolata

Update in `app/layout.tsx` and `tailwind.config.ts`.

---

### 6. Adjust Layout and Spacing

#### Change Grid Columns

Edit `components/PortfolioGrid.tsx` line ~49:

```typescript
// Current: 1/2/3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 2/3/4 columns (more images visible)
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

// 1/2 columns (larger images)
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// Single column (maximum focus)
<div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
```

#### Adjust Image Aspect Ratio

Change from 3:4 (portrait) to other ratios:

```typescript
// Square images
<div className="aspect-square">

// Landscape
<div className="aspect-[4/3]">

// Cinematic
<div className="aspect-[16/9]">

// Ultra portrait
<div className="aspect-[2/3]">
```

---

### 7. Customize Navigation

Edit `components/Navigation.tsx` to add/remove links:

```typescript
const links = [
  { href: '/', label: 'Home' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  // Add more links:
  { href: '/press', label: 'Press' },
  { href: '/blog', label: 'Blog' },
]
```

---

## Advanced Customizations

### 8. Add a New Page

1. Create new file: `app/press/page.tsx`

```typescript
export default function Press() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-migra text-5xl md:text-7xl lg:text-8xl font-bold mb-12">
          Press
        </h1>
        
        <div className="space-y-8">
          {/* Your press content */}
        </div>
      </div>
    </main>
  )
}
```

2. Add to navigation in `components/Navigation.tsx`

---

### 9. Customize Animations

Edit animation settings in components using Framer Motion:

```typescript
// Slower fade-in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1.2 }}  // Changed from 0.8

// Slide from bottom
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}

// Bounce effect
transition={{ type: "spring", bounce: 0.4 }}

// Disable animations
// Remove motion components, use regular divs
```

---

### 10. Change Hero Layout

Edit `components/Hero.tsx`:

**Centered Layout:**

```typescript
<div className="text-center mx-auto max-w-4xl">
  <motion.div className="space-y-6">
    <h1 className="font-migra text-8xl font-extrabold">
      ALANA
    </h1>
    <p className="text-3xl">Model & Creative</p>
  </motion.div>
</div>
```

**Full-Screen Background Image:**

```typescript
<section className="relative min-h-screen flex items-center justify-center">
  <div className="absolute inset-0 z-0">
    <Image src="/hero.jpg" fill className="object-cover" alt="Hero" />
    <div className="absolute inset-0 bg-black/40" />
  </div>
  
  <div className="relative z-10 text-white text-center">
    {/* Content */}
  </div>
</section>
```

---

### 11. Add Social Media Icons

Install react-icons:

```bash
npm install react-icons
```

Edit `app/contact/page.tsx`:

```typescript
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa'

<div className="flex gap-6">
  <a href="https://instagram.com/username" target="_blank">
    <FaInstagram className="w-8 h-8 hover:opacity-60" />
  </a>
  <a href="https://twitter.com/username" target="_blank">
    <FaTwitter className="w-8 h-8 hover:opacity-60" />
  </a>
</div>
```

---

### 12. Add Categories/Tags

Update `lib/data.ts` interface:

```typescript
export interface PortfolioImage {
  id: string
  filename: string
  title?: string
  description?: string
  order: number
  category?: 'editorial' | 'commercial' | 'runway'  // Add this
}
```

Then add filtering in `components/PortfolioGrid.tsx`:

```typescript
const [filter, setFilter] = useState<string | null>(null)

const filteredImages = filter 
  ? sortedImages.filter(img => img.category === filter)
  : sortedImages

// Add filter buttons
<div className="flex gap-4 mb-8">
  <button onClick={() => setFilter(null)}>All</button>
  <button onClick={() => setFilter('editorial')}>Editorial</button>
  <button onClick={() => setFilter('commercial')}>Commercial</button>
  <button onClick={() => setFilter('runway')}>Runway</button>
</div>
```

---

### 13. Add Google Analytics

1. Get your GA tracking ID
2. Create `app/components/Analytics.tsx`:

```typescript
import Script from 'next/script'

export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </>
  )
}
```

3. Import in `app/layout.tsx`

---

### 14. Add Contact Form

Install a form service like Formspree or use Vercel's form handling:

```typescript
'use client'

export default function ContactForm() {
  const [status, setStatus] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/YOUR_ID', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('Message sent!')
        form.reset()
      } else {
        setStatus('Failed to send')
      }
    } catch (error) {
      setStatus('Error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  )
}
```

---

## CSS Customizations

### 15. Custom Scrollbar Colors

Edit `app/globals.css`:

```css
::-webkit-scrollbar-track {
  background: #your-color;
}

::-webkit-scrollbar-thumb {
  background: #your-color;
}
```

### 16. Custom Selection Color

Add to `app/globals.css`:

```css
::selection {
  background-color: #your-color;
  color: white;
}
```

### 17. Custom Cursor

Add to `app/globals.css`:

```css
body {
  cursor: url('/cursor.png'), auto;
}

a, button {
  cursor: url('/pointer.png'), pointer;
}
```

---

## Tips for Customization

1. **Test Locally First**: Always run `npm run dev` to see changes
2. **Keep Backups**: Commit to git before major changes
3. **One Change at a Time**: Easier to debug issues
4. **Check Mobile**: Test responsiveness after style changes
5. **Use Browser DevTools**: Inspect elements to experiment with CSS
6. **Read Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
7. **Check Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

**Make it yours! 🎨**

