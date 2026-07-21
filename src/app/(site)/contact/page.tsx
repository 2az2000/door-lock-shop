import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/features/contact/ContactForm";
import { getSiteSettings } from "@/services/site-settings.service";

const TITLE = "تماس با ما";
const DESCRIPTION = "راه‌های ارتباطی با فروشگاه قفل و دستگیره";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact", type: "website" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  const isEmbeddableMap = Boolean(siteSettings.googleMap?.includes("/maps/embed"));

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "خانه", href: "/" }, { label: "تماس با ما" }]} />

      <div className="mt-4 space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          تماس با ما
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          سوالات خود را برای ما ارسال کنید یا مستقیم با ما تماس بگیرید.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div className="space-y-3 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10">
            {siteSettings.phone ? (
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Phone className="size-4 text-muted-foreground" aria-hidden="true" />
                <a href={`tel:${siteSettings.phone}`} className="hover:text-primary">
                  {siteSettings.phone}
                </a>
              </div>
            ) : null}
            {siteSettings.mobile ? (
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Phone className="size-4 text-muted-foreground" aria-hidden="true" />
                <a href={`tel:${siteSettings.mobile}`} className="hover:text-primary">
                  {siteSettings.mobile}
                </a>
              </div>
            ) : null}
            {siteSettings.email ? (
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Mail className="size-4 text-muted-foreground" aria-hidden="true" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-primary">
                  {siteSettings.email}
                </a>
              </div>
            ) : null}
            {siteSettings.address ? (
              <div className="flex items-start gap-3 text-sm text-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>{siteSettings.address}</span>
              </div>
            ) : null}
          </div>

          {siteSettings.workingHours.length > 0 ? (
            <div className="space-y-2 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10">
              <h2 className="text-sm font-semibold text-foreground">ساعات کاری</h2>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {siteSettings.workingHours.map((entry) => (
                  <li key={entry.day} className="flex items-center justify-between">
                    <span>{entry.day}</span>
                    <span>{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {siteSettings.googleMap ? (
            isEmbeddableMap ? (
              <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
                <iframe
                  src={siteSettings.googleMap}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="نقشه موقعیت مکانی"
                />
              </div>
            ) : (
              <a
                href={siteSettings.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-card p-6 text-sm font-medium text-primary shadow-sm ring-1 ring-foreground/10 transition-colors hover:bg-muted"
              >
                <MapPin className="size-4" aria-hidden="true" />
                مشاهده روی نقشه
              </a>
            )
          ) : null}
        </div>
      </div>
    </Container>
  );
}
