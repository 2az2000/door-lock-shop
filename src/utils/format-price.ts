export function formatPrice(price: number | null, priceLabel: string | null): string {
  if (priceLabel) return priceLabel;
  if (price == null) return "تماس بگیرید";
  return `${price.toLocaleString("fa-IR")} تومان`;
}
