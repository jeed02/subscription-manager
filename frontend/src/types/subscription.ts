import type { Category } from "./settings";

export interface ApiSubscription {
    id: string;
    name: string;
    cost: number;
    frequency: number;
    startDate: string;
    renewalDate: string;
    userId: string;
    categoryId: string | null;
    category?: Category | null;
    daysUntilRenewal?: number;
}

export interface DashboardTransactionsResponse {
    latestTransactions: ApiSubscription[];
    upcomingTransactions: ApiSubscription[];
}

export interface CategoryBreakdownItem {
    categoryId: string | null;
    name: string;
    color: string;
    subscriptionCount: number;
}

export interface DashboardCategoryBreakdownResponse {
    categories: CategoryBreakdownItem[];
}

export interface MonthlyExpensePoint {
    year: number;
    month: number;
    label: string;
    amount: number;
}

export interface DashboardMonthlyExpensesResponse {
    monthlyExpenses: MonthlyExpensePoint[];
}

export interface CategorySpendingItem {
    categoryId: string | null;
    name: string;
    color: string;
    amount: number;
}

export interface DashboardSpendingBreakdownResponse {
    year: number;
    month: number;
    label: string;
    categories: CategorySpendingItem[];
}

export interface SubscriptionPriceHistoryItem {
    id: string;
    subscriptionId: string;
    previousCost: number;
    newCost: number;
    changedAt: string;
}

export interface SubscriptionPriceHistoryResponse {
    history: SubscriptionPriceHistoryItem[];
}

export interface TransactionWidgetItem {
    id: string;
    name: string;
    cost: number;
    frequencyLabel: string;
    logo: string;
    daysLeft: number;
}

export interface SubscriptionCardModel {
    id: string;
    name: string;
    cost: number;
    frequencyLabel: string;
    frequencyValue: number;
    categoryLabel: string;
    categoryId: string | null;
    daysLeft: number;
    logo: string;
    startDate: string;
}

export interface CreateSubscriptionRequest {
    name: string;
    cost: number;
    startDate: string;
    frequency: number;
    categoryId: string | null;
}

export interface UpdateSubscriptionRequest {
    name: string;
    cost: number;
    startDate: string;
    frequency: number;
    categoryId: string | null;
}
