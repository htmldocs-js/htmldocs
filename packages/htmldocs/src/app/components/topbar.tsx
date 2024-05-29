"use client";
import * as React from "react";
import { Sidebar } from "@phosphor-icons/react";
import { pathSeparator } from "../../utils/documents-directory-absolute-path";
import { Button } from "./ui/button";

interface TopbarProps {
  currentDocumentOpenSlug: string;
  activeView?: string;
  markup?: string;
  onToggleSidebar?: () => void;
  setActiveView?: (view: string) => void;
}

export const Topbar: React.FC<Readonly<TopbarProps>> = ({
  currentDocumentOpenSlug,
  markup,
  activeView,
  setActiveView,
  onToggleSidebar,
}) => {
  return (
    <header className="flex relative items-center px-4 justify-between h-[70px] hidden lg:flex border-b border-border">
      <Button
        className="group"
        variant="ghost"
        size="icon"
        onClick={() => {
          if (onToggleSidebar) {
            onToggleSidebar();
          }
        }}
      >
        <Sidebar height={20} width={20} className="text-muted-foreground group-hover:text-foreground transition-colors duration-150"/>
      </Button>
      <div className="items-center overflow-hidden hidden lg:flex text-center absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
        <h2 className="truncate text-sm font-medium text-foreground">
          {currentDocumentOpenSlug.split(pathSeparator).pop()}
        </h2>
      </div>
    </header>
  );
};
