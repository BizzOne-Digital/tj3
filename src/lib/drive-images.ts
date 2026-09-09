/**
 * Client Drive folder → public site paths.
 * Source: public/New Building Website/
 * Run `npm run sync:images` after updating Drive files.
 */
export const DRIVE_PUBLIC_ROOT = "New Building Website";

export const DRIVE_IMAGE_MAP = {
  /** Main Page Pictures / Welcome Picture / Picture */
  welcome: {
    folder: "Main Page Pictures/Welcome Picture",
    sourceFile: "IMG_9255.jpg",
    publicPath: "/images/welcome.jpg",
  },
  /** Main Page Pictures / Court Picture / Pictures (floor plan 1) */
  courtPlan1: {
    folder: "Main Page Pictures/Court Picture",
    sourceFile: "IMG_9262.jpg",
    publicPath: "/images/court-plan-1.jpg",
  },
  /** Main Page Pictures / Court Picture / Pictures (floor plan 2) */
  courtPlan2: {
    folder: "Main Page Pictures/Court Picture",
    sourceFile: "IMG_9263.jpg",
    publicPath: "/images/court-plan-2.jpg",
  },
  /** Main Page Pictures / View products / Picture */
  products: {
    folder: "Main Page Pictures/View products",
    sourceFile: "IMG_9286.PNG",
    publicPath: "/images/products.png",
  },
  /** Under The Tab Logo / Campaign draft prospectus / Picture (PDF) */
  campaignProspectus: {
    folder: "Under The Tab Logo/Campaign draft prospectus",
    sourceFile: "Campaign draft prospectus.pdf",
    publicPath: "/images/campaign-prospectus.pdf",
  },
} as const;

/** Main Page Pictures / What is Launch Little Mounties... offering / Pictures */
export const DRIVE_OFFERING_FOLDER_PREFIX =
  "What is Launch Little Mounties Community Sports";

export const DRIVE_OFFERING_PUBLIC_DIR = "/images";
export const DRIVE_OFFERING_FILE_PREFIX = "offering";

export type DriveImageKey = keyof typeof DRIVE_IMAGE_MAP;
