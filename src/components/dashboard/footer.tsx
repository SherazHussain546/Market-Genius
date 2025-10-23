import { AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";

export function DashboardFooter() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 md:px-8">
        <Card className="bg-chart-4/20 border-chart-4/50 mb-6">
          <div className="flex items-start gap-4 p-4">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 text-chart-4" />
            <div className="text-sm text-foreground">
              <h3 className="font-bold font-headline">Risk Disclaimer</h3>
              <p className="text-muted-foreground">
                The signals and information provided by Market Genius are for
                informational purposes only and should not be considered
                financial advice. Trading and investing involve significant
                risk, and you should consult with a qualified financial
                professional before making any investment decisions. Past
                performance is not indicative of future results.
              </p>
            </div>
          </div>
        </Card>
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Project by{" "}
            <a
              href="https://sherazhussain546.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sheraz Hussain
            </a>. Powered by <a href="https://synctech.ie" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">SYNC TECH Solutions</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
