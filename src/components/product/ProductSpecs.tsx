import { Layers, Palette, Ruler, Tag, Weight, type LucideIcon } from "lucide-react";

import type { ProductDetail } from "@/types/product";
import { resolveSwatchColor } from "@/utils/color-swatch";

interface ProductSpecsProps {
  product: ProductDetail;
}

interface SpecRowProps {
  label: string;
  value: string;
  icon?: LucideIcon;
}

function SpecRow({ label, value, icon: Icon = Tag }: SpecRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5 text-sm odd:bg-muted/30">
      <dt className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
        {label}
      </dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ColorSwatchRow({ colors }: { colors: string[] }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5 text-sm odd:bg-muted/30">
      <dt className="flex items-center gap-2 text-muted-foreground">
        <Palette className="size-4 shrink-0 text-primary" aria-hidden="true" />
        رنگ‌بندی
      </dt>
      <dd className="flex flex-wrap items-center justify-end gap-2">
        {colors.map((color) => (
          <span
            key={color}
            className="flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pr-1 pl-2.5"
          >
            <span
              className="size-4 rounded-full ring-1 ring-black/10"
              style={{ backgroundColor: resolveSwatchColor(color) }}
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-foreground">{color}</span>
          </span>
        ))}
      </dd>
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
            {hasMaterials ? (
              <SpecRow label="جنس" value={product.materials.join("، ")} icon={Layers} />
            ) : null}
            {hasColors ? <ColorSwatchRow colors={product.colors} /> : null}
            {hasDimensions ? (
              <SpecRow label="ابعاد" value={product.dimensions as string} icon={Ruler} />
            ) : null}
            {hasWeight ? (
              <SpecRow label="وزن" value={product.weight as string} icon={Weight} />
            ) : null}
          </dl>
        </div>
      ) : null}
    </div>
  );
}
