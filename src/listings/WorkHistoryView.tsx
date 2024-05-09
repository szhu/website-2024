import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import PageLink from "../navigation/PageLink";
import { WorkHistoryData } from "./WorkHistoryData";

const WorkHistoryView: React.FC<{
  className?: string;
}> = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "max-w-[450px] grow flex-col gap-0.5 overflow-y-auto px-4 py-6",
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

      {WorkHistoryData.map((item, index) => {
        // const href = `https://${item.domain}`;

        return (
          <PageLink
            key={index}
            href={"/work/" + item.id}
            className="block rounded-md border-1 px-4 py-2"
            scroll={false}
            shallow
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
