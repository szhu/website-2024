import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";
import { useNavContext } from "../navigation/NavContext";
import ItemEditor from "./ItemEditor";

const ItemView: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = (props) => {
  const nav = useNavContext();
  const searchParams = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);

  const didItemIdChange = //
    useDidPropChangeAcrossRoutes("ItemView.nav.itemId", nav.itemId);

  if (nav.itemId == null) {
    return null;
  }

  return (
    <div
      key={nav.itemId}
      className={twMerge(
        "flex grow flex-col overflow-y-auto px-4 py-6",
        didItemIdChange && "animate-fade",
        props.className,
      )}
    >
      {localStorage.edit === "1" && (
        <label>
          <input
            type="checkbox"
            checked={isEditing}
            onChange={(event) => {
              setIsEditing(event.currentTarget.checked);
            }}
          />{" "}
          Edit
        </label>
      )}
      <div className="grow" />
      <div className="w-[700px] max-w-full shrink-0">
        {isEditing ? <ItemEditor>{props.children}</ItemEditor> : props.children}
      </div>

      <div className="grow" />
    </div>
  );
};

export default ItemView;
