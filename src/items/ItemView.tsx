import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";
import WorkData from "../listings/WorkData";
import { useNavContext } from "../navigation/NavContext";
import ItemEditor from "./ItemEditor";

export const ReadingStyle = twMerge(
  "text-sm",
  "[&>:is(p,hr,details)]:my-6",
  "[&>details>summary]:my-6 [&>details>summary]:cursor-pointer",
  "[&>details[open]>:not(summary)]:transition-opacity [&>details[open]>:not(summary)]:duration-1000 [&>details[open]>:not(summary)]:ease-out",
  "[&>details:not([open])>:not(summary)]:opacity-0",
  "[&>details[open]>:not(summary)]:opacity-100",
);

const ItemView: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = (props) => {
  const nav = useNavContext();

  const [isEditing, setIsEditing] = useState(false);

  const didItemIdChange = //
    useDidPropChangeAcrossRoutes("ItemView.nav.itemId", nav.itemId);

  if (nav.itemId == null) {
    return null;
  }

  let infoCard;
  if (nav.categoryId === "work") {
    const item = WorkData[nav.itemId];
    if (item) {
      infoCard = (
        <div className="flex flex-col gap-1">
          <div className="font-bold">{item.organization}</div>
          <div>{item.role}</div>
          <div>{item.when}</div>
        </div>
      );
    }
  }

  return (
    <div
      key={nav.itemId}
      className={twMerge(
        "flex grow flex-col overflow-y-auto px-4 py-6 md:pr-12",
        didItemIdChange && "animate-fade-500",
        props.className,
      )}
      onDoubleClick={() => {
        if (localStorage.edit === "1") {
          setIsEditing(true);
        }
      }}
    >
      <div className="grow" />
      <div className="w-[700px] max-w-full shrink-0">
        {infoCard}
        {isEditing ? (
          <ItemEditor
            onExit={() => {
              setIsEditing(false);
            }}
          >
            {props.children}
          </ItemEditor>
        ) : (
          <div className={twMerge("contents", ReadingStyle)}>
            {props.children}
          </div>
        )}
      </div>

      <div className="grow" />
    </div>
  );
};

export default ItemView;
