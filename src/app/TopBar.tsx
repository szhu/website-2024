"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const TopBar: React.FC<unknown> = () => {
  const pathname = usePathname();

  const isRoot = pathname === "/";
  const pathParts = pathname.split("/");
  const isTopCategory =
    pathParts[1] != null && pathParts[1].length > 0 && pathParts[2] == null;

  return (
    <div className="sticky top-0 flex shrink-0 flex-row items-center gap-4 overflow-x-auto border-b-1 border-gray-300 bg-gray-200 px-3 py-2 pt-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <Link
        href="/"
        className={twMerge(
          "font-bold",
          isRoot && "invisible",
          isTopCategory && "visible md:invisible",
        )}
      >
        SiteTitle
      </Link>
      <div className="grow" />
      <a>Category</a>
      <a>About</a>
      <a className="rounded bg-blue-800 px-3 py-0.5 text-white">Contact</a>
    </div>
  );
};

export default TopBar;
