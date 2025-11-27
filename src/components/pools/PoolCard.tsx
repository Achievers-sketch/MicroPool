import type {Pool} from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight} from 'lucide-react';

interface PoolCardProps {
  pool: Pool;
}

export default function PoolCard({pool}: PoolCardProps) {
  const progress =
    pool.fundingGoal && pool.fundingGoal > 0
      ? (pool.totalContributions / pool.fundingGoal) * 100
      : 0;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={pool.imageUrl}
            alt={pool.name}
            data-ai-hint={pool.imageHint}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 pb-2">
          <Badge variant="secondary" className="mb-2">{pool.category}</Badge>
          <CardTitle className="text-xl">{pool.name}</CardTitle>
          <CardDescription className="mt-2 line-clamp-2 h-[2.5rem]">
            {pool.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-2">
        {pool.fundingGoal ? (
          <div>
            <div className="mb-2 flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>
                <span className="font-semibold text-foreground">
                  {pool.totalContributions.toFixed(2)} ETH
                </span>{' '}
                / {pool.fundingGoal.toFixed(2)} ETH
              </span>
            </div>
            <Progress value={progress} aria-label={`${progress.toFixed(0)}% funded`} />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {pool.totalContributions.toFixed(2)} ETH
            </span>{' '}
            contributed
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/pools/${pool.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
