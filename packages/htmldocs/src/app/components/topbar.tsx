'use client';
import * as React from 'react';
import { IconHideSidebar } from './icons/icon-hide-sidebar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "~/components/ui/tooltip"
import { pathSeparator } from '../../utils/documents-directory-absolute-path';

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
    <TooltipProvider>
      <header className="flex relative items-center px-4 justify-between h-[70px] border-b border-slate-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="hidden lg:flex rounded-lg px-2 py-2 transition ease-in-out duration-200 relative hover:bg-slate-5 text-slate-11 hover:text-slate-12"
              onClick={() => {
                if (onToggleSidebar) {
                  onToggleSidebar();
                }
              }}
              type="button"
            >
              <IconHideSidebar height={20} width={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Show/hide sidebar</TooltipContent>
        </Tooltip>

        <div className="items-center overflow-hidden hidden lg:flex text-center absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
          <h2 className="truncate">
            {currentDocumentOpenSlug.split(pathSeparator).pop()}
          </h2>
        </div>
      </header>
    </TooltipProvider>
  );
};

