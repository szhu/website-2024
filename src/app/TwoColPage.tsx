import { twMerge } from "tailwind-merge";
import disabled from "../debug/Disabled";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";
import BlankView from "../items/BlankView";
import ItemView from "../items/ItemView";
import RootView from "../listings/RootView";
import WorkHistoryView from "../listings/WorkHistoryView";
import TopBar from "../navigation/TopBar";

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

  const didLeftChange = useDidPropChangeAcrossRoutes("left", props.left);
  const didRightChange = useDidPropChangeAcrossRoutes("right", props.right);

  const alwaysShownClassName = "flex";
  const smShownClassName = "hidden sm:flex";

  return (
    <div className="flex min-h-dvh shrink-0 flex-col text-black sm:h-dvh sm:overflow-y-hidden dark:text-gray-200">
      <header className="contents">
        <TopBar />
      </header>

      <main
        className={twMerge(
          "grow",
          "flex  flex-col",
          "sm:grid sm:grid-cols-2 sm:overflow-y-hidden",
        )}
      >
        <Left
          className={twMerge(
            props.sm === "left" ? alwaysShownClassName : smShownClassName,
            didLeftChange ? "animate-fade" : "",
          )}
        />
        <Right
          className={twMerge(
            props.sm === "right" ? alwaysShownClassName : smShownClassName,
            didRightChange ? "animate-fade" : "",
          )}
        />
      </main>

      {disabled && (
        <footer className="sticky bottom-0 flex flex-row gap-2 border-t-1 border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-black" />
      )}
    </div>
  );
};

export default TwoColPage;
