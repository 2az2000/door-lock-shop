import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-12 sm:py-16">
      <Skeleton className="h-4 w-64 max-w-full" />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-11 w-64" />
        </div>
      </div>
    </Container>
  );
}
