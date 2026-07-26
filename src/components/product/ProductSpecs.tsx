"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Layers, ListChecks, Palette, Ruler, Tag, Weight, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductDetail } from "@/types/product";
import { resolveSwatchColor } from "@/utils/color-swatch";

type SpecsTabValue = "description" | "specs";

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
  const [activeTab, setActiveTab] = useState<SpecsTabValue>("description");
  const hasSpecs = product.specifications.length > 0;
  const hasColors = product.colors.length > 0;
  const hasMaterials = product.materials.length > 0;
  const hasDimensions = Boolean(product.dimensions);
  const hasWeight = Boolean(product.weight);
  const hasSpecTable = hasSpecs || hasColors || hasMaterials || hasDimensions || hasWeight;
  const hasDescription = Boolean(product.fullDescriptionHtml);

  if (!hasDescription && !hasSpecTable) return null;

  const descriptionContent = (
    <div
      id={`product-description-content-${product.slug}`}
      className="space-y-3 text-sm leading-7 text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground"
      dangerouslySetInnerHTML={{ __html: product.fullDescriptionHtml as string }}
    />
  );

  const specsContent = (
    <dl
      id={`product-specs-content-${product.slug}`}
      className="divide-y divide-border overflow-hidden rounded-2xl border border-border"
    >
      {product.specifications.map((spec) => (
        <SpecRow key={spec.label} label={spec.label} value={spec.value} />
      ))}
      {hasMaterials ? <SpecRow label="جنس" value={product.materials.join("، ")} icon={Layers} /> : null}
      {hasColors ? <ColorSwatchRow colors={product.colors} /> : null}
      {hasDimensions ? (
        <SpecRow label="ابعاد" value={product.dimensions as string} icon={Ruler} />
      ) : null}
      {hasWeight ? <SpecRow label="وزن" value={product.weight as string} icon={Weight} /> : null}
    </dl>
  );

  if (hasDescription && hasSpecTable) {
    return (
      <div id={`product-specs-tabs-${product.slug}`}>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as SpecsTabValue)}
        >
          <TabsList
            variant="line"
            className="w-full justify-start gap-6 border-b border-border pb-0"
          >
            <TabsTrigger
              id={`product-tab-description-${product.slug}`}
              value="description"
              className="h-11 gap-2 px-1 text-base font-semibold data-active:text-primary after:bg-primary after:h-0.5"
            >
              <FileText className="size-4" aria-hidden="true" />
              توضیحات
            </TabsTrigger>
            <TabsTrigger
              id={`product-tab-specs-${product.slug}`}
              value="specs"
              className="h-11 gap-2 px-1 text-base font-semibold data-active:text-primary after:bg-primary after:h-0.5"
            >
              <ListChecks className="size-4" aria-hidden="true" />
              مشخصات فنی
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            id={`product-specs-panel-${activeTab}-${product.slug}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pt-6"
          >
            {activeTab === "description" ? descriptionContent : specsContent}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div id={`product-specs-single-${product.slug}`}>
      <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
        {hasDescription ? "توضیحات" : "مشخصات فنی"}
      </h2>
      {hasDescription ? descriptionContent : specsContent}
    </div>
  );
}
