import { MediaImage } from "@/components/common/MediaImage";
import { Container } from "@/components/layout/Container";
import type { CategorySummary } from "@/types/category";
import type { MediaAsset } from "@/types/media";

interface CompanyIntroProps {
  companyName: string;
  categories: CategorySummary[];
  /** Chosen in Site Settings; falls back to the first category image. */
  image: MediaAsset | null;
  /** Chosen in Site Settings; falls back to "درباره {companyName}". */
  title: string | null;
  /** Chosen in Site Settings; blank lines separate paragraphs. */
  text: string | null;
}

const defaultText = (companyName: string) =>
  `${companyName} با سال‌ها تجربه در زمینه‌ی تأمین قفل، دستگیره و یراق‌آلات درب، محصولاتی باکیفیت و متنوع را برای پروژه‌های مسکونی، تجاری و اداری گردآوری کرده است. تیم ما در تمام مراحل انتخاب محصول در کنار شماست.`;

/** Splits the admin's text into paragraphs, tolerating either blank lines or single newlines. */
const toParagraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n|\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export function CompanyIntro({ companyName, categories, image, title, text }: CompanyIntroProps) {
  const visual = image ?? categories.find((category) => category.image)?.image ?? null;
  const heading = title?.trim() || `درباره ${companyName}`;
  const paragraphs = toParagraphs(text?.trim() || defaultText(companyName));

  return (
    <section id="company-intro" className="bg-muted/30 py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        {visual ? (
          <div
            id="company-intro-visual"
            className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/10"
          >
            <MediaImage
              id="company-intro-media"
              asset={visual}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div id="company-intro-copy" className={visual ? undefined : "mx-auto max-w-3xl text-center"}>
          <h2
            id="company-intro-title"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {heading}
          </h2>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              id={`company-intro-paragraph-${index}`}
              className="mt-4 text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
