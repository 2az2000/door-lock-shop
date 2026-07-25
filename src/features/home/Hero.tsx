"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { CategorySummary } from "@/types/category";

interface HeroProps {
  companyName: string;
  categories: CategorySummary[];
  brandsCount: number;
}

const HERO_SLIDES = [
  {
    title: "قفل و دستگیره‌ای برای هر درب، با کیفیتی که به آن اعتماد دارید",
    description:
      "مجموعه‌ای کامل از قفل‌ها، دستگیره‌ها، سیلندرها و یراق‌آلات درب را با طراحی مدرن و ساخت باکیفیت مرور کنید.",
  },
  {
    title: "طراحی مدرن، دوامی که همیشه می‌توانید به آن تکیه کنید",
    description:
      "محصولات ما با استانداردهای بین‌المللی و متریال درجه‌یک تولید می‌شوند تا سال‌ها همراه شما بمانند.",
  },
  {
    title: "تنوعی برای هر سبک، انتخابی برای هر سلیقه",
    description:
      "از کلاسیک تا مدرن، مجموعه‌ای متنوع از قفل و یراق‌آلات متناسب با هر دکوراسیون داخلی.",
  },
] as const;

const SLIDE_INTERVAL_MS = 5000;

export function Hero({ companyName, categories, brandsCount }: HeroProps) {
  const imagePairs = useMemo(() => {
    const withImages = categories.filter((category) => category.image);
    const pairs: CategorySummary[][] = [];
    for (let i = 0; i < withImages.length; i += 2) {
      pairs.push(withImages.slice(i, i + 2));
    }
    return pairs;
  }, [categories]);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[slideIndex];
  const imagePairIndex = imagePairs.length > 0 ? slideIndex % imagePairs.length : -1;
  const visualCategories = imagePairIndex >= 0 ? imagePairs[imagePairIndex] : [];

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

          <div className="grid max-w-2xl">
            {HERO_SLIDES.map((s) => (
              <div
                key={s.title}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 font-heading text-3xl font-semibold tracking-tight sm:text-5xl"
              >
                {s.title}
              </div>
            ))}
            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={slide.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="col-start-1 row-start-1 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl"
              >
                {slide.title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="grid max-w-xl">
            {HERO_SLIDES.map((s) => (
              <div
                key={s.description}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 text-base sm:text-lg"
              >
                {s.description}
              </div>
            ))}
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={slide.description}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
                className="col-start-1 row-start-1 text-base text-muted-foreground sm:text-lg"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>
          </div>

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
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={imagePairIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-foreground/10">
                    <Image
                      src={visualCategories[0].image!.url}
                      alt={visualCategories[0].image!.alt}
                      fill
                      sizes="420px"
                      className="object-cover"
                      priority={slideIndex === 0}
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
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
