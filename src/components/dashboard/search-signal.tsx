"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { getSignalContextAction } from "@/app/actions";
import type { GenerateSignalContextOutput } from "@/ai/flows/generate-signal-context";
import { cn } from "@/lib/utils";
import { Search, TrendingUp, TrendingDown, MinusCircle } from "lucide-react";

const searchSchema = z.object({
  ticker: z.string().min(1, "Ticker is required").max(10),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const SignalIcon = ({
  signal,
}: {
  signal: "buy" | "sell" | "hold" | undefined;
}) => {
  switch (signal) {
    case "buy":
      return <TrendingUp className="h-6 w-6 text-chart-2" />;
    case "sell":
      return <TrendingDown className="h-6 w-6 text-destructive" />;
    case "hold":
      return <MinusCircle className="h-6 w-6 text-muted-foreground" />;
    default:
      return null;
  }
};

export function SearchSignal() {
  const [result, setResult] = useState<GenerateSignalContextOutput | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { ticker: "" },
  });

  const onSubmit = async (data: SearchFormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await getSignalContextAction(data.ticker.toUpperCase());
    if ("error" in response) {
      setError(response.error);
    } else {
      setResult(response);
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-xl">
          AI Signal Search
        </CardTitle>
        <CardDescription>
          Enter a European stock or crypto ticker to get an AI-powered analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start gap-4"
          >
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="e.g., VOW3.DE, BTC-USD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="mt-6 space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div className="mt-6 rounded-lg border bg-card p-6 text-card-foreground">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={cn(
                  "border-0 text-lg",
                  result.signal === "buy" && "bg-chart-2/20 text-chart-2",
                  result.signal === "sell" &&
                    "bg-destructive/20 text-destructive",
                  result.signal === "hold" &&
                    "bg-muted/20 text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2 font-semibold">
                  <SignalIcon signal={result.signal} />
                  <span>{result.signal?.toUpperCase()}</span>
                </div>
              </Badge>
              <div className="text-right">
                <div className="text-sm font-medium text-muted-foreground">
                  Confidence
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={result.confidence * 100}
                    className="w-24"
                  />
                  <span className="font-mono text-lg font-semibold">
                    {(result.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {result.summary}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
