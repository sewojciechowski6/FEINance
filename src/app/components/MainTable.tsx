type Props = {
  isExpense: boolean;
  rows: {
    data: string;
    value: string;
    purpose?: string;
  }[];
  className?: string;
};

export default function MainTable({
  isExpense = false,
  rows = [],
  className,
}: Props) {
  const headerClass = "border border-gray-300 margin-2";
  const rowClass = "border border-gray-300 margin-2";

  const headerPurpose = isExpense ? (
    <th className={headerClass}>Purpose</th>
  ) : null;
  const _rows = () => {
    const rowPurpose = (value?: string) => {
      if (!isExpense) return null;

      return <td className={rowClass}>{value}</td>;
    };

    return rows.map((row, index) => (
      <tr key={index}>
        <td className={rowClass}>{row.data}</td>
        <td className={rowClass}>{row.value}</td>
        {rowPurpose(row.purpose)}
      </tr>
    ));
  };

  return (
    <table className={`border-collapse border border-gray-300 ${className}`}>
      <thead>
        <tr>
          <th className={headerClass}>Data</th>
          <th className={headerClass}>Value</th>
          {headerPurpose}
        </tr>
      </thead>
      <tbody>{_rows()}</tbody>
    </table>
  );
}
