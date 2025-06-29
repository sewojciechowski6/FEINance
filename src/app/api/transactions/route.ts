import { NextResponse } from "next/server";
import { getTransactions, getIncomeTransactions, getExpenseTransactions, getSummary } from "../../lib/transactions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    let data;
    
    switch (type) {
      case 'income':
        data = await getIncomeTransactions();
        break;
      case 'expense':
        data = await getExpenseTransactions();
        break;
      case 'summary':
        data = await getSummary();
        break;
      default:
        data = await getTransactions();
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}