export interface Category {
    id: string;
    userId: string;
    name: string;
    color: string;
    createdAt: string;
}

export interface CreateCategoryRequest {
    name: string;
    color: string;
}

export interface UpdateCategoryRequest {
    name: string;
    color: string;
}

export interface Budget {
    id: string;
    userId: string;
    categoryId: string | null;
    category?: Category;
    monthlyLimit: number;
    alertThreshold: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBudgetRequest {
    categoryId: string | null;
    monthlyLimit: number;
    alertThreshold: number;
}

export interface UpdateBudgetRequest {
    categoryId: string | null;
    monthlyLimit: number;
    alertThreshold: number;
}

export interface BudgetStatus {
    budget: Budget;
    currentSpending: number;
    percentageUsed: number;
    isOverThreshold: boolean;
}
