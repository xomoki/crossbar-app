"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
}

export function NotificationToast() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Expose a function to add notifications (this is a simple implementation, 
  // normally would use Context or a library)
  useEffect(() => {
    const handleAddNotification = (event: CustomEvent<Notification>) => {
      const newNotification = event.detail;
      setNotifications(prev => [...prev, newNotification]);

      // Auto dismiss
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    };

    window.addEventListener('add-notification' as any, handleAddNotification);
    return () => window.removeEventListener('add-notification' as any, handleAddNotification);
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl flex items-start gap-3 pointer-events-auto animate-in slide-in-from-top duration-300"
        >
          <div className="bg-amber-500/20 p-2 rounded-lg text-amber-500 shrink-0">
            <Bell size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white">{notification.title}</h4>
            <p className="text-xs text-slate-300 mt-1">{notification.message}</p>
          </div>
          <button 
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            className="text-slate-500 hover:text-white shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export const showNotification = (title: string, message: string) => {
  const event = new CustomEvent('add-notification', {
    detail: {
      id: Math.random().toString(36),
      title,
      message,
      timestamp: Date.now(),
    }
  });
  window.dispatchEvent(event);
};
