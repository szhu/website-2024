import { twMerge } from "tailwind-merge";

const HomeRoot: React.FC<{
  className?: string;
}> = (props) => {
  return (
    <div
      className={twMerge(
        "min-h-full grow flex-col items-center overflow-y-auto px-6 py-2 md:items-end",
        props.className,
      )}
    >
      <div className="grow" />
      <div className="flex min-w-[min(300px,100%)] flex-col gap-2">
        <h1 className="text-4xl font-bold">Sean Zhu</h1>
        <ul className="list-inside list-bullet text-2xl marker:mr-0">
          <li>design</li>
          <li>engineering</li>
          <li>physical</li>
          <li>thoughts</li>
          <li>work history</li>
        </ul>
      </div>
      <div className="grow" />
    </div>
  );
};

export default HomeRoot;
