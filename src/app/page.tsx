"use client";
import { useState, useEffect } from "react";
import Input from "./components/Input";
import MainTable from "./components/MainTable";
import BalanceOverview from "./components/BalanceOverview";
import IncomeSummary from "./components/IncomeSummary";
import ExpenseSummary from "./components/ExpenseSummary";

type Transaction = {
  id: string;
  amount: number;
  purpose: string | null;
  type: "income" | "expense";
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchTransactions = async () => {
    try {
      const [incomeResponse, expenseResponse] = await Promise.all([
        fetch('/api/transactions?type=income'),
        fetch('/api/transactions?type=expense'),
      ]);
      
      const incomeData = await incomeResponse.json();
      const expenseData = await expenseResponse.json();
      
      setIncomes(incomeData);
      setExpenses(expenseData);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const incomeRows = incomes.map((income) => ({
    date: new Date(income.createdAt).toLocaleDateString(),
    amount: income.amount,
  }));
  const expenseRows = expenses.map((expense) => ({
    date: new Date(expense.createdAt).toLocaleDateString(),
    amount: expense.amount,
    purpose: expense.purpose,
  }));

  if (loading) {
    return (
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="lg:order-1">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></span>
            Income
          </h2>
          <div className="glass rounded-2xl shadow-xl p-6 mb-4">
            <div className="text-white/70 text-lg font-medium">Loading...</div>
          </div>
          <div className="glass rounded-2xl shadow-xl p-8 text-center">
            <div className="text-white/70 text-xl font-medium">Loading...</div>
          </div>
        </div>
        
        <div className="lg:order-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <div className="glass-strong rounded-2xl shadow-2xl p-6">
              <div className="text-white/70 text-xl font-medium">Loading...</div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Add Transaction</h2>
            <Input onTransactionAdded={fetchTransactions} />
          </div>
        </div>
        
        <div className="lg:order-3">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-4 h-4 bg-rose-400 rounded-full shadow-lg shadow-rose-400/50"></span>
            Expenses
          </h2>
          <div className="glass rounded-2xl shadow-xl p-6 mb-4">
            <div className="text-white/70 text-lg font-medium">Loading...</div>
          </div>
          <div className="glass rounded-2xl shadow-xl p-8 text-center">
            <div className="text-white/70 text-xl font-medium">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div className="lg:order-1">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></span>
          Income
        </h2>
        <IncomeSummary refreshTrigger={refreshTrigger} />
        <MainTable isExpense={false} rows={incomeRows} />
      </div>
      
      <div className="lg:order-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
          <BalanceOverview refreshTrigger={refreshTrigger} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Add Transaction</h2>
          <Input onTransactionAdded={fetchTransactions} />
        </div>
      </div>
      
      <div className="lg:order-3">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-4 h-4 bg-rose-400 rounded-full shadow-lg shadow-rose-400/50"></span>
          Expenses
        </h2>
        <ExpenseSummary refreshTrigger={refreshTrigger} />
        <MainTable isExpense={true} rows={expenseRows} />
      </div>
    </main>
  );
}
