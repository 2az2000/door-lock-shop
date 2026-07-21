import Link from "next/link";
import { PackageSearch } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <PackageSearch className="size-12 text-muted-foreground" aria-hidden="true" />
      <h1 className="font-heading text-2xl font-semibold text-foreground">صفحه مورد نظر یافت نشد</h1>
      <p className="max-w-md text-muted-foreground">
        صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        بازگشت به خانه
      </Button>
    </Container>
  );
}
