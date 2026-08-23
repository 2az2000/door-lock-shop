"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Camera,
  Home,
  LayoutGrid,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  Package,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";

import { MediaImage } from "@/components/common/MediaImage";
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
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/site-settings";

const NAV_ICONS: Record<string, LucideIcon> = {
  "/": Home,
  "/products": Package,
  "/categories": LayoutGrid,
  "/articles": Newspaper,
  "/contact": MessageCircle,
};

const socialLinkClassName =
  "flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

interface MobileNavProps {
  siteSettings: SiteSettings;
}

export function MobileNav({ siteSettings }: MobileNavProps) {
  const pathname = usePathname();

  const hasContactRow = Boolean(siteSettings.phone || siteSettings.whatsapp);
  const hasSocialRow = Boolean(siteSettings.instagram || siteSettings.telegram || siteSettings.email);

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu />
        <span className="sr-only">باز کردن منو</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-xs">
        <SheetHeader className="flex-row items-center gap-2.5 border-b border-border pb-4">
          {siteSettings.logo ? (
            <MediaImage
              id="mobile-nav-logo"
              asset={siteSettings.logo}
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-lg object-contain"
            />
          ) : null}
          <SheetTitle className="truncate">{siteSettings.companyName}</SheetTitle>
        </SheetHeader>

        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4">
          {MAIN_NAV_LINKS.map((link) => {
            const Icon = NAV_ICONS[link.href];
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <SheetClose
                key={link.href}
                render={<Link href={link.href} />}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
                )}
              >
                {Icon ? <Icon className="size-4" aria-hidden="true" /> : null}
                {link.label}
              </SheetClose>
            );
          })}
        </nav>

        {hasContactRow || hasSocialRow ? (
          <div className="flex flex-col gap-3 border-t border-border px-4 pt-4">
            {hasContactRow ? (
              <div className="flex items-center gap-2">
                {siteSettings.phone ? (
                  <Button
                    size="sm"
                    className="flex-1"
                    nativeButton={false}
                    render={<a href={`tel:${siteSettings.phone}`} />}
                  >
                    <Phone />
                    تماس
                  </Button>
                ) : null}
                {siteSettings.whatsapp ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    nativeButton={false}
                    render={
                      <a
                        href={`https://wa.me/${siteSettings.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    <MessageCircle />
                    واتساپ
                  </Button>
                ) : null}
              </div>
            ) : null}

            {hasSocialRow ? (
              <div className="flex items-center gap-2">
                {siteSettings.instagram ? (
                  <a
                    href={siteSettings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="اینستاگرام"
                    className={socialLinkClassName}
                  >
                    <Camera className="size-4" />
                  </a>
                ) : null}
                {siteSettings.telegram ? (
                  <a
                    href={siteSettings.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="تلگرام"
                    className={socialLinkClassName}
                  >
                    <Send className="size-4" />
                  </a>
                ) : null}
                {siteSettings.email ? (
                  <a
                    href={`mailto:${siteSettings.email}`}
                    aria-label="ایمیل"
                    className={socialLinkClassName}
                  >
                    <Mail className="size-4" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
