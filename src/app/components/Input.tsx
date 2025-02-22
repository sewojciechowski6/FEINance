export default function Input() {
  const sign = "-";

  return (
    <div className="w-32 h-20 grid grid-cols-5 border">
      <div className="border-r">{sign}</div>
      <input className="col-span-4" type="text" />
      <textarea className="border-t col-span-5 row-span-2 resize-none" />
    </div>
  );
}
