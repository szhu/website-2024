import Link from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import PageLink from "../navigation/PageLink";
import RootData from "./RootData";
import SiteTitle from "./SiteTitle";

const RootView: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "min-h-full grow flex-col items-center overflow-y-auto px-6 py-2",
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
        <Link href="/" className="text-4xl font-bold">
          {SiteTitle}
        </Link>
        <div className="text-2xl">
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
