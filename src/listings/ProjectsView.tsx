import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { LinkStyle } from "../navigation/PageLink";
import ProjectsData from "./ProjectsData";

const ProjectsView: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = (props) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "max-w-[500px] grow flex-col gap-0.5 overflow-y-auto px-4 py-12",
        props.className,
      )}
      onClick={(event) => {
        if (!(event.target instanceof Element)) return;

        if (!event.target.closest("a")) {
          router.push("/projects");
        }
      }}
    >
      <div className="grow" />

      {Object.entries(ProjectsData).map(([key, item]) => {
        console.log(item, item.url ?? item.github);

        return (
          <a
            key={key}
            target="_blank"
            rel="noopener noreferrer"
            href={item.url ?? item.github}
            className={twMerge(LinkStyle, "block rounded-md py-3")}
          >
            <div>
              <div className="text-sm text-gray-600">
                {item.when}{" "}
                {item.usability === "Defunct" ? (
                  <>— Archived</>
                ) : item.usability === "WIP" ? (
                  <>— WIP</>
                ) : null}
              </div>
              <span className="font-bold">{item.name}</span>{" "}
              <span className="inline-block rounded-sm border-1 border-gray-200/20 bg-gray-400/10 px-1 py-0.5 text-sm text-gray-600">
                {item.codeType === "Other" ? null : item.codeType}
              </span>
            </div>
            <div>{item.description}</div>
          </a>
        );
      })}
      <div className="grow" />
    </div>
  );
};

export default ProjectsView;
