import { twMerge } from "tailwind-merge";
import TopBar from "../app/TopBar";
import HomeRoot from "./HomeRoot";
import WorkHistoryView from "./WorkHistoryView";

const PagesById = {
  root: HomeRoot,
  workHistory: WorkHistoryView,
};

const TwoColPage: React.FC<{
  left: keyof typeof PagesById;
  right: keyof typeof PagesById;
  md: "left" | "right";
}> = (props) => {
  const Left = PagesById[props.left];
  const Right = PagesById[props.right];

  const alwaysShownClassName = "flex";
  const mdShownClassName = "hidden md:flex";

  return (
    <div className="flex min-h-dvh shrink-0 flex-col md:h-dvh md:overflow-y-hidden">
      <header className="contents">
        <TopBar />
      </header>

      <main
        className={twMerge(
          "grow bg-white dark:bg-gray-900",
          "flex  flex-col",
          "md:grid md:grid-cols-2 md:overflow-y-hidden",
        )}
      >
        <Left
          className={
            props.md === "left" ? alwaysShownClassName : mdShownClassName
          }
        />
        <Right
          className={
            props.md === "right" ? alwaysShownClassName : mdShownClassName
          }
        />
      </main>

      <footer className="sticky bottom-0 flex flex-row gap-2 border-t-1 border-gray-300 bg-gray-200 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800" />
    </div>
  );
};

export default TwoColPage;
