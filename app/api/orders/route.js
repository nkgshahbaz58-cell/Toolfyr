import { NextResponse } from "next/server";
import { sampleOrders } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ orders: sampleOrders });
}

export async function POST(request) {
  const body = await request.json();
  const order = {
    id: "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    ...body,
    status: "pending",
    date: new Date().toISOString().split("T")[0],
  };
  return NextResponse.json({ success: true, order }, { status: 201 });
}
