import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {Foodtruck} from "../../interfaces/foodtruck";
import {Location} from "../../interfaces/location";
import {Observable} from "rxjs";
import {FoodtruckService} from "../../services/foodtruck.service";
import {Router} from "@angular/router";
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-foodtruck-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './foodtruck-list.component.html',
  styleUrl: './foodtruck-list.component.css'
})
export class FoodtruckListComponent implements OnInit {
  foodtrucks$: Observable<Foodtruck[]> = new Observable<Foodtruck[]>();
  errorMessage: string = '';
  locations: {[key: string]: Location} = {};

  constructor(
    private foodtruckService: FoodtruckService,
    private locationService: LocationService,
    private router: Router) {
  }

  ngOnInit():void {
    this.getFoodtrucks();
  }

  getFoodtrucks(){
    this.foodtrucks$ = this.foodtruckService.getFoodtrucks();
    this.foodtrucks$.subscribe(foodtrucks => {
      this.loadLocations(foodtrucks);
    })
  }

  loadLocations(foodtrucks: Foodtruck[]): void {
    foodtrucks.forEach((foodtruck) => {
      if (foodtruck.locationId && !this.locations[foodtruck.locationId]) {
        // Fetch the location details for each food truck using LocationService
        this.locationService.getLocationById(foodtruck.locationId).subscribe((location) => {
          // @ts-ignore
          this.locations[foodtruck.locationId] = location;
        });
      }
    });
  }

  add(){
    this.router.navigate(['/admin/foodtruck/form'], {state: {mode: 'add'}});
  }

  edit(id: string){
    this.router.navigate(['/admin/foodtruck/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: string){
    this.foodtruckService.deleteFoodtruck(id).subscribe(
      {
        next: (v) => this.getFoodtrucks(),
        error: (e) => (this.errorMessage = e.message),
      }
    );
  }

  getLocationName(locationId: string):string{
    const location = this.locations[locationId];
    return location? location.name : 'Location not found';
  }
}
