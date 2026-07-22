import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { CategorySummary } from "@/types/category";

interface HeroProps {
  companyName: string;
  categories: CategorySummary[];
  brandsCount: number;
}

export function Hero({ companyName, categories, brandsCount }: HeroProps) {
  const visualCategories = categories.filter((category) => category.image).slice(0, 2);

  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
      />

      <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {companyName}
          </span>

          <h1 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            قفل و دستگیره‌ای برای هر درب، با کیفیتی که به آن اعتماد دارید
          </h1>

          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            مجموعه‌ای کامل از قفل‌ها، دستگیره‌ها، سیلندرها و یراق‌آلات درب را با طراحی مدرن و ساخت باکیفیت
            مرور کنید.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/products" />}>
              مشاهده محصولات
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/categories" />}
            >
              دسته‌بندی‌ها
            </Button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6">
            <div className="flex items-center gap-2">
              <LayoutGrid className="size-4 text-primary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{categories.length}</span> دسته‌بندی
                محصول
              </span>
            </div>
            {brandsCount > 0 ? (
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{brandsCount}</span> برند معتبر
                </span>
              </div>
            ) : null}
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">ضمانت اصالت کالا</span>
            </div>
          </div>
        </div>

        {visualCategories.length > 0 ? (
          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-6 rounded-[2.5rem] bg-primary/10" aria-hidden="true" />
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-foreground/10">
                <Image
                  src={visualCategories[0].image!.url}
                  alt={visualCategories[0].image!.alt}
                  fill
                  sizes="420px"
                  className="object-cover"
                  priority
                />
              </div>
              {visualCategories[1] ? (
                <div className="absolute -bottom-8 -inset-s-8 w-40 overflow-hidden rounded-2xl shadow-xl ring-4 ring-background sm:w-48">
                  <div className="relative aspect-square">
                    <Image
                      src={visualCategories[1].image!.url}
                      alt={visualCategories[1].image!.alt}
                      fill
                      sizes="192px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
