import type { MediaAsset } from "./media";

export interface WorkingHoursEntry {
  day: string;
  hours: string;
}

export interface SiteSettings {
  companyName: string;
  logo: MediaAsset | null;
  phone: string | null;
  mobile: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  googleMap: string | null;
  instagram: string | null;
  telegram: string | null;
  workingHours: WorkingHoursEntry[];
  footerText: string | null;
  seoDefaults: {
    seoTitle: string | null;
    seoDescription: string | null;
  };
}
