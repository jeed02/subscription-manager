import { useCallback, useEffect, useRef, useState } from "react";
import { getDashboardCategories } from "../services/subscriptionService";
import type { CategoryBreakdownItem } from "../types/subscription";

export const useCategoryBreakdown = () => {
    const [categories, setCategories] = useState<CategoryBreakdownItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const fetchCategories = useCallback(async () => {
        if (isMountedRef.current) {
            setLoading(true);
            setError(null);
        }

        try {
            const data = await getDashboardCategories();

            if (isMountedRef.current) {
                setCategories(data.categories);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError("Failed to load categories");
            }
            throw err;
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchCategories().catch(() => undefined);
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        refetch: fetchCategories,
    };
};
