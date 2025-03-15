export default function Input() {
  const sign = "-";

  return (
    <div className="grid grid-cols-5 border border-gray-300">
      <div className="border-r border-r-gray-300">{sign}</div>
      <input className="col-span-4" type="text" />
      <textarea className="border-t border-t-gray-300 col-span-5 row-span-2 resize-none" />
    </div>
  );
}
