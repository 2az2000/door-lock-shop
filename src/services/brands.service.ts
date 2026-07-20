import { unstable_cache } from "next/cache";

import { toMediaAsset } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload-client";
import type { Brand as BrandDto } from "@/types/brand";
import type { Brand } from "@payload-types";

const toBrand = (brand: Brand): BrandDto => ({
  id: brand.id,
  title: brand.title,
  slug: brand.slug,
  logo: toMediaAsset(brand.logo),
});

const getBrandsUncached = async (): Promise<BrandDto[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "brands",
    sort: "title",
    limit: 100,
    depth: 1,
  });

  return result.docs.map(toBrand);
};

export const getBrands = unstable_cache(getBrandsUncached, ["brands", "list"], {
  revalidate: 60,
  tags: ["brands"],
});
