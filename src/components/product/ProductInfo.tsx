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
    <div className="flex flex-col gap-4">
      {product.category || product.brand ? (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {product.category ? <span>{product.category.title}</span> : null}
          {product.category && product.brand ? <span aria-hidden="true">·</span> : null}
          {product.brand ? <span>{product.brand.title}</span> : null}
        </div>
      ) : null}

      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {product.title}
      </h1>

      {product.shortDescription ? (
        <p className="text-muted-foreground">{product.shortDescription}</p>
      ) : null}

      <p className="text-xl font-semibold text-foreground sm:text-2xl">
        {formatPrice(product.price, product.priceLabel)}
      </p>

      <ContactCTA
        siteSettings={siteSettings}
        message={`سلام، درباره‌ی محصول «${product.title}» سوال داشتم.`}
      />
    </div>
  );
}
