"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [watched, setWatched] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('stock-watchlist');
    if (savedWatchlist) {
      try {
        const parsed = JSON.parse(savedWatchlist);
        setWatched(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error loading watchlist:', error);
        setWatched([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('stock-watchlist', JSON.stringify(watched));
    }
  }, [watched, isLoaded]);

  const handleAdd = async () => {
    const upperTicker = ticker.toUpperCase().trim();
    if (!upperTicker || watched.includes(upperTicker)) return;

    try {
      // Check ticker via Finnhub API
      const res = await fetch(`/api/stocks?ticker=${upperTicker}`);
      const data = await res.json();

      if (data.valid) {
        setWatched([...watched, upperTicker]);
        setTicker("");
        setError(""); // clear error
      } else {
        setError(`Ticker "${upperTicker}" is invalid.`);
      }
    } catch (err) {
      console.error(err);
      setError("Not a valid ticker. Try again.");
    }
  };

  const handleRemove = (stockToRemove: string) => {
    setWatched(watched.filter(stock => stock !== stockToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  // Show loading state until localStorage is loaded
  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-pulse bg-gray-200 h-10 w-64 rounded mb-6"></div>
        <div className="animate-pulse bg-gray-200 h-32 w-full max-w-md rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter stock ticker (AAPL, TSLA)"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          disabled={!ticker.trim()}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>        
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Watched Stocks List */}
      <div className="w-full max-w-md bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">
          Watched Stocks {watched.length > 0 && `(${watched.length})`}
        </h2>
        <ul className="space-y-2">
          {watched.length === 0 ? (
            <li className="text-gray-500 text-center py-4">
              No stocks added yet. Add some tickers to get started!
            </li>
          ) : (
            watched.map((stock) => (
              <li key={stock} className="flex items-center justify-between p-2 border-b hover:bg-gray-50">
                <Link 
                  href={`/stocks/${stock}`} 
                  className="text-blue-600 hover:underline font-medium flex-grow"
                >
                  {stock}
                </Link>
                <button
                  onClick={() => handleRemove(stock)}
                  className="text-red-500 hover:text-red-700 text-sm ml-2 px-2 py-1 rounded hover:bg-red-50"
                  title={`Remove ${stock} from watchlist`}
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Clear all button */}
        {watched.length > 0 && (
          <button
            onClick={() => setWatched([])}
            className="mt-4 text-sm text-gray-600 hover:text-red-600 underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}