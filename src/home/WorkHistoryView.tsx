"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { WorkHistory } from "../data/data";

const WorkHistoryView: React.FC<{
  className?: string;
}> = (props) => {
  return (
    <div
      className={twMerge(
        "max-w-[450px] grow animate-fade flex-col overflow-y-auto px-4 py-6",
        props.className,
      )}
    >
      <div className="grow" />
      {WorkHistory.map((item, index) => {
        const href = `https://${item.domain}`;

        return (
          <Link
            key={index}
            href="/"
            className="rounded-md border-1 border-transparent px-4 py-2 transition-[background-color,border-color] duration-100 hover:border-amber-700/50 hover:bg-amber-200/20 dark:hover:border-amber-200/50"
          >
            <div>
              <span
                className="font-bold hover:underline"
                onClick={(event) => {
                  event.preventDefault();
                  window.open(href, "_blank");
                }}
              >
                {item.organization}
              </span>
            </div>
            <div>{item.role}</div>
            <div>{item.when}</div>
          </Link>
        );
      })}
      <div className="grow" />
    </div>
  );
};

export default WorkHistoryView;
