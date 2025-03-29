import { getSummary } from "../lib/transactions";

export default async function Summary() {
  const { totalIncome, totalExpense, balance } = await getSummary();

  return (
    <div className="border border-gray-300 grid grid-cols-2 grid-rows-2">
      <div className="border-b border-b-gray-300 col-span-2 p-2 text-center content-center bg-green-100">
        {totalIncome}
      </div>
      <div className="border-r border-r-gray-300 p-2 text-center content-center bg-red-100">
        {totalExpense}
      </div>
      <div className="p-2 text-center content-center bg-orange-100">
        {balance}
      </div>
    </div>
  );
}
