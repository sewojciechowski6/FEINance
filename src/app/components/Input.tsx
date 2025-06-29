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
    if (!amount || (sign === "-" && !purpose)) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    try {
      await createTransaction({
        type: sign === "+" ? "income" : "expense",
        amount: numericAmount,
        purpose: sign === "+" ? "Income" : purpose,
      });

      setAmount("");
      setPurpose("");
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };

  return (
    <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={toggleSign}
            className={`w-14 h-14 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg ${
              sign === "+"
                ? "bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-emerald-500/40"
                : "bg-rose-500 text-white shadow-rose-500/30 hover:bg-rose-600 hover:shadow-rose-500/40"
            } hover:scale-105`}
          >
            {sign}
          </button>
          <input
            className="flex-1 px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/70 transition-all duration-200 text-black"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            step="0.01"
            required
          />
        </div>
        
        {sign === "-" && (
          <textarea
            className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/70 transition-all duration-200 resize-none h-24 text-black"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="What was this expense for?"
          />
        )}
        
        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
