import Link from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {
  ColPageFC,
  TwoColTransitionClassName,
  TwoColTransitionDuration,
} from "../app/TwoColPage";
import useTransitionTimeout from "../extends/react/useTransitionTimeout";
import PageLink from "../navigation/PageLink";
import RootData from "./RootData";
import SiteTitle from "./SiteTitle";

const RootView: ColPageFC = (props) => {
  const router = useRouter();

  const isTransitioningLayout = useTransitionTimeout(
    props.align,
    TwoColTransitionDuration,
  );

  return (
    <div
      className={twMerge(
        "min-h-full grow flex-col items-center overflow-y-auto",
        props.className,
        props.marginClassName,
      )}
      onClick={(event) => {
        if (!(event.target instanceof Element)) return;

        if (!event.target.closest("a")) {
          router.push("/");
        }
      }}
    >
      <div className="grow" />
      <div className="flex w-full">
        <div className={twMerge("grow")} />

        <div
          className={twMerge(
            isTransitioningLayout &&
              twMerge(TwoColTransitionClassName, "transition-[width]"),

            // Push content slightly to the right when in two-column layout.
            props.align === "left sm:right" ? "w-[calc(100%-200px)]" : "w-0",
          )}
        />

        <div
          className={twMerge(
            "flex w-fit max-w-full flex-col gap-2",

            // Make content appear horizontally centered.
            "pr-[min(5rem,6vw)]",
          )}
        >
          <Link href="/" className="text-2xl font-bold">
            {SiteTitle}
          </Link>
          <div className="text-lg">
            {Object.entries(RootData).map(([id, category]) => (
              <PageLink
                key={id}
                className="block rounded-md py-1"
                href={"/" + id}
              >
                {category.name}
              </PageLink>
            ))}
          </div>
        </div>

        <div className="grow" />
      </div>
      <div className="grow" />
    </div>
  );
};

export default RootView;
