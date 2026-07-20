"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MAIN_NAV_LINKS } from "@/constants/navigation";
import type { SiteSettings } from "@/types/site-settings";

interface MobileNavProps {
  siteSettings: SiteSettings;
}

export function MobileNav({ siteSettings }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" />}
      >
        <Menu />
        <span className="sr-only">باز کردن منو</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>{siteSettings.companyName}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {MAIN_NAV_LINKS.map((link) => (
            <SheetClose
              key={link.href}
              render={<Link href={link.href} />}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>
        {siteSettings.phone ? (
          <div className="mt-auto flex items-center gap-2 border-t border-border px-4 py-4 text-sm text-muted-foreground">
            <Phone className="size-4" aria-hidden="true" />
            <a href={`tel:${siteSettings.phone}`} className="hover:text-foreground">
              {siteSettings.phone}
            </a>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
