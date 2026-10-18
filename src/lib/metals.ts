import { MetalRatesData } from "@/types";

interface CacheEntry {
  data: MetalRatesData;
  timestamp: number;
}

let memoryCache: CacheEntry | null = null;

export async function fetchLiveMetalRates(): Promise<MetalRatesData> {
  const cacheTTL =
    parseInt(process.env.METALS_CACHE_TTL || "300", 10) * 1000;

  const now = Date.now();

  // Use cached data for 5 minutes
  if (memoryCache && now - memoryCache.timestamp < cacheTTL) {
    return memoryCache.data;
  }

  // ============================================================
  // ATTEMPT 1: Indian Gold & Silver Rate API
  // ============================================================
  try {
    const res = await fetch(
      "https://api.oropocket.com/public/prices",
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();

      const gold = data?.data?.gold;
      const silver = data?.data?.silver;

      /*
       * OroPocket public API provides Indian INR/gram
       * buy and sell rates.
       *
       * We use the BUY rate as the displayed market reference.
       */

      const goldRate = Number(
        gold?.buy ??
        gold?.rate_inr_per_gram ??
        0
      );

      const silverRate = Number(
        silver?.buy ??
        silver?.rate_inr_per_gram ??
        0
      );

      if (
        Number.isFinite(goldRate) &&
        goldRate > 0 &&
        Number.isFinite(silverRate) &&
        silverRate > 0
      ) {
        /*
         * OroPocket's public gold price is 24K gold.
         * 22K is calculated from 24K × 22/24.
         */
        const gold24k = Math.round(goldRate);
        const gold22k = Math.round(gold24k * (22 / 24));
        const silver999 = Number(silverRate.toFixed(2));

        const result: MetalRatesData = {
          gold24k,
          gold22k,
          silver999,

          currency: "INR",
          unit: "gram",

          updatedAt:
            gold?.last_updated ||
            silver?.last_updated ||
            new Date().toISOString(),

          source: "Indian Market Rate Reference (OroPocket)",

          isIndicative: true,

          rates: {
            gold24k_10g: gold24k * 10,
            gold22k_10g: gold22k * 10,
            silver999_1kg: Math.round(silver999 * 1000),
          },
        };

        memoryCache = {
          data: result,
          timestamp: now,
        };

        return result;
      }
    }
  } catch (error) {
    console.warn(
      "Indian gold-rate API failed, trying fallback:",
      error
    );
  }

  // ============================================================
  // ATTEMPT 2: GoldAPI.io
  // ============================================================

  const goldApiKey = process.env.GOLD_API_KEY;

  if (goldApiKey) {
    try {
      const [goldRes, silverRes] = await Promise.all([
        fetch("https://www.goldapi.io/api/XAU/INR", {
          headers: {
            "x-access-token": goldApiKey,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }),

        fetch("https://www.goldapi.io/api/XAG/INR", {
          headers: {
            "x-access-token": goldApiKey,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }),
      ]);

      if (goldRes.ok && silverRes.ok) {
        const goldData = await goldRes.json();
        const silverData = await silverRes.json();

        const gold24k = Math.round(
          goldData.price_gram_24k ||
            goldData.price / 31.1034768
        );

        const gold22k = Math.round(
          goldData.price_gram_22k ||
            gold24k * (22 / 24)
        );

        const silver999 = Number(
          (
            silverData.price_gram_24k ||
            silverData.price / 31.1034768
          ).toFixed(2)
        );

        const result: MetalRatesData = {
          gold24k,
          gold22k,
          silver999,

          currency: "INR",
          unit: "gram",

          updatedAt: new Date().toISOString(),

          source: "Live Bullion Reference API (GoldAPI)",

          isIndicative: true,

          rates: {
            gold24k_10g: gold24k * 10,
            gold22k_10g: gold22k * 10,
            silver999_1kg: Math.round(silver999 * 1000),
          },
        };

        memoryCache = {
          data: result,
          timestamp: now,
        };

        return result;
      }
    } catch (error) {
      console.warn("GoldAPI fallback failed:", error);
    }
  }

  // ============================================================
  // ATTEMPT 3: Safe Indian reference fallback
  // ============================================================

  /*
   * These are ONLY emergency fallback values.
   * They are not intended to be presented as live rates.
   *
   * Update them periodically if all APIs are unavailable.
   */

  const fallback24k = 14800;
  const fallback22k = 13570;
  const fallbackSilver = 222;

  const fallbackResult: MetalRatesData = {
    gold24k: fallback24k,
    gold22k: fallback22k,
    silver999: fallbackSilver,

    currency: "INR",
    unit: "gram",

    updatedAt: new Date().toISOString(),

    source: "Indian Market Reference (Fallback)",

    isIndicative: true,

    rates: {
      gold24k_10g: fallback24k * 10,
      gold22k_10g: fallback22k * 10,
      silver999_1kg: fallbackSilver * 1000,
    },
  };

  memoryCache = {
    data: fallbackResult,
    timestamp: now,
  };

  return fallbackResult;
}