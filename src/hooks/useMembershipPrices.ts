import { useEffect, useState } from "react";
import type { MembershipPrice } from "@/lib/muhaisnahPlans";

type PriceState = {
  prices: MembershipPrice[];
  loading: boolean;
  error: string | null;
};

let cachedPrices: MembershipPrice[] | undefined;
let cachedAt = 0;
const CLIENT_CACHE_MS = 5 * 60 * 1000;

export const useMembershipPrices = (): PriceState => {
  const [state, setState] = useState<PriceState>({
    prices: cachedPrices ?? [],
    loading: !cachedPrices,
    error: null,
  });

  useEffect(() => {
    if (cachedPrices && Date.now() - cachedAt < CLIENT_CACHE_MS) {
      setState({ prices: cachedPrices, loading: false, error: null });
      return;
    }

    const controller = new AbortController();
    fetch("/api/stripe/prices", { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Membership prices could not be loaded.");
        return data.prices as MembershipPrice[];
      })
      .then((prices) => {
        cachedPrices = prices;
        cachedAt = Date.now();
        setState({ prices, loading: false, error: null });
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setState({ prices: [], loading: false, error: error.message });
        }
      });

    return () => controller.abort();
  }, []);

  return state;
};

