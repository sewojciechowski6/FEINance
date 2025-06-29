"use client";
import { useState, useEffect } from "react";

type Props = {
  refreshTrigger?: number;
};

export default function IncomeSummary({ refreshTrigger }: Props) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await fetch('/api/transactions?type=summary');
        const data = await response.json();
        setTotalIncome(data.totalIncome);
      } catch (error) {
        console.error("Failed to fetch income:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
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
      <div className="text-3xl font-bold text-emerald-300">
        +${totalIncome.toFixed(2)}
      </div>
    </div>
  );
}