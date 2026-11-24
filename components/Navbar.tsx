"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Work", href: "/work" },
  { name: "Awards", href: "/awards" },
  { name: "Miracle Robotics", href: "/miracle-robotics" },
  { name: "Writing", href: "/writing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="type-heading whitespace-nowrap text-base sm:text-lg">
          Muhtasham M. Shafi
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap text-[0.9375rem] transition-colors hover:text-accent",
                  active ? "font-semibold text-text underline decoration-accent decoration-2 underline-offset-[0.45em]" : "text-muted"
                )}
              >
                {l.name}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="chamfer bg-accent px-4 py-2 text-[0.9375rem] font-semibold text-on-accent transition-colors [--cut:8px] hover:bg-text hover:text-bg"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            className="-mr-2 p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line px-5 pb-6 pt-2 lg:hidden">
          {[...links, { name: "Contact", href: "/#contact" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="type-heading block border-b border-line py-3.5 text-xl last:border-b-0"
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
