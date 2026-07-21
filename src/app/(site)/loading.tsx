import { Container } from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container className="flex items-center justify-center py-24">
      <div
        role="status"
        aria-label="در حال بارگذاری"
        className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary"
      />
    </Container>
  );
}
