import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
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
