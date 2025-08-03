"use client";

import { useState, useEffect } from "react";
import type { Signal } from "@/types";
import { DashboardHeader } from "./header";
import { SignalsTable } from "./signals-table";
import { DashboardFooter } from "./footer";
import { ContextDialog } from "./context-dialog";
import { SearchSignal } from "./search-signal";

const mockTickers = [
  "AAPL",
  "GOOGL",
  "TSLA",
  "AMZN",
  "MSFT",
  "BTC-USD",
  "ETH-USD",
  "NVDA",
  "JPM",
  "V",
];

export function DashboardClient() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  useEffect(() => {
    const initialSignals: Signal[] = Array.from({ length: 7 }).map((_, i) => ({
      id: new Date(Date.now() - i * 300000).getTime().toString(),
      symbol: mockTickers[Math.floor(Math.random() * mockTickers.length)],
      type: Math.random() > 0.5 ? "buy" : "sell",
      price: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
      timestamp: new Date(Date.now() - i * 300000),
    }));
    setSignals(initialSignals);

    const interval = setInterval(() => {
      const newSignal: Signal = {
        id: new Date().getTime().toString(),
        symbol: mockTickers[Math.floor(Math.random() * mockTickers.length)],
        type: Math.random() > 0.5 ? "buy" : "sell",
        price: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
        timestamp: new Date(),
      };
      setSignals((prev) => [newSignal, ...prev].slice(0, 20));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-8">
        <div className="space-y-8">
          <SearchSignal />
          <SignalsTable signals={signals} onSelectSignal={setSelectedSignal} />
        </div>
      </main>
      <DashboardFooter />
      <ContextDialog
        signal={selectedSignal}
        open={!!selectedSignal}
        onOpenChange={(isOpen) => !isOpen && setSelectedSignal(null)}
      />
    </div>
  );
}
