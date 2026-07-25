import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

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
      <Container className="flex h-16 items-center justify-between gap-2 transition-[height] duration-300 ease-out group-data-[scrolled=true]:h-14 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-base font-semibold text-foreground transition-transform duration-200 hover:scale-[1.03] sm:text-lg"
        >
          {siteSettings.logo ? (
            <Image
              src={siteSettings.logo.url}
              alt={siteSettings.logo.alt}
              width={36}
              height={36}
              className="size-9 rounded-lg object-contain transition-all duration-300 group-data-[scrolled=true]:size-8"
            />
          ) : null}
          <span className="max-w-35 truncate sm:max-w-none">{siteSettings.companyName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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

        <div className="flex items-center gap-2">
          {siteSettings.phone ? (
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
              nativeButton={false}
              render={<a href={`tel:${siteSettings.phone}`} />}
            >
              <Phone />
              {siteSettings.phone}
            </Button>
          ) : null}
          <MobileNav siteSettings={siteSettings} />
        </div>
      </Container>
    </HeaderScrollShell>
  );
}
