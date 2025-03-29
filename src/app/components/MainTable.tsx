type Props = {
  isExpense: boolean;
  rows: {
    date: string;
    amount: number;
    purpose?: string | null;
  }[];
  className?: string;
};

export default function MainTable({
  isExpense = false,
  rows = [],
  className,
}: Props) {
  const headerClass = "border border-slate-800 p-2";
  const rowClass = "border border-slate-800 p-2";

  const headerPurpose = isExpense ? (
    <th className={headerClass}>Purpose</th>
  ) : null;
  const _rows = () => {
    const rowPurpose = (value?: string | null) => {
      if (!isExpense) return null;

      return <td className={rowClass}>{value}</td>;
    };

    const rowAmount = (value: number) => {
      if (!isExpense) return <td className={rowClass}>{value}</td>;

      return <td className={rowClass}>-{value}</td>;
    };

    return rows.map((row, index) => (
      <tr key={index}>
        <td className={rowClass}>{row.date}</td>
        {rowAmount(row.amount)}
        {rowPurpose(row.purpose)}
      </tr>
    ));
  };

  return (
    <table className={`border-collapse border border-slate-800 ${className}`}>
      <thead>
        <tr>
          <th className={headerClass}>Date</th>
          <th className={headerClass}>Amount</th>
          {headerPurpose}
        </tr>
      </thead>
      <tbody>{_rows()}</tbody>
    </table>
  );
}
