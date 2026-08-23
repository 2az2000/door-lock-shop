"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      // Light is the default on every device: the OS scheme is deliberately
      // ignored, the visitor opts into dark with the header toggle.
      enableSystem={false}
      // `color-scheme` is declared in globals.css (`only light` / `only dark`)
      // so browsers cannot auto-darken the light theme; letting next-themes
      // write an inline `color-scheme: light` would undo that opt-out.
      enableColorScheme={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
