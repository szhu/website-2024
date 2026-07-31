import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const LinkStyle =
  "cursor-pointer transition-opacity duration-300 hover-supported:hover:opacity-60 active:duration-100 active:opacity-30 hover-supported:active:opacity-30";

function isAbsoluteUrl(href: unknown): boolean {
  if (typeof href !== "string") return false;
  try {
    new URL(href);
    return true;
  } catch {
    return false;
  }
}

const PageLink: React.FC<Partial<React.ComponentProps<typeof Link>>> = (
  props,
) => {
  const pathname = usePathname();
  const isExternal = isAbsoluteUrl(props.href);
  const isCurrent = !isExternal && pathname === props.href;

  const className = twMerge(
    !isCurrent && props.href != null && LinkStyle,
    props.className,
    isCurrent
      ? `relative before:absolute before:-left-4 before:bottom-0 before:top-0 before:flex before:items-center before:justify-center before:pt-[0.1em] before:text-[0.6rem] before:leading-none before:content-['▶︎']`
      : "",
  );

  const externalAttributes = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return props.href == null ? (
    <span {...props} className={className} />
  ) : (
    <Link
      {...externalAttributes}
      {...props}
      href={props.href}
      className={className}
      data-page-link
    />
  );
};

export default PageLink;
