"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Light/dark switch. Icons are swapped with the `dark:` variant rather than
 * with React state so the server and client markup stay identical and no
 * hydration guard (or icon flash) is needed.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      id="theme-toggle-button"
      type="button"
      variant="ghost"
      size="icon"
      aria-label="تغییر حالت روشن و تیره"
      title="تغییر حالت روشن و تیره"
      className={cn("relative rounded-full text-muted-foreground hover:text-foreground", className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun
        id="theme-toggle-sun-icon"
        aria-hidden="true"
        className="size-4.5 scale-100 rotate-0 transition-transform duration-200 ease-out dark:scale-0 dark:-rotate-90"
      />
      <Moon
        id="theme-toggle-moon-icon"
        aria-hidden="true"
        className="absolute size-4.5 scale-0 rotate-90 transition-transform duration-200 ease-out dark:scale-100 dark:rotate-0"
      />
    </Button>
  );
}
