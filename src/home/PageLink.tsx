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
    isCurrent
      ? "border-amber-700/50 bg-amber-300/20 dark:border-amber-200/50"
      : "border-transparent",
    !isCurrent &&
      props.href != null &&
      "hover:border-amber-700/10 hover:bg-amber-300/20 hover:dark:border-amber-200/10",
    props.className,
  );

  return props.href == null ? (
    <div>
      <span {...props} className={className} />
    </div>
  ) : (
    <div>
      <Link {...props} href={props.href} className={className} />
    </div>
  );
};

export default PageLink;
