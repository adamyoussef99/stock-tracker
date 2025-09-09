import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Tracker",
  description: "Track your favorite stocks in real time with Next.js + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 antialiased">
        {/* Global Header */}
        <header className="w-full bg-blue-600 text-white shadow-md">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">📈 Stock Tracker</h1>
            <nav className="space-x-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/stocks" className="hover:underline">All Stocks</a>
              <a href="/stocks/AAPL" className="hover:underline">Example Stock</a>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
