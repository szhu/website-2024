import { twMerge } from "tailwind-merge";
import TopBar from "../app/TopBar";
import BlankView from "./BlankView";
import RootView from "./RootView";
import WorkHistoryView from "./WorkHistoryView";

const PagesById = {
  blank: BlankView,
  root: RootView,
  workHistory: WorkHistoryView,
};

const TwoColPage: React.FC<{
  left: keyof typeof PagesById;
  right: keyof typeof PagesById;
  sm: "left" | "right";
}> = (props) => {
  const Left = PagesById[props.left];
  const Right = PagesById[props.right];

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
          className={
            props.sm === "left" ? alwaysShownClassName : mdShownClassName
          }
        />
        <Right
          className={
            props.sm === "right" ? alwaysShownClassName : mdShownClassName
          }
        />
      </main>

      <footer className="sticky bottom-0 flex flex-row gap-2 border-t-1 border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-black" />
    </div>
  );
};

export default TwoColPage;
