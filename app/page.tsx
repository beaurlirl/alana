import Hero from '@/components/Hero'
import { getPortfolioData } from '@/lib/data'

// Disable all caching for this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const data = await getPortfolioData()
  
  return (
    <main className="min-h-screen">
      <Hero images={data.images} />
    </main>
  )
}

