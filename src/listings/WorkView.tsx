import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ColPageFC } from "../app/TwoColPage";
import Disabled from "../debug/Disabled";
import PageLink, { LinkStyle } from "../navigation/PageLink";
import WorkData from "./WorkData";
import areLinksToPages from "./areLinksToPages";

const WorkView: ColPageFC = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "grow flex-col overflow-y-auto",
        props.className,
        props.marginClassName,
      )}
      onClick={(event) => {
        if (!(event.target instanceof Element)) return;

        if (!event.target.closest("a")) {
          router.push("/work");
        }
      }}
    >
      <div className="grow" />

      <div className="flex w-[350px] max-w-full flex-col gap-6">
        {Object.entries(WorkData).map(([key, item]) => {
          const inner = (
            <>
              <div className="text-xs text-zinc-500/60">{item.when}</div>
              <div className="text-sm font-bold">{item.organization}</div>
              <div className="text-sm">{item.role}</div>
              {Disabled && <div className="text-sm">{item.when}</div>}
            </>
          );

          return areLinksToPages ? (
            <PageLink
              key={key}
              href={"/work/" + item.id}
              className={twMerge(LinkStyle, "block rounded-md")}
            >
              {inner}
            </PageLink>
          ) : (
            <a
              key={key}
              target="_blank"
              rel="noopener noreferrer"
              href={"https://" + item.domain}
              className={twMerge(LinkStyle, "block rounded-md")}
            >
              {inner}
            </a>
          );
        })}
      </div>

      <div className="grow" />
    </div>
  );
};

export default WorkView;
