import { notFound } from "next/navigation";

type StockPageProps = {
  params: { symbol: string };
};

export default async function StockPage({ params }: StockPageProps) {
  const { symbol } = await params;

  // TODO: replace with a real API later
  // For now, mock some data
  const mockStock = {
    price: 150.23,
    change: +1.2,
    volume: "75M",
    high52: 200,
    low52: 120,
  };

  // Fake condition if ticker not found
  if (!symbol) {
    notFound();
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{symbol} Stock</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg">Current Price:</p>
          <p className="text-2xl font-semibold">${mockStock.price}</p>
        </div>
        <div>
          <p className="text-lg">Change:</p>
          <p
            className={`text-2xl font-semibold ${
              mockStock.change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {mockStock.change}%
          </p>
        </div>
        <div>
          <p className="text-lg">Volume:</p>
          <p>{mockStock.volume}</p>
        </div>
        <div>
          <p className="text-lg">52-Week Range:</p>
          <p>
            ${mockStock.low52} – ${mockStock.high52}
          </p>
        </div>
      </div>
    </div>
  );
}
