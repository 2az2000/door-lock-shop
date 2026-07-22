import Image from "next/image";

import { Container } from "@/components/layout/Container";
import type { CategorySummary } from "@/types/category";

interface CompanyIntroProps {
  companyName: string;
  categories: CategorySummary[];
}

export function CompanyIntro({ companyName, categories }: CompanyIntroProps) {
  const visual = categories.find((category) => category.image);

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        {visual?.image ? (
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/10">
            <Image
              src={visual.image.url}
              alt={visual.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className={visual?.image ? undefined : "mx-auto max-w-3xl text-center"}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            درباره {companyName}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {companyName} با سال‌ها تجربه در زمینه‌ی تأمین قفل، دستگیره و یراق‌آلات درب، محصولاتی باکیفیت و
            متنوع را برای پروژه‌های مسکونی، تجاری و اداری گردآوری کرده است. تیم ما در تمام مراحل انتخاب محصول
            در کنار شماست.
          </p>
        </div>
      </Container>
    </section>
  );
}
