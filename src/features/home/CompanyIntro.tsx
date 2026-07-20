import { Container } from "@/components/layout/Container";

interface CompanyIntroProps {
  companyName: string;
}

export function CompanyIntro({ companyName }: CompanyIntroProps) {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <Container className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          درباره {companyName}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {companyName} با سال‌ها تجربه در زمینه‌ی تأمین قفل، دستگیره و یراق‌آلات درب، محصولاتی باکیفیت و
          متنوع را برای پروژه‌های مسکونی، تجاری و اداری گردآوری کرده است. تیم ما در تمام مراحل انتخاب محصول
          در کنار شماست.
        </p>
      </Container>
    </section>
  );
}
