import { unstable_cache } from "next/cache";

import { toMediaAsset } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload-client";
import type { SiteSettings } from "@/types/site-settings";
import type { SiteSetting } from "@payload-types";

const toSiteSettings = (settings: SiteSetting): SiteSettings => ({
  companyName: settings.companyName,
  logo: toMediaAsset(settings.logo),
  phone: settings.phone ?? null,
  mobile: settings.mobile ?? null,
  whatsapp: settings.whatsapp ?? null,
  email: settings.email ?? null,
  address: settings.address ?? null,
  googleMap: settings.googleMap ?? null,
  instagram: settings.instagram ?? null,
  telegram: settings.telegram ?? null,
  workingHours: (settings.workingHours ?? []).map((entry) => ({
    day: entry.day,
    hours: entry.hours,
  })),
  footerText: settings.footerText ?? null,
  seoDefaults: {
    seoTitle: settings.seoDefaults?.seoTitle ?? null,
    seoDescription: settings.seoDefaults?.seoDescription ?? null,
  },
});

const getSiteSettingsUncached = async (): Promise<SiteSettings> => {
  const payload = await getPayloadClient();

  const settings = await payload.findGlobal({
    slug: "site-settings",
    depth: 1,
  });

  return toSiteSettings(settings);
};

export const getSiteSettings = unstable_cache(getSiteSettingsUncached, ["site-settings"], {
  revalidate: 60,
  tags: ["site-settings"],
});
