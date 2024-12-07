import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FoodTruck} from "../../interfaces/foodTruck";
import {Location} from "../../interfaces/location";
import {map, Observable} from "rxjs";
import {FoodtruckService} from "../../services/foodtruck.service";
import {Router} from "@angular/router";
import {LocationService} from "../../services/location.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-foodtruck-list',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './foodtruck-list.component.html',
  styleUrl: './foodtruck-list.component.css'
})
export class FoodtruckListComponent implements OnInit {
  foodtrucks$: Observable<FoodTruck[]> = new Observable<FoodTruck[]>();
  errorMessage: string = '';
  filteredFoodtrucks$: Observable<FoodTruck[]> = new Observable<FoodTruck[]>();
  searchTerm: string = '';
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
    this.filteredFoodtrucks$ = this.foodtrucks$;
    this.foodtrucks$.subscribe(foodtrucks => {
      this.loadLocations(foodtrucks);
    })
  }

  filteredFoodtrucks(){
    this.filteredFoodtrucks$ = this.foodtrucks$.pipe(
      map(foodtrucks => (
        foodtrucks.filter(
          foodtruck =>
            foodtruck.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
        )
      ))
    )
  }

  loadLocations(foodtrucks: FoodTruck[]): void {
    foodtrucks.forEach((foodtruck) => {
      if (foodtruck.locationId && !this.locations[foodtruck.locationId]) {
        // Fetch the location details for each food truck using LocationService
        this.locationService.getLocationById(foodtruck.locationId).subscribe((location) => {

          this.locations[foodtruck.locationId] = location;
        });
      }
    });
  }
  goBack() {
    this.router.navigate(['/admin/dashboard']);
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
}
