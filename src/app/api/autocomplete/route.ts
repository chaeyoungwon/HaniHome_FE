export async function POST(req: Request) {
  const { input, type = "regions" } = await req.json();

  const googleRes = await fetch(
    "https://places.googleapis.com/v1/places:autocomplete",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_API_KEY!,
        "X-Goog-FieldMask":
          "suggestions.placePrediction.text.text,suggestions.placePrediction.placeId",
      },
      body: JSON.stringify({
        input,
        includedRegionCodes: ["au"],
        ...(type === "address"
          ? {
              includedPrimaryTypes: ["street_address", "premise"],
            }
          : type === "regions"
            ? {
                includedPrimaryTypes: ["(regions)"],
              }
            : {}),
      }),
    },
  );
  try {
    const data = await googleRes.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("[Google API Error]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
