import { useCallback, useEffect, useRef, useState } from "react";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/settings";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
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
            const data = await getCategories();
            if (isMountedRef.current) {
                setCategories(data);
            }
        } catch {
            if (isMountedRef.current) {
                setError("Failed to load categories");
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchCategories().catch(() => undefined);
    }, [fetchCategories]);

    return { categories, loading, error, refetch: fetchCategories };
};
