import { NextResponse } from "next/server";
import { createTransaction } from "../../../lib/transactions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, amount, purpose } = body;

    if (!type || !amount) {
      return NextResponse.json(
        { error: "Type and amount are required" },
        { status: 400 }
      );
    }

    await createTransaction({ type, amount, purpose });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}