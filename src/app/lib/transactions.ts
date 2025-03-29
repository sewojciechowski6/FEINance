"use server";

import { prisma } from "../db";

export async function getTransactions() {
  return await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getIncomeTransactions() {
  return await prisma.transaction.findMany({
    where: {
      type: "income",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getExpenseTransactions() {
  return await prisma.transaction.findMany({
    where: {
      type: "expense",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getSummary() {
  const transactions = await getTransactions();

  const incomes = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalIncome = incomes.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalExpense = expenses.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
}

export async function createTransaction(data: {
  type: "income" | "expense";
  amount: number;
  purpose: string;
}) {
  await prisma.transaction.create({
    data,
  });
}
