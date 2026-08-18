"use client";
import * as React from "react";
import { cn } from "~/lib/utils";
import { List } from "@phosphor-icons/react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { Logo } from "./logo";
import { Button } from "./ui/button";

type RootProps = React.ComponentPropsWithoutRef<"div">;

interface ShellControlsContextValue {
  toggleSidebar: () => void;
}

const ShellControlsContext = React.createContext<
  ShellControlsContextValue | undefined
>(undefined);

export const useShellControls = () => {
  const controls = React.useContext(ShellControlsContext);

  if (!controls) {
    throw new Error("useShellControls must be used within a Shell");
  }

  return controls;
};

interface ShellProps extends RootProps {
  documentPath?: string;
  markup?: string;
  currentDocumentOpenSlug?: string;
  activeView?: string;
  pathSeparator: string;
  preserveChildrenState?: boolean;
  setActiveView?: (view: string) => void;
}

export const Shell = ({
  documentPath,
  currentDocumentOpenSlug,
  children,
  pathSeparator,
  markup,
  activeView,
  preserveChildrenState = false,
  setActiveView,
}: ShellProps) => {
  const [sidebarToggled, setSidebarToggled] = React.useState(false);
  const [triggerTransition, setTriggerTransition] = React.useState(false);
  const transitionTimeoutRef = React.useRef<number | null>(null);

  const toggleSidebar = React.useCallback(() => {
    setTriggerTransition(true);

    requestAnimationFrame(() => {
      setSidebarToggled((isToggled) => !isToggled);
    });

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setTriggerTransition(false);
      transitionTimeoutRef.current = null;
    }, 300);
  }, []);

  React.useEffect(
    () => () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    },
    [],
  );

  const shellControls = React.useMemo(
    () => ({ toggleSidebar }),
    [toggleSidebar],
  );

  return (
    <ShellControlsContext.Provider value={shellControls}>
      <div
        className={cn(
          "flex bg-background text-foreground flex-col h-screen overflow-x-hidden",
          { "print-hide": !preserveChildrenState },
        )}
      >
        <div className="flex lg:hidden items-center px-6 justify-between h-[70px] border-b border-slate-6 print-hide">
          <div className="h-[70px] flex items-center">
            <Logo />
          </div>

          <Button
            className="group"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <List height={20} width={20} className="text-muted-foreground group-hover:text-foreground transition-colors duration-150"/>
          </Button>
        </div>

        <div className="flex bg-slate-2">
          <Sidebar
            className={cn(
              "w-screen max-w-full bg-background h-screen lg:h-auto z-50 lg:z-auto lg:max-w-[275px] fixed top-[70px] lg:top-0 left-0 print-hide",
              {
                "translate-x-0 lg:-translate-x-full": sidebarToggled,
                "-translate-x-full lg:translate-x-0": !sidebarToggled,
              }
            )}
            currentDocumentOpenSlug={currentDocumentOpenSlug}
            style={{
              transition: triggerTransition ? "transform 0.2s ease-in-out" : "",
            }}
          />

          <main
            className={cn(
              "absolute flex flex-col will-change-width h-screen w-[100vw] right-0 print:static print:!h-auto print:!w-full",
              {
                "lg:translate-x-0 lg:w-[calc(100vw)]": sidebarToggled,
                "lg:translate-x-0 lg:w-[calc(100vw-275px)]": !sidebarToggled,
              }
            )}
            style={{
              transition: triggerTransition
                ? "width 0.2s ease-in-out, transform 0.2s ease-in-out"
                : "",
            }}
          >
            {currentDocumentOpenSlug && documentPath && pathSeparator ? (
              <Topbar
                documentPath={documentPath}
                activeView={activeView}
                currentDocumentOpenSlug={currentDocumentOpenSlug}
                markup={markup}
                onToggleSidebar={toggleSidebar}
                pathSeparator={pathSeparator}
                setActiveView={setActiveView}
              />
            ) : null}

            <div className="w-full h-full overflow-auto mx-auto print:h-auto print:overflow-visible">
              {children}
            </div>
          </main>
        </div>
      </div>
      {!preserveChildrenState ? (
        <div className="print-show">
          <div className="h-screen">
            {children}
          </div>
        </div>
      ) : null}
    </ShellControlsContext.Provider>
  );
};
