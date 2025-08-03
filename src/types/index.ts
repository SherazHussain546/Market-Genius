export type SignalType = "buy" | "sell";

export type Signal = {
  id: string;
  symbol: string;
  type: SignalType;
  price: number;
  timestamp: Date;
};
