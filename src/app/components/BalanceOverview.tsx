"use client";
import { useState, useEffect } from "react";
import { formatCurrency } from '../lib/utils';

type Props = {
  refreshTrigger?: number;
  onBalanceChange?: (balance: number, isPositive: boolean) => void;
};

export default function BalanceOverview({ refreshTrigger, onBalanceChange }: Props) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/transactions?type=summary');
        const data = await response.json();
        setBalance(data.balance);
        const isPositive = data.balance >= 0;
        onBalanceChange?.(data.balance, isPositive);
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
        <div className={`text-4xl font-bold ${
          isPositive ? "text-emerald-300" : "text-rose-300"
        }`}>
          {isPositive ? "+" : "-"}{formatCurrency(Math.abs(balance)).slice(1)}
        </div>
      </div>
    </div>
  );
}