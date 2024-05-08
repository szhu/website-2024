"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const PageLink: React.FC<Partial<React.ComponentProps<typeof Link>>> = (
  props,
) => {
  const pathname = usePathname();
  const isCurrent = pathname === props.href;

  const className = twMerge(
    "transition-colors duration-200",
    isCurrent
      ? "border-amber-700/50 dark:border-amber-200/50 [*:not(:has([data-page-link]:not(&):hover))>&]:bg-amber-300/20"
      : "border-transparent",
    !isCurrent &&
      props.href != null &&
      "hover:border-amber-700/10 hover:bg-amber-300/20 hover:dark:border-amber-200/10",
    props.className,
  );

  return props.href == null ? (
    <span {...props} className={className} />
  ) : (
    <Link {...props} href={props.href} className={className} data-page-link />
  );
};

export default PageLink;
