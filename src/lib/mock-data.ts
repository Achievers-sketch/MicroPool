import type {Pool, Proposal, PoolCategory} from './types';
import {PlaceHolderImages} from './placeholder-images';

const getImageForCategory = (category: PoolCategory) => {
  switch (category) {
    case 'Travel':
      return PlaceHolderImages.find(img => img.id === 'travel-fund')!;
    case 'Startup':
      return PlaceHolderImages.find(img => img.id === 'startup-fund')!;
    case 'Charity':
      return PlaceHolderImages.find(img => img.id === 'charity-fund')!;
    case 'Education':
      return PlaceHolderImages.find(img => img.id === 'education-fund')!;
    case 'Community':
      return PlaceHolderImages.find(img => img.id === 'community-project')!;
    case 'Art':
        return PlaceHolderImages.find(img => img.id === 'art-fund')!;
    default:
      return PlaceHolderImages.find(img => img.id === 'community-project')!;
  }
};


export const mockProposals: Proposal[] = [
  {
    id: 'prop1',
    poolId: 'pool1',
    title: 'Fund European Backpacking Trip',
    description: 'Release funds for a 3-week trip across Europe to explore historical sites.',
    requestedAmount: 2,
    recipient: '0x123...abc',
    status: 'Active',
    votesFor: 1500,
    votesAgainst: 250,
    votingEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
  },
  {
    id: 'prop2',
    poolId: 'pool1',
    title: 'Book Flights to Tokyo',
    description: 'Use a portion of the funds to secure round-trip airline tickets to Tokyo, Japan.',
    requestedAmount: 0.8,
    recipient: '0x456...def',
    status: 'Succeeded',
    votesFor: 2200,
    votesAgainst: 100,
    votingEnd: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
    {
    id: 'prop3',
    poolId: 'pool2',
    title: 'Initial Seed Funding for SaaS product',
    description: 'Allocate capital for server costs and initial marketing for our new SaaS product.',
    requestedAmount: 5,
    recipient: '0xabc...123',
    status: 'Active',
    votesFor: 8000,
    votesAgainst: 1200,
    votingEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
  },
];


export const mockPools: Pool[] = [
  {
    id: 'pool1',
    name: 'Summer Europe Trip',
    description: 'A collective fund for a group of friends to travel through Europe next summer. We plan to visit 5 countries.',
    category: 'Travel',
    creator: '0xAbc...123',
    totalContributions: 5,
    fundingGoal: 10,
    deadline: new Date('2024-12-31'),
    proposals: mockProposals.filter(p => p.poolId === 'pool1'),
    imageUrl: getImageForCategory('Travel').imageUrl,
    imageHint: getImageForCategory('Travel').imageHint,
  },
  {
    id: 'pool2',
    name: 'AI Startup Seed Fund',
    description: 'Early-stage investment pool for a new generative AI application that automates workflows.',
    category: 'Startup',
    creator: '0xDef...456',
    totalContributions: 12,
    fundingGoal: 50,
    deadline: new Date('2025-03-31'),
    proposals: mockProposals.filter(p => p.poolId === 'pool2'),
    imageUrl: getImageForCategory('Startup').imageUrl,
    imageHint: getImageForCategory('Startup').imageHint,
  },
  {
    id: 'pool3',
    name: 'Local Animal Shelter',
    description: 'Support our local animal shelter with funds for food, medical supplies, and facility upkeep.',
    category: 'Charity',
    creator: '0xGhi...789',
    totalContributions: 8.5,
    proposals: [],
    imageUrl: getImageForCategory('Charity').imageUrl,
    imageHint: getImageForCategory('Charity').imageHint,
  },
  {
    id: 'pool4',
    name: 'Kids Coding Bootcamp',
    description: 'A fund to provide free coding education to underprivileged children in our community.',
    category: 'Education',
    creator: '0xJkl...012',
    totalContributions: 20,
    fundingGoal: 25,
    deadline: new Date('2024-11-30'),
    proposals: [],
    imageUrl: getImageForCategory('Education').imageUrl,
    imageHint: getImageForCategory('Education').imageHint,
  },
    {
    id: 'pool5',
    name: 'Community Garden Project',
    description: 'Funding to build and maintain a community garden in the downtown area.',
    category: 'Community',
    creator: '0xMno...345',
    totalContributions: 3.2,
    fundingGoal: 5,
    proposals: [],
    imageUrl: getImageForCategory('Community').imageUrl,
    imageHint: getImageForCategory('Community').imageHint,
  },
  {
    id: 'pool6',
    name: 'Public Mural Installation',
    description: 'Commission a local artist to paint a large-scale mural on a public building.',
    category: 'Art',
    creator: '0 Pqr...678',
    totalContributions: 1.5,
    fundingGoal: 4,
    deadline: new Date('2024-10-31'),
    proposals: [],
    imageUrl: getImageForCategory('Art').imageUrl,
    imageHint: getImageForCategory('Art').imageHint,
  },
];
