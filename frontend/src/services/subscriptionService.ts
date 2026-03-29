import type {
    ApiSubscription,
    CreateSubscriptionRequest,
    DashboardCategoryBreakdownResponse,
    DashboardTransactionsResponse,
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

export const getDashboardTransactions =
    async (): Promise<DashboardTransactionsResponse> => {
        const response = await api.get("/subscription/dashboard-widgets");
        return response.data;
    };

export const getDashboardCategories =
    async (): Promise<DashboardCategoryBreakdownResponse> => {
        const response = await api.get("/subscription/dashboard-categories");
        return response.data;
    };
