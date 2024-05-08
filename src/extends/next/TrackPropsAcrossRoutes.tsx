"use client";
import { usePathname } from "next/navigation";
import React, { useContext, useMemo, useRef } from "react";

interface ContextType {
  [key: string]:
    | {
        pathname: string;
        value: unknown;
        didValueChange: boolean;
      }
    | undefined;
}

const Context = React.createContext<ContextType | undefined>(undefined);

export const TrackPropsAcrossRoutesProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const valueRef = useRef<ContextType>({});

  return (
    <Context.Provider value={valueRef.current}>{children}</Context.Provider>
  );
};

function useTrackPropsAcrossRoutes() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useTrackPropsAcrossRoutes must be used within a TrackPropsAcrossRoutesProvider",
    );
  }

  return context;
}

export function useDidPropChangeAcrossRoutes(
  key: string,
  value: unknown,
): boolean {
  const pathname = usePathname();
  const context = useTrackPropsAcrossRoutes();

  return useMemo(() => {
    const last = context[key];
    if (last?.pathname === pathname) {
      return last.didValueChange;
    }

    const didValueChange = last != null && last.value !== value;
    context[key] = { pathname, value, didValueChange };

    return didValueChange;
  }, [pathname, context, key, value]);
}
