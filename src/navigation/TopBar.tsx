import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Disabled from "../debug/Disabled";
import CategoryData from "../listings/CategoryData";
import SiteTitle from "../listings/SiteTitle";
import { useNavContext } from "./NavContext";

const TopBar: React.FC<unknown> = () => {
  const nav = useNavContext();

  const category =
    nav.categoryId == null
      ? undefined
      : { ...CategoryData[nav.categoryId], id: nav.categoryId };

  return (
    <div
      className={twMerge(
        "transition-colors duration-200",
        nav.isRoot && "border-transparent",
        nav.isCategory && "border-gray-300 sm:border-transparent",
        "sticky top-0 shrink-0 overflow-x-auto border-b-1 bg-white px-3 py-2 pt-3 dark:border-gray-700 dark:bg-black",
      )}
    >
      <div className="mx-auto flex max-w-[1500px] flex-row items-center gap-4">
        <Link
          href="/"
          className={twMerge(
            "font-bold",
            nav.isRoot && "invisible",
            nav.isCategory && "visible sm:invisible",
          )}
        >
          {SiteTitle}
        </Link>

        {category && (
          <Link
            href={"/" + category.id}
            className={twMerge(nav.isCategory && "sm:hidden")}
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
