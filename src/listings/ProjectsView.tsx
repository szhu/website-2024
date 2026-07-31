import _ from "lodash";
import { useRouter } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { twMerge } from "tailwind-merge";
import { ColPageFC } from "../app/TwoColPage";
import PageLink, { LinkStyle } from "../navigation/PageLink";
import ProjectsData from "./ProjectsData";
import hasItemPage from "./hasItemPage";

const ProjectsView: ColPageFC = (props) => {
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
          router.push("/projects");
        }
      }}
    >
      <div className="grow" />

      <div className="container flex w-[350px] max-w-full flex-col gap-6">
        {Object.entries(ProjectsData).map(([key, item]) => {
          const typeSlug = _.camelCase(item.codeType);

          return (
            <PageLink
              key={key}
              href={
                hasItemPage(item.id)
                  ? "/projects/" + item.id
                  : item.url ?? item.github ?? ""
              }
              data-type={typeSlug}
              className={twMerge(LinkStyle, "group block rounded-md")}
            >
              <div className="text-xs text-zinc-500/60">
                {item.when}{" "}
                <span className="transition-opacity duration-200 group-hover:opacity-100 hover-supported:opacity-0">
                  {item.usability === "Defunct" ? (
                    <>— Archived</>
                  ) : item.usability === "WIP" ? (
                    <>— WIP</>
                  ) : null}
                </span>
              </div>
              <div>
                <span className="text-sm font-bold">{item.name}</span>{" "}
                {item.codeType === "Other" ? null : (
                  <span
                    className={twMerge(
                      "inline-block rounded-sm border-1 border-zinc-200/20 bg-zinc-400/10 px-1 py-0.5 align-middle text-[0.6rem] leading-none text-zinc-600 transition-colors delay-1000 duration-200",
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
              <div className="text-xs">
                <Balancer>{item.description}</Balancer>
              </div>
            </PageLink>
          );
        })}
      </div>

      <div className="grow" />
    </div>
  );
};

export default ProjectsView;
