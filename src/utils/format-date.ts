export function formatDate(value: string | null): string | null {
  if (!value) return null;

  return new Date(value).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
