"use client";
import { useEffect } from "react";
import SiteTitle from "../listings/SiteTitle";
import { useNavContext } from "../navigation/NavContext";
import TwoColPage from "./TwoColPage";

const TwoColRouter: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const nav = useNavContext();

  // Hack! Sometimes it seems like Next.js is unintentionally removing the
  // <title> tag when navigating between two pages that use the same layout.
  // Here we add it back.
  useEffect(() => {
    document.title = SiteTitle;
  }, [nav]);

  const notFound = props.children;

  if (nav.itemId != null) {
    return nav.categoryId === "projects" ? (
      <TwoColPage //
        left="item"
        right="projects"
        sm="left"
        page={props.children}
      />
    ) : nav.categoryId === "work" ? (
      <TwoColPage //
        left="item"
        right="work"
        sm="left"
        page={props.children}
      />
    ) : nav.itemId === "about" ? (
      <TwoColPage //
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
        left="root"
        right="projects"
        sm="right"
        page={props.children}
      />
    );
  } else if (nav.categoryId === "work")
    return (
      <TwoColPage //
        left="root"
        right="work"
        sm="right"
        page={props.children}
      />
    );

  if (nav.isRoot) {
    return (
      <TwoColPage left="root" right="blank" sm="left" page={props.children} />
    );
  }

  return notFound;
};

export default TwoColRouter;
