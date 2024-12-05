import {Component, OnInit} from '@angular/core';
import {catchError, forkJoin, map, Observable, of, switchMap} from "rxjs";
import {FoodTruck} from "../interfaces/foodTruck";
import {FoodtruckService} from "../services/foodtruck.service";
import {AsyncPipe, CommonModule} from "@angular/common";
import {StageComponent} from "../stage/stage.component";

import {MenuItemsService} from "../services/menu-items.service";

@Component({
  selector: 'app-food-drinks',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './food-drinks.component.html',
  styleUrl: './food-drinks.component.css'
})
export class FoodDrinksComponent implements OnInit {
  foodtrucks$: Observable<FoodTruck[]> = new Observable<FoodTruck[]>();


  constructor(private foodTruckService: FoodtruckService, private menuItemService: MenuItemsService) {
  }

  ngOnInit() {
    this.getFoodTrucksWithMenuItems();
  }

  getFoodTrucksWithMenuItems() {
    this.foodtrucks$ = forkJoin({
      foodTrucks: this.foodTruckService.getFoodtrucks(),
      menuItems: this.menuItemService.getMenuItems(), // Fetch all menuItems
    }).pipe(
      map(({ foodTrucks, menuItems }) => {
        // Group menuItems by foodTruckId
        return foodTrucks.map((truck) => ({
          ...truck,
          menuItems: menuItems.filter(
            (item) => item.foodTruckId === truck.foodTruckId
          ), // Associate relevant menuItems
        }));
      }),
      catchError((err) => {
        console.error('Error fetching data:', err);
        return of([]); // Handle errors gracefully
      })
    );
  }

}
