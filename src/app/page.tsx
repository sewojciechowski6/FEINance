import Input from "./components/Input";
import MainTable from "./components/MainTable";
import Summary from "./components/Summary";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <MainTable
          className="row-span-2"
          isExpense={false}
          rows={[
            { data: "Rent", value: "1000" },
            { data: "Food", value: "200" },
            { data: "Transport", value: "50" },
          ]}
        />
        <Summary />
        <MainTable
          className="row-span-2"
          isExpense={true}
          rows={[
            { data: "Salary", value: "2000", purpose: "Income" },
            { data: "Food", value: "200", purpose: "Expense" },
            { data: "Transport", value: "50", purpose: "Expense" },
          ]}
        />
        <Input />
      </div>
    </>
  );
}
