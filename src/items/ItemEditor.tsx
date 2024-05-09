import { useRef, useState } from "react";
import ContentEditable from "../debug/ContentEditable";
import getDataUrlFromFile from "../extends/file/getDataUrlFromFile";
import { unnestChild, unwrapElement } from "./DomManipulation";

export default function ItemEditor() {
  const editorRef = useRef<HTMLElement>(null);
  const [copiedAt, setCopiedAt] = useState<Date>();

  return (
    <>
      <ContentEditable
        editorRef={editorRef}
        className="min-h-40 border-collapse whitespace-pre-wrap rounded-md border-1 border-black p-1 dark:border-white [&>p+p]:border-t-0 [&>p:first-child]:border-t-0 [&>p:has(>img)]:px-6  [&>p:last-child]:border-b-0 [&>p>img]:mx-auto [&>p>img]:max-h-72 [&>p>img]:cursor-pointer [&>p>img]:px-1 [&>p]:border-y-1 [&>p]:border-gray-500 [&>p]:py-2"
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
                const response = await window.fetch(src);
                const blob = await response.blob();
                const dataUrl = await getDataUrlFromFile(blob);

                element.src = dataUrl;
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
      />

      <button
        onClick={async () => {
          if (!editorRef.current) return;

          const fragment = document.createElement("body");
          for (const child of editorRef.current.childNodes) {
            fragment.append(child.cloneNode(true));
          }

          const serializer = new XMLSerializer();
          let xhtml = serializer.serializeToString(fragment);

          const ExpectedPrefix = `<body xmlns="http://www.w3.org/1999/xhtml">`;
          const ExpectedSuffix = `</body>`;

          if (
            xhtml.startsWith(ExpectedPrefix) &&
            xhtml.endsWith(ExpectedSuffix)
          ) {
            xhtml = xhtml.slice(ExpectedPrefix.length, -ExpectedSuffix.length);
          }

          await navigator.clipboard.writeText(xhtml);
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
    </>
  );
}
