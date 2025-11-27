import ContractVerifierForm from "@/components/tools/ContractVerifierForm";

export default function VerifyContractPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Smart Contract Verifier</h1>
                <p className="text-muted-foreground">
                    Use AI to analyze your smart contract and get deployment recommendations.
                </p>
            </div>
            <ContractVerifierForm />
        </div>
    );
}
