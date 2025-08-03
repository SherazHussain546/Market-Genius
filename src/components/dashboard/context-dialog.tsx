"use client";

import { useState, useEffect } from "react";
import type { Signal } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { getSignalContextAction } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  signal: Signal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContextDialog({ signal, open, onOpenChange }: Props) {
  const [context, setContext] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (signal) {
      setIsLoading(true);
      setContext(null);
      getSignalContextAction(signal.symbol)
        .then((result) => {
          if ("summary" in result) {
            setContext(result.summary);
          } else {
            setContext(result.error);
            toast({
              variant: "destructive",
              title: "Error",
              description: result.error,
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [signal, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">
            AI Context for {signal?.symbol}
          </DialogTitle>
          <DialogDescription>
            AI-generated summary of recent news and market sentiment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 font-body">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{context}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
