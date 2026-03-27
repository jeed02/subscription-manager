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
