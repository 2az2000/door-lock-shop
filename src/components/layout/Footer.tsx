import Link from "next/link";
import { Camera, Mail, MessageCircle, Send } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { MAIN_NAV_LINKS } from "@/constants/navigation";
import { getSiteSettings } from "@/services/site-settings.service";

import { Container } from "./Container";

const socialLinkClassName =
  "flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export async function Footer() {
  const siteSettings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-muted/30 sm:mt-24">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-foreground">
            {siteSettings.companyName}
          </h3>
          {siteSettings.address ? (
            <p className="text-sm wrap-break-word text-muted-foreground">{siteSettings.address}</p>
          ) : null}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">دسترسی سریع</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {MAIN_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">اطلاعات تماس</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {siteSettings.phone ? (
              <li>
                <a href={`tel:${siteSettings.phone}`} className="hover:text-foreground">
                  {siteSettings.phone}
                </a>
              </li>
            ) : null}
            {siteSettings.mobile ? (
              <li>
                <a href={`tel:${siteSettings.mobile}`} className="hover:text-foreground">
                  {siteSettings.mobile}
                </a>
              </li>
            ) : null}
            {siteSettings.email ? (
              <li className="flex items-start gap-1.5">
                <Mail className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="wrap-break-word hover:text-foreground"
                >
                  {siteSettings.email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">شبکه‌های اجتماعی</h4>
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
            {siteSettings.whatsapp ? (
              <a
                href={`https://wa.me/${siteSettings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساپ"
                className={socialLinkClassName}
              >
                <MessageCircle className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </Container>

      <Separator />

      <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
        <p>{siteSettings.footerText ?? `© ${year} ${siteSettings.companyName}`}</p>
      </Container>
    </footer>
  );
}
