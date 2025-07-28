export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">You're Offline</h1>
        <p className="text-gray-600 mb-4">The mmWave Link Budget Calculator works offline once loaded.</p>
        <p className="text-sm text-gray-500">Check your internet connection and try again.</p>
      </div>
    </div>
  )
}
