'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useForm, Controller} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type {PoolCategory} from '@/lib/types';

const poolCategories: PoolCategory[] = ['Travel', 'Startup', 'Charity', 'Education', 'Community', 'Art', 'Other'];

const formSchema = z.object({
    name: z.string().min(3, 'Pool name must be at least 3 characters long.'),
    description: z.string().min(10, 'Description must be at least 10 characters long.'),
    category: z.enum(poolCategories),
    fundingGoal: z.coerce.number().optional(),
    deadline: z.string().optional(),
});


export default function CreatePoolPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Here you would call the smart contract function to create a new pool
    }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Pool</CardTitle>
          <CardDescription>
            Fill in the details below to launch your on-chain investment pool.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Pool Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Summer Europe Trip" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe the purpose of your pool..." {...field} />
                        </FormControl>
                         <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a purpose" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {poolCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="fundingGoal"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Funding Goal (Optional)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 10 ETH" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Funding Deadline (Optional)</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
              <Button type="submit" className="w-full">
                Create Pool
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
