import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MenuItems} from "../../interfaces/menu-items";
import {FoodTruck} from "../../interfaces/foodTruck";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MenuItemsService} from "../../services/menu-items.service";
import {FoodtruckService} from "../../services/foodtruck.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-menu-items-list',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './menu-items-list.component.html',
  styleUrl: './menu-items-list.component.css'
})
export class MenuItemsListComponent implements OnInit {
  menuItems$:Observable<MenuItems[]> = new Observable<MenuItems[]>();
  errorMessage = '';
  foodTrucks: {[key: string]: FoodTruck} = {};

  constructor(private router:Router,
              private menuItemsService: MenuItemsService,
              private foodTruckService: FoodtruckService) {}

  ngOnInit() {
    this.getMenuItems()
  }

  getMenuItems(){
    this.menuItems$ = this.menuItemsService.getMenuItems();
    this.menuItems$.subscribe(menuItems => {
      this.loadFoodTrucks(menuItems);
    })
  }

  loadFoodTrucks(menuItems: MenuItems[]): void {
    menuItems.forEach(menuItem => {
      if(menuItem.foodTruckId && !this.foodTrucks[menuItem.foodTruckId]) {
        this.foodTruckService.getFoodtruckById(menuItem.foodTruckId).subscribe((foodTruck) =>{
          this.foodTrucks[menuItem.foodTruckId] = foodTruck;
        })
      }
    })
  }

  add(){
    this.router.navigate(['/admin/menuItems/form'], {state: {mode: 'add'}});
  }

  edit(id: string){
    this.router.navigate(['/admin/menuItems/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: string){
    this.menuItemsService.deleteMenuItems(id).subscribe(
      {
        next: (v) => this.getMenuItems(),
        error: (e) => (this.errorMessage = e.message),
      }
    );
  }

}
