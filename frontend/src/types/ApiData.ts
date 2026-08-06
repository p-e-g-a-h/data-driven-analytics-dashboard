export default interface ApiData {
  base_currency: string;
  strongest: {
    currency: string;
    rate: number;
  };
  weakest: {
    currency: string;
    rate: number;
  };
  average_rate: number;
  sorted_rates: Record<string, number>;
}
