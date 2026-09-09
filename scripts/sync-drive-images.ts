import fs from "fs";
import path from "path";
import {
  DRIVE_IMAGE_MAP,
  DRIVE_OFFERING_FILE_PREFIX,
  DRIVE_OFFERING_FOLDER_PREFIX,
  DRIVE_PUBLIC_ROOT,
} from "../src/lib/drive-images";

const publicDir = path.join(process.cwd(), "public");
const driveRoot = path.join(publicDir, DRIVE_PUBLIC_ROOT);
const imagesOut = path.join(publicDir, "images");

function copySlot(key: keyof typeof DRIVE_IMAGE_MAP) {
  const slot = DRIVE_IMAGE_MAP[key];
  const src = path.join(driveRoot, slot.folder, slot.sourceFile);
  const dest = path.join(publicDir, slot.publicPath.replace(/^\//, ""));

  if (!fs.existsSync(src)) {
    throw new Error(`Missing Drive file for ${key}: ${src}`);
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`✓ ${key}: ${slot.folder}/${slot.sourceFile} → ${slot.publicPath}`);
}

function syncOfferingGallery() {
  const mainPagePictures = path.join(driveRoot, "Main Page Pictures");
  const offeringFolder = fs
    .readdirSync(mainPagePictures, { withFileTypes: true })
    .find((entry) => entry.isDirectory() && entry.name.startsWith(DRIVE_OFFERING_FOLDER_PREFIX));

  if (!offeringFolder) {
    throw new Error(`Offering folder not found under ${mainPagePictures}`);
  }

  const offeringDir = path.join(mainPagePictures, offeringFolder.name);
  const files = fs
    .readdirSync(offeringDir)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  if (files.length === 0) {
    throw new Error(`No offering images in ${offeringDir}`);
  }

  fs.mkdirSync(imagesOut, { recursive: true });

  files.forEach((file, index) => {
    const dest = path.join(imagesOut, `${DRIVE_OFFERING_FILE_PREFIX}-${index + 1}.jpg`);
    fs.copyFileSync(path.join(offeringDir, file), dest);
    console.log(`✓ offering-${index + 1}: ${offeringFolder.name}/${file} → /images/${DRIVE_OFFERING_FILE_PREFIX}-${index + 1}.jpg`);
  });

  return files.length;
}

function main() {
  if (!fs.existsSync(driveRoot)) {
    throw new Error(`Drive folder not found: ${driveRoot}`);
  }

  console.log(`Syncing from ${driveRoot}\n`);

  for (const key of Object.keys(DRIVE_IMAGE_MAP) as (keyof typeof DRIVE_IMAGE_MAP)[]) {
    copySlot(key);
  }

  const count = syncOfferingGallery();
  console.log(`\nDone — ${count} offering gallery image(s) synced.`);
}

main();
