import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import getDataUrlFromFile from "../extends/file/getDataUrlFromFile";
import { insertNodesAt } from "../items/DomManipulation";

function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

const ContentEditable: React.FC<{
  editorRef: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onUpdate?: (target: HTMLElement) => void;
}> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isHydrated = useIsHydrated();

  const [isDraggedOver, setIsDraggedOver] = useState(false);

  return (
    <div
      ref={(element) => {
        ref.current = element;
        props.editorRef.current = element;
        if (element) {
          props.onUpdate?.(element);
        }
      }}
      contentEditable={isHydrated}
      suppressContentEditableWarning
      className={twMerge(
        "relative",
        isDraggedOver &&
          // eslint-disable-next-line prefer-smart-quotes/prefer
          "before:absolute before:inset-0 before:flex before:items-center before:justify-center before:bg-yellow-500/50 before:content-['Insert_Image']",
        "selection:bg-blue-200 selection:text-black",
        props.className,
      )}
      onClick={props.onClick}
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

        const imgsToInsert: HTMLImageElement[] = [];
        const files = event.dataTransfer.files;
        for (const file of files) {
          if (!file.type.startsWith("image/")) continue;

          const dataUrl = await getDataUrlFromFile(file);

          const img = document.createElement("img");
          img.src = dataUrl;

          imgsToInsert.push(img);
        }

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

        insertNodesAt(range, imgsToInsert);

        props.onUpdate?.(element);
      }}
      onInput={(event) => {
        props.onUpdate?.(event.currentTarget);
      }}
    >
      {props.children}
    </div>
  );
};

export default ContentEditable;
