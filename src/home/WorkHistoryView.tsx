import { WorkHistory } from "../data/data";

const WorkHistoryView: React.FC<unknown> = () => {
  return (
    <div className="hidden flex-col gap-2 overflow-y-auto p-6 opacity-20 md:flex">
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
    </div>
  );
};

export default WorkHistoryView;
