export type PoolCategory =
  | 'Travel'
  | 'Startup'
  | 'Charity'
  | 'Education'
  | 'Community'
  | 'Art'
  | 'Other';

export interface Pool {
  id: string;
  name: string;
  description: string;
  category: PoolCategory;
  creator: string;
  totalContributions: number;
  fundingGoal?: number;
  deadline?: Date;
  proposals: Proposal[];
  imageUrl: string;
  imageHint: string;
}

export type ProposalStatus = 'Pending' | 'Active' | 'Succeeded' | 'Defeated' | 'Executed';

export interface Proposal {
  id: string;
  poolId: string;
  title: string;
  description: string;
  requestedAmount: number;
  recipient: string;
  status: ProposalStatus;
  votesFor: number;
  votesAgainst: number;
  votingEnd: Date;
}

export interface Vote {
  id: string;
  proposalId: string;
  voter: string;
  support: boolean; // true for 'For', false for 'Against'
  weight: number;
}
