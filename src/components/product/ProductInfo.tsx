import { ContactCTA } from "@/components/common/ContactCTA";
import type { ProductDetail } from "@/types/product";
import type { SiteSettings } from "@/types/site-settings";
import { formatPrice } from "@/utils/format-price";

interface ProductInfoProps {
  product: ProductDetail;
  siteSettings: SiteSettings;
}

export function ProductInfo({ product, siteSettings }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-5">
      {product.category || product.brand ? (
        <div className="flex flex-wrap items-center gap-2">
          {product.category ? (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {product.category.title}
            </span>
          ) : null}
          {product.brand ? (
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {product.brand.title}
            </span>
          ) : null}
        </div>
      ) : null}

      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {product.title}
      </h1>

      {product.shortDescription ? (
        <p className="leading-7 text-muted-foreground">{product.shortDescription}</p>
      ) : null}

      <div className="border-y border-border py-4">
        <span className="text-xl font-semibold text-foreground sm:text-2xl">
          {formatPrice(product.price, product.priceLabel)}
        </span>
      </div>

      <div className="rounded-2xl bg-muted/40 p-5">
        <p className="mb-3 text-sm font-medium text-foreground">
          برای اطلاعات بیشتر و مشاوره‌ی خرید با ما در تماس باشید
        </p>
        <ContactCTA
          siteSettings={siteSettings}
          message={`سلام، درباره‌ی محصول «${product.title}» سوال داشتم.`}
        />
      </div>
    </div>
  );
}
