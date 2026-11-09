import { revalidatePath } from "next/cache";
import { authErrorStatus } from "./auth-server";
import { jsonError } from "./api-helpers";
import { RESOURCE_MAP, type ResourceKey } from "./models";

export const ADMIN_RESOURCES = Object.keys(RESOURCE_MAP) as ResourceKey[];

export function isAdminResource(resource: string): resource is ResourceKey {
  return Object.prototype.hasOwnProperty.call(RESOURCE_MAP, resource);
}

const SERVER_MANAGED_KEYS = new Set(["_id", "__v", "createdAt", "updatedAt"]);

/** Remove server-managed fields and any Mongo operator keys ($set, $where, ...) from a request body. */
export function sanitizeBody(value: unknown, depth = 0): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const out: Record<string, unknown> = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (key.startsWith("$") || key === "__proto__" || key === "constructor") continue;
    if (depth === 0 && SERVER_MANAGED_KEYS.has(key)) continue;
    out[key] = cleanNested(v, depth + 1);
  }
  return out;
}

function cleanNested(v: unknown, depth: number): unknown {
  if (Array.isArray(v)) return v.map((item) => cleanNested(item, depth + 1));
  if (v && typeof v === "object") return sanitizeBody(v, depth);
  return v;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Fill in a missing slug from name/title for resources that have a slug field. */
export function withSlug(resource: ResourceKey, body: Record<string, unknown>) {
  const Model = RESOURCE_MAP[resource];
  if (!("slug" in Model.schema.paths) || resource === "pages") return body;
  const given = typeof body.slug === "string" ? slugify(body.slug) : "";
  const source = String(body.name ?? body.title ?? "");
  const slug = given || slugify(source);
  return slug ? { ...body, slug } : body;
}

export function friendlyError(e: unknown, fallback: string): string {
  if (e && typeof e === "object" && "code" in e && (e as { code?: number }).code === 11000) {
    const keys = Object.keys((e as { keyPattern?: Record<string, unknown> }).keyPattern ?? {});
    return `That ${keys.join(", ") || "value"} is already in use. Choose a different one.`;
  }
  if (e instanceof Error) {
    if (e.name === "ValidationError") return e.message.replace(/^.*validation failed: /, "");
    if (e.name === "CastError") return "Invalid value or id.";
    return e.message;
  }
  return fallback;
}

export function adminFailure(e: unknown, fallback: string) {
  if (authErrorStatus(e) === 401) return jsonError("Unauthorized", 401);
  const isUserError =
    e instanceof Error &&
    (e.name === "ValidationError" || e.name === "CastError" || (e as { code?: number }).code === 11000);
  return jsonError(friendlyError(e, fallback), isUserError ? 400 : 500);
}

export function revalidatePublicSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    /* revalidation is best-effort outside of a request context (tests, scripts) */
  }
}
