import {
  GooglePlacesAPIResponse,
  PlacePrediction,
} from "@/types/googlePlaces.type";
import { PropertyRegion } from "@/types/listingDetailPost.type";

export const fetchPlaceSuggestions = async (
  input: string,
  signal?: AbortSignal,
): Promise<PlacePrediction[]> => {
  if (!input.trim()) return [];

  try {
    const res = await fetch("/api/autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
      signal,
    });

    const data = (await res.json()) as GooglePlacesAPIResponse;

    return (
      data?.suggestions?.map(s => ({
        placeId: s.placePrediction.placeId,
        text: s.placePrediction.text.text,
      })) ?? []
    );
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "ERR_CANCELED"
    ) {
      return [];
    }

    if (
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name?: string }).name === "AbortError"
    ) {
      return [];
    }

    console.error("Google Autocomplete API Error:", err);
    return [];
  }
};
export const fetchPlaceDetailSuggestions = async (
  input: string,
  signal?: AbortSignal,
): Promise<PlacePrediction[]> => {
  if (!input.trim()) return [];

  try {
    const res = await fetch("/api/autocomplete", {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, type: "address" }),
    });

    if (!res.ok) throw new Error("Failed to fetch predictions");

    const data = (await res.json()) as GooglePlacesAPIResponse;

    return (
      data?.suggestions?.map(s => ({
        placeId: s.placePrediction.placeId,
        text: s.placePrediction.text.text,
      })) ?? []
    );
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "ERR_CANCELED"
    ) {
      return [];
    }

    if (
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name?: string }).name === "AbortError"
    ) {
      return [];
    }

    return [];
  }
};

export const getCoordsFromRegion = async (region: PropertyRegion) => {
  const address = [
    region.streetNumber,
    region.streetName,
    region.suburb,
    region.state,
    region.postCode,
    region.country,
  ]
    .filter(Boolean)
    .join(" ");

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`,
  );

  const data = await res.json();

  if (!data.results?.[0]?.geometry?.location) return null;

  return data.results[0].geometry.location as { lat: number; lng: number };
};

export const fetchPlaceDetails = async (placeId: string) => {
  if (!placeId) return null;

  const res = await fetch(
    `/api/placeDetails?placeId=${encodeURIComponent(placeId)}`,
  );

  if (!res.ok) {
    console.error("Place details fetch failed");
    return null;
  }

  const data = await res.json();

  if (data.status !== "OK") {
    console.error("Place details error:", data.status);
    return null;
  }

  return data.result;
};
