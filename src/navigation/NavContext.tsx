"use client";

import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import UnknownString from "../extends/typescript/UnknownString";

type NavState =
  | {
      categoryId?: "work" | UnknownString;
      itemId?: string | UnknownString;
    }
  | undefined;

function useNavState(): NavState {
  const pathname = usePathname();
  const parts = pathname.replaceAll(/\/+$/g, "").split("/");

  if (parts[1] == null) {
    return {};
  } else if (parts[1] === "work") {
    if (parts[2] == null) {
      return { categoryId: "work" };
    } else if (parts[3] == null) {
      return { categoryId: "work", itemId: parts[2] };
    }
  }

  return;
}

const NavContext = React.createContext<NavState>(undefined);

export const NavContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navState = useNavState();
  return <NavContext.Provider value={navState}>{children}</NavContext.Provider>;
};

export function useNavContext(): NavState {
  return useContext(NavContext);
}
