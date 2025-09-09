"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

type Stock = {
  symbol: string;
  name: string;
};

interface Props {
  initialStocks: Stock[];
  loadAllStocks?: boolean;
}

const STOCKS_PER_PAGE =21;

export default function PaginatedStocksList({ initialStocks, loadAllStocks = true }: Props) {
  const [additionalStocks, setAdditionalStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(loadAllStocks);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Combine popular stocks (always first) with additional stocks
  const allStocks = useMemo(() => {
    // Remove any duplicates from additional stocks that might be in popular stocks
    const popularSymbols = new Set(initialStocks.map(stock => stock.symbol));
    const uniqueAdditionalStocks = additionalStocks.filter(
      stock => !popularSymbols.has(stock.symbol)
    );
    
    return [...initialStocks, ...uniqueAdditionalStocks];
  }, [initialStocks, additionalStocks]);

  useEffect(() => {
    if (!loadAllStocks) return;

    // Load full stock list in the background
    const loadFullStocks = async () => {
      try {
        const response = await fetch('/api/stocks');
        if (response.ok) {
          const fullStocks = await response.json();
          setAdditionalStocks(fullStocks);
        }
      } catch (error) {
        console.error('Failed to load full stock list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFullStocks();
  }, [loadAllStocks]);

  const filteredStocks = useMemo(() => {
    if (!search.trim()) return allStocks;
    
    const searchLower = search.toLowerCase().trim();
    
    // Option 1: Must start with the search term (most restrictive)
    const filtered = allStocks.filter(
      (stock) => {
        const symbolMatch = stock.symbol.toLowerCase().startsWith(searchLower);
        const nameMatch = stock.name.toLowerCase().startsWith(searchLower);
        return symbolMatch || nameMatch;
      }
    );
    
    // If no results with startsWith, fall back to includes but require minimum length
    if (filtered.length === 0 && searchLower.length >= 2) {
      return allStocks.filter(
        (stock) => {
          const symbolMatch = stock.symbol.toLowerCase().includes(searchLower);
          const nameMatch = stock.name.toLowerCase().includes(searchLower);
          return symbolMatch || nameMatch;
        }
      );
    }
    
    return filtered;
  }, [allStocks, search]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredStocks.length / STOCKS_PER_PAGE);
  const startIndex = (currentPage - 1) * STOCKS_PER_PAGE;
  const endIndex = startIndex + STOCKS_PER_PAGE;
  const currentStocks = filteredStocks.slice(startIndex, endIndex);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Stocks Dashboard</h1>
        {loading && (
          <div className="flex items-center text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Loading all stocks...
          </div>
        )}
      </div>
      
      <p className="text-gray-700 mb-4">
        {loading 
          ? `Showing ${initialStocks.length} popular stocks while loading full list...` 
          : `Search through ${allStocks.length} stocks (popular stocks always shown first):`
        }
      </p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by symbol or name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Results Info */}
      {filteredStocks.length > 0 && (
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <span>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredStocks.length)} of {filteredStocks.length} stocks
          </span>
          {totalPages > 1 && (
            <span>Page {currentPage} of {totalPages}</span>
          )}
        </div>
      )}

      {/* Stock List */}
      {currentStocks.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {currentStocks.map((stock) => (
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
        <p className="text-gray-500 italic mb-6">No stocks match your search.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 7) {
              pageNumber = i + 1;
            } else if (currentPage <= 4) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 3) {
              pageNumber = totalPages - 6 + i;
            } else {
              pageNumber = currentPage - 3 + i;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  currentPage === pageNumber
                    ? 'text-blue-600 bg-blue-50 border border-blue-300'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Quick jump to page */}
      {totalPages > 10 && (
        <div className="flex items-center justify-center mt-4 space-x-2 text-sm">
          <span className="text-gray-600">Jump to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
            className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-gray-600">of {totalPages}</span>
        </div>
      )}
    </div>
  );
}