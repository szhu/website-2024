import Link from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ColPageFC } from "../app/TwoColPage";
import PageLink from "../navigation/PageLink";
import RootData from "./RootData";
import SiteTitle from "./SiteTitle";

const RootView: ColPageFC = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "min-h-full grow flex-col items-center overflow-y-auto",
        props.className,
        props.marginClassName,
      )}
      onClick={(event) => {
        if (!(event.target instanceof Element)) return;

        if (!event.target.closest("a")) {
          router.push("/");
        }
      }}
    >
      <div className="grow" />
      <div
        className={twMerge(
          "flex w-fit max-w-full flex-col gap-2",

          // Make content appear horizontally centered.
          "pr-[min(5rem,6vw)]",
        )}
      >
        <Link href="/" className="text-2xl font-bold">
          {SiteTitle}
        </Link>
        <div className="text-lg">
          {Object.entries(RootData).map(([id, category]) => (
            <PageLink
              key={id}
              className="block rounded-md py-1"
              href={"/" + id}
            >
              {category.name}
            </PageLink>
          ))}
        </div>
      </div>
      <div className="grow" />
    </div>
  );
};

export default RootView;
