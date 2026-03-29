import { useCallback, useEffect, useRef, useState } from "react";
import { getDashboardMonthlyExpenses } from "../services/subscriptionService";
import type { MonthlyExpensePoint } from "../types/subscription";

export const useMonthlyExpenses = () => {
    const [monthlyExpenses, setMonthlyExpenses] = useState<
        MonthlyExpensePoint[]
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

    const fetchMonthlyExpenses = useCallback(async () => {
        if (isMountedRef.current) {
            setLoading(true);
            setError(null);
        }

        try {
            const data = await getDashboardMonthlyExpenses();

            if (isMountedRef.current) {
                setMonthlyExpenses(data.monthlyExpenses);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError("Failed to load monthly expenses");
            }
            throw err;
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchMonthlyExpenses().catch(() => undefined);
    }, [fetchMonthlyExpenses]);

    return {
        monthlyExpenses,
        loading,
        error,
        refetch: fetchMonthlyExpenses,
    };
};
