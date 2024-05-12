import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import PageLink from "../navigation/PageLink";
import ProjectsData from "./ProjectsData";

const ProjectsView: React.FC<{
  className?: string;
  children?: React.ReactNode;
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
          router.push("/projects");
        }
      }}
    >
      <div className="grow" />

      {Object.entries(ProjectsData).map(([, item]) => {
        return (
          <PageLink
            key={item.id}
            href={"/projects/" + item.id}
            className="block rounded-md py-2"
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

export default ProjectsView;
