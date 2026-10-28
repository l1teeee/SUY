import clsx from "clsx";

const navTextClassName = clsx(
  "font-display text-base leading-6 font-[350] tracking-[0.06em] text-ink lg:text-[0.95rem]",
  "transition-colors duration-150 hover:text-aegean aria-[current=page]:text-aegean motion-reduce:transition-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aegean",
);

// Stacked rows are 44px tall touch targets in the mobile menu; on desktop they become compact row items.
export const navItemClassName = clsx(
  navTextClassName,
  "flex min-h-11 w-full items-center px-2",
  "lg:min-h-0 lg:py-1.5",
);

export const dropdownItemClassName = clsx(
  navTextClassName,
  "flex min-h-11 w-full items-center px-2",
  "lg:min-h-0 lg:px-4 lg:py-2 lg:whitespace-nowrap",
);
