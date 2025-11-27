import type {Pool} from '@/lib/types';
import PoolCard from './PoolCard';

interface PoolListProps {
  pools: Pool[];
}

export default function PoolList({pools}: PoolListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pools.map(pool => (
        <PoolCard key={pool.id} pool={pool} />
      ))}
    </div>
  );
}
