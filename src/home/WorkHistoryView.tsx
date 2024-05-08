import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { WorkHistory } from "../data/data";
import PageLink from "./PageLink";

const WorkHistoryView: React.FC<{
  className?: string;
}> = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "max-w-[450px] grow flex-col overflow-y-auto px-4 py-6",
        props.className,
      )}
      onClick={(event) => {
        if (!(event.target instanceof Element)) return;

        if (!event.target.closest("a")) {
          router.push("/work");
        }
      }}
    >
      <div className="grow" />
      {WorkHistory.map((item, index) => {
        // const href = `https://${item.domain}`;

        return (
          <PageLink
            key={index}
            href={"/work/" + item.id}
            className="block rounded-md border-1 px-4 py-2"
          >
            <div className="font-bold">{item.organization}</div>
            <div>{item.role}</div>
            <div>{item.when}</div>
          </PageLink>
        );
      })}
      <div className="grow" />
    </div>
  );
};

export default WorkHistoryView;
