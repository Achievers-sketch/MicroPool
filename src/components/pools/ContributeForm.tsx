'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function ContributeForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribute to this Pool</CardTitle>
        <CardDescription>
          Your contribution will be converted to share tokens.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input id="amount" type="number" placeholder="0.1" />
          </div>
          <Button type="submit" className="w-full">
            Contribute
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
