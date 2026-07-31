// Ids under `src/app/[categoryId]/` that have a `page.tsx`. When adding or
// removing a page dir, update this set.
const idsWithPage = new Set(["dailycal", "pushpin"]);

export default function hasItemPage(id: string): boolean {
  return idsWithPage.has(id);
}
