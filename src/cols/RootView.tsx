import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import PageLink from "../layout/PageLink";

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
      onClick={(event) => {
        if (!(event.target instanceof Element)) return;

        if (!event.target.closest("a")) {
          router.push("/");
        }
      }}
    >
      <div className="grow" />
      <div className="flex w-[250px] max-w-full flex-col gap-2">
        <h1 className="text-4xl font-bold">SiteTitle</h1>
        <div className="text-2xl">
          <PageLink className="-mx-2 block rounded-md border-1 px-2 py-1">
            design
          </PageLink>
          <PageLink className="-mx-2 block rounded-md border-1 px-2 py-1">
            code
          </PageLink>
          <PageLink className="-mx-2 block rounded-md border-1 px-2 py-1">
            hardware
          </PageLink>
          <PageLink className="-mx-2 block rounded-md border-1 px-2 py-1">
            thoughts
          </PageLink>
          <PageLink className="-mx-2 block rounded-md border-1 px-2 py-1">
            photography
          </PageLink>
          <PageLink
            className="-mx-2 block rounded-md border-1 px-2 py-1"
            href="/work"
          >
            work history
          </PageLink>
        </div>
      </div>
      <div className="grow" />
    </div>
  );
};

export default RootView;
