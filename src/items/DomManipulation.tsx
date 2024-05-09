export function insertNodesAt(range: Range, nodes: Node[]) {
  for (const node of nodes) {
    range.insertNode(node);
  }
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

export function unnestChild(
  targetChild: Node,
  transform?: (child: Node) => Node,
) {
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

export function moveChildren(from: Element, to: Element) {
  while (from.firstChild) {
    to.append(from.firstChild);
  }
}

export function unwrapElement(element: Element) {
  const parent = element.parentElement;
  if (!parent) return;

  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  element.remove();
}
