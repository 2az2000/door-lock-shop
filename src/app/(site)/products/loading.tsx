import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        <div className="hidden w-64 shrink-0 md:block">
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>

        <div className="min-w-0 flex-1">
          <Skeleton className="h-10 w-full" />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
