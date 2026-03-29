import type {
    ApiSubscription,
    CreateSubscriptionRequest,
    DashboardCategoryBreakdownResponse,
    DashboardMonthlyExpensesResponse,
    DashboardSpendingBreakdownResponse,
    DashboardTransactionsResponse,
    SubscriptionPriceHistoryResponse,
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

export const getDashboardMonthlyExpenses =
    async (): Promise<DashboardMonthlyExpensesResponse> => {
        const response = await api.get(
            "/subscription/dashboard-monthly-expenses",
        );
        return response.data;
    };

export const getDashboardSpendingBreakdown = async (
    year: number,
    month: number,
): Promise<DashboardSpendingBreakdownResponse> => {
    const response = await api.get(
        "/subscription/dashboard-spending-breakdown",
        {
            params: { year, month },
        },
    );
    return response.data;
};

export const getSubscriptionPriceHistory = async (
    id: string,
): Promise<SubscriptionPriceHistoryResponse> => {
    const response = await api.get(`/subscription/${id}/price-history`);
    return response.data;
};
