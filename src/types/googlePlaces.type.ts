export interface GooglePlacesAPIResponse {
  suggestions: {
    placePrediction: {
      placeId: string;
      text: {
        text: string;
      };
    };
  }[];
}

export interface PlacePrediction {
  placeId: string;
  text: string;
}
