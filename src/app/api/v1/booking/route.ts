import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { sendBookingFormEmail } from "@/lib/email-server";
import { Booking } from "@/lib/models";
import { jsonError, jsonOk } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.phone || !body.facility || !body.date || !body.timeSlot) {
      return jsonError("All required fields must be filled");
    }
    await connectDB();
    const doc = await Booking.create(body);

    try {
      await sendBookingFormEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        facility: body.facility,
        date: body.date,
        timeSlot: body.timeSlot,
        notes: body.notes,
      });
    } catch (emailError) {
      console.error("Booking saved but email failed:", emailError);
      return jsonError(
        "Your booking request was saved, but we could not send the notification email. Please call us directly or try again later.",
        503,
      );
    }

    return jsonOk({
      _id: doc._id.toString(),
      ...body,
      status: "new",
      createdAt: doc.createdAt.toISOString(),
    });
  } catch {
    return jsonError("Failed to submit booking request", 500);
  }
}
