import _ from "lodash";
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
        "container max-w-[500px] grow flex-col gap-2 overflow-y-auto px-4 py-12",
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
        const typeSlug = _.camelCase(item.codeType);

        return (
          <a
            key={key}
            target="_blank"
            rel="noopener noreferrer"
            href={item.url ?? item.github}
            data-type={typeSlug}
            className={twMerge(LinkStyle, "group block rounded-md py-3")}
          >
            <div>
              <div className="text-xs text-gray-600">
                {item.when}{" "}
                <span className="transition-opacity duration-200 group-hover:opacity-100 hover-supported:opacity-0">
                  {item.usability === "Defunct" ? (
                    <>— Archived</>
                  ) : item.usability === "WIP" ? (
                    <>— WIP</>
                  ) : null}
                </span>
              </div>
              <span className="text-sm font-bold">{item.name}</span>{" "}
              {item.codeType === "Other" ? null : (
                <span
                  className={twMerge(
                    "inline-block rounded-sm border-1 border-gray-200/20 bg-gray-400/10 px-1 py-0.5 text-xs text-gray-600 transition-colors delay-1000 duration-200",
                    `[:has([data-type="developerTool"]:hover)>[data-type="developerTool"]_&]:bg-amber-100`,
                    `[:has([data-type="chromeExtension"]:hover)>[data-type="chromeExtension"]_&]:bg-amber-100`,
                    `[:has([data-type="webApp"]:hover)>[data-type="webApp"]_&]:bg-amber-100`,
                    `[:has([data-type="googleAppsScript"]:hover)>[data-type="googleAppsScript"]_&]:bg-amber-100`,
                  )}
                >
                  {item.codeType}
                </span>
              )}
            </div>
            <div className="text-xs">{item.description}</div>
          </a>
        );
      })}
      <div className="grow" />
    </div>
  );
};

export default ProjectsView;
