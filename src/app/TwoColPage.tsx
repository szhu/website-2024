import { twMerge } from "tailwind-merge";
import Disabled from "../debug/Disabled";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";
import BlankView from "../items/BlankView";
import ItemView from "../items/ItemView";
import ProjectsView from "../listings/ProjectsView";
import RootView from "../listings/RootView";
import WorkView from "../listings/WorkView";
import TopBar from "../navigation/TopBar";

export type ColPageFC = React.FC<{
  className?: string;
  marginClassName?: string;
  children?: React.ReactNode;
}>;

const TwoColPagesById = {
  blank: BlankView,
  root: RootView,
  work: WorkView,
  projects: ProjectsView,
  item: ItemView,
};

const TwoColPage: React.FC<{
  left: keyof typeof TwoColPagesById;
  right: keyof typeof TwoColPagesById;
  page: React.ReactNode;
  sm: "left" | "right";
}> = (props) => {
  const Left = TwoColPagesById[props.left];
  const Right = TwoColPagesById[props.right];

  const didLeftChange = useDidPropChangeAcrossRoutes("left", props.left);
  const didRightChange = useDidPropChangeAcrossRoutes("right", props.right);

  const alwaysShownClassName = "flex";
  const smShownClassName = "hidden sm:flex";

  return (
    <div className="flex min-h-dvh shrink-0 flex-col-reverse text-black sm:h-dvh sm:flex-col sm:overflow-y-hidden hover-supported:flex-col dark:text-zinc-200">
      <header className="contents">
        <TopBar />
      </header>

      <main
        className={twMerge(
          "grow",
          "flex flex-col",
          "sm:grid sm:grid-cols-2 sm:overflow-y-hidden",
        )}
      >
        <Left
          className={twMerge(
            props.sm === "left" ? alwaysShownClassName : smShownClassName,
            didLeftChange ? "animate-fade-500" : "",
            "px-4 py-6 sm:justify-self-end",
          )}
          marginClassName="xs:mx-6 sm:mx-0 md:mx-4"
        >
          {props.page}
        </Left>
        <Right
          className={twMerge(
            props.sm === "right" ? alwaysShownClassName : smShownClassName,
            didRightChange ? "animate-fade-500" : "",
            "px-4 py-6",
          )}
          marginClassName="xs:mx-6 sm:mx-0 md:mx-4"
        >
          {props.page}
        </Right>
      </main>

      {Disabled && (
        <footer className="sticky bottom-0 flex flex-row gap-2 border-t-1 border-zinc-300 bg-white p-2 dark:border-zinc-700 dark:bg-black" />
      )}
    </div>
  );
};

export default TwoColPage;
