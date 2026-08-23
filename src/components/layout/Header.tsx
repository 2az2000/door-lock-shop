import Link from "next/link";
import { Phone } from "lucide-react";

import { MediaImage } from "@/components/common/MediaImage";
import { Pulse } from "@/components/common/Pulse";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MAIN_NAV_LINKS } from "@/constants/navigation";
import { getSiteSettings } from "@/services/site-settings.service";

import { Container } from "./Container";
import { HeaderScrollShell } from "./HeaderScrollShell";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const siteSettings = await getSiteSettings();

  return (
    <HeaderScrollShell>
      {/* Mobile is a three-column grid so the brand sits dead centre regardless of
          how wide the two action clusters are; `md` switches back to the flex
          row (brand, nav, actions) the desktop layout needs. */}
      <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 transition-[height] duration-300 ease-out group-data-[scrolled=true]:h-14 sm:gap-4 md:flex md:justify-between">
        <div id="header-menu-slot" className="flex items-center justify-self-start md:hidden">
          <MobileNav siteSettings={siteSettings} />
        </div>

        <Link
          id="header-brand"
          href="/"
          className="flex items-center gap-2 justify-self-center font-heading text-base font-semibold text-foreground transition-transform duration-200 hover:scale-[1.03] sm:text-lg md:order-1 md:justify-self-auto"
        >
          {siteSettings.logo ? (
            <MediaImage
              id="header-logo"
              asset={siteSettings.logo}
              width={36}
              height={36}
              priority
              className="size-9 rounded-lg object-contain transition-all duration-300 group-data-[scrolled=true]:size-8"
            />
          ) : null}
          <span className="max-w-35 truncate sm:max-w-none">{siteSettings.companyName}</span>
        </Link>

        <nav id="header-nav" className="hidden items-center gap-1 md:order-2 md:flex">
          {MAIN_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          id="header-actions"
          className="flex items-center gap-1 justify-self-end md:order-3 md:gap-2 md:justify-self-auto"
        >
          <ThemeToggle />
          {siteSettings.phone ? (
            <>
              {/* The number itself only earns its width from `md` up; below that
                  it collapses to an icon beside the theme toggle. */}
              <Button
                id="header-phone-button"
                variant="outline"
                size="sm"
                className="hidden items-center gap-2 rounded-full border-primary/20 bg-primary/5 px-4 hover:bg-primary/10 md:inline-flex"
                nativeButton={false}
                render={<a href={`tel:${siteSettings.phone}`} />}
              >
                <Pulse className="inline-flex text-primary">
                  <Phone />
                </Pulse>
                <span className="self-center font-semibold">{siteSettings.phone}</span>
              </Button>
              <Button
                id="header-phone-icon"
                variant="ghost"
                size="icon"
                aria-label={`تماس با ${siteSettings.phone}`}
                className="rounded-full text-muted-foreground hover:text-foreground md:hidden"
                nativeButton={false}
                render={<a href={`tel:${siteSettings.phone}`} />}
              >
                <Phone className="size-4.5" />
              </Button>
            </>
          ) : null}
        </div>
      </Container>
    </HeaderScrollShell>
  );
}
