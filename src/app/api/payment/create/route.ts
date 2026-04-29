import { NextResponse } from "next/server";
import { createTransaction } from "@/lib/midtrans";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await createTransaction({
    orderId: body.orderId,
    grossAmount: body.grossAmount,
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    customerPhone: body.customerPhone,
    itemName: body.itemName || "Booking - RH Tour & Travel",
  });
  return NextResponse.json({ success: true, data: result });
}
