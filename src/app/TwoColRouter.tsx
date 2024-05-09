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
      <TwoColPage left="item" right="workHistory" sm="left" />
    ) : nav.itemId === "about" ? (
      <TwoColPage left="root" right="item" sm="right" />
    ) : (
      notFound
    );
  }

  if (nav.categoryId != null) {
    return nav.categoryId === "work" ? (
      <TwoColPage left="root" right="workHistory" sm="right" />
    ) : (
      notFound
    );
  }

  if (nav.isRoot) {
    return <TwoColPage left="root" right="blank" sm="left" />;
  }

  return notFound;
};

export default TwoColRouter;
