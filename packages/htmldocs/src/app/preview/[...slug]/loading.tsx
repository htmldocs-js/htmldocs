'use client';

import { Shell } from "~/components/shell";
import path from "path";
import { Spinner } from "@phosphor-icons/react";

export default function Loading() {
  return (
    <Shell pathSeparator={path.sep}>
      <div className="flex items-center justify-center h-[calc(100vh_-_70px)]">
        <Spinner className="h-6 w-6 text-slate-700 animate-spin" />
      </div>
    </Shell>
  );
}
