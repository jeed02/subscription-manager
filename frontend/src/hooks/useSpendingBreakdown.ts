import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getDashboardSpendingBreakdown } from "../services/subscriptionService";
import type { CategorySpendingItem } from "../types/subscription";

interface MonthSelection {
    year: number;
    month: number;
}

const formatMonthKey = ({ year, month }: MonthSelection): string => {
    return `${year}-${String(month).padStart(2, "0")}`;
};

const parseMonthKey = (value: string): MonthSelection | null => {
    const parts = value.split("-");
    if (parts.length !== 2) {
        return null;
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);

    if (!Number.isInteger(year) || !Number.isInteger(month)) {
        return null;
    }

    if (month < 1 || month > 12) {
        return null;
    }

    return { year, month };
};

const getCurrentMonth = (): MonthSelection => {
    const now = new Date();
    return {
        year: now.getUTCFullYear(),
        month: now.getUTCMonth() + 1,
    };
};

const getEarliestMonth = (): MonthSelection => {
    const now = new Date();
    now.setUTCDate(1);
    now.setUTCHours(0, 0, 0, 0);
    now.setUTCMonth(now.getUTCMonth() - 11);

    return {
        year: now.getUTCFullYear(),
        month: now.getUTCMonth() + 1,
    };
};

export const useSpendingBreakdown = () => {
    const currentMonth = useMemo(() => getCurrentMonth(), []);
    const earliestMonth = useMemo(() => getEarliestMonth(), []);

    const [selectedMonth, setSelectedMonth] = useState<string>(
        formatMonthKey(currentMonth),
    );
    const [label, setLabel] = useState<string>("");
    const [items, setItems] = useState<CategorySpendingItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const fetchSpendingBreakdown = useCallback(async () => {
        const parsed = parseMonthKey(selectedMonth);

        if (!parsed) {
            if (isMountedRef.current) {
                setError("Invalid month selection");
                setItems([]);
                setLoading(false);
            }
            return;
        }

        if (isMountedRef.current) {
            setLoading(true);
            setError(null);
        }

        try {
            const data = await getDashboardSpendingBreakdown(
                parsed.year,
                parsed.month,
            );

            if (isMountedRef.current) {
                setItems(data.categories);
                setLabel(data.label);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError("Failed to load spending breakdown");
            }
            throw err;
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [selectedMonth]);

    useEffect(() => {
        fetchSpendingBreakdown().catch(() => undefined);
    }, [fetchSpendingBreakdown]);

    return {
        selectedMonth,
        setSelectedMonth,
        minMonth: formatMonthKey(earliestMonth),
        maxMonth: formatMonthKey(currentMonth),
        label,
        items,
        loading,
        error,
        refetch: fetchSpendingBreakdown,
    };
};
