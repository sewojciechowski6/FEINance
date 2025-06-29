"use client";
import { useState, useEffect } from "react";

type SummaryData = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

type Props = {
  refreshTrigger?: number;
};

export default function Summary({ refreshTrigger }: Props) {
  const [summary, setSummary] = useState<SummaryData>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('/api/transactions?type=summary');
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="glass-strong rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="text-white/70 text-xl font-medium">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const { totalIncome, totalExpense, balance } = summary;
  
  const isPositive = balance >= 0;

  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white/90 mb-4">Current Balance</h3>
          <div className={`text-5xl font-bold mb-4 ${
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
      
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl shadow-xl p-6 hover:glass-strong transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/30"></div>
            <h4 className="font-semibold text-white/90">Income</h4>
          </div>
          <div className="text-3xl font-bold text-emerald-300">
            +${totalIncome.toFixed(2)}
          </div>
        </div>
        
        <div className="glass rounded-2xl shadow-xl p-6 hover:glass-strong transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-4 bg-rose-400 rounded-full shadow-lg shadow-rose-400/30"></div>
            <h4 className="font-semibold text-white/90">Expenses</h4>
          </div>
          <div className="text-3xl font-bold text-rose-300">
            -${totalExpense.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
