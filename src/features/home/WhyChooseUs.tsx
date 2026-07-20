import { Award, Headset, Layers, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت کالا",
    description: "تمامی محصولات دارای ضمانت اصالت و کیفیت هستند.",
  },
  {
    icon: Layers,
    title: "تنوع محصولات",
    description: "مجموعه‌ای گسترده از برندها و مدل‌های مختلف.",
  },
  {
    icon: Award,
    title: "کیفیت برتر",
    description: "انتخاب دقیق محصولات باکیفیت از برندهای معتبر.",
  },
  {
    icon: Headset,
    title: "مشاوره تخصصی",
    description: "راهنمایی تخصصی برای انتخاب محصول مناسب پروژه شما.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="چرا ما را انتخاب کنید"
          title="تعهد ما به کیفیت"
          align="center"
          className="mx-auto max-w-2xl"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-foreground/10"
            >
              <reason.icon className="mx-auto size-8 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
