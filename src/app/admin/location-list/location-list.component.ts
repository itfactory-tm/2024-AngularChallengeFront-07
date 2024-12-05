import { Component, OnInit } from '@angular/core';
import { Location } from "../../interfaces/location";
import { FoodTruck } from "../../interfaces/foodTruck";
import { FoodtruckService } from "../../services/foodtruck.service";
import { LocationService } from "../../services/location.service";
import { StageService } from "../../services/stage.service";
import { Router } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import {catchError, forkJoin, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit {
  locations$: Observable<Location[]> = new Observable<Location[]>();
  errorMessage: string = '';


  constructor(
    private locationService: LocationService,
    private foodtruckService: FoodtruckService,
    private stageService: StageService,
    private router: Router
  ) {
  }


  ngOnInit():void {
    this.getLocationsWithFoodTrucksAndStages()

  }

  getLocationsWithFoodTrucksAndStages(){
    this.locations$ = forkJoin({
      locations: this.locationService.getLocations(),
      foodTrucks: this.foodtruckService.getFoodtrucks(),
      stages: this.stageService.getStages()
    }).pipe(
      map(({locations, foodTrucks, stages}) => {
        return locations.map((location) => ({
          ...location,
          foodTrucks: foodTrucks.filter(
            (location) => location.foodTruckId === location.foodTruckId
          ),
          stages: stages.filter(
            (location) => location.stageId === location.stageId
          )
        }));
      }),
      catchError((err) => {
        console.error('Error fetching data:', err);
        return of([]); // Handle errors gracefully
      })
    )
  }

  add() {
    this.router.navigate(['/admin/location/form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    this.router.navigate(['/admin/location/form'], { state: { id: id, mode: 'edit' } });
  }


  delete(id: string){
    this.locationService.deleteLocation(id).subscribe(
      {
        next: (v) => this.getLocationsWithFoodTrucksAndStages(),
        error: (e) => (this.errorMessage = e.message),
      }
    );
  }

}
