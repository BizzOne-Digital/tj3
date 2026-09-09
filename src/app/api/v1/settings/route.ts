import { getSettingsDoc, jsonOk } from "@/lib/api-helpers";

export async function GET() {
  const settings = await getSettingsDoc();
  return jsonOk(settings);
}
