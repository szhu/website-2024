"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const RootLink: React.FC<Partial<React.ComponentProps<typeof Link>>> = (
  props,
) => {
  const pathname = usePathname();
  const isCurrent = pathname === props.href;

  const className = twMerge(
    "list-item rounded-md border-1 px-2 py-1",
    isCurrent
      ? " border-amber-700/50 bg-amber-200/20 transition-[background-color,border-color] duration-100 dark:border-amber-200/50"
      : "border-transparent",
  );

  return props.href == null ? (
    <span {...props} className={className} />
  ) : (
    <Link
      {...props}
      href={props.href}
      className={className}
      onClick={(event) => {
        event.stopPropagation();
      }}
      shallow
    />
  );
};

const RootView: React.FC<{
  className?: string;
}> = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "min-h-full grow flex-col items-center overflow-y-auto px-6 py-2 sm:items-end",
        props.className,
      )}
      onClick={() => {
        router.push("/");
      }}
    >
      <div className="grow" />
      <div className="flex min-w-[min(250px,100%)] flex-col gap-2">
        <h1 className="text-4xl font-bold">Sean Zhu</h1>
        <ul className="list-inside list-bullet text-2xl marker:mr-0">
          <RootLink>design</RootLink>
          <RootLink>engineering</RootLink>
          <RootLink>physical</RootLink>
          <RootLink>thoughts</RootLink>
          <RootLink
            href="/work"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            work history
          </RootLink>
        </ul>
      </div>
      <div className="grow" />
    </div>
  );
};

export default RootView;
