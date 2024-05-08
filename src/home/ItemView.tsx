"use client";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";

const ItemView: React.FC<{
  className?: string;
}> = (props) => {
  const params = useParams<{ itemId: string }>();

  const didItemIdChange = //
    useDidPropChangeAcrossRoutes("ItemView.itemId", params.itemId);

  return (
    <div
      className={twMerge(
        "max-w-[450px] grow flex-col overflow-y-auto px-4 py-6",
        didItemIdChange && "animate-fade",
        props.className,
      )}
    >
      <div className="grow" />
      <div>{params.itemId}</div>
      <div className="grow" />
    </div>
  );
};

export default ItemView;
