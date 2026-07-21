import type { ProductDetail } from "@/types/product";

interface ProductSpecsProps {
  product: ProductDetail;
}

interface SpecRowProps {
  label: string;
  value: string;
}

function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm odd:bg-muted/30">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const hasSpecs = product.specifications.length > 0;
  const hasColors = product.colors.length > 0;
  const hasMaterials = product.materials.length > 0;
  const hasDimensions = Boolean(product.dimensions);
  const hasWeight = Boolean(product.weight);
  const hasSpecTable = hasSpecs || hasColors || hasMaterials || hasDimensions || hasWeight;

  if (!product.fullDescriptionHtml && !hasSpecTable) return null;

  return (
    <div className="flex flex-col gap-8">
      {product.fullDescriptionHtml ? (
        <div>
          <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">توضیحات</h2>
          <div
            className="space-y-3 text-sm leading-7 text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: product.fullDescriptionHtml }}
          />
        </div>
      ) : null}

      {hasSpecTable ? (
        <div>
          <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">مشخصات فنی</h2>
          <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {product.specifications.map((spec) => (
              <SpecRow key={spec.label} label={spec.label} value={spec.value} />
            ))}
            {hasMaterials ? <SpecRow label="جنس" value={product.materials.join("، ")} /> : null}
            {hasColors ? <SpecRow label="رنگ‌بندی" value={product.colors.join("، ")} /> : null}
            {hasDimensions ? <SpecRow label="ابعاد" value={product.dimensions as string} /> : null}
            {hasWeight ? <SpecRow label="وزن" value={product.weight as string} /> : null}
          </dl>
        </div>
      ) : null}
    </div>
  );
}
