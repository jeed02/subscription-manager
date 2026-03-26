import type {
    Budget,
    BudgetStatus,
    CreateBudgetRequest,
    UpdateBudgetRequest,
} from "../types/settings";
import { api } from "../utils/api";

export const getBudgets = async (): Promise<Budget[]> => {
    const response = await api.get("/budgets");
    return response.data;
};

export const getBudgetStatuses = async (): Promise<BudgetStatus[]> => {
    const response = await api.get("/budgets/status");
    return response.data;
};

export const createBudget = async (
    data: CreateBudgetRequest,
): Promise<Budget> => {
    const response = await api.post("/budgets", data);
    return response.data;
};

export const updateBudget = async (
    id: string,
    data: UpdateBudgetRequest,
): Promise<Budget> => {
    const response = await api.put(`/budgets/${id}`, data);
    return response.data;
};

export const deleteBudget = async (id: string): Promise<void> => {
    await api.delete(`/budgets/${id}`);
};
