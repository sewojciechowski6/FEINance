"use client";
import { useState, FormEvent } from "react";
import { createTransaction } from "../lib/transactions";

export default function Input() {
  const [sign, setSign] = useState("-");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  const toggleSign = () => {
    setSign((prevSign) => (prevSign === "-" ? "+" : "-"));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || !purpose) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    try {
      await createTransaction({
        type: sign === "+" ? "income" : "expense",
        amount: numericAmount,
        purpose,
      });

      setAmount("");
      setPurpose("");
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-5 border border-slate-800"
    >
      <button
        type="button"
        onClick={toggleSign}
        className="border-r border-r-slate-800 p-2 text-center content-center hover:bg-slate-500 transition-colors"
      >
        {sign}
      </button>
      <input
        className="col-span-4 p-2"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        step="0.01"
        required
      />
      {sign === "-" && (
        <textarea
          className="border-t border-t-slate-800 col-span-5 row-span-2 resize-none p-2"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Purpose"
        />
      )}
      <button
        type="submit"
        className="col-span-5 border-t border-t-slate-800 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Add Transaction
      </button>
    </form>
  );
}
