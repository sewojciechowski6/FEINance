"use client";
import { useState, useEffect } from "react";

type Props = {
  refreshTrigger?: number;
};

export default function BalanceOverview({ refreshTrigger }: Props) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/transactions?type=summary');
        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="glass-strong rounded-2xl shadow-2xl p-6">
        <div className="text-center">
          <div className="text-white/70 text-xl font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  const isPositive = balance >= 0;

  return (
    <div className="glass-strong rounded-2xl shadow-2xl p-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white/90 mb-4">Current Balance</h3>
        <div className={`text-4xl font-bold mb-4 ${
          isPositive ? "text-emerald-300" : "text-rose-300"
        }`}>
          {isPositive ? "+" : "-"}${Math.abs(balance).toFixed(2)}
        </div>
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
          isPositive 
            ? "bg-emerald-500/30 text-emerald-200 border border-emerald-400/30" 
            : "bg-rose-500/30 text-rose-200 border border-rose-400/30"
        }`}>
          {isPositive ? "✓ Positive" : "⚠ Negative"} Balance
        </div>
      </div>
    </div>
  );
}