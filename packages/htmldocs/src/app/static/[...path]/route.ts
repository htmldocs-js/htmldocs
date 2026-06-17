import fs from "node:fs/promises";
import path from "node:path";
import { lookup } from "mime-types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface StaticRouteContext {
  params: {
    path: string[];
  };
}

export async function GET(_request: Request, { params }: StaticRouteContext) {
  const staticBaseDir = process.env.DOCUMENTS_STATIC_PATH;

  if (!staticBaseDir) {
    return new NextResponse("Static directory is not configured", {
      status: 404,
    });
  }

  const absoluteStaticBaseDir = path.resolve(staticBaseDir);
  const filePath = path.resolve(absoluteStaticBaseDir, ...params.path);

  if (
    filePath !== absoluteStaticBaseDir &&
    !filePath.startsWith(`${absoluteStaticBaseDir}${path.sep}`)
  ) {
    return new NextResponse("Invalid static file path", { status: 400 });
  }

  try {
    const fileData = await fs.readFile(filePath);
    return new NextResponse(fileData, {
      headers: {
        "Cache-Control": "no-cache, max-age=0, must-revalidate, no-store",
        "Content-Type": lookup(filePath) || "application/octet-stream",
      },
    });
  } catch {
    return new NextResponse("Static file not found", { status: 404 });
  }
}
