"use client";
import { twMerge } from "tailwind-merge";
import TopBar from "../app/TopBar";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";
import BlankView from "./BlankView";
import ItemView from "./ItemView";
import RootView from "./RootView";
import WorkHistoryView from "./WorkHistoryView";

const TwoColPagesById = {
  blank: BlankView,
  root: RootView,
  workHistory: WorkHistoryView,
  item: ItemView,
};

const TwoColPage: React.FC<{
  left: keyof typeof TwoColPagesById;
  right: keyof typeof TwoColPagesById;
  sm: "left" | "right";
}> = (props) => {
  const Left = TwoColPagesById[props.left];
  const Right = TwoColPagesById[props.right];

  const didLeftChange = useDidPropChangeAcrossRoutes(
    "TwoColPage.left",
    props.left,
  );
  const didRightChange = useDidPropChangeAcrossRoutes(
    "TwoColPage.right",
    props.right,
  );

  const alwaysShownClassName = "flex";
  const mdShownClassName = "hidden sm:flex";

  return (
    <div className="flex min-h-dvh shrink-0 flex-col text-black sm:h-dvh sm:overflow-y-hidden dark:text-gray-200">
      <header className="contents">
        <TopBar />
      </header>

      <main
        className={twMerge(
          "grow bg-white dark:bg-black",
          "flex  flex-col",
          "sm:grid sm:grid-cols-2 sm:overflow-y-hidden",
        )}
      >
        <Left
          className={twMerge(
            props.sm === "left" ? alwaysShownClassName : mdShownClassName,
            didLeftChange ? "animate-fade" : "",
          )}
        />
        <Right
          className={twMerge(
            props.sm === "right" ? alwaysShownClassName : mdShownClassName,
            didRightChange ? "animate-fade" : "",
          )}
        />
      </main>

      <footer className="sticky bottom-0 flex flex-row gap-2 border-t-1 border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-black" />
    </div>
  );
};

export default TwoColPage;
