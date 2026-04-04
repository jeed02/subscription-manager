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
    return (
        frequencyLabelMap[frequency] ?? frequencyLabelMap[FALLBACK_FREQUENCY]
    );
};

export const getFrequencyValue = (label: string): number => {
    const normalized = label.replace(/\s+/g, "").toLowerCase();
    return frequencyValueMap[normalized] ?? FALLBACK_FREQUENCY;
};

const addFrequencyToDate = (date: Date, frequency: number): Date => {
    switch (frequency) {
        case 1:
            return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 7,
            );
        case 2:
            return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 14,
            );
        case 3:
            return new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
            );
        case 4:
            return new Date(
                date.getFullYear(),
                date.getMonth() + 3,
                date.getDate(),
            );
        case 5:
            return new Date(
                date.getFullYear() + 1,
                date.getMonth(),
                date.getDate(),
            );
        default:
            return date;
    }
};

const getNextUpcomingRenewalDate = (
    renewalDate: string,
    frequency: number,
): Date | null => {
    const renewal = new Date(renewalDate);
    if (Number.isNaN(renewal.getTime())) {
        return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextRenewal = new Date(renewal);
    nextRenewal.setHours(0, 0, 0, 0);

    while (nextRenewal < today) {
        const advanced = addFrequencyToDate(nextRenewal, frequency);
        if (advanced.getTime() <= nextRenewal.getTime()) {
            break;
        }

        nextRenewal.setTime(advanced.getTime());
    }

    return nextRenewal;
};

export const calculateDaysLeft = (
    renewalDate: string,
    frequency: number,
): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextRenewal = getNextUpcomingRenewalDate(renewalDate, frequency);
    if (!nextRenewal) {
        return 0;
    }

    const diffMs = nextRenewal.getTime() - today.getTime();
    const dayMs = 1000 * 60 * 60 * 24;
    return Math.max(0, Math.floor(diffMs / dayMs));
};

export const buildLogoUrl = (subscriptionName: string): string => {
    const fallbackDomain = "example.com";
    const domain = `${
        subscriptionName.toLowerCase().replace(/[^a-z0-9]/g, "") || "example"
    }.com`;

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
        daysLeft:
            subscription.daysUntilRenewal ??
            calculateDaysLeft(subscription.renewalDate, subscription.frequency),
        logo: buildLogoUrl(subscription.name),
        startDate: subscription.startDate,
        description: subscription.description,
    };
};
