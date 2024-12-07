import {Component, OnInit} from '@angular/core';

import {TicketType} from "../../interfaces/ticketType";
import {Observable} from "rxjs";
import {ArticleService} from "../../services/article.service";
import {TicketTypeService} from "../../services/ticketType.service";
import {Router} from "@angular/router";
import {AsyncPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-ticket-type-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './ticket-type-list.component.html',
  styleUrl: './ticket-type-list.component.css'
})
export class TicketTypeListComponent implements OnInit {
  types$: Observable<TicketType[]> = new Observable<TicketType[]>();
  errorMessage: string= '';

  constructor(private ticketTypeService: TicketTypeService, private router: Router) { }
  ngOnInit() {
    this.getTicketTypes()
  }

  getTicketTypes() {
    this.types$ = this.ticketTypeService.getTicketTypes();
  }

  goBack(){
    this.router.navigate(['/admin/dashboard']);
  }

  add(){
    this.router.navigate(['admin/ticketTypes/form'],{ state: { mode: 'add' } })
  }

  edit(id: string) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/ticketTypes/form'], {
      state: { id: id, mode: 'edit' },
    });
  }
  delete(id: string) {
    this.ticketTypeService.deleteTicketType(id).subscribe({
      next: (v) => this.getTicketTypes(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
