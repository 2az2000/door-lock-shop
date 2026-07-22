"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">مشکلی پیش آمد</h1>
      <p className="max-w-md text-muted-foreground">
        متأسفانه در نمایش این صفحه خطایی رخ داد. لطفاً دوباره تلاش کنید.
      </p>
      <Button onClick={reset}>
        <RefreshCw className="size-4" />
        تلاش دوباره
      </Button>
    </Container>
  );
}
