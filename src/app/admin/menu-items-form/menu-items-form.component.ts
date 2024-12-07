import {Component, OnInit} from '@angular/core';
import {FoodTruck} from "../../interfaces/foodTruck";
import {MenuItems} from "../../interfaces/menu-items";
import {Router} from "@angular/router";
import {MenuItemsService} from "../../services/menu-items.service";
import {FoodtruckService} from "../../services/foodtruck.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-menu-items-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './menu-items-form.component.html',
  styleUrl: './menu-items-form.component.css'
})
export class MenuItemsFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  menuItemId: string = '';
  foodtrucks$: FoodTruck[] = [];

  menuItem : MenuItems = {
    menuItemId: '',
    name: '',
    price: 0.0,
    foodTruckId: '',
    foodTruckName:''
  }

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router,
              private menuItemService:MenuItemsService,
              private foodtruckService: FoodtruckService) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.menuItemId = state['id'];

    if(!this.isAdd && !this.isEdit){
      this.isAdd = true;
    }
  }

  ngOnInit() {
    this.foodtruckService.getFoodtrucks().subscribe((foodtrucks) => {
      this.foodtrucks$ = foodtrucks;
    })
    if(this.menuItemId != null){
      this.menuItemService.getMenuItemsById(this.menuItemId).subscribe((result) => {
        this.menuItem = result;
      })
    }
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.isAdd){
      this.menuItemService.postMenuItems(this.menuItem).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/menuItems'),
        error: (e) => (this.errorMessage = e.message),
      })
    }
    if(this.isEdit){
      this.menuItemService.putMenuItems(this.menuItemId, this.menuItem).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/menuItems'),
        error: (e) => (this.errorMessage = e.message),
      })
    }
  }

  goBack() {
    window.history.back();
  }
}
