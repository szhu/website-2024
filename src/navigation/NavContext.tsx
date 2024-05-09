"use client";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import UnknownString from "../extends/typescript/UnknownString";
import CategoryData from "../listings/CategoryData";

type NavState = {
  isRoot?: true;
  categoryId?: keyof typeof CategoryData;
  isCategory?: true;
  itemId?: string | UnknownString;
};

function useNavState(): NavState {
  const pathname = usePathname();
  const parts = pathname.replaceAll(/\/+$/g, "").split("/");

  if (parts[1] == null) {
    return { isRoot: true };
  } else if (parts[1] === "work") {
    if (parts[2] == null) {
      return { categoryId: "work", isCategory: true };
    } else if (parts[3] == null) {
      return { categoryId: "work", itemId: parts[2] };
    }
  }

  return {};
}

const NavContext = React.createContext<NavState | undefined>(undefined);

export const NavContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navState = useNavState();
  return <NavContext.Provider value={navState}>{children}</NavContext.Provider>;
};

export function useNavContext(): NavState {
  const value = useContext(NavContext);
  if (value == null) {
    throw new Error("useNavContext must be used within a NavContextProvider");
  }

  return value;
}
