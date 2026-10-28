"use client";

import { useId } from "react";
import clsx from "clsx";
import { NavLink } from "./NavLink";
import type { NavItem } from "./navItems";
import { dropdownItemClassName, navItemClassName } from "./navStyles";
import { useDisclosure } from "./useDisclosure";

type NavDropdownProps = {
  label: string;
  items: NavItem[];
};

function ChevronIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

// The same element is an accordion in the mobile menu and a floating panel on desktop,
// so the open state and the aria wiring live in one place.
export function NavDropdown({ label, items }: NavDropdownProps) {
  const { isOpen, toggle, containerRef, triggerRef, closeWhenFocusLeaves, closeWhenLinkClicked } =
    useDisclosure<HTMLDivElement, HTMLButtonElement>();
  const panelId = useId();

  return (
    <div ref={containerRef} onBlur={closeWhenFocusLeaves} className="lg:relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        className={clsx(navItemClassName, "cursor-pointer justify-between gap-1.5 lg:justify-start")}
      >
        {label}
        <ChevronIcon
          className={clsx("size-3 shrink-0 transition-transform duration-150 motion-reduce:transition-none", isOpen && "rotate-180")}
        />
      </button>

      <ul
        id={panelId}
        onClick={closeWhenLinkClicked}
        className={clsx(
          isOpen ? "block" : "hidden",
          "pl-4 transition-opacity duration-150 starting:opacity-0 motion-reduce:transition-none",
          "lg:absolute lg:top-full lg:right-0 lg:z-10 lg:mt-0.5 lg:w-max lg:border lg:border-ink lg:bg-paper lg:py-1 lg:pl-0",
        )}
      >
        {items.map((item) => (
          <li key={item.label}>
            <NavLink item={item} className={dropdownItemClassName} />
          </li>
        ))}
      </ul>
    </div>
  );
}
