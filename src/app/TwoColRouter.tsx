"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import SiteTitle from "../listings/SiteTitle";
import { useNavContext } from "../navigation/NavContext";
import TwoColPage from "./TwoColPage";

const TwoColRouter: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>();
  const nav = useNavContext();

  // Hack! Sometimes it seems like Next.js is unintentionally removing the
  // <title> tag when navigating between two pages that use the same layout.
  // Here we add it back.
  useEffect(() => {
    document.title = SiteTitle;
  }, [nav]);

  // Hack! On mobile, clicking links doesn't scroll to the top of the page. We
  // fix this by scrolling to the top of the page whenever the pathname changes.
  useEffect(() => {
    if (
      previousPathnameRef.current != null &&
      previousPathnameRef.current !== pathname
    ) {
      document.documentElement.scrollTop = 0;
    }

    previousPathnameRef.current = pathname;
  }, [nav, pathname]);

  const notFound = props.children;

  if (nav.itemId != null) {
    return nav.categoryId === "projects" ? (
      <TwoColPage //
        layout="left-wide"
        left="item"
        right="projects"
        sm="left"
        page={props.children}
      />
    ) : nav.categoryId === "work" ? (
      <TwoColPage //
        layout="left-wide"
        left="item"
        right="work"
        sm="left"
        page={props.children}
      />
    ) : nav.itemId === "about" ? (
      <TwoColPage //
        layout="even"
        left="root"
        right="item"
        sm="right"
        page={props.children}
      />
    ) : (
      notFound
    );
  }

  if (nav.categoryId === "projects") {
    return (
      <TwoColPage //
        layout="even"
        left="root"
        right="projects"
        sm="right"
        page={props.children}
      />
    );
  } else if (nav.categoryId === "work")
    return (
      <TwoColPage //
        layout="even"
        left="root"
        right="work"
        sm="right"
        page={props.children}
      />
    );

  if (nav.isRoot) {
    return (
      <TwoColPage //
        layout="left-only"
        left="root"
        right="blank"
        sm="left"
        page={props.children}
      />
    );
  }

  return notFound;
};

export default TwoColRouter;
