"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const RootLink: React.FC<React.ComponentProps<typeof Link>> = (props) => {
  const pathname = usePathname();
  const isCurrent = pathname === props.href;

  return (
    <Link
      {...props}
      className={twMerge(isCurrent && "underline")}
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
        "min-h-full grow flex-col items-center overflow-y-auto px-6 py-2 md:items-end",
        props.className,
      )}
      onClick={() => {
        router.push("/");
      }}
    >
      <div className="grow" />
      <div className="flex min-w-[min(300px,100%)] flex-col gap-2">
        <h1 className="text-4xl font-bold">Sean Zhu</h1>
        <ul className="list-inside list-bullet text-2xl marker:mr-0">
          <li>design</li>
          <li>engineering</li>
          <li>physical</li>
          <li>thoughts</li>
          <li>
            <RootLink
              href="/work"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              work history
            </RootLink>
          </li>
        </ul>
      </div>
      <div className="grow" />
    </div>
  );
};

export default RootView;
