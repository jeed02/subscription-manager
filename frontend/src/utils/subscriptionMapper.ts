import type {
  ApiSubscription,
  SubscriptionCardModel,
} from "../types/subscription";

const FALLBACK_FREQUENCY = 3;

export const frequencyLabelMap: Record<number, string> = {
    1: "Weekly",
    2: "BiWeekly",
    3: "Monthly",
    4: "Quarterly",
    5: "Yearly",
};

export const frequencyValueMap: Record<string, number> = {
    weekly: 1,
    biweekly: 2,
    monthly: 3,
    quarterly: 4,
    yearly: 5,
};

export const getFrequencyLabel = (frequency: number): string => {
    return frequencyLabelMap[frequency] ?? frequencyLabelMap[FALLBACK_FREQUENCY];
};

export const getFrequencyValue = (label: string): number => {
    const normalized = label.replace(/\s+/g, "").toLowerCase();
    return frequencyValueMap[normalized] ?? FALLBACK_FREQUENCY;
};

export const calculateDaysLeft = (renewalDate: string): number => {
    const renewal = new Date(renewalDate);
    const now = new Date();
    const diffMs = renewal.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
};

export const buildLogoUrl = (subscriptionName: string): string => {
    const fallbackDomain = "example.com";
    const domain = `${subscriptionName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") || "example"}.com`;

    return `https://www.google.com/s2/favicons?domain=${domain || fallbackDomain}&sz=128`;
};

export const toSubscriptionCardModel = (
    subscription: ApiSubscription,
): SubscriptionCardModel => {
    return {
        id: subscription.id,
        name: subscription.name,
        cost: subscription.cost,
        frequencyLabel: getFrequencyLabel(subscription.frequency),
        frequencyValue: subscription.frequency,
        categoryLabel: subscription.category?.name ?? "Uncategorized",
        categoryId: subscription.categoryId,
        daysLeft: calculateDaysLeft(subscription.renewalDate),
        logo: buildLogoUrl(subscription.name),
        startDate: subscription.startDate,
    };
};
