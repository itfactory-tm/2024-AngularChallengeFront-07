import {Component, OnInit} from '@angular/core';
import {Location} from "../../interfaces/location";
import {FoodTruck} from "../../interfaces/foodTruck";
import {FoodtruckService} from "../../services/foodtruck.service";
import {LocationService} from "../../services/location.service";
import {StageService} from "../../services/stage.service";
import {Router} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";

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
  foodTrucks: {[key: string]: FoodTruck} = {};

  constructor(
    private locationService: LocationService,
    private foodtruckService: FoodtruckService,
    private stageService: StageService,
    private router: Router
    ) {
  }

  ngOnInit():void {
    this.getLocations();
  }
  // to avoid repeated fetching, you can fetch all food trucks once and then filter them for each location:
  // getLocations(){
  //   this.locations$ = this.locationService.getLocations();
  //   this.locations$.subscribe(location => {
  //     this.loadFoodtrucks(location);
  //   })
  // }

  // loadFoodtrucks(locations: Location[]): void {
  //   locations.forEach((location) => {
  //     if (location. && !this.locations[foodtruck.locationId]) {
  //       // Fetch the location details for each food truck using LocationService
  //       this.locationService.getLocationById(foodtruck.locationId).subscribe((location) => {
  //
  //         this.locations[foodtruck.locationId] = location;
  //       });
  //     }
  //   });
  // }

  add(){
    this.router.navigate(['/admin/location/form'], {state: {mode: 'add'}});
  }

  edit(id: string){
    this.router.navigate(['/admin/location/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: string){
    this.foodtruckService.deleteFoodtruck(id).subscribe(
      {
        next: (v) => this.loadLocationsAndFoodTrucks(),
        error: (e) => (this.errorMessage = e.message),
      }
    );
  }
}
