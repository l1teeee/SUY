"use client";

import { useId } from "react";
import clsx from "clsx";
import { NavDropdown } from "./NavDropdown";
import { NavLink } from "./NavLink";
import type { NavItem } from "./navItems";
import { navItemClassName } from "./navStyles";
import { useDisclosure } from "./useDisclosure";

type SiteNavProps = {
  items: NavItem[];
};

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {isOpen ? (
        <>
          <path d="M5.5 5.8C9.5 9.4 14.8 14.7 18.6 18.4" />
          <path d="M18.5 5.6C14.6 9.6 9.4 14.6 5.4 18.5" />
        </>
      ) : (
        <>
          <path d="M3 6.6C8 6 15 7.1 21 6.3" />
          <path d="M3 12.3C9 12 14 12.8 21 12" />
          <path d="M3 17.9C8 18.4 15 17.6 21 18.2" />
        </>
      )}
    </svg>
  );
}

// A single markup serves both layouts so the links are never duplicated for screen readers.
export function SiteNav({ items }: SiteNavProps) {
  const { isOpen, toggle, containerRef, triggerRef, closeWhenFocusLeaves, closeWhenLinkClicked } =
    useDisclosure<HTMLDivElement, HTMLButtonElement>();
  const panelId = useId();

  return (
    <div ref={containerRef} onBlur={closeWhenFocusLeaves}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label="menú"
        onClick={toggle}
        className="-mr-2.5 grid size-11 cursor-pointer place-items-center text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aegean lg:hidden"
      >
        <MenuIcon isOpen={isOpen} />
      </button>

      <nav
        id={panelId}
        aria-label="principal"
        onClick={closeWhenLinkClicked}
        className={clsx(
          isOpen ? "block" : "hidden",
          "absolute inset-x-0 top-full max-h-[calc(100svh-4.5rem)] overflow-y-auto border-y border-ink bg-paper px-2 py-2",
          "transition-opacity duration-150 max-lg:starting:opacity-0 motion-reduce:transition-none",
          "lg:static lg:block lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0",
        )}
      >
        <ul className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-1.5">
          {items.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <NavDropdown label={item.label} items={item.children} />
              ) : (
                <NavLink item={item} className={navItemClassName} />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
