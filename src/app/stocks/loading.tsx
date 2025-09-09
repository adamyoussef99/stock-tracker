export default function Loading() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Loading Stocks...</h1>
      <p className="text-gray-700 mb-4">Fetching all available stocks...</p>

      {/* Search Bar Skeleton */}
      <div className="w-full mb-6 px-4 py-2 border rounded-lg bg-gray-200 animate-pulse h-10"></div>

      {/* Stock List Skeleton */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(12)].map((_, i) => (
          <li
            key={i}
            className="p-4 border rounded-lg animate-pulse"
          >
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}