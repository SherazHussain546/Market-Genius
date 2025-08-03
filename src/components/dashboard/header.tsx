"use client";

import { useState } from "react";
import { CircuitBoard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeDialog } from "./qrcode-dialog";

export function DashboardHeader() {
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <CircuitBoard className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-2xl font-bold tracking-tighter text-foreground">
              Market Genius
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <p className="text-sm text-muted-foreground font-body">
                System Online
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsQrCodeOpen(true)}
            >
              <Smartphone className="mr-2" />
              Connect to Phone
            </Button>
          </div>
        </div>
      </header>
      <QRCodeDialog open={isQrCodeOpen} onOpenChange={setIsQrCodeOpen} />
    </>
  );
}
