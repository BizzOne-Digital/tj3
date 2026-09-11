import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { sendInquiryFormEmail } from "@/lib/email-server";
import { Inquiry } from "@/lib/models";
import { jsonError, jsonOk } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, organization, payload } = body;

    if (!type || !name || !email) {
      return jsonError("Name, email, and form type are required");
    }

    if (!["league", "partner", "founding_member"].includes(type)) {
      return jsonError("Invalid form type");
    }

    await connectDB();
    const doc = await Inquiry.create({ type, name, email, organization, payload: payload || {} });

    try {
      await sendInquiryFormEmail({
        type,
        name,
        email,
        organization,
        payload: payload || {},
      });
    } catch (emailError) {
      console.error("Inquiry saved but email failed:", emailError);
      return jsonError(
        "Your submission was saved, but we could not send the notification email. Please call us directly or try again later.",
        503,
      );
    }

    return jsonOk({
      _id: doc._id.toString(),
      type,
      message: "Thank you! Your submission has been received.",
    });
  } catch {
    return jsonError("Failed to submit form", 500);
  }
}
