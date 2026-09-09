import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { StoredUpload } from "@/lib/models";
import { isAllowedFolder, isSafeUploadFilename } from "@/lib/upload-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ folder: string; filename: string }> },
) {
  const { folder, filename } = await params;

  if (!isAllowedFolder(folder) || !isSafeUploadFilename(filename)) {
    return new NextResponse("Not found", { status: 404 });
  }

  await connectDB();
  const doc = await StoredUpload.findOne({ folder, filename }).select("+data");

  if (!doc?.data) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(doc.data, {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(doc.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
