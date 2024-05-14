import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import WorkData from "./WorkData";

const WorkView: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "max-w-[450px] grow flex-col gap-2 overflow-y-auto px-4 py-6",
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

      {Object.entries(WorkData).map(([key, item]) => {
        return (
          <a
            key={key}
            target="_blank"
            rel="noopener noreferrer"
            href={"https://" + item.domain}
            className="block rounded-md py-2"
          >
            <div className="text-sm font-bold">{item.organization}</div>
            <div className="text-sm">{item.role}</div>
            <div className="text-sm">{item.when}</div>
          </a>
        );
      })}
      <div className="grow" />
    </div>
  );
};

export default WorkView;
