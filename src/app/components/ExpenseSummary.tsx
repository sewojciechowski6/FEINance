"use client";
import { useState, useEffect } from "react";

type Props = {
  refreshTrigger?: number;
};

export default function ExpenseSummary({ refreshTrigger }: Props) {
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/transactions?type=summary');
        const data = await response.json();
        setTotalExpense(data.totalExpense);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="glass rounded-2xl shadow-xl p-6 mb-4">
        <div className="text-white/70 text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl shadow-xl p-6 mb-4 hover:glass-strong transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-4 h-4 bg-rose-400 rounded-full shadow-lg shadow-rose-400/30"></div>
        <h4 className="font-semibold text-white/90">Total Expenses</h4>
      </div>
      <div className="text-3xl font-bold text-rose-300">
        -${totalExpense.toFixed(2)}
      </div>
    </div>
  );
}