'use server';
/**
 * @fileOverview A smart contract deployment verification AI agent.
 *
 * - verifySmartContractDeployment - A function that handles the smart contract deployment verification process.
 * - VerifySmartContractDeploymentInput - The input type for the verifySmartContractDeployment function.
 * - VerifySmartContractDeploymentOutput - The return type for the verifySmartContractDeployment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifySmartContractDeploymentInputSchema = z.object({
  contractCode: z
    .string()
    .describe('The source code of the smart contract to be deployed.'),
  network: z.string().describe('The blockchain network to deploy the contract to.'),
  compilerVersion: z.string().describe('The version of the Solidity compiler used.'),
});
export type VerifySmartContractDeploymentInput = z.infer<
  typeof VerifySmartContractDeploymentInputSchema
>;

const VerifySmartContractDeploymentOutputSchema = z.object({
  deploymentRecommendations: z.string().describe(
    'Recommendations for deploying the smart contract, including optimal gas prices, gas limits, and potential security concerns.'
  ),
  suggestedParameters: z.string().describe(
    'Suggested deployment parameters based on the contract code and network conditions.'
  ),
});
export type VerifySmartContractDeploymentOutput = z.infer<
  typeof VerifySmartContractDeploymentOutputSchema
>;

export async function verifySmartContractDeployment(
  input: VerifySmartContractDeploymentInput
): Promise<VerifySmartContractDeploymentOutput> {
  return verifySmartContractDeploymentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifySmartContractDeploymentPrompt',
  input: {schema: VerifySmartContractDeploymentInputSchema},
  output: {schema: VerifySmartContractDeploymentOutputSchema},
  prompt: `You are an expert smart contract auditor specializing in verifying smart contract deployments.

You will analyze the provided smart contract code and suggest optimal deployment parameters, including gas prices, gas limits, and potential security concerns.

Consider the target blockchain network and compiler version when making your recommendations.

Smart Contract Code: {{{contractCode}}}
Blockchain Network: {{{network}}}
Compiler Version: {{{compilerVersion}}}

Provide your deployment recommendations and suggested parameters in a clear and concise manner.
`,
});

const verifySmartContractDeploymentFlow = ai.defineFlow(
  {
    name: 'verifySmartContractDeploymentFlow',
    inputSchema: VerifySmartContractDeploymentInputSchema,
    outputSchema: VerifySmartContractDeploymentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
