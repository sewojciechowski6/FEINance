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
    <>
      <div className="grid grid-cols-3 gap-4 m-8">
        <MainTable isExpense={false} rows={incomeRows} />
        <div className="grid grid-rows-2 gap-4">
          <Summary />
          <Input />
        </div>
        <MainTable isExpense={true} rows={expenseRows} />
      </div>
    </>
  );
}
