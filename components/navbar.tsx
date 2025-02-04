import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Search from "./search";
import Anchor from "./anchor";
import { page_routes } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import { SheetLeftbar } from "./SheetLeftBar";
import { BasePath } from "./global_constants";

export const NAVLINKS = [
  {
    title: "Content",
    href: `/${BasePath.CONTENT}${page_routes[2].href}`,
  },
  {
    title: "Schedule",
    href: `/${BasePath.SCHEDULE}`,
  },
  {
    title: "About DISC",
    href: `/${BasePath.ABOUT}`,
  },
];

export function Navbar() {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search />
            <div className="flex ml-2.5 sm:ml-0">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 5.1807 9.9704 L 1.7226 7.0688 L 4.6243 3.6107 L 10.4804 9.5067 L 13.3821 6.0487 L 9.924 3.147"
          stroke="currentColor"
          strokeWidth="2"
          fillRule="nonzero"
        ></path>
      </svg>
      <h2 className="text-md font-bold">DISC Workshop Series</h2>
    </Link>
  );
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="!text-primary md:font-semibold font-medium"
            absolute
            className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800"
            href={item.href}
          >
            {item.title}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
