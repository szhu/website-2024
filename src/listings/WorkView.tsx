import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ColPageFC } from "../app/TwoColPage";
import Disabled from "../debug/Disabled";
import WorkData from "./WorkData";

const WorkView: ColPageFC = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "grow flex-col gap-2 overflow-y-auto",
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

      <div className="w-[450px] max-w-full">
        {Object.entries(WorkData).map(([key, item]) => {
          return (
            <a
              key={key}
              target="_blank"
              rel="noopener noreferrer"
              href={"https://" + item.domain}
              className="block rounded-md py-3"
            >
              <div className="text-xs text-gray-500/60">{item.when}</div>
              <div className="text-sm font-bold">{item.organization}</div>
              <div className="text-sm">{item.role}</div>
              {Disabled && <div className="text-sm">{item.when}</div>}
            </a>
          );
        })}
      </div>

      <div className="grow" />
    </div>
  );
};

export default WorkView;
