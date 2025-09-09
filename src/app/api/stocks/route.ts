import { NextRequest, NextResponse } from 'next/server';

type StockSymbol = {
  symbol: string;
  description: string;
  displaySymbol: string;
  type: string;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ticker = searchParams.get("ticker")?.toUpperCase();

    if (!process.env.FINNHUB_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.FINNHUB_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Finnhub API responded with status: ${response.status}`);
    }

    const data: StockSymbol[] = await response.json();

    // Transform
    const stocks = data
      .filter((stock) => stock.symbol && stock.description)
      .map((stock) => ({
        symbol: stock.symbol.toUpperCase(),
        name: stock.description,
      }));

    // If a ticker is provided, check if it exists
    if (ticker) {
      const found = stocks.some((s) => s.symbol === ticker);
      return NextResponse.json({ valid: found });
    }

    // Otherwise, return full stock list
    return NextResponse.json(stocks);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "Failed to fetch stocks" }, { status: 500 });
  }
}