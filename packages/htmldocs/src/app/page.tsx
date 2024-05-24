import path from "node:path";
import fs from "node:fs";
import { Sidebar } from "./components/sidebar";
import { documentsDirectoryAbsolutePath } from "../utils/documents-directory-absolute-path";

export default function Home() {
  const baseDocumentsDirectoryName = path.basename(documentsDirectoryAbsolutePath);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-grow bg-background">
        <div className="grid lg:grid-cols-5 flex-grow">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l flex-grow">
            <div className="h-full px-4 py-6 lg:px-8">
              <h1 className="text-2xl font-bold">HTML Docs</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
