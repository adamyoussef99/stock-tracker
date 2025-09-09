"use client";

import { useState } from "react";
import Link from "next/link";

const STOCKS = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
  ];

export default function StocksPage() {
  const [search, setSearch] = useState("");

  // Filter stocks based on search input
  const filteredStocks = STOCKS.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Stocks Dashboard</h1>
      <p className="text-gray-700 mb-4">Search or click a stock to see details:</p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by symbol or name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Stock List */}
      {filteredStocks.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredStocks.map((stock) => (
            <li
              key={stock.symbol}
              className="p-4 border rounded-lg hover:shadow-md transition"
            >
              <Link
                href={`/stocks/${stock.symbol}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {stock.symbol} — {stock.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No stocks match your search.</p>
      )}
    </div>
  );
}
