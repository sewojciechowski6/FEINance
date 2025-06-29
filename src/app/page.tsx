import Input from "./components/Input";
import MainTable from "./components/MainTable";
import Summary from "./components/Summary";
import {
  getExpenseTransactions,
  getIncomeTransactions,
} from "./lib/transactions";

export default async function Home() {
  const [incomes, expenses] = await Promise.all([
    getIncomeTransactions(),
    getExpenseTransactions(),
  ]);

  const incomeRows = incomes.map((income) => ({
    date: income.createdAt.toLocaleDateString(),
    amount: income.amount,
  }));
  const expenseRows = expenses.map((expense) => ({
    date: expense.createdAt.toLocaleDateString(),
    amount: expense.amount,
    purpose: expense.purpose,
  }));

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div className="lg:order-1">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></span>
          Income
        </h2>
        <MainTable isExpense={false} rows={incomeRows} />
      </div>
      
      <div className="lg:order-2 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
          <Summary />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Add Transaction</h2>
          <Input />
        </div>
      </div>
      
      <div className="lg:order-3">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-4 h-4 bg-rose-400 rounded-full shadow-lg shadow-rose-400/50"></span>
          Expenses
        </h2>
        <MainTable isExpense={true} rows={expenseRows} />
      </div>
    </main>
  );
}
