import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const PageLink: React.FC<Partial<React.ComponentProps<typeof Link>>> = (
  props,
) => {
  const pathname = usePathname();
  const isCurrent = pathname === props.href;

  const className = twMerge(
    "relative transition-opacity duration-200",
    !isCurrent && props.href != null && "hover-supported:hover:opacity-50",
    props.className,
    isCurrent
      ? `before:absolute before:-left-4 before:bottom-0 before:top-0 before:flex before:items-center before:justify-center before:pt-[0.1em] before:text-xs before:leading-none before:content-['▶']`
      : "",
  );

  return props.href == null ? (
    <span {...props} className={className} />
  ) : (
    <Link {...props} href={props.href} className={className} data-page-link />
  );
};

export default PageLink;
