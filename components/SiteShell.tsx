import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container prose mx-auto flex-1 py-10 dark:prose-invert">
        {children}
      </main>
      <footer className="border-t py-6 text-center">
        <Button asChild variant="link">
          <Link href="/">Back Home</Link>
        </Button>
      </footer>
    </div>
  );
}
