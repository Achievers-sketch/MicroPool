import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Frown} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-4 text-center">
      <Frown className="h-16 w-16 text-muted-foreground" />
      <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}
