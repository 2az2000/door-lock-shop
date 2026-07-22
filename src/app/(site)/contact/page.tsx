import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Send, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

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

function ContactInfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-4 text-primary" aria-hidden="true" />
      </div>
      <div className="space-y-0.5 pt-1.5">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="text-sm font-medium text-foreground">{children}</div>
      </div>
    </div>
  );
}

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
        <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <Send className="size-4 text-primary" aria-hidden="true" />
            <h2 className="font-heading text-base font-semibold text-foreground">
              فرم ارسال پیام
            </h2>
          </div>
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div className="space-y-5 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 sm:p-8">
            {siteSettings.phone ? (
              <ContactInfoRow icon={Phone} label="تلفن ثابت">
                <a href={`tel:${siteSettings.phone}`} className="hover:text-primary">
                  {siteSettings.phone}
                </a>
              </ContactInfoRow>
            ) : null}
            {siteSettings.mobile ? (
              <ContactInfoRow icon={Phone} label="تلفن همراه">
                <a href={`tel:${siteSettings.mobile}`} className="hover:text-primary">
                  {siteSettings.mobile}
                </a>
              </ContactInfoRow>
            ) : null}
            {siteSettings.email ? (
              <ContactInfoRow icon={Mail} label="ایمیل">
                <a href={`mailto:${siteSettings.email}`} className="wrap-break-word hover:text-primary">
                  {siteSettings.email}
                </a>
              </ContactInfoRow>
            ) : null}
            {siteSettings.address ? (
              <ContactInfoRow icon={MapPin} label="آدرس">
                <span className="wrap-break-word font-normal text-muted-foreground">
                  {siteSettings.address}
                </span>
              </ContactInfoRow>
            ) : null}
          </div>

          {siteSettings.workingHours.length > 0 ? (
            <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="size-4 text-primary" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-foreground">ساعات کاری</h2>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {siteSettings.workingHours.map((entry) => (
                  <li
                    key={entry.day}
                    className="flex items-center justify-between border-b border-border pb-2 last:border-b-0 last:pb-0"
                  >
                    <span>{entry.day}</span>
                    <span className="font-medium text-foreground">{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {siteSettings.googleMap ? (
            isEmbeddableMap ? (
              <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/10">
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
