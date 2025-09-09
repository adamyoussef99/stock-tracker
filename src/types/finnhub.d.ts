declare module "finnhub" {
  export interface StockSymbol {
    symbol: string;
    description: string;
  }

  export interface DefaultApi {
    stockSymbols: (
      exchange: string,
      cb: (error: any, data: StockSymbol[]) => void
    ) => void;
  }

  export class ApiClient {
    static instance: {
      authentications: Record<string, { apiKey: string }>;
    };
  }

  export default {
    ApiClient: ApiClient,
    DefaultApi: DefaultApi,
  };
}