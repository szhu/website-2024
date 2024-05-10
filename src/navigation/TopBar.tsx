import Link from "next/link";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import Disabled from "../debug/Disabled";
import CategoryData from "../listings/CategoryData";
import SiteTitle from "../listings/SiteTitle";
import { useNavContext } from "./NavContext";

function getCategory(categoryId: keyof typeof CategoryData | undefined) {
  return categoryId == null
    ? undefined
    : { ...CategoryData[categoryId], id: categoryId };
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
        "shrink-0 overflow-x-auto border-gray-300 px-3 py-2 pt-3 backdrop-blur-sm dark:border-gray-700",
        "sticky bottom-0 z-10 sm:bottom-auto sm:top-0 hover-supported:top-0",
        "bg-gray-200/40 sm:bg-white/80 hover-supported:bg-white/80 dark:bg-gray-600/40 sm:dark:bg-black/80 hover-supported:dark:bg-black/80",
        "border-t-1 sm:border-b-1 sm:border-t-0 hover-supported:border-b-1 hover-supported:border-t-0",
        "transition-[opacity,visibility] duration-200 sm:delay-1000 sm:duration-1000",
        nav.isRoot && "invisible opacity-0",
        isOneLevelIn && "sm:invisible sm:opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-[1500px] flex-row items-center gap-4">
        <Link href="/" className={twMerge("font-bold")}>
          {SiteTitle}
        </Link>

        {category && (
          <Link
            href={"/" + category.id}
            className={twMerge(isOneLevelIn && "sm:hidden")}
          >
            {category.name}
          </Link>
        )}

        <div className="grow" />

        {Disabled && (
          <a className="rounded bg-gray-800 px-3 py-0.5 text-white">Contact</a>
        )}
      </div>
    </div>
  );
};

export default TopBar;
