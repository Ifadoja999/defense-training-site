import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, service, date, time, participants, notes } = body;

  if (!name || !email || !service || !date || !time) {
    return NextResponse.json({ error: "Required fields: name, email, service, date, time" }, { status: 400 });
  }

  // In production, this would store the booking and send confirmation emails.
  console.log("Booking request:", { name, email, phone, service, date, time, participants, notes });

  return NextResponse.json({
    success: true,
    message: "Booking request received! We'll confirm your session within 24 hours.",
    booking: { name, service, date, time },
  });
}
