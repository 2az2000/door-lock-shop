import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

interface HeroProps {
  companyName: string;
}

export function Hero({ companyName }: HeroProps) {
  return (
    <section className="border-b border-border bg-muted/30">
      <Container className="flex flex-col items-start gap-6 py-16 sm:py-24">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
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
      </Container>
    </section>
  );
}
