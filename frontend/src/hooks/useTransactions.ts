import { useCallback, useEffect, useRef, useState } from "react";
import { getDashboardTransactions } from "../services/subscriptionService";
import type {
    ApiSubscription,
    TransactionWidgetItem,
} from "../types/subscription";
import {
    buildLogoUrl,
    calculateDaysLeft,
    getFrequencyLabel,
} from "../utils/subscriptionMapper";

const mapToTransactionItem = (
    subscription: ApiSubscription,
): TransactionWidgetItem => ({
    id: subscription.id,
    name: subscription.name,
    cost: subscription.cost,
    frequencyLabel: getFrequencyLabel(subscription.frequency),
    logo: buildLogoUrl(subscription.name),
    daysLeft:
        subscription.daysUntilRenewal ??
        calculateDaysLeft(subscription.renewalDate, subscription.frequency),
});

export const useTransactions = () => {
    const [latestTransactions, setLatestTransactions] = useState<
        TransactionWidgetItem[]
    >([]);
    const [upcomingTransactions, setUpcomingTransactions] = useState<
        TransactionWidgetItem[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const fetchTransactions = useCallback(async () => {
        if (isMountedRef.current) {
            setLoading(true);
            setError(null);
        }

        try {
            const data = await getDashboardTransactions();

            if (isMountedRef.current) {
                setLatestTransactions(
                    data.latestTransactions.map(mapToTransactionItem),
                );
                setUpcomingTransactions(
                    data.upcomingTransactions.map(mapToTransactionItem),
                );
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError("Failed to load transactions");
            }
            throw err;
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchTransactions().catch(() => undefined);
    }, [fetchTransactions]);

    return {
        latestTransactions,
        upcomingTransactions,
        loading,
        error,
        refetch: fetchTransactions,
    };
};
