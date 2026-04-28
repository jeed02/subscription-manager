import { useCallback, useEffect, useState } from "react";
import { dismissNotification, getNotifications } from "../services/notificationService";
import type { Notification } from "../types/notification";

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = useCallback(async () => {
        try {
            const data = await getNotifications();
            setNotifications(data);
        } catch {
            // silently fail — notifications are non-critical
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const dismiss = useCallback(async (subscriptionId: string) => {
        await dismissNotification(subscriptionId);
        setNotifications((prev) =>
            prev.filter((n) => n.subscriptionId !== subscriptionId),
        );
    }, []);

    return { notifications, loading, dismiss };
}
