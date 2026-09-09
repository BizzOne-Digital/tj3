import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-server";
import { connectDB } from "@/lib/db";
import { StoredUpload } from "@/lib/models";
import {
  extensionForMime,
  isAllowedFolder,
  parseStoredUploadUrl,
  validateUploadFile,
} from "@/lib/upload-helpers";
import { deleteStoredUploadByUrl } from "@/lib/upload-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth(req);

    const formData = await req.formData();
    const file = formData.get("file");
    const folderRaw = formData.get("folder");

    if (!(file instanceof File)) {
      return jsonError("Missing file", 400);
    }

    const folder = String(folderRaw ?? "");
    if (!isAllowedFolder(folder)) {
      return jsonError("Invalid folder", 400);
    }

    const mimeType = file.type || "application/octet-stream";
    const size = file.size;
    const validationError = validateUploadFile(file, mimeType, size);
    if (validationError) {
      return jsonError(validationError, 400);
    }

    const ext = extensionForMime(mimeType);
    if (!ext) {
      return jsonError("Invalid file type", 400);
    }

    const filename = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await connectDB();
    await StoredUpload.create({
      folder,
      filename,
      mimeType,
      size,
      data: buffer,
    });

    return NextResponse.json({
      success: true,
      url: `/api/uploads/${folder}/${filename}`,
      filename,
      size,
      folder,
    });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    return jsonError(e instanceof Error ? e.message : "Upload failed", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAuth(req);

    const body = await req.json();
    const url = String(body?.url ?? "");

    if (!parseStoredUploadUrl(url)) {
      return jsonError("Invalid upload URL", 400);
    }

    const deleted = await deleteStoredUploadByUrl(url);
    return NextResponse.json({ success: true, deleted });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    return jsonError(e instanceof Error ? e.message : "Delete failed", 500);
  }
}
