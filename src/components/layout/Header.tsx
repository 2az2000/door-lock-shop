import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MAIN_NAV_LINKS } from "@/constants/navigation";
import { getSiteSettings } from "@/services/site-settings.service";

import { Container } from "./Container";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const siteSettings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground"
        >
          {siteSettings.logo ? (
            <Image
              src={siteSettings.logo.url}
              alt={siteSettings.logo.alt}
              width={36}
              height={36}
              className="rounded-lg object-contain"
            />
          ) : null}
          <span>{siteSettings.companyName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {MAIN_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
    </header>
  );
}
