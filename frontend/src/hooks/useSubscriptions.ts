import { useCallback, useEffect, useRef, useState } from "react";
import {
    createSubscription,
    deleteSubscription,
    getSubscriptions,
    updateSubscription,
} from "../services/subscriptionService";
import type {
    ApiSubscription,
    CreateSubscriptionRequest,
    UpdateSubscriptionRequest,
} from "../types/subscription";

export const useSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<ApiSubscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [mutating, setMutating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const fetchSubscriptions = useCallback(async () => {
        if (isMountedRef.current) {
            setLoading(true);
            setError(null);
        }

        try {
            const data = await getSubscriptions();
            if (isMountedRef.current) {
                setSubscriptions(data);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError("Failed to load subscriptions");
            }
            throw err;
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchSubscriptions().catch(() => undefined);
    }, [fetchSubscriptions]);

    const addSubscription = useCallback(
        async (payload: CreateSubscriptionRequest) => {
            setMutating(true);
            setError(null);

            try {
                await createSubscription(payload);
                await fetchSubscriptions();
            } catch (err) {
                if (isMountedRef.current) {
                    setError("Failed to create subscription");
                }
                throw err;
            } finally {
                if (isMountedRef.current) {
                    setMutating(false);
                }
            }
        },
        [fetchSubscriptions],
    );

    const editSubscription = useCallback(
        async (id: string, payload: UpdateSubscriptionRequest) => {
            setMutating(true);
            setError(null);

            try {
                await updateSubscription(id, payload);
                await fetchSubscriptions();
            } catch (err) {
                if (isMountedRef.current) {
                    setError("Failed to update subscription");
                }
                throw err;
            } finally {
                if (isMountedRef.current) {
                    setMutating(false);
                }
            }
        },
        [fetchSubscriptions],
    );

    const removeSubscription = useCallback(
        async (id: string) => {
            setMutating(true);
            setError(null);

            try {
                await deleteSubscription(id);
                await fetchSubscriptions();
            } catch (err) {
                if (isMountedRef.current) {
                    setError("Failed to delete subscription");
                }
                throw err;
            } finally {
                if (isMountedRef.current) {
                    setMutating(false);
                }
            }
        },
        [fetchSubscriptions],
    );

    return {
        subscriptions,
        loading,
        mutating,
        error,
        refetch: fetchSubscriptions,
        addSubscription,
        editSubscription,
        removeSubscription,
    };
};
