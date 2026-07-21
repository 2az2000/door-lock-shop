import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

import { JsonLd } from "@/components/common/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SITE_URL } from "@/constants/site";
import { ThemeProvider } from "@/providers/theme-provider";
import { getSiteSettings } from "@/services/site-settings.service";
import { organizationJsonLd } from "@/utils/structured-data";

const vazirmatn = Vazirmatn({
  variable: "--font-sans",
  subsets: ["arabic"],
});

const DEFAULT_TITLE = "قفل و دستگیره در";
const DEFAULT_DESCRIPTION = "کاتالوگ محصولات قفل، دستگیره و لوازم یراق‌آلات درب";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const title = siteSettings.seoDefaults.seoTitle || DEFAULT_TITLE;
  const description = siteSettings.seoDefaults.seoDescription || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${siteSettings.companyName || DEFAULT_TITLE}`,
    },
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: siteSettings.companyName || DEFAULT_TITLE,
      title,
      description,
      ...(siteSettings.logo ? { images: [{ url: siteSettings.logo.url }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd(siteSettings)} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          پرش به محتوای اصلی
        </a>
        <ThemeProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
