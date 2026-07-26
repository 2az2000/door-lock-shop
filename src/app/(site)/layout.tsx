import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { JsonLd } from "@/components/common/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SITE_URL } from "@/constants/site";
import { ThemeProvider } from "@/providers/theme-provider";
import { getSiteSettings } from "@/services/site-settings.service";
import { organizationJsonLd } from "@/utils/structured-data";

const peyda = localFont({
  src: [
    { path: "../../../public/font/Peyda Pro/Peyda-Thin.ttf", weight: "100", style: "normal" },
    { path: "../../../public/font/Peyda Pro/peyda-extralight.ttf", weight: "200", style: "normal" },
    { path: "../../../public/font/Peyda Pro/peyda-light.ttf", weight: "300", style: "normal" },
    { path: "../../../public/font/Peyda Pro/Peyda-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../../public/font/Peyda Pro/Peyda-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../../public/font/Peyda Pro/Peyda-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../../public/font/Peyda Pro/Peyda-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../../public/font/Peyda Pro/Peyda-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../../public/font/Peyda Pro/Peyda-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-sans",
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
      className={`${peyda.variable} h-full antialiased`}
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
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
