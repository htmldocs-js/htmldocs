import path from "path";
export const NEXT_DIST_DIR = path.join(
  process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION || "",
  ".next"
);

export const DOCUMENT_SCHEMAS_DIR = path.join(NEXT_DIST_DIR, "document_schemas");