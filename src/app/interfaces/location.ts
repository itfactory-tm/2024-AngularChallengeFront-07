export interface Location {
  locationId: string;
  name: string;
  longitude: number;
  latitude: number;
  foodTruckNames: string[]; // Array of food truck names for readability
  stageNames: string[];
}
