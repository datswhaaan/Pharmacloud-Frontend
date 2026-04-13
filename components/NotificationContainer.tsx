"use client";

import { useNotification } from "@/providers/notification-provider";
import Card from "./Card";

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-10 right-10 z-50 flex flex-col gap-3">
      {notifications.map((n) => (
        <Card
            center
            key={n.id}
            className="flex items-center p-3 gap-4 min-w-64"
        >
            <div className="flex gap-2">
                <p className="flex-1 text-primary-blue">{n.message}</p>

                <button
                    onClick={() => removeNotification(n.id)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
            </div>
        </Card>
      ))}
    </div>
  );
}