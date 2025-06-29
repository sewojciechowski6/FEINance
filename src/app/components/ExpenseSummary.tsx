"use client";
import { useState, useEffect } from "react";
import { formatCurrency } from '../lib/utils';

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
    <div className="glass rounded-2xl shadow-xl p-6 mb-4 hover:glass-strong transition-all duration-200 text-center">
      <div className="text-3xl font-bold text-rose-300">
        -{formatCurrency(totalExpense).slice(1)}
      </div>
    </div>
  );
}