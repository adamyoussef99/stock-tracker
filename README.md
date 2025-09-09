# Stock Tracker

A stock tracking web application built with **Next.js**, **Tailwind CSS**, and the **Finnhub API**.  
Easily search, watch, and analyze stock performance with real-time updates and historical charts.

---

## Features
- Search and validate stock tickers
- Add/remove tickers to your personal watchlist (stored in localStorage)
- View stock details and 7-day price history
- Combined trend charts for watched stocks
- Preloaded list of popular stocks on the homepage

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/adamyoussef99/stock-tracker.git
   cd stock-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get a free Finnhub API key**
   - Go to [https://finnhub.io/](https://finnhub.io/)
   - Sign up for a free account and copy your API key
   - Create a `.env.local` file in the project root with:
     ```
     FINNHUB_API_KEY=your_api_key_here
     ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000).

---

## Tech Stack
- [Next.js](https://nextjs.org/) – React framework
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [Recharts](https://recharts.org/) – Charting library
- [Finnhub API](https://finnhub.io/) – Stock market data
- [Yahoo-Finance2](https://www.npmjs.com/package/yahoo-finance2) - Stock market weekly trend data
