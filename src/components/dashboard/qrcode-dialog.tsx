"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "../ui/skeleton";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QRCodeDialog({ open, onOpenChange }: Props) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [appUrl, setAppUrl] = useState<string>("");

  useEffect(() => {
    if (open && typeof window !== "undefined") {
      const currentUrl = window.location.href;
      setAppUrl(currentUrl);
      QRCode.toDataURL(currentUrl, { width: 300, margin: 2 })
        .then(setQrCodeUrl)
        .catch(console.error);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="font-headline">Connect on Mobile</DialogTitle>
          <DialogDescription>
            Scan this QR code with your phone's camera to open Market Genius on
            your mobile device.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code for mobile app" />
          ) : (
            <Skeleton className="h-[256px] w-[256px]" />
          )}
        </div>
        <p className="text-center text-xs text-muted-foreground break-all">
          {appUrl || "Generating QR Code..."}
        </p>
      </DialogContent>
    </Dialog>
  );
}
