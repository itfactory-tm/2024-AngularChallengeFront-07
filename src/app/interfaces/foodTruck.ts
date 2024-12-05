import {MenuItems} from "./menu-items";

export interface FoodTruck {
  foodTruckId: string;
  name: string;
  locationId: string;
  locationName: string;
  editionId: string;
  editionName: string;
  menuItems?: MenuItems[];
}
