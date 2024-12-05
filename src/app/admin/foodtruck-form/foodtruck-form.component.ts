import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Location} from "../../interfaces/location";
import {FoodTruck} from "../../interfaces/foodTruck";
import {ActivatedRoute, Router} from "@angular/router";
import {FoodtruckService} from "../../services/foodtruck.service";
import {LocationService} from "../../services/location.service";
import {Edition} from "../../interfaces/edition";
import {EditionService} from "../../services/edition.service";

@Component({
  selector: 'app-foodtruck-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './foodtruck-form.component.html',
  styleUrl: './foodtruck-form.component.css'
})
export class FoodtruckFormComponent implements OnInit{
  isAdd: boolean = false;
  isEdit: boolean = false;
  foodtruckId: string = '';
  locations$: Location[] = [];
  editions$: Edition[] = [];

  foodtruck : FoodTruck = {
    foodTruckId: '',
    name:'',
    locationId: '',
    locationName: '',
    editionId: '',
    editionName: '',
    menuItems: []
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private foodtruckService: FoodtruckService,
    private locationService: LocationService,
    private editionService: EditionService
  ){const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.foodtruckId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    this.editionService.getEditions().subscribe((editions)=>{
      this.editions$ = editions;
    })
    this.locationService.getLocations().subscribe((locations)=>{
      this.locations$ = locations;
    })
    if (this.foodtruckId != null) {
      this.foodtruckService.getFoodtruckById(this.foodtruckId).subscribe((result) => {
        this.foodtruck = result;
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.foodtruckService.postFoodtruck(this.foodtruck).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/foodtruck'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.foodtruckService.putFoodtruck(this.foodtruckId, this.foodtruck).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/foodtruck'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }
}
