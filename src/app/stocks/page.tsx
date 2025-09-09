import StocksList from "./stocks-list";
import finnhub from "finnhub";

export default async function StocksPage() {
  try {
    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = process.env.FINNHUB_API_KEY!;
    const finnhubClient = new finnhub.DefaultApi();

    const data = await new Promise<any[]>((resolve, reject) => {
      finnhubClient.stockSymbols("US", (error: any, data: any[]) => {
        if (error) reject(error);
        else resolve(data);
      });
    });

    const stocks = data.map((stock) => ({
      symbol: stock.symbol,
      name: stock.description,
    }));

    return <StocksList stocks={stocks} />;
  } catch (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Error Loading Stocks</h1>
        <p className="text-red-600">Failed to fetch stock data. Please try again later.</p>
      </div>
    );
  }
}
