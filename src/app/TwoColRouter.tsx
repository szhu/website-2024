"use client";
import { useNavContext } from "../navigation/NavContext";
import TwoColPage from "./TwoColPage";

const TwoColRouter: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const nav = useNavContext();

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
