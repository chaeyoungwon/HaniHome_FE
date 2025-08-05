export interface MetroStop {
  id: number;
  businessStopId: string;
  stopName: string;
  stopLatitude: number;
  stopLongitude: number;
  locationType: string;
  parentBusinessStopId: string;
  wheelchairBoarding: boolean;
  platformCode: string;
}
