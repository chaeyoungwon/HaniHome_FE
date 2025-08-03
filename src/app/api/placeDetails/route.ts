// app/api/placeDetails/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json({ error: "placeId is required" }, { status: 400 });
  }

  try {
    const googleRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
        placeId,
      )}&key=${process.env.GOOGLE_API_KEY}`,
    );

    if (!googleRes.ok) {
      return NextResponse.json(
        { error: "Google API error" },
        { status: googleRes.status },
      );
    }

    const data = await googleRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
