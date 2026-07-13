"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-wide px-4 py-24 text-center">
      <h1 className="heading-display text-4xl">Something went wrong</h1>
      <p className="mt-4 text-[var(--text-secondary)]">
        Please try again. If the issue continues, contact Crownstone support.
      </p>
      <Button className="mt-8" type="button" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
