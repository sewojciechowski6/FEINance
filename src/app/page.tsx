import MainTable from "./components/MainTable";

export default function Home() {
  return (
    <>
      <div className="columns-2">
        <MainTable
          isExpense={false}
          rowsArray={[
            { data: "Rent", value: "1000" },
            { data: "Food", value: "200" },
            { data: "Transport", value: "50" },
          ]}
        />
        <MainTable
          isExpense={true}
          rowsArray={[
            { data: "Salary", value: "2000", purpose: "Income" },
            { data: "Food", value: "200", purpose: "Expense" },
            { data: "Transport", value: "50", purpose: "Expense" },
          ]}
        />
      </div>
    </>
  );
}
