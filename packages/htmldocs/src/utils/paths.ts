import path from "path";
export const NEXT_DIST_DIR = path.join(
  process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION || "",
  "dist"
);

export const DOCUMENT_SCHEMAS_DIR = NEXT_DIST_DIR