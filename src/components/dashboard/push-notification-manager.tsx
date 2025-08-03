"use client";

import { useState, useEffect } from "react";
import { firebaseApp, messaging } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, BellRing, BellOff } from "lucide-react";

export function PushNotificationManager() {
  const [notificationStatus, setNotificationStatus] = useState("default");
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const { toast } = useToast();

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      setNotificationStatus("unsupported");
      return;
    }
    
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setNotificationStatus("granted");
      const messagingInstance = messaging(firebaseApp);
      if (messagingInstance) {
        try {
          const currentToken = await getToken(messagingInstance, {
            vapidKey: "YOUR_VAPID_KEY", // You need to generate this in Firebase Console
          });
          if (currentToken) {
            setFcmToken(currentToken);
            console.log("FCM Token:", currentToken);
            // Here you would typically send the token to your server
          } else {
            console.log("No registration token available. Request permission to generate one.");
            setNotificationStatus("denied");
          }
        } catch (err) {
          console.log("An error occurred while retrieving token. ", err);
          setNotificationStatus("error");
        }
      }
    } else {
      setNotificationStatus("denied");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messagingInstance = messaging(firebaseApp);
      if(messagingInstance){
        onMessage(messagingInstance, (payload) => {
          console.log("Foreground message received.", payload);
          toast({
            title: payload.notification?.title,
            description: payload.notification?.body,
          });
        });
      }
    }
  }, [toast]);
  
  useEffect(() => {
    if (!("Notification" in window)) {
      setNotificationStatus("unsupported");
    } else {
      setNotificationStatus(Notification.permission);
    }
  }, []);


  const renderStatus = () => {
    switch (notificationStatus) {
      case 'granted':
        return (
          <div className="flex items-center gap-2 text-green-500">
            <BellRing className="h-5 w-5" />
            <span>Push notifications are enabled.</span>
          </div>
        );
      case 'denied':
        return (
          <div className="flex items-center gap-2 text-red-500">
            <BellOff className="h-5 w-5" />
            <span>Push notifications are disabled. Please enable them in your browser settings.</span>
          </div>
        );
       case 'unsupported':
        return (
          <div className="flex items-center gap-2 text-muted-foreground">
            <BellOff className="h-5 w-5" />
            <span>This browser does not support push notifications.</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Enable push notifications to get real-time trading signals.</p>
            <Button onClick={requestPermission} size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Enable Notifications
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Notifications</CardTitle>
        <CardDescription>Manage your real-time signal alerts.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderStatus()}
      </CardContent>
    </Card>
  );
}