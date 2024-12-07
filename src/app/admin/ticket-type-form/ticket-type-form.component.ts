import {Component, OnInit} from '@angular/core';
import {TicketType} from "../../interfaces/ticketType";
import {TicketTypeService} from "../../services/ticketType.service";
import {Router} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-ticket-type-form',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './ticket-type-form.component.html',
  styleUrl: './ticket-type-form.component.css'
})
export class TicketTypeFormComponent implements OnInit{
  isAdd: boolean = false;
  isEdit: boolean = false;
  typeId: string = '';

  type: TicketType = {
    ticketTypeId: '',
    name: '',
    price: 0.0
  }

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private ticketTypeService: TicketTypeService, private router: Router) {  const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.typeId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit() {
    if(this.typeId != null){
      this.ticketTypeService.getTicketTypeById(this.typeId).subscribe((result) =>{
        this.type = result;
      });
    }
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.isAdd){
      this.ticketTypeService.postTicketType(this.type).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/ticketTypes'),
        error: (e) => (this.errorMessage = e.message),
      })
    }
    if (this.isEdit) {
      this.ticketTypeService.putTicketType(this.typeId, this.type).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/ticketTypes'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
