type Props = {
  isExpense: boolean;
  rowsArray: {
    data: string;
    value: string;
    purpose?: string;
  }[];
};

export default function MainTable({
  isExpense = false,
  rowsArray = [],
}: Props) {
  const headerClass = "border border-gray-300";
  const rowClass = "border border-gray-300";

  const headerPurpose = isExpense ? (
    <th className={headerClass}>Purpose</th>
  ) : null;
  const rows = () => {
    const rowPurpose = (value?: string) => {
      if (!isExpense) return null;

      return <td className={rowClass}>{value}</td>;
    };

    return rowsArray.map((row, index) => (
      <tr key={index}>
        <td className={rowClass}>{row.data}</td>
        <td className={rowClass}>{row.value}</td>
        {rowPurpose(row.purpose)}
      </tr>
    ));
  };

  return (
    <table className="border-collapse border border-gray-400">
      <thead>
        <tr>
          <th className={headerClass}>Data</th>
          <th className={headerClass}>Value</th>
          {headerPurpose}
        </tr>
      </thead>
      <tbody>{rows()}</tbody>
    </table>
  );
}
