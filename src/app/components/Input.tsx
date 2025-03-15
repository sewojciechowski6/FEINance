"use client";
import { useState } from "react";

export default function Input() {
  const [sign, setSign] = useState("-");

  const toggleSign = () => {
    setSign((prevSign) => (prevSign === "-" ? "+" : "-"));
  };

  return (
    <div className="grid grid-cols-5 border border-gray-300">
      <button
        onClick={toggleSign}
        className="border-r border-r-gray-300 p-2 text-center content-center hover:bg-gray-100"
      >
        {sign}
      </button>
      <input className="col-span-4 p-2" type="text" />
      <textarea className="border-t border-t-gray-300 col-span-5 row-span-2 resize-none p-2" />
    </div>
  );
}
