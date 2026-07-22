import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-12 sm:py-16">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="mt-4 aspect-2/1 w-full rounded-2xl sm:aspect-3/1" />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="aspect-square w-full rounded-2xl" />
        ))}
      </div>
    </Container>
  );
}
