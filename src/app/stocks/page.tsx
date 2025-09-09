import PaginatedStocksList from "./paginated-stocks-list";

// Popular stocks that load instantly
const POPULAR_STOCKS = [
  { symbol: "AAPL", name: "Apple Inc" },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc Class A" },
  { symbol: "AMZN", name: "Amazon.com Inc" },
  { symbol: "TSLA", name: "Tesla Inc" },
  { symbol: "META", name: "Meta Platforms Inc" },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "NFLX", name: "Netflix Inc" },
  { symbol: "AMD", name: "Advanced Micro Devices Inc" },
  { symbol: "CRM", name: "Salesforce Inc" },
  { symbol: "ADBE", name: "Adobe Inc" },
  { symbol: "PYPL", name: "PayPal Holdings Inc" },
  { symbol: "INTC", name: "Intel Corporation" },
  { symbol: "CMCSA", name: "Comcast Corporation" },
  { symbol: "PEP", name: "PepsiCo Inc" },
  { symbol: "AVGO", name: "Broadcom Inc" },
  { symbol: "TXN", name: "Texas Instruments Incorporated" },
  { symbol: "QCOM", name: "QUALCOMM Incorporated" },
  { symbol: "COST", name: "Costco Wholesale Corporation" },
  { symbol: "SBUX", name: "Starbucks Corporation" },
  { symbol: "ORCL", name: "Oracle Corporation" }
];

export default async function StocksPage() {
  // Return popular stocks immediately - no API call blocking the initial render
  return (
    <PaginatedStocksList 
      initialStocks={POPULAR_STOCKS}
      loadAllStocks={true}
    />
  );
}