import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // In production, this would send an email or store in a database.
  // For now, log the contact submission.
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ success: true, message: "Message received. We'll be in touch!" });
}
