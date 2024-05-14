"use client";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import UnknownString from "../extends/typescript/UnknownString";

type NavState = {
  isRoot?: true;
  categoryId?: "work" | "projects";
  isCategory?: true;
  itemId?: string | UnknownString;
};

function useNavState(): NavState {
  const pathname = usePathname();
  const parts = pathname.replaceAll(/\/+$/g, "").split("/");

  parts.shift();

  const categoryId = parts.shift();
  switch (categoryId) {
    case undefined:
      return { isRoot: true };

    case "about":
      switch (parts.shift()) {
        case undefined:
          return { itemId: "about" };

        default:
          return {};
      }

    case "projects":
    case "work": {
      const itemId = parts.shift();
      switch (itemId) {
        case undefined:
          return { categoryId, isCategory: true };

        default:
          switch (parts.shift()) {
            case undefined:
              return { categoryId, itemId };

            default:
              return {};
          }
      }
    }
    default:
      return {};
  }
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
