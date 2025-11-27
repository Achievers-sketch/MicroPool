import {mockPools} from '@/lib/mock-data';
import {notFound} from 'next/navigation';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import ContributeForm from '@/components/pools/ContributeForm';
import ProposalCard from '@/components/proposals/ProposalCard';
import {CreateProposalDialog} from '@/components/proposals/CreateProposalDialog';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import { Coins, Target, Calendar, User } from 'lucide-react';
import {format} from 'date-fns';

export default function PoolDetailPage({params}: {params: {id: string}}) {
  const pool = mockPools.find(p => p.id === params.id);

  if (!pool) {
    notFound();
  }

  const progress =
    pool.fundingGoal && pool.fundingGoal > 0
      ? (pool.totalContributions / pool.fundingGoal) * 100
      : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="secondary">{pool.category}</Badge>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{pool.name}</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          {pool.description}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Proposals */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Proposals</h2>
            <CreateProposalDialog />
          </div>
          {pool.proposals.length > 0 ? (
            <div className="space-y-4">
              {pool.proposals.map(proposal => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          ) : (
            <Card className="flex h-48 items-center justify-center">
                <CardContent className='text-center p-6'>
                    <p className='text-muted-foreground'>No proposals have been created for this pool yet.</p>
                </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Details & Contribution */}
        <div className="space-y-8 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pool Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
               {pool.fundingGoal && (
                 <div>
                    <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span className='font-bold'>{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} aria-label={`${progress.toFixed(0)}% funded`} />
                </div>
               )}
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><Coins/>Total Contributions</span>
                    <span className="font-semibold">{pool.totalContributions.toFixed(2)} ETH</span>
                </div>
                {pool.fundingGoal && (
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Target/>Funding Goal</span>
                        <span className="font-semibold">{pool.fundingGoal.toFixed(2)} ETH</span>
                    </div>
                )}
                 {pool.deadline && (
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Calendar/>Deadline</span>
                        <span className="font-semibold">{format(pool.deadline, 'PPP')}</span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><User/>Creator</span>
                    <span className="font-semibold truncate" title={pool.creator}>{pool.creator.substring(0, 8)}...</span>
                </div>
            </CardContent>
          </Card>
          <ContributeForm />
           <Card>
            <CardHeader>
              <CardTitle>Your Share</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">125.50 <span className='text-sm font-normal text-muted-foreground'>SHARES</span></p>
              <p className="text-sm text-muted-foreground">You own 2.51% of the pool.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
