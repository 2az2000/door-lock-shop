"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HeaderScrollShellProps {
  children: ReactNode;
}

const SCROLL_THRESHOLD = 16;

export function HeaderScrollShell({ children }: HeaderScrollShellProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "group sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-out",
        scrolled
          ? "border-border bg-background/95 shadow-md backdrop-blur-md"
          : "border-transparent bg-background/60 shadow-none backdrop-blur-sm",
      )}
    >
      {children}
    </header>
  );
}
