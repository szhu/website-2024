"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import getDataUrlFromFile from "../extends/file/getDataUrlFromFile";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";

function insertNodeAt(range: Range, node: Node) {
  range.insertNode(document.createElement("br"));
  range.insertNode(document.createElement("br"));
  range.insertNode(node);
  range.insertNode(document.createElement("br"));
  range.insertNode(document.createElement("br"));
  range.setStartAfter(range.startContainer);
}

const ContentEditable: React.FC<{
  className?: string;
  onUpdate?: (target: HTMLElement) => void;
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const initialOnUpdateRef = useRef(props.onUpdate);
  useEffect(() => {
    if (ref.current == null) return;

    initialOnUpdateRef.current?.(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      contentEditable
      className={twMerge(
        "relative",
        isDraggedOver &&
          // eslint-disable-next-line prefer-smart-quotes/prefer
          "before:absolute before:inset-0 before:flex before:items-center before:justify-center before:bg-yellow-500/50 before:content-['Insert_Image']",
        "selection:bg-blue-200 selection:text-black",
        props.className,
      )}
      onDragOver={() => {
        const selection = window.getSelection();
        if (!selection) return;

        if (selection.rangeCount < 1) return;

        setIsDraggedOver(true);
      }}
      onDragLeave={() => {
        setIsDraggedOver(false);
      }}
      onDragEnd={() => {
        setIsDraggedOver(false);
      }}
      onDrop={async (event) => {
        setIsDraggedOver(false);
        const element = event.currentTarget;

        event.preventDefault();
        console.log(event);

        const files = event.dataTransfer.files;
        for (const file of files) {
          if (!file.type.startsWith("image/")) continue;

          const dataUrl = await getDataUrlFromFile(file);

          const img = document.createElement("img");
          img.src = dataUrl;

          element.focus();
          const selection = window.getSelection();
          if (!selection) {
            console.warn("No selection");
            return;
          }

          selection.collapseToEnd();
          const range = selection.getRangeAt(0);
          if (
            !element.contains(range.startContainer) ||
            !element.contains(range.endContainer)
          ) {
            console.warn("Selection is outside of container");
            return;
          }

          insertNodeAt(range, img);
        }

        props.onUpdate?.(element);
      }}
      onInput={(event) => {
        props.onUpdate?.(event.currentTarget);
      }}
    />
  );
};

const ItemView: React.FC<{
  className?: string;
}> = (props) => {
  const params = useParams<{ itemId: string }>();

  const didItemIdChange = //
    useDidPropChangeAcrossRoutes("ItemView.itemId", params.itemId);

  const htmlRef = useRef<string>();

  const [copiedAt, setCopiedAt] = useState<Date>();

  return (
    <div
      className={twMerge(
        "flex max-w-[450px] grow flex-col overflow-y-auto px-4 py-6 [&>*]:shrink-0",
        didItemIdChange && "animate-fade",
        props.className,
      )}
    >
      <div className="grow" />
      <div>{params.itemId}</div>

      <ContentEditable
        className="min-h-20 rounded-md border-1 border-black p-1 dark:border-white"
        onUpdate={(target) => {
          htmlRef.current = target.innerHTML;
        }}
      />

      <button
        onClick={async () => {
          if (htmlRef.current == null) return;

          await navigator.clipboard.writeText(htmlRef.current);
          setCopiedAt(new Date());
        }}
      >
        Copy HTML{" "}
        <span
          key={copiedAt?.toISOString()}
          className={copiedAt ? "animate-fade" : "invisible"}
        >
          ✔
        </span>
      </button>
      <div className="grow" />
    </div>
  );
};

export default ItemView;
