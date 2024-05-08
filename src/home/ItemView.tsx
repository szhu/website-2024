"use client";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

const ItemView: React.FC<{
  className?: string;
}> = (props) => {
  const parameters = useParams<{ itemId: string }>();

  return (
    <div
      className={twMerge(
        "max-w-[450px] grow flex-col overflow-y-auto px-4 py-6",
        props.className,
      )}
    >
      <div className="grow" />
      <div>{parameters.itemId}</div>
      <div className="grow" />
    </div>
  );
};

export default ItemView;
