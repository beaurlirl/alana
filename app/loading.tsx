export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-charcoal border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm text-gray-600 animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

