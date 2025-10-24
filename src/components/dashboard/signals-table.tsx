import type { Signal, SignalType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Briefcase,
  Bitcoin,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  signals: Signal[];
  onSelectSignal: (signal: Signal) => void;
};

const SignalTypeIcon: React.FC<{ type: SignalType }> = ({ type }) => {
  return type === "buy" ? (
    <ArrowUpCircle className="h-5 w-5 text-chart-2" />
  ) : (
    <ArrowDownCircle className="h-5 w-5 text-destructive" />
  );
};

const SymbolIcon: React.FC<{ symbol: string }> = ({ symbol }) => {
  return symbol.includes("-USD") ? (
    <Bitcoin className="h-6 w-6 text-muted-foreground" />
  ) : (
    <Briefcase className="h-6 w-6 text-muted-foreground" />
  );
};

export function SignalsTable({ signals, onSelectSignal }: Props) {
  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Recent Signals</CardTitle>
        <CardDescription>
          Real-time buy/sell signals from our AI engine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="hidden text-right md:table-cell">
                  Timestamp
                </TableHead>
                <TableHead className="text-right">Context</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signals.map((signal) => (
                <TableRow key={signal.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <SymbolIcon symbol={signal.symbol} />
                      <div>
                        <div className="font-medium font-headline">
                          {signal.symbol}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {signal.symbol.includes("-USD")
                            ? "Cryptocurrency"
                            : "Stock"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-0",
                        signal.type === "buy"
                          ? "bg-chart-2/20 text-chart-2"
                          : "bg-destructive/20 text-destructive"
                      )}
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        <SignalTypeIcon type={signal.type} />
                        <span>{signal.type.toUpperCase()}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    €{signal.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden text-right text-muted-foreground md:table-cell">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(signal.timestamp)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectSignal(signal)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
