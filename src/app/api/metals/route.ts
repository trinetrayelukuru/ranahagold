import { NextResponse } from "next/server";
import { fetchLiveMetalRates } from "@/lib/metals";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await fetchLiveMetalRates();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching live metal rates:", error);
    return NextResponse.json(
      {
        error: "Market rates temporarily unavailable.",
        isIndicative: true,
        updatedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
