import Link from "next/link";
import { OliveLeafLogo } from "@/components/brand/OliveLeafLogo";
import { SiteNav } from "./SiteNav";
import { navItems } from "./navItems";

export function SiteHeader() {
  return (
    <header className="relative z-30 flex items-center justify-between px-4 pt-4 pb-2 lg:flex-col lg:justify-start lg:px-10 lg:pb-0">
      <Link
        href="/"
        aria-label="inicio"
        className="block shrink-0 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aegean"
      >
        <OliveLeafLogo className="block h-12 w-auto lg:h-16" />
      </Link>
      <SiteNav items={navItems} />
    </header>
  );
}
