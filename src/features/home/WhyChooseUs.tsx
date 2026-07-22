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
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="group rounded-2xl bg-card p-4 text-center shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md sm:p-6"
            >
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/15 sm:size-14">
                <reason.icon className="size-6 text-primary sm:size-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading text-sm font-semibold text-foreground sm:text-base">
                {reason.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
