import type { Notification } from "../types/notification";
import { api } from "../utils/api";

export const getNotifications = async (): Promise<Notification[]> => {
    const response = await api.get("/notifications");
    return response.data;
};

export const dismissNotification = async (subscriptionId: string): Promise<void> => {
    await api.post(`/notifications/dismiss/${subscriptionId}`);
};
