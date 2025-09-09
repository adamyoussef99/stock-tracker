"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [watched, setWatched] = useState<string[]>([]);

  const handleAdd = () => {
    if (ticker && !watched.includes(ticker.toUpperCase())) {
      setWatched([...watched, ticker.toUpperCase()]);
      setTicker("");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker (AAPL, TSLA)"
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleAdd}
          className="btn btn-primary"
        >
          Add
        </button>
      </div>

      {/* Watched Stocks List */}
      <div className="w-full max-w-md bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Watched Stocks</h2>
        <ul className="space-y-2">
          {watched.length === 0 ? (
            <li className="text-gray-500">No stocks added yet.</li>
          ) : (
            watched.map((s) => (
              <li key={s} className="p-2 border-b">
                <Link href={`/stocks/${s}`} className="text-blue-600 hover:underline">
                  {s}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
