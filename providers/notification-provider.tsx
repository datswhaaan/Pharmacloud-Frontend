"use client";

import { createContext, useContext, useState } from "react";

type Notification = {
  id: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
};

type NotificationContextType = {
  notifications: Notification[];
  showNotification: (msg: string, type?: Notification["type"]) => void;
  removeNotification: (id: string) => void;
  removeAllNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (message: string, type: Notification["type"] = "info") => {
    const id = crypto.randomUUID();

    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const removeAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, removeNotification, removeAllNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};