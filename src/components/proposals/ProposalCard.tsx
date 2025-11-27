import type {Proposal} from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {cn} from '@/lib/utils';
import {CheckCircle, XCircle, Hourglass, ThumbsUp, ThumbsDown, Vote, ShieldCheck} from 'lucide-react';
import {formatDistanceToNow} from 'date-fns';

interface ProposalCardProps {
  proposal: Proposal;
}

const statusConfig = {
  Active: {icon: Hourglass, color: 'text-blue-500', bgColor: 'bg-blue-500/10'},
  Succeeded: {icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-500/10'},
  Executed: {icon: ShieldCheck, color: 'text-violet-500', bgColor: 'bg-violet-500/10'},
  Defeated: {icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-500/10'},
  Pending: {icon: Hourglass, color: 'text-gray-500', bgColor: 'bg-gray-500/10'},
};

export default function ProposalCard({proposal}: ProposalCardProps) {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;
  
  const StatusIcon = statusConfig[proposal.status].icon;

  const timeRemaining = formatDistanceToNow(proposal.votingEnd, { addSuffix: true });

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div>
                 <Badge variant="outline" className={cn('mb-2 flex items-center gap-1.5', statusConfig[proposal.status].bgColor, statusConfig[proposal.status].color)}>
                    <StatusIcon className="h-3 w-3" />
                    {proposal.status}
                </Badge>
                <CardTitle className="text-lg">{proposal.title}</CardTitle>
                <CardDescription className="mt-1">
                Requests {proposal.requestedAmount} ETH for: {proposal.description}
                </CardDescription>
            </div>
            <div className='text-right flex-shrink-0'>
                <div className="text-sm font-bold text-foreground">{proposal.requestedAmount} ETH</div>
                <div className="text-xs text-muted-foreground truncate" title={proposal.recipient}>To: {proposal.recipient.substring(0, 8)}...</div>
            </div>
        </div>

      </CardHeader>
      <CardContent>
        <div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-green-500">For</span>
              <span>{proposal.votesFor.toLocaleString()}</span>
            </div>
            <Progress value={forPercentage} className="h-2 [&>div]:bg-green-500" />
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-red-500">Against</span>
              <span>{proposal.votesAgainst.toLocaleString()}</span>
            </div>
            <Progress value={againstPercentage} className="h-2 [&>div]:bg-red-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            {proposal.status === 'Active' ? `Voting ends ${timeRemaining}` : `Voting ended ${timeRemaining}`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        {proposal.status === 'Active' && (
          <div className="flex w-full gap-4">
            <Button variant="outline" className="w-full">
              <ThumbsUp className="mr-2 h-4 w-4 text-green-500" /> Vote For
            </Button>
            <Button variant="outline" className="w-full">
              <ThumbsDown className="mr-2 h-4 w-4 text-red-500" /> Vote Against
            </Button>
          </div>
        )}
        {proposal.status === 'Succeeded' && (
          <Button className="w-full">
            <ShieldCheck className="mr-2 h-4 w-4" /> Execute Proposal
          </Button>
        )}
         {proposal.status === 'Executed' && (
          <p className='text-sm text-muted-foreground text-center w-full'>This proposal has been executed.</p>
        )}
         {proposal.status === 'Defeated' && (
          <p className='text-sm text-muted-foreground text-center w-full'>This proposal was defeated.</p>
        )}
      </CardFooter>
    </Card>
  );
}
