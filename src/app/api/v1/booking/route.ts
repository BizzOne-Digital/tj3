import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
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
