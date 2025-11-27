"use server";

import {
  verifySmartContractDeployment,
  type VerifySmartContractDeploymentInput,
} from "@/ai/flows/verify-smart-contract-deployments";

export async function handleVerifyContract(
  input: VerifySmartContractDeploymentInput
) {
  try {
    const result = await verifySmartContractDeployment(input);
    return result;
  } catch (error) {
    console.error("Error verifying smart contract:", error);
    throw new Error("Failed to get verification from AI.");
  }
}
