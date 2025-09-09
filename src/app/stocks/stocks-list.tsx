"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Stock = {
  symbol: string;
  name: string;
};

export default function StocksList({ 
  stocks, 
  initialMessage 
}: { 
  stocks: Stock[] 
  initialMessage ?: string;
}) {
  const [search, setSearch] = useState("");

  const filteredStocks = useMemo(() => {
    if (!search.trim()) return stocks;
    
    const searchLower = search.toLowerCase();
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchLower) ||
        stock.name.toLowerCase().includes(searchLower)
    );
  }, [stocks, search]);

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