"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SiteShellProps {
  children: React.ReactNode;
  className?: string;
}

export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <main className="flex-1">
        <div className="container prose dark:prose-invert mx-auto py-12">
          {children}
        </div>
      </main>
      <footer className="border-t py-6 text-center">
        <Button variant="link" asChild>
          <a href="/">Back to home</a>
        </Button>
      </footer>
    </div>
  );
}
