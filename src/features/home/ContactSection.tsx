import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/types/site-settings";

interface ContactSectionProps {
  siteSettings: SiteSettings;
}

export function ContactSection({ siteSettings }: ContactSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="relative overflow-hidden rounded-3xl bg-primary/5 px-6 py-14 text-center sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-primary)_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.06]"
        />
        <div className="relative flex flex-col items-center gap-6">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            سوالی دارید؟ با ما در تماس باشید
          </h2>
          <p className="max-w-xl text-muted-foreground">
            کارشناسان ما آماده‌ی پاسخ‌گویی به سوالات شما درباره‌ی محصولات و انتخاب مناسب‌ترین گزینه هستند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {siteSettings.phone ? (
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href={`tel:${siteSettings.phone}`} />}
              >
                <Phone className="size-4" />
                {siteSettings.phone}
              </Button>
            ) : null}
            <Button size="lg" nativeButton={false} render={<Link href="/contact" />}>
              فرم تماس
              <ArrowLeft className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
