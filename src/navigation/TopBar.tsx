import Link from "next/link";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import Disabled from "../debug/Disabled";
import RootData from "../listings/RootData";
import SiteTitle from "../listings/SiteTitle";
import { useNavContext } from "./NavContext";

function getCategory(categoryId: keyof typeof RootData | undefined) {
  return categoryId == null
    ? undefined
    : { ...RootData[categoryId], id: categoryId };
}

const TopBar: React.FC<unknown> = () => {
  const nav = useNavContext();

  const isOneLevelIn =
    nav.isCategory || (nav.categoryId == null && nav.itemId != null);

  const lastCategoryIdRef = useRef(nav.categoryId);
  if (nav.categoryId != null || isOneLevelIn)
    lastCategoryIdRef.current = nav.categoryId;
  const category = getCategory(lastCategoryIdRef.current);

  return (
    <div
      className={twMerge(
        "sticky bottom-0 z-10 sm:bottom-auto sm:top-0 hover-supported:top-0",
        "shrink-0 overflow-x-auto border-zinc-400/20 px-4 py-2 pt-3 backdrop-blur-sm",
        "bg-zinc-100/70 hover-supported:bg-zinc-100/80 dark:bg-zinc-800/70 hover-supported:dark:bg-black/80",
        "sm:bg-transparent sm:hover-supported:bg-transparent sm:dark:bg-transparent sm:hover-supported:dark:bg-transparent",
        "border-t-1 sm:border-b-1 sm:border-t-0 hover-supported:border-b-1 hover-supported:border-t-0",
        "transition-[opacity,visibility] duration-200 sm:delay-300 sm:duration-1000",
        nav.isRoot && "invisible opacity-0",
        isOneLevelIn && "sm:invisible sm:opacity-0",
      )}
    >
      <div className="mx-auto flex min-h-10 max-w-[1500px] flex-row items-center gap-4 sm:min-h-0 hover-supported:min-h-0">
        <Link href="/" className="text-base font-bold">
          {SiteTitle}
        </Link>

        {category && (
          <Link
            href={"/" + category.id}
            className={twMerge("text-sm", isOneLevelIn && "sm:hidden")}
          >
            {category.name}
          </Link>
        )}

        <div className="grow" />

        {Disabled && (
          <a className="rounded bg-zinc-800 px-3 py-0.5 text-white">Contact</a>
        )}
      </div>
    </div>
  );
};

export default TopBar;
