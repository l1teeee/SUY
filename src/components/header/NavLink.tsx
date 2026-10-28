"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./navItems";

type NavLinkProps = {
  item: NavItem;
  className: string;
};

export function NavLink({ item, className }: NavLinkProps) {
  const pathname = usePathname();

  if (!item.href) {
    return <a className={className}>{item.label}</a>;
  }

  return (
    <Link
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      className={className}
    >
      {item.label}
    </Link>
  );
}
