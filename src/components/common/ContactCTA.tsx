import { MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/site-settings";

interface ContactCTAProps {
  siteSettings: SiteSettings;
  message?: string;
  className?: string;
}

function buildWhatsappHref(whatsapp: string, message?: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function ContactCTA({ siteSettings, message, className }: ContactCTAProps) {
  if (!siteSettings.phone && !siteSettings.whatsapp) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {siteSettings.phone ? (
        <Button size="lg" nativeButton={false} render={<a href={`tel:${siteSettings.phone}`} />}>
          <Phone className="size-4" />
          تماس با ما
        </Button>
      ) : null}
      {siteSettings.whatsapp ? (
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={
            <a
              href={buildWhatsappHref(siteSettings.whatsapp, message)}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <MessageCircle className="size-4" />
          واتس‌اپ
        </Button>
      ) : null}
    </div>
  );
}
