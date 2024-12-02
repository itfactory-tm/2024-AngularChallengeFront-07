import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Location} from "../../interfaces/location";
import {Foodtruck} from "../../interfaces/foodtruck";
import {ActivatedRoute, Router} from "@angular/router";
import {FoodtruckService} from "../../services/foodtruck.service";
import {LocationService} from "../../services/location.service";

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
  locations$: Observable<Location[]> = new Observable<Location[]>();

  foodtruck : Foodtruck = {
    foodtruckId: '',
    name:'',
    locationId: ''
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private foodtruckService: FoodtruckService,
    private locationService: LocationService
  ){const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.foodtruckId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    this.locations$ = this.locationService.getLocations();
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
