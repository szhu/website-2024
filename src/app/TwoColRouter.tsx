"use client";
import { usePathname } from "next/navigation";
import TwoColPage from "../home/TwoColPage";

function usePathParts() {
  const pathname = usePathname();
  return pathname.replaceAll(/\/+$/g, "").split("/");
}

const TwoColRouter: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const parts = usePathParts();

  if (parts[1] == null) {
    return <TwoColPage left="root" right="blank" sm="left" />;
  } else if (parts[1] === "work") {
    if (parts[2] == null) {
      return <TwoColPage left="root" right="workHistory" sm="right" />;
    } else if (parts[3] == null) {
      return <TwoColPage left="item" right="workHistory" sm="left" />;
    }
  }

  return props.children;
};

export function useItemId() {
  const parts = usePathParts();
  return parts[2];
}

export default TwoColRouter;
