import PoolList from '@/components/pools/PoolList';
import {mockPools} from '@/lib/mock-data';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {PlusCircle} from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Pools</h1>
          <p className="text-muted-foreground">
            Discover and contribute to purpose-driven investment pools.
          </p>
        </div>
        <Link href="/create-pool">
          <Button>
            <PlusCircle />
            Create Pool
          </Button>
        </Link>
      </div>
      <PoolList pools={mockPools} />
    </div>
  );
}
