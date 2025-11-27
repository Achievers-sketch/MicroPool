"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { handleVerifyContract } from "@/app/actions";
import type { VerifySmartContractDeploymentOutput } from "@/ai/flows/verify-smart-contract-deployments";
import { Wand, Loader, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const networks = ["Mainnet", "Sepolia", "Base Sepolia", "Polygon", "Arbitrum"];
const compilerVersions = ["0.8.20", "0.8.19", "0.8.10", "0.7.6", "0.6.12"];

const formSchema = z.object({
  contractCode: z
    .string()
    .min(50, "Contract code must be at least 50 characters."),
  network: z.string().min(1, "Please select a network."),
  compilerVersion: z.string().min(1, "Please select a compiler version."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContractVerifierForm() {
  const [result, setResult] = useState<VerifySmartContractDeploymentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractCode: "",
      network: "",
      compilerVersion: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await handleVerifyContract(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to verify the smart contract. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Contract Details</CardTitle>
          <CardDescription>
            Provide the source code and deployment environment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="contractCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solidity Source Code</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="pragma solidity ^0.8.20; ..."
                        className="h-48 font-code text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="network"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blockchain Network</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a network" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {networks.map((net) => (
                          <SelectItem key={net} value={net}>
                            {net}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="compilerVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compiler Version</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a compiler version" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {compilerVersions.map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand className="mr-2 h-4 w-4" />
                    Verify with AI
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>
            Optimal parameters and security advice from our AI auditor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                    <Loader className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">AI is analyzing your contract...</p>
                </div>
            </div>
          )}
          {!isLoading && !result && (
             <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                    <Wand className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Results will appear here.</p>
                </div>
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold"><CheckCircle className="h-5 w-5 text-green-500" />Suggested Parameters</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-muted p-4 rounded-md">{result.suggestedParameters}</p>
              </div>
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-5 w-5 text-amber-500" />Deployment Recommendations</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.deploymentRecommendations}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
