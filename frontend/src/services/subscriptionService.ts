import type {
  ApiSubscription,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
} from "../types/subscription";
import { api } from "../utils/api";

export const getSubscriptions = async (): Promise<ApiSubscription[]> => {
    const response = await api.get("/subscription");
    return response.data;
};

export const createSubscription = async (
    data: CreateSubscriptionRequest,
): Promise<void> => {
    await api.post("/subscription", data);
};

export const updateSubscription = async (
    id: string,
    data: UpdateSubscriptionRequest,
): Promise<void> => {
    await api.put(`/subscription/${id}`, data);
};

export const deleteSubscription = async (id: string): Promise<void> => {
    await api.delete(`/subscription/${id}`);
};
