"use client";
import { useNavContext } from "../navigation/NavContext";
import TwoColPage from "./TwoColPage";

const TwoColRouter: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const nav = useNavContext();

  const notFound = props.children;

  if (nav.itemId != null) {
    return nav.categoryId === "work" ? (
      <TwoColPage left="item" right="work" sm="left" page={props.children} />
    ) : nav.itemId === "about" ? (
      <TwoColPage left="root" right="item" sm="right" page={props.children} />
    ) : (
      notFound
    );
  }

  if (nav.categoryId != null) {
    return nav.categoryId === "work" ? (
      <TwoColPage left="root" right="work" sm="right" page={props.children} />
    ) : (
      notFound
    );
  }

  if (nav.isRoot) {
    return (
      <TwoColPage left="root" right="blank" sm="left" page={props.children} />
    );
  }

  return notFound;
};

export default TwoColRouter;
