"use client";
import { useNavContext } from "../navigation/NavContext";
import TwoColPage from "./TwoColPage";

const TwoColRouter: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const nav = useNavContext();

  const notFound = props.children;

  if (!nav) {
    return notFound;
  }

  if (nav.itemId != null) {
    return nav.categoryId === "work" ? (
      <TwoColPage left="item" right="workHistory" sm="left" />
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

  return <TwoColPage left="root" right="blank" sm="left" />;
};

export default TwoColRouter;
