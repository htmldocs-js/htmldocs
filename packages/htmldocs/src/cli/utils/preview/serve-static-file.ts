/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type http from "node:http";
import path from "node:path";
import { promises as fs } from "node:fs";
import type url from "node:url";
import { lookup } from "mime-types";

export const serveStaticFile = async (
  res: http.ServerResponse,
  parsedUrl: url.UrlWithParsedQuery,
  staticDirRelativePath: string,
) => {
  const staticBaseDir = path.resolve(process.cwd(), staticDirRelativePath);
  const pathname = parsedUrl.pathname!;
  const ext = path.parse(pathname).ext;

  const fileAbsolutePath = path.resolve(
    staticBaseDir,
    pathname.replace(/^\/+/, ""),
  );

  if (
    fileAbsolutePath !== staticBaseDir &&
    !fileAbsolutePath.startsWith(`${staticBaseDir}${path.sep}`)
  ) {
    res.statusCode = 400;
    res.end("Invalid static file path");
    return;
  }

  try {
    const fileData = await fs.readFile(fileAbsolutePath);

    // if the file is found, set Content-type and send data
    res.setHeader("Content-type", lookup(ext) || "text/plain");
    res.end(fileData);
  } catch (exception) {
    console.error(
      `Could not read file at ${fileAbsolutePath} to be served, here's the exception:`,
      exception,
    );

    res.statusCode = 404;
    res.end(
      `Could not find static file to be served! Check your terminal for more information.`,
    );
  }
};
