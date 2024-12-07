import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Location} from "../../interfaces/location";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-location-form',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  locationId: string= '';

  location : Location = {
    locationId: '',
    name:'',
    longitude:0.0,
    latitude:0.0,
    stageNames: [],
    foodTruckNames: []
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private locationService: LocationService,
              private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.locationId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit():void {
    if(this.locationId != null){
      this.locationService.getLocationById(this.locationId).subscribe((result) => {
        this.location = result;
      })
    }
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.isAdd){
      this.locationService.postLocation(this.location).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/location'),
        error: (e) => (this.errorMessage = e.message),
      })
    }
    if(this.isEdit){
      this.locationService.putLocation(this.locationId, this.location).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/location'),
        error: (e) => (this.errorMessage = e.message),
      })
    }
  }

  goBack() {
    window.history.back();
  }
}
