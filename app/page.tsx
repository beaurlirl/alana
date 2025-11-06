import Hero from '@/components/Hero'
import { getPortfolioData } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const data = await getPortfolioData()
  
  return (
    <main className="min-h-screen">
      <Hero images={data.images} />
    </main>
  )
}

