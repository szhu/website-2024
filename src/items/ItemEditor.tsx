import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import ContentEditable from "../debug/ContentEditable";
import { save } from "../debug/LocalSaving";
import getDataUrlFromFile from "../extends/file/getDataUrlFromFile";
import { unnestChild, unwrapElement } from "./DomManipulation";

const ItemEditor: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const editorRef = useRef<HTMLElement>(null);
  const [savedAt, setSavedAt] = useState<Date>();

  const path = getComponentPath();

  return (
    <>
      <ContentEditable
        editorRef={editorRef}
        className={twMerge(
          "min-h-40 border-collapse whitespace-pre-wrap rounded-md border-1 border-black p-1 dark:border-white",
          "[&>p+p]:border-t-0 [&>p:first-child]:border-t-0 [&>p:last-child]:border-b-0 [&>p]:border-y-1 [&>p]:border-gray-500 [&>p]:py-2",
          "[&>p:has(>img)]:px-6 [&>p>img]:mx-auto [&>p>img]:size-auto [&>p>img]:max-h-72 [&>p>img]:cursor-pointer [&>p>img]:px-1 [&>p]:border-y-1",
        )}
        onClick={(event) => {
          if (event.target instanceof HTMLImageElement) {
            // Select the image if clicked
            const selection = window.getSelection();
            if (!selection) return;

            const range = document.createRange();
            range.selectNode(event.target);

            selection.removeAllRanges();
            selection.addRange(range);
          }
        }}
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
            const els = target.querySelectorAll(":not(p,img)");
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
                continue;
              }

              unnestChild(element, (img) => {
                const p = document.createElement("p");
                p.append(img);
                return p;
              });
            }
          }

          {
            // Inline all img srcs
            const els = target.querySelectorAll(
              `img[src^='http:'],img[src^='https:']`,
            );
            void Promise.resolve().then(async () => {
              for (const element of els) {
                if (!(element instanceof HTMLImageElement)) continue;

                const src = element.getAttribute("src");
                if (!src) continue;

                // const dataUrl = await window.fetch(src)
                //   .then((res) => res.blob())
                //   .then(getDataUrlFromFile);
                try {
                  const response = await window.fetch(src);
                  const blob = await response.blob();
                  const dataUrl = await getDataUrlFromFile(blob);
                  element.src = dataUrl;
                } catch (error) {
                  console.warn(error);
                  return;
                }
              }
            });
          }

          {
            // Wrap all outer non-<p> in <p>
            const children = [...target.childNodes];
            for (const child of children) {
              if (child instanceof HTMLParagraphElement) continue;

              const p = document.createElement("p");
              child.replaceWith(p);
              p.append(child);
            }
          }

          {
            // For every empty <p>, add a <br> if the cursor is inside it;
            // otherwise, remove it.
            const els = target.querySelectorAll("p");
            for (const element of els) {
              const isEmpty = element.childNodes.length === 0;
              const hasOnlySingleBr =
                element.childNodes.length === 1 &&
                element.firstChild?.nodeName === "BR";

              if (isEmpty || hasOnlySingleBr) {
                const selection = window.getSelection();
                if (!selection) return;

                if (element.contains(selection.anchorNode)) {
                  if (isEmpty) {
                    element.append(document.createElement("br"));
                  }
                } else {
                  element.remove();
                }
              }
            }
          }

          {
            // If there is no content, add an empty <p>
            if (target.childElementCount === 0) {
              const p = document.createElement("p");
              p.append(document.createElement("br"));
              target.append(p);
            }
          }
        }}
      >
        {props.children}
      </ContentEditable>
      <button
        className="my-2 rounded-md border-1 border-black p-1 dark:border-white"
        onClick={async () => {
          if (!editorRef.current) return;

          const code = getComponentCode(editorRef.current);

          await save(path, code);
          setSavedAt(new Date());
        }}
      >
        💾 <code className="text-sm">{path}</code>{" "}
        <span
          key={savedAt?.toISOString()}
          className={savedAt ? "animate-fade-200" : "invisible"}
        >
          ✔
        </span>
      </button>
    </>
  );
};

export default ItemEditor;

function getComponentPath() {
  return window.location.pathname.replaceAll(/^\/|\/$/g, "") + "/page.tsx";
}

function getComponentCode(editor: HTMLElement) {
  const fragment = document.createElement("body");
  for (const child of editor.childNodes) {
    fragment.append(child.cloneNode(true));
  }

  const serializer = new XMLSerializer();
  let xhtml = serializer.serializeToString(fragment);

  const ExpectedPrefix = `<body xmlns="http://www.w3.org/1999/xhtml">`;
  const ExpectedSuffix = `</body>`;

  if (xhtml.startsWith(ExpectedPrefix) && xhtml.endsWith(ExpectedSuffix)) {
    xhtml = xhtml.slice(ExpectedPrefix.length, -ExpectedSuffix.length);
  }

  const ComponentPrefix = `
/* eslint-disable @next/next/no-img-element */

const page: React.FC<unknown> = () => {
  return (
    <>
`;

  const ComponentSuffix = `
    </>
  );
};

export default page;
`;

  const componentCode = ComponentPrefix + xhtml + ComponentSuffix;
  return componentCode;
}
