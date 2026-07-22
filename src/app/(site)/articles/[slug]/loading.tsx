import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-12 sm:py-16">
      <Skeleton className="h-4 w-64 max-w-full" />

      <div className="mx-auto mt-6 max-w-3xl space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-6 aspect-video w-full rounded-2xl" />
        <Skeleton className="mt-8 h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    </Container>
  );
}
