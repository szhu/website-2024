"use client";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import getDataUrlFromFile from "../extends/file/getDataUrlFromFile";
import { useDidPropChangeAcrossRoutes } from "../extends/next/TrackPropsAcrossRoutes";

function insertNodeAt(range: Range, node: Node) {
  range.insertNode(node);
  range.setStartAfter(range.startContainer);
}

function compareElementPositionToCaret(element: Node): number | undefined {
  const selection = window.getSelection();
  if (!selection) return undefined;

  const range = selection.getRangeAt(0);

  if (
    range.startContainer.compareDocumentPosition(element) ===
    Node.DOCUMENT_POSITION_PRECEDING
  ) {
    return -1;
  } else if (
    range.endContainer.compareDocumentPosition(element) ===
    Node.DOCUMENT_POSITION_FOLLOWING
  ) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * 1. Outdent the element, splitting its parent into a "before" and "after" element
 * 2. If either the "before" or "after" element is empty, remove it
 */
function unnestChild(targetChild: Node, transform?: (child: Node) => Node) {
  const container = targetChild.parentElement;
  if (!container) return;

  const parent = container.parentElement;
  if (!parent) return;

  if ((compareElementPositionToCaret(targetChild) ?? 0) < 0) {
    const before = document.createElement(container.tagName);
    const after = container;
    while (after.firstChild) {
      const child = after.firstChild;
      if (child === targetChild) {
        child.remove();
        break;
      }

      before.append(child);
    }

    if (before.hasChildNodes()) {
      after.before(before);
    }

    after.before(transform ? transform(targetChild) : targetChild);

    if (!after.hasChildNodes()) {
      after.remove();
    }
  } else {
    const before = container;
    const after = document.createElement(before.tagName);

    let isAfter = false;
    for (const child of before.childNodes) {
      if (child === targetChild) {
        child.remove();
        isAfter = true;
      }

      if (isAfter) {
        after.append(child);
      }
    }

    if (after.hasChildNodes()) {
      before.after(after);
    }

    before.after(transform ? transform(targetChild) : targetChild);

    if (!before.hasChildNodes()) {
      before.remove();
    }
  }
}

function moveChildren(from: Element, to: Element) {
  while (from.firstChild) {
    to.append(from.firstChild);
  }
}

function unwrapElement(element: Element) {
  const parent = element.parentElement;
  if (!parent) return;

  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  element.remove();
}

const ContentEditable: React.FC<{
  className?: string;
  onUpdate?: (target: HTMLElement) => void;
}> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isDraggedOver, setIsDraggedOver] = useState(false);

  return (
    <div
      ref={(element) => {
        ref.current = element;
        if (element) {
          props.onUpdate?.(element);
        }
      }}
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
        className="min-h-20 border-collapse rounded-md border-1 border-black p-1 dark:border-white [&>p+p]:border-t-0 [&>p]:border-y-1 [&>p]:border-gray-500 [&>p]:py-2"
        onUpdate={(target) => {
          {
            // Remove all style and class attributes
            const els = target.querySelectorAll("[style],[class]");
            for (const element of els) {
              element.removeAttribute("style");
              element.removeAttribute("class");
            }
          }

          {
            // Unwrap all <div> and <span>
            const els = target.querySelectorAll("div,span");
            for (const element of els) {
              unwrapElement(element);
            }
          }

          {
            // Unnest all <img>
            const els = target.querySelectorAll(":scope > * > img");
            for (const element of els) {
              if (
                !element.parentElement ||
                element.parentElement.childNodes.length <= 1
              ) {
                return;
              }

              unnestChild(element, (img) => {
                const p = document.createElement("p");
                p.append(img);
                return p;
              });
            }
          }

          {
            // Wrap all outer non-<p> in <p>
            const children = [...target.childNodes];
            for (const child of children) {
              if (child instanceof HTMLParagraphElement) continue;

              const p = document.createElement("p");
              p.append(child);
              target.append(p);
            }
          }

          {
            // If there is no content, add an empty <p>
            if (target.childElementCount === 0) {
              const p = document.createElement("p");
              target.append(p);
            }
          }

          {
            // Put a <br> inside every empty <p>
            const els = target.querySelectorAll("p:empty");
            for (const element of els) {
              element.append(document.createElement("br"));
            }
          }

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
