import { MediaImage } from "@/components/common/MediaImage";
import { Container } from "@/components/layout/Container";
import type { CategorySummary } from "@/types/category";
import type { MediaAsset } from "@/types/media";

interface CompanyIntroProps {
  companyName: string;
  categories: CategorySummary[];
  /** Chosen in Site Settings; falls back to the first category image. */
  image: MediaAsset | null;
}

export function CompanyIntro({ companyName, categories, image }: CompanyIntroProps) {
  const visual = image ?? categories.find((category) => category.image)?.image ?? null;

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        {visual ? (
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/10">
            <MediaImage
              id="company-intro-media"
              asset={visual}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className={visual ? undefined : "mx-auto max-w-3xl text-center"}>
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
