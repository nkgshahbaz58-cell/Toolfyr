import { NextResponse } from "next/server";
import { products } from "@/lib/mockData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  let result = [...products];

  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (sort === "popular") result.sort((a, b) => b.reviewCount - a.reviewCount);

  return NextResponse.json({ products: result, total: result.length });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ success: true, product: { id: Date.now().toString(), ...body } }, { status: 201 });
}
