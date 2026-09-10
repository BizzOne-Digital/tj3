import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { sendContactFormEmail } from "@/lib/email-server";
import { Contact } from "@/lib/models";
import { jsonError, jsonOk } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.subject || !body.message) {
      return jsonError("All required fields must be filled");
    }

    await connectDB();
    const doc = await Contact.create(body);

    try {
      await sendContactFormEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      });
    } catch (emailError) {
      console.error("Contact form saved but email failed:", emailError);
      return jsonError(
        "Your message was saved, but we could not send the notification email. Please call us directly or try again later.",
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
    return jsonError("Failed to submit contact form", 500);
  }
}
