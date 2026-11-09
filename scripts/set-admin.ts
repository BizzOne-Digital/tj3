/**
 * Create or update the admin login WITHOUT touching any other data.
 *
 *   npm run set-admin                      # uses ADMIN_EMAIL / ADMIN_PASSWORD from .env.local
 *   npm run set-admin -- --disable-others  # also deactivates every other admin account
 *
 * Safe to run against production (point MONGODB_URI at the production database).
 */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../src/lib/db";
import { User } from "../src/lib/models";

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";
  const name = process.env.ADMIN_NAME?.trim() || "Tj Anderson";
  const disableOthers = process.argv.includes("--disable-others");

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local before running this script.");
  }
  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters.");
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await User.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    existing.name = name;
    existing.role = "super_admin";
    existing.isActive = true;
    await existing.save();
    console.log(`Updated admin: ${email}`);
  } else {
    await User.create({ email, passwordHash, name, role: "super_admin", isActive: true });
    console.log(`Created admin: ${email}`);
  }

  if (disableOthers) {
    const res = await User.updateMany({ email: { $ne: email } }, { $set: { isActive: false } });
    console.log(`Deactivated ${res.modifiedCount} other admin account(s).`);
  }

  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error(e instanceof Error ? e.message : e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
