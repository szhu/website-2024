import { twMerge } from "tailwind-merge";
import Disabled from "../debug/Disabled";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";
import useTransitionTimeout from "../extends/react/useTransitionTimeout";
import BlankView from "../items/BlankView";
import ItemView from "../items/ItemView";
import ProjectsView from "../listings/ProjectsView";
import RootView from "../listings/RootView";
import WorkView from "../listings/WorkView";
import TopBar from "../navigation/TopBar";

export const TwoColTransitionClassName = twMerge("duration-700 ease-in-out");

export const TwoColTransitionDuration = 700;

export type ColPageFC = React.FC<{
  className?: string;
  marginClassName?: string;
  children?: React.ReactNode;
  side: "left" | "right";
  align: "left" | "center" | "left sm:right" | "left sm:right xl:center";
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
  layout: "even" | "left-wide" | "left-only";
  page: React.ReactNode;
  sm: "left" | "right";
}> = (props) => {
  const Left = TwoColPagesById[props.left];
  const Right = TwoColPagesById[props.right];

  const didLeftChange = useDidPropChangeAcrossRoutes("left", props.left);
  const didRightChange = useDidPropChangeAcrossRoutes("right", props.right);

  const alwaysShownClassName = "flex";
  const smShownClassName = "hidden sm:flex";

  const isTransitioningLayout = useTransitionTimeout(
    props.layout,
    TwoColTransitionDuration,
  );

  return (
    <div className="flex min-h-dvh shrink-0 flex-col-reverse text-black sm:h-dvh sm:flex-col sm:overflow-y-hidden hover-supported:flex-col dark:text-zinc-200">
      <header className="contents">
        <TopBar />
      </header>

      <main
        className={twMerge(
          "flex grow flex-col",
          "sm:grid sm:overflow-y-hidden",
          isTransitioningLayout &&
            twMerge(
              TwoColTransitionClassName,
              "transition-[grid-template-columns]",
            ),

          props.layout === "left-wide" &&
            "sm:grid-cols-[0,1fr,calc(200px+var(--wo-sm)*0.3)] xl:grid-cols-[calc(200px+var(--wo-xl)*0.3),1fr,calc(200px+var(--wo-xl)*0.3)]",
          props.layout === "even" && "sm:grid-cols-[0,1fr,50%]",
          props.layout === "left-only" && "sm:grid-cols-[0,1fr,50%]",
        )}
      >
        <div />
        <Left
          marginClassName={twMerge(
            "mx-auto sm:mx-4",
            "[outline:1px_solid_red]",
          )}
          align={
            props.layout === "left-wide"
              ? "left sm:right xl:center"
              : props.layout === "even"
                ? "left sm:right"
                : "center"
          }
          className={twMerge(
            "max-w-full px-[3vw] py-6 xs:px-4",
            isTransitioningLayout &&
              twMerge(TwoColTransitionClassName, "transition-[transform]"),
            props.layout === "left-only" && "sm:translate-x-1/2 sm:transform",
            props.sm === "left" ? alwaysShownClassName : smShownClassName,
            didLeftChange ? "animate-fade-500" : "",
          )}
          side="left"
        >
          {props.page}
        </Left>
        <Right
          marginClassName={twMerge(
            "mx-auto sm:mx-4",
            "[outline:1px_solid_red]",
          )}
          align="left"
          className={twMerge(
            "max-w-full px-[3vw] py-6 xs:px-4",
            props.sm === "right" ? alwaysShownClassName : smShownClassName,
            didRightChange ? "animate-fade-500" : "",
          )}
          side="right"
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
