import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { action, email, password, name } = body;

  if (action === "login") {
    return NextResponse.json({
      success: true,
      user: {
        id: "u1",
        name: email.split("@")[0],
        email,
        isAdmin: email === "admin@toolfyr.com",
      },
    });
  }

  if (action === "signup") {
    return NextResponse.json({
      success: true,
      user: {
        id: "u_" + Math.random().toString(36).substring(2, 8),
        name,
        email,
        isAdmin: false,
      },
    }, { status: 201 });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
