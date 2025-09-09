import { notFound } from "next/navigation";
import yahooFinance from "yahoo-finance2";

type StockPageProps = {
  params: { symbol: string };
};

const formatDate = (date: Date) => `${date.getMonth()+1}/${date.getDate()}`;

export default async function StockPage({ params }: StockPageProps) {
  const { symbol } = await params;

  if (!symbol) notFound();

  // Fake condition if ticker not found
  if (!symbol) {
    notFound();
  }

  try {
    // Fetch current quote
    const quote = await yahooFinance.quote(symbol);

    // Fetch 7-day historical data
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);

    const history = await yahooFinance.historical(symbol, { period1: start, period2: end, interval: "1d" });

    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{quote.longName || symbol} ({symbol})</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-lg">Current Price:</p>
            <p className="text-2xl font-semibold">${quote.regularMarketPrice}</p>
          </div>
          <div>
            <p className="text-lg">Change:</p>
            <p className={`text-2xl font-semibold ${(quote.regularMarketChange ?? 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
              {(quote.regularMarketChange ?? 0).toFixed(2)} ({(quote.regularMarketChangePercent ?? 0).toFixed(2)}%)
            </p>
          </div>
          <div>
            <p className="text-lg">Volume:</p>
            <p>{quote.regularMarketVolume?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-lg">52-Week Range:</p>
            <p>${quote.fiftyTwoWeekLow} – ${quote.fiftyTwoWeekHigh}</p>
          </div>
        </div>

        {/* Historical Data Table */}
        <h2 className="text-xl font-semibold mb-2">Last 7 Days</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Close</th>
            </tr>
          </thead>
          <tbody>
            {history.map((day) => (
              <tr key={day.date.toString()}>
                <td className="border px-2 py-1">{formatDate(new Date(day.date))}</td>
                <td className="border px-2 py-1">${day.close.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="p-6 bg-white shadow rounded-lg">
        <p className="text-red-600 font-semibold">Error fetching data for {symbol}. Maybe it’s an invalid ticker.</p>
      </div>
    );
  }
}
