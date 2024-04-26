import { twMerge } from "tailwind-merge";
import { WorkHistory } from "../data/data";

const WorkHistoryView: React.FC<{
  className?: string;
}> = (props) => {
  return (
    <div
      className={twMerge(
        "grow flex-col gap-2 overflow-y-auto p-6",
        props.className,
      )}
    >
      <div className="grow" />
      {WorkHistory.map((item, index) => {
        const href = `https://${item.domain}`;

        return (
          <div key={index}>
            <a
              target="_blank"
              href={href}
              rel="noreferrer"
              className="font-bold hover:underline"
            >
              {item.organization}
            </a>
            <div>{item.role}</div>
            <div>{item.when}</div>
          </div>
        );
      })}
      <div className="grow" />
    </div>
  );
};

export default WorkHistoryView;
