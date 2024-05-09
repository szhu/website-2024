import { useSearchParams } from "next/navigation";
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

  const didItemIdChange = //
    useDidPropChangeAcrossRoutes("ItemView.nav.itemId", nav.itemId);

  if (nav.itemId == null) {
    return null;
  }

  return (
    <div
      key={nav.itemId}
      className={twMerge(
        "flex grow flex-col overflow-y-auto px-4 py-6 sm:items-end",
        didItemIdChange && "animate-fade",
        props.className,
      )}
    >
      <div className="grow" />
      <div className="w-[700px] max-w-full shrink-0">
        {searchParams.get("edit") != null && (
          <details className="rounded-md bg-gray-500/10 p-2">
            <summary className="cursor-pointer">Editor</summary>
            <div>itemId: {nav.itemId}</div>
            <ItemEditor />
          </details>
        )}
        {props.children}
      </div>

      <div className="grow" />
    </div>
  );
};

export default ItemView;
