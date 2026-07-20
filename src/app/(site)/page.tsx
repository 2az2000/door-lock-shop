import { FadeIn } from "@/components/common/FadeIn";
import { BrandsStrip } from "@/features/home/BrandsStrip";
import { CategoriesSection } from "@/features/home/CategoriesSection";
import { CompanyIntro } from "@/features/home/CompanyIntro";
import { ContactSection } from "@/features/home/ContactSection";
import { Hero } from "@/features/home/Hero";
import { ProductsSection } from "@/features/home/ProductsSection";
import { WhyChooseUs } from "@/features/home/WhyChooseUs";
import { getBrands } from "@/services/brands.service";
import { getCategories } from "@/services/categories.service";
import { getFeaturedProducts, getLatestProducts } from "@/services/products.service";
import { getSiteSettings } from "@/services/site-settings.service";

export default async function HomePage() {
  const [siteSettings, categories, featuredProducts, latestProducts, brands] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getFeaturedProducts(8),
    getLatestProducts(8),
    getBrands(),
  ]);

  return (
    <>
      <FadeIn>
        <Hero companyName={siteSettings.companyName} />
      </FadeIn>
      <FadeIn>
        <CategoriesSection categories={categories} />
      </FadeIn>
      <FadeIn>
        <ProductsSection
          eyebrow="پیشنهاد ویژه"
          title="محصولات ویژه"
          description="گلچینی از بهترین محصولات ما."
          products={featuredProducts}
          viewAllHref="/products"
        />
      </FadeIn>
      <FadeIn>
        <CompanyIntro companyName={siteSettings.companyName} />
      </FadeIn>
      <FadeIn>
        <WhyChooseUs />
      </FadeIn>
      <FadeIn>
        <BrandsStrip brands={brands} />
      </FadeIn>
      <FadeIn>
        <ProductsSection
          eyebrow="تازه‌ها"
          title="جدیدترین محصولات"
          description="محصولاتی که به‌تازگی به کاتالوگ اضافه شده‌اند."
          products={latestProducts}
          viewAllHref="/products"
        />
      </FadeIn>
      <FadeIn>
        <ContactSection siteSettings={siteSettings} />
      </FadeIn>
    </>
  );
}
