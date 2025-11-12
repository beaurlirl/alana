export function PortfolioGridSkeleton() {
  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="h-16 w-64 bg-gray-200 rounded mb-12 animate-pulse"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HeroSkeleton() {
  return (
    <section className="h-screen flex items-center px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-screen-2xl w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-16 w-full max-w-md bg-gray-200 rounded animate-pulse mt-4"></div>
          </div>
          
          <div className="aspect-[3/4] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export function CollectionsSkeleton() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="h-12 w-64 bg-gray-200 rounded mb-8 animate-pulse"></div>
      
      <div className="flex flex-wrap gap-3 mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </main>
  )
}

export function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-cream shadow-sm sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 space-y-12">
        <section>
          <div className="h-10 w-64 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </section>

        <section>
          <div className="h-10 w-64 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-cream rounded-lg overflow-hidden shadow-md">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

