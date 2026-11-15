"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-serif text-2xl leading-none">
          Muhtasham Shafi
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors hover:text-text",
                pathname.startsWith(l.href) ? "text-text" : "text-muted"
              )}
            >
              {l.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-text px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            Get in touch
          </Link>
        </div>

        <button
          className="-mr-2 p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line px-4 pb-6 pt-2 md:hidden">
          {[...links, { name: "Contact", href: "/#contact" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg"
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
